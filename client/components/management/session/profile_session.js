import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Grid,
  Button,
  Modal,
  Form,
  Divider,
  Table,
  Dropdown,
  Dimmer,
  Loader,
  Segment,
  Header,
  Search,
  Container,
  Label
} from 'semantic-ui-react'

const source = [
  {title: 'ramesh'},
  {title: 'basanta'},
  {title: 'pramish'},
  {title: 'suman'}
]
class Student extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      results: [],
      value: ''
    }
  }
  componentWillMount () {
    this.resetComponent.bind(this)
  }
  resetComponent () {
    this.setState({ isLoading: false, results: [], value: '' })
  }
  handleResultSelect (e, result) {
    this.setState({ value: result.title })
  }
  handleSearchChange (e, value) {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent.bind(this)

      // const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      // const isMatch = (result) => re.test(result.title)

      // const filteredResults = _.reduce(source, (memo, data, name) => {
      //   const results = _.filter(data.results, isMatch)

      //   if (results.length) {
      //     memo[name] = { name, results }
      //   }

      //   return memo
      // }, {})
      const filteredResults = source.filter((t, i) => {
        if (t.title.indexOf(this.state.value) !== -1) {
          return true
        }
      })
      // console.log(filteredResults)

      this.setState({
        isLoading: false,
        results: filteredResults
      })
    }, 500)
  }
  render () {
    if (this.props.data.loading) {
      return (
        <Dimmer active>
          <Loader size='massive'>Loading ...</Loader>
        </Dimmer>
      )
    }
    const { isLoading, value, results } = this.state

    return (
      <Container>
        <br />
        <Segment color='green' size='massive'>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header as='h1' textAlign='center'>{this.props.data.session[0].name}</Header>
              </Grid.Column>
              <Grid.Column>
                  <Search
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect.bind(this)}
                    onSearchChange={this.handleSearchChange.bind(this)}
                    results={results}
                    value={value}
                  />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider horizontal>Students</Divider>
          <Segment>
            Students
          </Segment>
        </Segment>
      </Container>
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
      product {
        id
        name
      }
      instructor {
        id
        name
      }
      room {
        id
        name
      }
    }
  }
`

export default compose(
  graphql(SessionQuery, {
    options: ({ params }) => {
      return {
        variables: {
          sessionId: params.sessionId
        }
      }
    }
  })
)(Student)
