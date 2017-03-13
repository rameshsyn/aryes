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
  Container,
  Label
} from 'semantic-ui-react'

class Student extends Component {
  constructor (props) {
    super(props)
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
        <br />
        <Segment color='green' size='massive'>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header as='h1' textAlign='center'>{this.props.data.session[0].name}</Header>
              </Grid.Column>
              <Grid.Column>
                <Button color='green' floated='right'>Add Student</Button>
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
