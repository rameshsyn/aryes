import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import gql from 'graphql-tag'
import {
  Modal,
  Form,
  Dropdown
} from 'semantic-ui-react'

class Product extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      cost: 0,
      description: '',
      category: '',
      modalOpen: true
    }
  }
  handleModalClose (e) {
    this.setState({
      modalOpen: false
    })
    // route to product page
    this.props.push('/service')
  }
  handleCategoryItem (e, { value }) {
    this.setState({
      category: value
    })
  }
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
  handleChange (e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }
  update () {
    this.props.addNewProduct({
      variables: {
        name: this.state.name,
        description: this.state.description,
        cost: Number(this.state.cost),
        category: this.state.category
      },
      updateQueries: {
        getProducts: (prevQuery, newQuery) => {
          const newProduct = newQuery.mutationResult.data.addNewProduct
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
      console.log('got data', data)
    })
    .catch((error) => {
      console.log('there was an error sending the query', error)
    })
  }
  render () {
    if (this.props.data.loading) {
      return <h1>loading</h1>
    }
    return (
      <Modal open={this.state.modalOpen} onClose={this.handleModalClose.bind(this)}>
        <Modal.Header>Add New Product</Modal.Header>
        <Modal.Content>
          <Form size='small'>
            <Form.Input label='Product Name' type='text' name='name' onChange={this.handleChange.bind(this)} />
            <Form.Input label='Cost' type='text' name='cost' onChange={this.handleChange.bind(this)} />
            <Form.Field>
              <label>Categories</label>
              <Dropdown placeholder='Categories' search selection options={this.makeCategoryItems.bind(this)()} value={this.state.category} onChange={this.handleCategoryItem.bind(this)} />
            </Form.Field>
            <Form.TextArea label='Description' name='description' onChange={this.handleChange.bind(this)} />
            <Form.Button type='button' color='green' floated='right' onClick={this.update.bind(this)}>Add</Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

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

const addNewProduct = gql`
mutation addNewProduct($name: String, $description: String, $cost: Int, $category: String ) {
  addNewProduct(name: $name, description: $description, cost: $cost, category: $category) {
    id
    name
    description
    cost
  }
}`

const mapDipatchToProps = (dispatch) => bindActionCreators(routerActions, dispatch)

const ProductWithData = compose(
  graphql(ProductQuery),
  graphql(addNewProduct, {
    name: 'addNewProduct'
  })
)(Product)

export default connect(null, mapDipatchToProps)(ProductWithData)
