import constants from 'core/types'
import Web3      from 'web3'


function dispatchProvider(dispatch, provider) {
  // const { ethereum } = window
  const web3Provider = new Web3(provider)

  dispatch((() => {
    return {
      type: constants.SET_PROVIDER,
      web3Provider
    }
  })())
}

function dispatchDrizzle(dispatch, drizzle) {
  dispatch((() => {
    return {
      type: constants.SET_DRIZZLE,
      drizzle
    }
  })())
}

export function setProvider(provider) {
  return (dispatch) => {
    if (window.ethereum) {
      dispatchProvider(dispatch, provider)
    } else {
      setInterval(() => {
        if (window.ethereum) {
          clearInterval()
          dispatchProvider()
        }
        if (window.document.hidden) { window.location.reload() }
      }, 500)
    }
  }
}
export function clearWeb3() {
  return {
    type: constants.CLEAR_WEB3
  }
}

export function setProviderModal(provider) {
  return (dispatch) => {
    dispatchProvider(dispatch, provider)
  }
}

export function setDrizzle(drizzle) {
  return (dispatch) => {
    dispatchDrizzle(dispatch, drizzle)
  }
}
