import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Modal,
  Form,
  Dropdown,
  Dimmer,
  Loader
} from 'semantic-ui-react'

class Staff extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      contact: '',
      position: [],
      modalOpen: true
    }
  }
  handleModalClose (e) {
    this.setState({
      modalOpen: false
    })
    // route to staff page
    this.props.push('/management/staff')
  }
  handleChange (e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }
  handlePositionItem (e, { value }) {
    this.setState({
      position: value
    })
  }
  makePositionItems () {
    const { position } = this.props.data
    return position.map(p => {
      return {
        key: p.id,
        text: p.name,
        value: p.id
      }
    })
  }
  update () {
    this.props.addNewStaff({
      variables: {
        name: this.state.name,
        contact: this.state.contact,
        position: this.state.position
      },
      updateQueries: {
        getStaffs: (prevQuery, newQuery) => {
          const update = newQuery.mutationResult.data.addNewStaff
          return {
            staff: [
              ...prevQuery.staff,
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
      <Modal open={this.state.modalOpen} onClose={this.handleModalClose.bind(this)}>
        <Modal.Header>Add New Staff</Modal.Header>
        <Modal.Content>
          <Form size='small'>
            <Form.Input label='Name' type='text' name='name' onChange={this.handleChange.bind(this)} />
            <Form.Input label='Contact' type='text' name='contact' onChange={this.handleChange.bind(this)} />
            <Form.Field>
              <label>Positions</label>
              <Dropdown placeholder='Positions' search selection multiple options={this.makePositionItems.bind(this)()} value={this.state.position} onChange={this.handlePositionItem.bind(this)} />
            </Form.Field>
            <Form.Button type='button' color='green' floated='right' onClick={this.update.bind(this)}>Add</Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const StaffQuery = gql`
  query getStaffs {
    staff {
      id
      name
      contact
      position {
        id
        name
      }      
    }
    position {
      id
      name
    }  
  }
`

const StaffMutation = gql`
  mutation addNewStaff($name: String, $contact: String, $position: [String]) {
    addNewStaff(name: $name, contact: $contact, position: $position) {
      id
      name
      contact
      position {
        id
        name
      } 
    }
  }
`
const mapDipatchToProps = (dispatch) => bindActionCreators(routerActions, dispatch)

const StaffWithData = compose(
  graphql(StaffQuery),
  graphql(StaffMutation, {
    name: 'addNewStaff'
  })
)(Staff)

export default connect(null, mapDipatchToProps)(StaffWithData)
