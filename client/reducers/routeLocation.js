import { LOCATION_CHANGE } from 'react-router-redux'

const defaultState = {
  pathname: '',
  search: '',
  hash: '',
  action: '',
  key: '',
  query: {}
}

export default function location (state = defaultState, {type, payload}) {
  switch (type) {
    case LOCATION_CHANGE:
      return payload
    default:
      return state
  }
}
