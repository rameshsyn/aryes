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
  Loader,
  Icon
} from 'semantic-ui-react'

class Room extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
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
  handleLabelChange (e, { color }) {
    this.setState({
      label: color
    })
  }
  update () {
    this.props.addNewExpenditureTypes({
      variables: {
        name: this.state.name,
        label: this.state.label
      },
      updateQueries: {
        getExpenditureTypes: (prevQuery, newQuery) => {
          const update = newQuery.mutationResult.data.addNewExpenditureTypes
          return {
            expenditureTypes: [
              ...prevQuery.expenditureTypes,
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
        {
          this.props.data.expenditureTypes.map((e, i) => {
            return (
              <Label as='a' color={e.label} size='large'>
                {e.name}
                <Icon name='delete' circular />
              </Label>
            )
          })
        }
        <Divider />
        <Modal trigger={<Button color='green'>Add Expenditure Type</Button>}>
          <Modal.Header>Add New Expenditure Type</Modal.Header>
          <Modal.Content>
            <Form size='small'>
              <Form.Input label='Name' type='text' name='name' onChange={this.handleChange.bind(this)} />
              <Form.Field>
                <label>Label</label>
                <Form.Group>
                  <Label as='a' color='orange' size='medium' onClick={this.handleLabelChange.bind(this)}>orange</Label>
                  <Label as='a' color='blue' size='medium' onClick={this.handleLabelChange.bind(this)}>blue</Label>
                  <Label as='a' color='olive' size='medium' onClick={this.handleLabelChange.bind(this)}>olive</Label>
                  <Label as='a' color='violet' size='medium' onClick={this.handleLabelChange.bind(this)}>violet</Label>
                  <Label as='a' color='grey' size='medium' onClick={this.handleLabelChange.bind(this)}>grey</Label>
                  <Label as='a' color='brown' size='medium' onClick={this.handleLabelChange.bind(this)}>brown</Label>
                  <Label as='a' color='black' size='medium' onClick={this.handleLabelChange.bind(this)}>black</Label>
                  <Label as='a' color='green' size='medium' onClick={this.handleLabelChange.bind(this)}>green</Label>
                  <Label as='a' color='pink' size='medium' onClick={this.handleLabelChange.bind(this)}>pink</Label>
                  <Label as='a' color='teal' size='medium' onClick={this.handleLabelChange.bind(this)}>teal</Label>
                  <Label as='a' color='purple' size='medium' onClick={this.handleLabelChange.bind(this)}>purple</Label>
                </Form.Group>
              </Form.Field>
              <Form.Button type='button' color='green' floated='right' onClick={this.update.bind(this)}>Add</Form.Button>
            </Form>
          </Modal.Content>
        </Modal>
      </Container>
    )
  }
}

const ExpenditureTypesQuery = gql`
  query getExpenditureTypes {
    expenditureTypes {
      id
      name
      label
    }
  }
`

const ExpenditureTypesMutation = gql`
  mutation addNewExpenditureTypes($name: String, $label: String) {
    addNewExpenditureTypes(name: $name, label: $label) {
      id
      name
      label
    }
  }
`
export default compose(
  graphql(ExpenditureTypesQuery),
  graphql(ExpenditureTypesMutation, {
    name: 'addNewExpenditureTypes'
  })
)(Room)
