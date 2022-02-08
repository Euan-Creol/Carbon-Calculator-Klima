import constants from 'core/types'

const initialState = {
  web3Provider: null,
  drizzle: null,
  drizzleState: null,
  drizzleInitialized: null
}

export function providerReducer(state = initialState, action) {
  switch (action.type) {
  case constants.SET_PROVIDER:
    return Object.assign({}, state, {
      web3Provider: action.web3Provider
    })
  case constants.SET_DRIZZLE:
    return Object.assign({}, state, {
      drizzle: action.drizzle
    })
  case constants.CLEAR_WEB3:
    return initialState
  default:
    return state
  }
}
