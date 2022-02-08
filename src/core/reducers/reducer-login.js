import constants from 'core/types'

const initialState = {
  authentication: false,
  subscription: false
}

export function loginReducer(state = initialState, action) {
  switch (action.type) {
  case constants.SET_AUTHENTICATION:
    return Object.assign({}, state, {
      authentication: action.authentication
    })
  case constants.SET_SUBSCRIPTION:
    return Object.assign({}, state, {
      subscription: action.subscription
    })
  case constants.CLEAR_SUBSCRIPTION:
    return initialState
  case constants.CLEAR_AUTHENTICATION:
    return initialState
  default:
    return state
  }
}
