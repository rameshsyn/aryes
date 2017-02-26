import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Grid,
  Button,
  Modal,
  Form,
  Divider,
  Label
} from 'semantic-ui-react'

class Customization extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      description: ''
    }
  }
  handleChange (e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }
  update () {
    this.props.addNewCategory({
      variables: {
        name: this.state.name,
        description: this.state.description
      },
      updateQueries: {
        getServiceCats: (prevQuery, newQuery) => {
          const update = newQuery.mutationResult.data.addNewCategory
          return {
            category: [
              ...prevQuery.category,
              update
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
      return <h1>Loading</h1>
    }
    return (
      <Grid>
        <Divider horizontal>Service Category</Divider>
        <Grid.Row>
          <div>
            {
              this.props.data.category.map((cat, i) => {
                return <Label key={i}>{cat.name}</Label>
              })
            }
          </div>
          <Divider horizontal>I don't know</Divider>
          <Modal trigger={<Button>Add category</Button>}>
            <Modal.Header>Add New Service Category</Modal.Header>
            <Modal.Content>
              <Form size='small'>
                <Form.Input label='Category Name' type='text' name='name' onChange={this.handleChange.bind(this)} />
                <Form.TextArea label='Description' name='description' onChange={this.handleChange.bind(this)} />
                <Form.Button type='button' color='green' floated='right' onClick={this.update.bind(this)}>Add</Form.Button>
              </Form>
            </Modal.Content>
          </Modal>
        </Grid.Row>
        <Divider horizontal>Expenditure types</Divider>
        <Grid.Row>
          <Modal trigger={<Button>Add Expenditure type</Button>}>
            <Modal.Header>Add New Expenditure type</Modal.Header>
            <Modal.Content>
              <Form size='small'>
                <Form.Input label='Ex type Name' type='text' name='name' />
                <Form.TextArea label='Description' name='description' />
                <Form.Button type='button' color='green' floated='right' >Add</Form.Button>
              </Form>
            </Modal.Content>
          </Modal>
        </Grid.Row>
      </Grid>
    )
  }
}

const ServiceCatQuery = gql`
query getServiceCats {
  category {
    id
    name
    description
  }
}`

const ServiceCatMutation = gql`
mutation addNewCategory($name: String, $description: String) {
  addNewCategory(name: $name, description: $description) {
    id
    name
    description
  }
}`

export default compose(
  graphql(ServiceCatQuery),
  graphql(ServiceCatMutation, {
    name: 'addNewCategory'
  })
)(Customization)

