import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import gql from 'graphql-tag'
import {
  Grid,
  Button,
  Container,
  Divider,
  Table,
  Dimmer,
  Loader,
  Header
} from 'semantic-ui-react'

class Expenditure extends Component {
  constructor (props) {
    super(props)
    this.state = {
      purpose: '',
      amount: 0,
      type: '',
      date: null,
      by: ''
    }
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
          <Loader size='massive'>Loading ...</Loader>
        </Dimmer>
      )
    }
    return (
      <Grid padded>
        <Grid.Row>
          <Container>
            <Header as='h3' textAlign='center'>
              Expenditure
            </Header>
          </Container>
        </Grid.Row>
        <Divider />
        <Grid.Row>
          <Container>
            <Button floated='right' onClick={() => this.props.push('/accounting/expenditure/new')}>New Expenditure</Button>
          </Container>
        </Grid.Row>
        <Divider />
        <Grid.Row>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.HeaderCell>Purpose</Table.HeaderCell>
                <Table.HeaderCell>By</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                this.props.data.expenditure.map((ex, i) => {
                  return (
                    <Table.Row key={i}>
                      <Table.Cell>{ex.date}</Table.Cell>
                      <Table.Cell>{ex.amount}</Table.Cell>
                      <Table.Cell>{ex.purpose}</Table.Cell>
                      <Table.Cell>{ex.by}</Table.Cell>
                      <Table.Cell>{ex.type.name}</Table.Cell>
                    </Table.Row>
                  )
                })
              }
            </Table.Body>
          </Table>
          {this.props.children}
        </Grid.Row>
      </Grid>
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
