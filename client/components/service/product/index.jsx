import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import gql from 'graphql-tag'
import {
  Grid,
  Button,
  Divider,
  Label,
  Container,
  Header
} from 'semantic-ui-react'

class Product extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      cost: 0,
      description: '',
      category: ''
    }
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
      <Grid padded>
        <Grid.Row>
          <Container>
            <Header as='h3' textAlign='center'>
              Service
            </Header>
          </Container>
        </Grid.Row>
        <Divider />
        <Grid.Row>
          <Container>
            <Button floated='right' onClick={() => this.props.push('/service/new')}>New Product</Button>
          </Container>
        </Grid.Row>
        <Divider />
        <Grid.Row>
          {
            this.props.data.product.map((pr, i) => {
              return <Label key={i}>{pr.name}</Label>
            })
          }
        </Grid.Row>
        <Grid.Row>
          {this.props.children}
        </Grid.Row>
      </Grid>
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
