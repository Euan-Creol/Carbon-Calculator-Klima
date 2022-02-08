import constants from 'core/types'


export function setAuth(authentication) {
  return {
    type: constants.SET_AUTHENTICATION,
    authentication
  }
}

export function setSubscription(subscription) {
  return {
    type: constants.SET_SUBSCRIPTION,
    subscription
  }
}
export function clearSubscription() {
  return {
    type: constants.CLEAR_SUBSCRIPTION
  }
}
export function clearAuth() {
  return {
    type: constants.CLEAR_AUTHENTICATION
  }
}
