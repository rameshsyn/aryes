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
  Container,
  Header,
  Dimmer,
  Loader,
  Card,
  Icon,
  Modal
} from 'semantic-ui-react'

class Product extends Component {
  constructor () {
    super()
    this.state = {
      productId: '',
      confirm: false
    }
  }
  displayProducts () {
    const { product } = this.props.data
    return product.map((pr, i) => {
      return (
        <Card key={i} color={pr.category.label}>
          <Card.Content>
            <Card.Header>
              {pr.name}
            </Card.Header>
            <Card.Meta>
             Rs. {pr.cost}
            </Card.Meta>
            <Card.Description>
              {pr.description}
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <Icon name='edit' color='green' circular link onClick={this.handleEditClick.bind(this, pr.id)} />
            <Icon name='delete' color='red' circular link onClick={this.handleDeleteClick.bind(this, pr.id)} />
          </Card.Content>
        </Card>
      )
    })
  }
  handleEditClick (id) {
    this.props.push(`/service/update/${id}`)
  }
  handleDeleteClick (id) {
    this.setState({
      confirm: true,
      productId: id
    })
  }
  handleConfirm () {
    const { deleteProduct } = this.props
    deleteProduct({
      variables: {
        id: this.state.productId
      }
    })
    .then(({ data }) => {
      // Refetches all the products
      // to keep Apollo Global cache consistent
      this.props.data.refetch()
    })
    .catch((error) => {
      console.log(error)
    })
    this.setState({
      confirm: false
    })
  }
  handleCancel () {
    this.setState({
      confirm: false
    })
  }
  render () {
    const { loading } = this.props.data
    const { push, children } = this.props
    const { confirm } = this.state
    if (loading) {
      return (
        <Dimmer active>
          <Loader size='massive'>Loading ...</Loader>
        </Dimmer>
      )
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
            <Button floated='right' onClick={() => push('/service/new')}>New Product</Button>
          </Container>
        </Grid.Row>
        <Divider />
        <Grid.Row>
          <Container>
            <Modal open={confirm} basic size='small'>
              <Modal.Header>
                <h1 style={{textAlign: 'center'}}>Are you sure want to remove ?</h1>
              </Modal.Header>
              <Modal.Actions>
                <Button basic color='green' inverted onClick={this.handleCancel.bind(this)}>
                  <Icon name='remove' /> No
                </Button>
                <Button color='red' inverted onClick={this.handleConfirm.bind(this)}>
                  <Icon name='checkmark' /> Yes
                </Button>
              </Modal.Actions>
            </Modal>
            <Card.Group itemsPerRow={3}>
              {this.displayProducts()}
            </Card.Group>
          </Container>
        </Grid.Row>
        <Grid.Row>
          {children}
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
    category {
      id
      label
    }
  }
}`

const deleteProduct = gql`
  mutation deleteProduct($id: String!) {
    deleteProduct(id: $id) {
      id
    }
  } 
`

const mapDipatchToProps = (dispatch) => bindActionCreators(routerActions, dispatch)

const ProductWithData = compose(
  graphql(ProductQuery),
  graphql(deleteProduct, {
    name: 'deleteProduct'
  })
)(Product)

export default connect(null, mapDipatchToProps)(ProductWithData)
