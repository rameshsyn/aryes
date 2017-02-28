import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Container,
  Button,
  Modal,
  Form,
  Divider,
  Label,
  Dimmer,
  Loader,
  Icon,
  Popup
} from 'semantic-ui-react'

class Category extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      description: '',
      label: ''
    }
  }
  handleChange (e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }
  add () {
    this.props.addNewCategory({
      variables: {
        name: this.state.name,
        label: this.state.label,
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
  update () {
    this.props.updateCategory({
      variables: {
        id: this.state.id,
        name: this.state.name,
        label: this.state.label,
        description: this.state.description
      },
      updateQueries: {
        getServiceCats: (prevQuery, newQuery) => {
          const update = newQuery.mutationResult.data.updateCategory
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
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      )
    }
    return (
      <Container>
        <div>
          {
            this.props.data.category.map((cat, i) => {
              return (
                <Popup
                  key={i}
                  trigger={
                    <Label as='a' color={cat.label} size='huge'>
                      {cat.name}
                      <Icon name='delete' circular />
                    </Label>
                  }
                  content={cat.description}
                  inverted
                />
              )
            })
          }
        </div>
        <Divider />
        <Modal trigger={<Button color='green'>Add category</Button>}>
          <Modal.Header>Add New Service Category</Modal.Header>
          <Modal.Content>
            <Form size='small'>
              <Form.Input label='Category Name' placeholder='Name' type='text' name='name' onChange={this.handleChange.bind(this)} />
              <Form.Field>
                <label>Label</label>
                <Form.Group>
                  <Label as='a' color='orange' size='medium' onClick={() => this.setState({label: 'orange'})}>orange</Label>
                  <Label as='a' color='blue' size='medium' onClick={() => this.setState({label: 'blue'})}>blue</Label>
                  <Label as='a' color='olive' size='medium' onClick={() => this.setState({label: 'olive'})}>olive</Label>
                  <Label as='a' color='violet' size='medium' onClick={() => this.setState({label: 'violet'})}>violet</Label>
                  <Label as='a' color='grey' size='medium' onClick={() => this.setState({label: 'grey'})}>grey</Label>
                  <Label as='a' color='brown' size='medium' onClick={() => this.setState({label: 'brown'})}>brown</Label>
                  <Label as='a' color='black' size='medium' onClick={() => this.setState({label: 'black'})}>black</Label>
                  <Label as='a' color='green' size='medium' onClick={() => this.setState({label: 'green'})}>green</Label>
                  <Label as='a' color='pink' size='medium' onClick={() => this.setState({label: 'pink'})}>pink</Label>
                  <Label as='a' color='teal' size='medium' onClick={() => this.setState({label: 'teal'})}>teal</Label>
                  <Label as='a' color='purple' size='medium' onClick={() => this.setState({label: 'purple'})}>purple</Label>
                </Form.Group>
              </Form.Field>
              <Form.TextArea label='Description' name='description' placeholder='What is this category about ?' onChange={this.handleChange.bind(this)} />
              <Form.Button type='button' color='green' floated='right' onClick={this.add.bind(this)}>Add</Form.Button>
            </Form>
          </Modal.Content>
        </Modal>
      </Container>
    )
  }
}

const ServiceCatQuery = gql`
query getServiceCats {
  category {
    id
    name
    label
    description
  }
}`

const addNewCategory = gql`
mutation addNewCategory($name: String, $label: String, $description: String) {
  addNewCategory(name: $name, label: $label, description: $description) {
    id
    name
    label
    description
  }
}`

const updateCategory = gql`
  mutation updateCategory($name: String, $label: String, $description: String) {
  updateCategory(name: $name, label: $label, description: $description) {
    id
    name
    label
    description
  }
}
`

export default compose(
  graphql(ServiceCatQuery),
  graphql(addNewCategory, {
    name: 'addNewCategory'
  }),
  graphql(updateCategory, {
    name: 'updateCategory'
  })
)(Category)

