import React, { Component }       from 'react'
import PropTypes                  from 'prop-types'
import { connect }                from 'react-redux'
import { bindActionCreators }     from 'redux' // global styles
import { MuiThemeProvider }       from '@material-ui/core/styles'
import autoBind                   from 'auto-bind'
import {
  Redirect,
  Switch,
  withRouter
}                                  from 'react-router-dom'
import * as providerActionCreators from 'core/actions/actions-provider'
import theme                       from 'configs/theme/config-theme'
import QuestionnaireView           from 'containers/QuestionnaireView'
import Web3Modal                   from 'web3modal'
import Web3                        from 'web3'
import providerOptions             from 'configs/web3modal-config'
import { Drizzle }                 from '@drizzle/store'
import drizzleOptions              from 'configs/config-drizzle'
import NormalLayoutRoute           from './layouts/NormalLayoutRoute'
import LoadingContainer            from '../../components/LoadingContainer'

import './styles.scss'
import LandingLayoutRoute from './layouts/LandingLayoutRoute'


const web3Modal = new Web3Modal({
  cacheProvider: true,
  disableInjectedProvider: false,
  providerOptions
})

const PrivateNormalRoute = React.memo((props) => {
  const {
    isAuthenticated, drizzle, drizzleState, drizzleInitialized, location
  } = props
  let authContainer
  if (isAuthenticated && !drizzleInitialized) {
    authContainer = (<LoadingContainer
      drizzle={drizzle}
      drizzleState={drizzleState}
      web3={drizzle.web3}
      initialized={drizzleInitialized}
    />)
  } else if (isAuthenticated && drizzleInitialized) {
    authContainer = <NormalLayoutRoute {...props} drizzle={drizzle} drizzleState={drizzleState} />
  } else {
    authContainer = (<Redirect
      from={location.toString()}
      to="/login"
    />)
  }
  return authContainer
})

PrivateNormalRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  drizzle: PropTypes.shape({ web3: PropTypes.shape({}) }),
  drizzleState: PropTypes.shape({}),
  drizzleInitialized: PropTypes.bool.isRequired,
  location: PropTypes.shape({})
}

PrivateNormalRoute.defaultProps = {
  drizzle: {},
  drizzleState: {},
  location: {}
}
export async function resolveWeb3Modal(props, specifiedProvider) {
  const { actions, location } = props
  let providerCheck = specifiedProvider
  if (web3Modal.cachedProvider) {
    providerCheck = 'cached'
  }
  let redirectContainer = <div>Success</div>
  switch (providerCheck) {
  case 'none':
    web3Modal.clearCachedProvider()
    web3Modal.connect().then((provider) => {
      setDrizzleRedux(props, provider)
    }).catch((error) => {
      console.error(error)
    })
    break
  case 'cached':
    web3Modal.connectTo(web3Modal.cachedProvider).then((provider) => {
      setDrizzleRedux(props, provider)
      console.log('used cached provider')
    }).catch((error) => {
      console.error(error)
    })
    break
  case 'google':
    web3Modal.clearCachedProvider()
    web3Modal.connectTo('torus').then((provider) => {

      setDrizzleRedux(props, provider)
    }).catch((error) => {
      console.error(error)
    })
    break
  case 'email':
    web3Modal.clearCachedProvider()
    web3Modal.connectTo('portis').then((provider) => {
      setDrizzleRedux(props, provider)
    }).catch((error) => {
      console.error(error)
    })
    break
  case 'phone':
    web3Modal.clearCachedProvider()
    web3Modal.connectTo('fortmatic').then((provider) => {
      setDrizzleRedux(props, provider)
    }).catch((error) => {
      console.error(error)
    })
    break
  default:
    redirectContainer = <div>Failed</div>
    break
  }
  return redirectContainer
}
export async function setDrizzleRedux(props, provider) {
  const { actions } = props
  actions.provider.setProviderModal(provider)
  // Initialize Drizzle Here Now that we have a provider
  const newDrizzleOptions = drizzleOptions
  newDrizzleOptions.web3.customProvider = new Web3(provider)
  const drizzle = new Drizzle(newDrizzleOptions)
  actions.provider.setDrizzle(drizzle)
  actions.authentication.setAuth(true)
}

export function resolveLogout(props) {
  const { actions } = props
  web3Modal.clearCachedProvider()
  actions.provider.clearWeb3()
  actions.authentication.clearAuth()
}
/*
export function NFTResolve(props) {
  const nft = parseInt(props.computedMatch.params.id, 10)
  const { drizzle, drizzleState } = props

  return (
    <NFTView drizzle={drizzle} drizzleState={drizzleState} id={nft} />

  )
}
NFTResolve.propTypes = {
  drizzle: PropTypes.shape({}),
  drizzleState: PropTypes.shape({}),
  computedMatch: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) })
}
NFTResolve.defaultProps = {
  drizzle: {},
  drizzleState: {},
  computedMatch: {}
}*/

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
      drizzle: null,
      drizzleState: null,
      drizzleInitialized: false,
      loggingIn: false
    }
    autoBind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { history } = nextProps
    if (nextState.loggingIn) {
      if (nextState.isAuthenticated && nextState.drizzle !== null && !nextState.drizzleInitialized) {
        this.unsubscribe = nextState.drizzle.store.subscribe(() => {
          const drizzleState = nextState.drizzle.store.getState()
          if (drizzleState.drizzleStatus.initialized) {
            console.log('drizzle initialized...')
            this.setState({
              drizzleState,
              drizzleInitialized: true,
              loggingIn: false
            }, () => {
              // Disable the redirect to account for now
              if (history.location.pathname !== '/checkout') {
                history.push('/carbon')
              }
              return true
            })
          }
        })
      }
      return false
    }
    if (nextState.isAuthenticated && nextState.drizzle !== null && nextState.drizzleInitialized) {
      this.unsubscribe()
    }
    return true
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    const { authentication, provider } = nextProps
    const { loggingIn, isAuthenticated } = nextState
    if (provider.web3Provider !== null && !loggingIn && !isAuthenticated) {
      return {
        loggingIn: true,
        isAuthenticated: authentication.authentication,
        drizzle: provider.drizzle
      }
    }
    if (loggingIn) {
      return {
        isAuthenticated: authentication.authentication,
        drizzle: provider.drizzle
      }
    }
    if (provider.web3Provider === null && isAuthenticated) {
      return {
        loggingIn: false,
        isAuthenticated: false,
        drizzle: null,
        drizzleState: null,
        drizzleInitialized: false
      }
    }
    return {
      loggingIn: false,
      isAuthenticated: authentication.authentication,
      drizzle: provider.drizzle
    }
  }

  render() {
    const {
      isAuthenticated, drizzle, drizzleState, drizzleInitialized
    } = this.state
    const { stripe } = this.props
    if (stripe === null) {
      // TODO: Swap Out With Proper Loading Screen
      return <div>Loading...</div>
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <div className="app-shell">
            <Switch>
              <LandingLayoutRoute path="/" component={QuestionnaireView} />
              <Redirect from="/" to="/home" />
            </Switch>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    authentication: state.authentication,
    provider: state.provider
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      provider: bindActionCreators(providerActionCreators, dispatch)
    }
  }
}
App.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}),
  drizzle: PropTypes.shape({ web3: PropTypes.shape({}) }),
  drizzleState: PropTypes.shape({}),
  computedMatch: PropTypes.shape({}),
  stripe: PropTypes.shape({})
}
App.defaultProps = {
  drizzle: {},
  drizzleState: {},
  history: {},
  stripe: null,
  computedMatch: null
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
