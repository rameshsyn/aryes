import React from 'react'
import {
  Button,
  Icon,
  Container
} from 'semantic-ui-react'

const Setting = ({children}) => {
  const mainMenus = (
    <div>
      <Button color='green'>
        <Icon name='user' size='huge' />
        <b>Admin</b>
      </Button>
      <Button color='pink'>
        <Icon name='home' size='huge' />
        <b>Institution</b>
      </Button>
    </div>
  )
  return (
    <Container>
      {children ? children : mainMenus}
    </Container>
  )
}

export default Setting
