import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import gql from 'graphql-tag'
import {
  Modal,
  Form,
  Dimmer,
  Loader,
  Dropdown
} from 'semantic-ui-react'

class Expenditure extends Component {
  constructor (props) {
    super(props)
    this.state = {
      purpose: '',
      amount: 0,
      type: '',
      date: null,
      by: '',
      modalOpen: true
    }
  }
  handleModalClose (e) {
    this.setState({
      modalOpen: false
    })
    // route to expenditure page
    this.props.push('/accounting/expenditure')
  }
  handleExpenditureTypeItems (e, { value }) {
    this.setState({
      type: value
    })
  }
  makeExpenditureTypeItems () {
    const { expenditureTypes } = this.props.data
    return expenditureTypes.map(et => {
      return {
        key: et.id,
        text: et.name,
        value: et.id
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
    this.props.addNewExpenditure({
      variables: {
        purpose: this.state.purpose,
        amount: Number(this.state.amount),
        type: this.state.type,
        by: this.state.by,
        date: this.state.date
      },
      updateQueries: {
        getExpenditures: (prevQuery, newQuery) => {
          const update = newQuery.mutationResult.data.addNewExpenditure
          return {
            expenditure: [
              ...prevQuery.expenditure,
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
      <Modal open={this.state.modalOpen} onClose={this.handleModalClose.bind(this)}>
        <Modal.Header>Add New Expenditure</Modal.Header>
        <Modal.Content>
          <Form size='small'>
            <Form.Group>
              <Form.Input label='Amount' type='text' placeholder='Expenditure amount' name='amount' onChange={this.handleChange.bind(this)} />
              <Form.Input label='By' type='text' placeholder='By' name='by' onChange={this.handleChange.bind(this)} />
              <Form.Input label='Date' type='date' name='date' onChange={this.handleChange.bind(this)} />
              <Form.Field>
                <label>Types</label>
                <Dropdown placeholder='Types' selection options={this.makeExpenditureTypeItems.bind(this)()} value={this.state.type} onChange={this.handleExpenditureTypeItems.bind(this)} />
              </Form.Field>
            </Form.Group>
            <Form.TextArea label='Purpose' placeholder='Expenditure purpose ..' name='purpose' onChange={this.handleChange.bind(this)} />
            <Form.Button type='button' floated='right' onClick={this.update.bind(this)}>Register</Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const ExpenditureQuery = gql`
  query getExpenditures {
    expenditure {
      id
      purpose
      amount
      by
      date
      type {
        id
        name
      }
    }
    expenditureTypes {
      id
      name
    }
  }
  
`

const ExpenditureMutation = gql`
  mutation addNewExpenditure($purpose: String, $amount: Int, $by: String, $date: String, $type: String) {
    addNewExpenditure(purpose: $purpose, amount: $amount, by: $by, date: $date, type: $type) {
      id
      purpose
      amount
      by
      date
      type {
        id
        name
      }
    }
  } 
`
const mapDipatchToProps = (dispatch) => bindActionCreators(routerActions, dispatch)

const ExpenditureWithData = compose(
  graphql(ExpenditureQuery),
  graphql(ExpenditureMutation, {
    name: 'addNewExpenditure'
  })
)(Expenditure)

export default connect(null, mapDipatchToProps)(ExpenditureWithData)
