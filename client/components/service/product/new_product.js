import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import gql from 'graphql-tag'
import {
  Modal,
  Form,
  Dropdown,
  Dimmer,
  Loader,
  Message
} from 'semantic-ui-react'

class Product extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      cost: 0,
      description: '',
      category: '',
      modalOpen: true,
      message: '',
      messageColor: 'grey',
      formLoading: false
    }
  }
  // Makes dropdown select items
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
  handleChange (e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }
  add () {
    this.props.addNewProduct({
      // Variables to pass in mutation
      variables: {
        name: this.state.name,
        description: this.state.description,
        cost: Number(this.state.cost),
        category: this.state.category,
        // Stores client side date
        date_created: Date.now()
      },
      updateQueries: {
        getProducts: (prevQuery, newQuery) => {
          const newProduct = newQuery.mutationResult.data.addNewProduct
          // Returns previous data with new added one
          return {
            product: [
              ...prevQuery.product,
              newProduct
            ]
          }
        }
      }
    })
    .then(({ data }) => {
      if (data) {
        this.setState({
          message: 'Product added !',
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
  }
  render () {
    const { loading } = this.props.data
    const { formLoading, messageColor, message } = this.state
    if (loading) {
      return (
        <Dimmer active>
          <Loader size='massive'>Loading ...</Loader>
        </Dimmer>
      )
    }
    return (
      <Modal open={this.state.modalOpen} onClose={this.handleModalClose.bind(this)}>
        <Modal.Header>Add New Product</Modal.Header>
        <Modal.Content>
          <Message color={messageColor} hidden={message === ''}>
            <Message.Header>{message}</Message.Header>
          </Message>
          <Form size='small' loading={formLoading}>
            <Form.Group widths='equal'>
              <Form.Input label='Product Name' placeholder='Product Name' type='text' name='name' onChange={this.handleChange.bind(this)} />
              <Form.Input label='Cost' placeholder='Product cost' type='text' name='cost' onChange={this.handleChange.bind(this)} />
            </Form.Group>
            <Form.Field>
              <label>Categories</label>
              <Dropdown placeholder='Categories' search selection options={this.makeCategoryItems.bind(this)()} onChange={this.handleCategoryItem.bind(this)} />
            </Form.Field>
            <Form.TextArea label='Description' placeholder='Description' name='description' onChange={this.handleChange.bind(this)} />
            <Form.Button type='button' color='green' floated='right' onClick={this.add.bind(this)}>Add</Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

// Grapqh query
const ProductQuery = gql`
query getProducts {
  product {
    id
    name
    description
    cost
  }
  category {
    id
    name
  }
}`

// Graph mutation
const addNewProduct = gql`
mutation addNewProduct($name: String!, $description: String, $cost: Int!, $category: String!, $date_created: String! ) {
  addNewProduct(name: $name, description: $description, cost: $cost, category: $category, date_created: $date_created) {
    id
    name
    description
    cost
  }
}`

// Passes Graphql returned data to wrapped component's 'data' prop
const ProductWithData = compose(
  graphql(ProductQuery),
  graphql(addNewProduct, {
    name: 'addNewProduct'
  })
)(Product)

const mapDipatchToProps = (dispatch) => bindActionCreators(routerActions, dispatch)

export default connect(null, mapDipatchToProps)(ProductWithData)
