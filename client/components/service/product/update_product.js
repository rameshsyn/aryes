import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import gql from 'graphql-tag'
import {
  Dimmer,
  Loader,
  Modal,
  Form,
  Dropdown,
  Message
} from 'semantic-ui-react'

class Product extends Component {
  constructor () {
    super()
    this.state = {
      modalOpen: true,
      id: '',
      name: '',
      description: '',
      category: '',
      cost: 0,
      message: '',
      messageColor: 'grey',
      formLoading: false
    }
  }
  // Make dropdown select items
  makeCategoryItems () {
    const { category } = this.props.data
    return category.map(c => {
      return {
        key: c.id,
        text: c.name,
        value: c.id
      }
    })
  }
  handleModalClose (e) {
    this.setState({
      modalOpen: false
    })
    // Routes to product page
    this.props.push('/service')
  }
  handleCategoryItem (e, { value }) {
    this.setState({
      category: value
    })
  }
  // Form validation
  validate () {
    const {name, cost, category} = this.state
    const shouldValidate = [name, cost, category]
    let count = 0
    shouldValidate.map(input => {
      // Counts empty fields
      if ((input === '') || (input === 0)) {
        count++
      }
    })
    // Returns true on all required form fields are filled.
    return count === 0
  }
  handleChange (e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }
  update () {
    this.setState({
      formLoading: true
    })
    if (this.validate()) {
      const { updateProduct } = this.props
      updateProduct({
        variables: {
          id: this.state.id,
          name: this.state.name,
          description: this.state.description,
          cost: Number(this.state.cost),
          category: this.state.category
        }
      })
      .then(({ data }) => {
        // Refetches all the products
        // to keep Apollo global cache consistent
        this.props.data.refetch()
        if (data) {
          this.setState({
            message: 'Product updated !',
            messageColor: 'green',
            formLoading: false
          })
        }
      })
      .catch(error => {
        if (error) {
          this.setState({
            message: 'Something went wrong !',
            messageColor: 'red',
            formLoading: false
          })
        }
      })
    } else {
      this.setState({
        message: 'Fill a required field !',
        messageColor: 'red',
        formLoading: false
      })
    }
  }
  componentWillReceiveProps (nextProps) {
    const { id, name, description, cost, category } = nextProps.data.product[0]
    this.setState({
      id,
      name,
      description,
      cost,
      category: category.id
    })
  }
  render () {
    const { loading } = this.props.data
    const { modalOpen, messageColor, message, cost, name, description, formLoading } = this.state
    if (loading) {
      return (
        <Dimmer active>
          <Loader size='massive'>Loading ...</Loader>
        </Dimmer>
      )
    }
    return (
      <Modal open={modalOpen} onClose={this.handleModalClose.bind(this)}>
        <Modal.Header>Update Product</Modal.Header>
        <Modal.Content>
          <Message color={messageColor} hidden={message === ''}>
            <Message.Header>{message}</Message.Header>
          </Message>
          <Form size='small' loading={formLoading}>
            <Form.Group widths='equal'>
              <Form.Input label='Product Name' type='text' name='name' value={name} onChange={this.handleChange.bind(this)} />
              <Form.Input label='Cost' type='text' name='cost' value={cost} onChange={this.handleChange.bind(this)} />
            </Form.Group>
            <Form.Field>
              <label>Categories</label>
              <Dropdown placeholder='Categories' search selection options={this.makeCategoryItems.bind(this)()} onChange={this.handleCategoryItem.bind(this)} />
            </Form.Field>
            <Form.TextArea label='Description' name='description' onChange={this.handleChange.bind(this)} value={description} />
            <Form.Button type='button' color='green' floated='right' onClick={this.update.bind(this)}>Update</Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const ProductQuery = gql`
query getProducts($productId: String!) {
  product(id: $productId) {
    id
    name
    description
    cost
    category {
      id
      label
    }
  }
  category {
    id
    name
  }
}`

const updateProduct = gql`
 mutation updateProduct($id: String, $name: String, $description: String, $cost: Int, $category: String ) {
  updateProduct(id: $id, name: $name, description: $description, cost: $cost, category: $category) {
    id
    name
    description
    cost
    category {
      id
      label
    }
  }
}`

const mapDipatchToProps = (dispatch) => bindActionCreators(routerActions, dispatch)

const ProductWithData = compose(
  graphql(ProductQuery, {
    options: ({ params }) => {
      return {
        variables: {
          productId: params.productId
        }
      }
    }
  }),
  graphql(updateProduct, {
    name: 'updateProduct'
  })
)(Product)

export default connect(null, mapDipatchToProps)(ProductWithData)
