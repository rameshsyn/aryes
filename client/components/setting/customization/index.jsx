import React from 'react'
import {
  Container,
  Grid,
  Button,
  Modal,
  Form,
  Divider
} from 'semantic-ui-react'

const Customization = () => {
  return (
    <Grid>
      <Divider horizontal>Service Category</Divider>
      <Grid.Row>
        <Modal trigger={<Button>Add category</Button>}>
          <Modal.Header>Add New Service Category</Modal.Header>
          <Modal.Content>
            <Form size='small'>
              <Form.Input label='Category Name' type='text' />
              <Form.TextArea label='Description' />
              <Form.Button type='button' color='green' floated='right'>Add</Form.Button>
            </Form>
          </Modal.Content>
        </Modal>
      </Grid.Row>
      <Divider horizontal>Expenditure types</Divider>
      <Grid.Row>
        <Modal trigger={<Button>Add Expenditure type</Button>}>
          <Modal.Header>Add New Expenditure type</Modal.Header>
          <Modal.Content>
            <Form size='small'>
              <Form.Input label='Ex type Name' type='text' />
              <Form.TextArea label='Description' />
              <Form.Button type='button' color='green' floated='right'>Add</Form.Button>
            </Form>
          </Modal.Content>
        </Modal>
      </Grid.Row>
    </Grid>
  )
}

export default Customization
