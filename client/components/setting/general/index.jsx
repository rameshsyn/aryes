import React from 'react'
import {
  Form
} from 'semantic-ui-react'

const General = () => {
  return (
    <Form size='big'>
      <Form.Input label='Institution name' type='text' />
      <Form.Group widths='equal'>
        <Form.Input label='Phone' type='text' />
        <Form.Input label='Email' type='text' />
      </Form.Group>
      <Form.Input label='Location' type='text' />
      <Form.Button type='button' color='green'>Submit</Form.Button>
    </Form>
  )
}

export default General
