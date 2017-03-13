import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import gql from 'graphql-tag'
import {
  Grid,
  Modal,
  Form,
  Dropdown,
  Dimmer,
  Loader,
  Message,
  Radio
} from 'semantic-ui-react'

class Session extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sessionId: '',
      name: '',
      instructor: '',
      room: '',
      timePeriod: '',
      product: '',
      active: true,
      modalOpen: true,
      message: '',
      messageColor: 'grey',
      formLoading: false
    }
  }
  makeRoomItems () {
    const { room } = this.props.data
    return room.map(r => {
      return {
        key: r.id,
        text: r.name,
        value: r.id
      }
    })
  }
  makeInstructorItems () {
    const { staff } = this.props.data
    return staff.map(s => {
      return {
        key: s.id,
        text: s.name,
        value: s.id
      }
    })
  }
  makeTimeperiodItems () {
    return [
     { key: '1', text: '6AM-7AM', value: '6AM-7AM' },
     { key: '2', text: '7AM-8AM', value: '7AM-8AM' },
     { key: '3', text: '8AM-9AM', value: '8AM-9AM' },
     { key: '4', text: '9AM-10AM', value: '9AM-10AM' },
     { key: '5', text: '10AM-11AM', value: '10AM-11AM' },
     { key: '6', text: '11AM-12PM', value: '11AM-12PM' },
     { key: '7', text: '12PM-1PM', value: '12PM-1PM' },
     { key: '8', text: '1PM-2PM', value: '1PM-2PM' },
     { key: '9', text: '2PM-3PM', value: '2PM-3PM' },
     { key: '10', text: '3PM-4PM', value: '3PM-4PM' },
     { key: '11', text: '4PM-5PM', value: '4PM-5PM' },
     { key: '12', text: '5PM-6PM', value: '5PM-6PM' },
     { key: '13', text: '6PM-7PM', value: '6PM-7PM' }
    ]
  }
  makeProductItems () {
    const { product } = this.props.data
    return product.map(p => {
      return {
        key: p.id,
        text: p.name,
        value: p.id
      }
    })
  }
  handleProductItem (e, { value }) {
    this.setState({
      product: value
    })
  }
  handleRoomItem (e, { value }) {
    this.setState({
      room: value
    })
  }
  handleInstructorItem (e, { value }) {
    this.setState({
      instructor: value
    })
  }
  handleTimeperiodItem (e, { value }) {
    this.setState({
      timePeriod: value
    })
  }
  handleModalClose (e) {
    this.setState({
      modalOpen: false
    })
    // route to session page
    this.props.push('/management/session/filter/all')
  }
  handleChange (e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }
  handleRadioToggle (e) {
    this.setState({
      active: !this.state.active
    })
  }
  // Form validation
  validate () {
    const {name, instructor, timePeriod, product, room} = this.state
    const shouldValidate = [name, instructor, timePeriod, product, room]
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
  add () {
    const { updateSession } = this.props
    if (this.validate()) {
      updateSession({
        variables: {
          id: this.state.sessionId,
          name: this.state.name,
          instructor: this.state.instructor,
          room: this.state.room,
          timePeriod: this.state.timePeriod,
          product: this.state.product,
          active: this.state.active
        }
      })
      .then(({ data }) => {
        // Refetches all the products
        // to keep Apollo global cache consistent
        this.props.data.refetch()
        if (data) {
          this.setState({
            message: 'Session Updated !',
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
  componentDidMount () {
    // Reason behind timeout:
    // data prop won't be get passed
    // to wrapped component when componentDidMount executes
    setTimeout(() => {
      const { id, name, instructor, room, product, timePeriod, active } = this.props.data.session[0]
      this.setState({
        sessionId: id,
        name,
        timePeriod,
        active,
        instructor: instructor.id,
        room: room.id,
        product: product.id
      })
    }, 500)
  }
  render () {
    const { loading } = this.props.data
    const { messageColor, message, formLoading } = this.state
    if (loading) {
      return (
        <Dimmer active>
          <Loader size='massive'>Loading ...</Loader>
        </Dimmer>
      )
    }
    return (
      <Grid>
        <Grid.Row>
          <Modal open={this.state.modalOpen} onClose={this.handleModalClose.bind(this)}>
            <Modal.Header>Update Session</Modal.Header>
            <Modal.Content>
              <Message color={messageColor} hidden={message === ''}>
                <Message.Header>{message}</Message.Header>
              </Message>
              <Form size='small' widths='equal' loading={formLoading}>
                <Form.Input label='Session Name' type='text' placeholder='Session Name' name='name' value={this.state.name} onChange={this.handleChange.bind(this)} />
                <Form.Field>
                  <label>Product</label>
                  <Dropdown placeholder='Products' search selection options={this.makeProductItems.bind(this)()} onChange={this.handleProductItem.bind(this)} />
                </Form.Field>
                <Form.Group>
                  <Form.Field>
                    <label>Instructor</label>
                    <Dropdown placeholder='Instructors' search selection options={this.makeInstructorItems.bind(this)()} onChange={this.handleInstructorItem.bind(this)} />
                  </Form.Field>
                  <Form.Field>
                    <label>Room</label>
                    <Dropdown placeholder='Rooms' search selection options={this.makeRoomItems.bind(this)()} onChange={this.handleRoomItem.bind(this)} />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <labe>Time Peroid</labe>
                    <Dropdown placeholder='Periods' search selection options={this.makeTimeperiodItems.bind(this)()} value={this.state.timePeriod} onChange={this.handleTimeperiodItem.bind(this)} />
                  </Form.Field>
                  <Form.Field>
                    <label>Active</label>
                    <Radio toggle type='radio' name='active' onChange={this.handleRadioToggle.bind(this)} checked={this.state.active} />
                  </Form.Field>
                </Form.Group>
                <Form.Button type='button' color='green' floated='right' onClick={this.add.bind(this)}>Update</Form.Button>
              </Form>
            </Modal.Content>
          </Modal>
        </Grid.Row>
      </Grid>
    )
  }
}

const SessionQuery = gql`
  query getSessions($sessionId: String) {
    session(_id: $sessionId) {
      id
      name
      timePeriod
      active
      instructor {
        id
        name
      }
      room {
        id
        name
      }
      product {
        id
        name
      }
    } 
     staff {
      id
      name
    }
    room {
      id
      name
    }
    product {
      id
      name
    }  
  }
`

const SessionMutation = gql`
  mutation updateSession($id: String!, $name: String!, $instructor: String!, $room: String!, $timePeriod: String!, $product: String!, $active: Boolean!) {
    updateSession(id: $id, name: $name, instructor: $instructor, room: $room, timePeriod: $timePeriod, product: $product, active: $active) {
      id
      name
      timePeriod
      active
      instructor {
        id
        name
      }
      room {
        id
        name
      }
      product {
        id
        name
      }
    }
  }
`

const mapDipatchToProps = (dispatch) => bindActionCreators(routerActions, dispatch)

const SessionWithData = compose(
  graphql(SessionQuery, {
    options: ({params}) => {
      return {
        variables: {
          sessionId: params.sessionId
        }
      }
    }
  }),
  graphql(SessionMutation, {
    name: 'updateSession'
  })
)(Session)

export default connect(null, mapDipatchToProps)(SessionWithData)
