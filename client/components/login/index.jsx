import React from 'react'
import {
  Button,
  Form,
  Container,
  Divider,
  Segment
} from 'semantic-ui-react'

const Login = () => (
  <Container>
    <Segment>
      <h1 style={{textAlign: 'center'}}>Log in</h1>
      <Divider />
      <Form method='post' action='/login'>
        <Form.Field>
          <label>Email</label>
          <input type='text' name='email' placeholder='Email' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type='password' name='password' placeholder='Password' />
        </Form.Field>
        <Button type='submit'>Log in</Button>
      </Form>
    </Segment>
  </Container>
)

export default Login
