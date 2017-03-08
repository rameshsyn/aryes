import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Container,
  Button,
  Modal,
  Form,
  Label,
  Divider,
  Dimmer,
  Loader
} from 'semantic-ui-react'

class Position extends Component {
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
    this.props.addNewPosition({
      variables: {
        name: this.state.name,
        description: this.state.description
      },
      updateQueries: {
        getPositions: (prevQuery, newQuery) => {
          const update = newQuery.mutationResult.data.addNewPosition
          return {
            position: [
              ...prevQuery.position,
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
          <Loader size='massive'>Loading ...</Loader>
        </Dimmer>
      )
    }
    return (
      <Container>
        {
          this.props.data.position.map((p, i) => {
            return <Label key={i}>{p.name}</Label>
          })
        }
        <Divider />
        <Modal trigger={<Button color='green'>Add Position</Button>}>
          <Modal.Header>Add New Position</Modal.Header>
          <Modal.Content>
            <Form size='small'>
              <Form.Input label='Name' type='text' name='name' onChange={this.handleChange.bind(this)} />
              <Form.TextArea label='Description' name='description' onChange={this.handleChange.bind(this)} /> 
              <Form.Button type='button' color='green' floated='right' onClick={this.update.bind(this)}>Add</Form.Button>
            </Form>
          </Modal.Content>
        </Modal>
      </Container>
    )
  }
}

const PositionQuery = gql`
  query getPositions {
    position {
      id
      name
      description
    }
  }
`

const PositionMutation = gql`
  mutation addNewPosition($name: String, $description: String) {
    addNewPosition(name: $name, description: $description) {
      id
      name
      description
    }
  }
`
export default compose(
  graphql(PositionQuery),
  graphql(PositionMutation, {
    name: 'addNewPosition'
  })
)(Position)
