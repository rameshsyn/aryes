import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import gql from 'graphql-tag'
import {
  Grid,
  Button,
  Divider,
  Table,
  Container,
  Header,
  Dimmer,
  Loader
} from 'semantic-ui-react'

class Student extends Component {
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
              Student
            </Header>
          </Container>
        </Grid.Row>
        <Divider />
        <Grid.Row>
          <Container>
            <Button floated='right' onClick={() => this.props.push('/management/student/new')}>New Student</Button>
          </Container>
        </Grid.Row>
        <Divider />
        <Grid.Row>
          <Table selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Address</Table.HeaderCell>
                <Table.HeaderCell>Level</Table.HeaderCell>
                <Table.HeaderCell>Phone</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                this.props.data.student.map((s, i) => {
                  return (
                    <Table.Row key={i}>
                      <Table.Cell onClick={() => this.props.push(`/student/${s.id}`)}>
                        <b
                          style={{
                            cursor: 'pointer',
                            textDecoration: 'underline'
                          }}
                          title='view profile'
                        >{s.basic_info.name}</b>
                      </Table.Cell>
                      <Table.Cell>{s.basic_info.address}</Table.Cell>
                      <Table.Cell>{s.basic_info.academic_level}</Table.Cell>
                      <Table.Cell>{s.contact_info.phone}</Table.Cell>
                      <Table.Cell>{s.contact_info.email}</Table.Cell>
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

const StudentQuery = gql`
  query getStudents {
    student {
      id 
      basic_info {
        name
        address
        academic_level
      }
      contact_info {
        phone
        email
      }
    }
    product {
      id
      name
    }
    session {
      id
      name
    }
    offer {
      id
      code
    }
  }
`
const mapDipatchToProps = (dispatch) => bindActionCreators(routerActions, dispatch)

const StudentWithDate = graphql(StudentQuery)(Student)

export default connect(null, mapDipatchToProps)(StudentWithDate)
