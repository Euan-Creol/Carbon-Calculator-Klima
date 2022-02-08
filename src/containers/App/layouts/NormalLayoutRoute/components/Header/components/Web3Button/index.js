import React, { Component }                from 'react'
import PropTypes                           from 'prop-types'
import { connect }                         from 'react-redux'
import { bindActionCreators }              from 'redux'
import { withRouter }                      from 'react-router-dom'
import * as loginActionCreators            from 'core/actions/actions-login'
import * as providerActionCreators         from 'core/actions/actions-provider'
import { resolveLogout, resolveWeb3Modal } from 'containers/App/index'
import { Button }                          from '@material-ui/core'
import { styles }                          from './styles.scss'

class Web3Button extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false
    }
  }


  static getDerivedStateFromProps(nextProps) {
    const { authentication } = nextProps
    return {
      loggedIn: authentication.authentication
    }
  }

  handleClick=() => {
    const { loggedIn } = this.state
    const { history } = this.props
    if (!loggedIn) {
      resolveWeb3Modal(this.props, 'none').then(() => {
      })
    } else if (loggedIn) {
      resolveLogout(this.props)
      // TODO: Route to logout page when it's built
      history.push('/home')
    }
  }

  render() {
    const { loggedIn } = this.state
    let buttonText = 'Login'
    let variantButton = 'outlined'
    if (loggedIn) {
      buttonText = 'Logout'
      variantButton = 'contained'
    }
    return (
      <div className={styles}>
        <Button variant={variantButton} color="primary" className="button" onClick={this.handleClick}>{buttonText}</Button>
      </div>
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
      authentication: bindActionCreators(loginActionCreators, dispatch),
      provider: bindActionCreators(providerActionCreators, dispatch)
    }
  }
}
Web3Button.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  actions: PropTypes.shape({}).isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Web3Button))
