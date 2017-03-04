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
          <Loader />
        </Dimmer>
      )
    }
    const { basic_info, contact_info, enrollment_info } = this.props.data.student[0]
    return (
      <Container>
        <br />
        <Segment color='green' size='massive'>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header as='h1' textAlign='center'>{basic_info.name}</Header>
              </Grid.Column>
              <Grid.Column>
                <Button floated='right'>Generate Bill</Button>
                <Button color='green' floated='right'>Pay</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider horizontal section>
            <Header as='h4'>Basic Information</Header>
          </Divider>
          <Segment color='pink'>
            <Grid>
              <Grid.Row columns={4}>
                <Grid.Column width={4}>
                  <b>Name: </b>
                  {basic_info.name}
                </Grid.Column>
                <Grid.Column width={2}>
                  <b>Level: </b>
                  {basic_info.academic_level}
                </Grid.Column>
                <Grid.Column width={4}>
                  <b>Address: </b>
                  {basic_info.address}
                </Grid.Column>
                <Grid.Column width={6}>
                  <b>School Name: </b>
                  {basic_info.school}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Divider horizontal section>
            <Header as='h4'>Contact Information</Header>
          </Divider>
          <Segment color='olive'>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <b>Phone: </b>
                  {contact_info.phone}
                </Grid.Column>
                <Grid.Column>
                  <b>Email: </b>
                  {contact_info.email}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Divider horizontal section>
            <Header as='h4'>Enrollment Information</Header>
          </Divider>
          <Segment color='teal'>
            <Grid>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <b>Date: </b>
                  {enrollment_info.date}
                </Grid.Column>
                <Grid.Column>
                  <b>Subscriptions: </b>
                  {enrollment_info.products.map(p => {
                    return <Label key={p.id}>{p.name}</Label>
                  })}
                </Grid.Column>
                <Grid.Column>
                  <b>Sessions: </b>
                  {enrollment_info.sessions.map(s => {
                    return <Label key={s.id}>{s.name}</Label>
                  })}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Divider horizontal section>
            <Header as='h4'>
              Payment Information
              <Header.Subheader>Installments</Header.Subheader>
            </Header>
          </Divider>
          <Segment color='orange'>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>SN</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                  <Table.HeaderCell>Amount</Table.HeaderCell>
                  <Table.HeaderCell>Products</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                  this.props.data.student[0].payment_info.installments.map((installment, i) => {
                    return (
                      <Table.Row key={i}>
                        <Table.Cell>{i + 1}</Table.Cell>
                        <Table.Cell>{installment.date}</Table.Cell>
                        <Table.Cell>{installment.amount}</Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                    )
                  })
                }
              </Table.Body>
            </Table>
          </Segment>
        </Segment>
      </Container>
    )
  }
}

const StudentQuery = gql`
  query getStudents($studentId: String) {
    student(id: $studentId) {
      id 
      basic_info {
        name
        address
        academic_level
        school
      }
      contact_info {
        phone
        email
      }
      enrollment_info {
        date 
        products {
          id
          name
        }
        sessions {
          id
          name
        }
      }
      payment_info {
        installments {
          date
          amount
        }
      }
    }
  }
`

export default compose(
  graphql(StudentQuery, {
    options: ({ params }) => {
      return {
        variables: {
          studentId: params.profileId
        }
      }
    }
  })
)(Student)
