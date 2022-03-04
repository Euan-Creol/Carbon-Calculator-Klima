import React, { Component }       from 'react'
import PropTypes                  from 'prop-types'
import { connect }                from 'react-redux'
import { bindActionCreators }     from 'redux' // global styles
import { createTheme } from       '@material-ui/core/styles'
import autoBind                   from 'auto-bind'
import {
  Redirect,
  Switch,
  withRouter
}                                  from 'react-router-dom'
import * as providerActionCreators from 'core/actions/actions-provider'
import theme                       from 'configs/theme/config-theme'
import QuestionnaireView           from 'containers/QuestionnaireView'

import './styles.scss'
import LandingLayoutRoute from './layouts/LandingLayoutRoute'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <createTheme theme={theme}>
        <div>
          <div className="app-shell">
            <Switch>
              <LandingLayoutRoute path="/" component={QuestionnaireView} />
              <Redirect from="/" to="/home" />
            </Switch>
          </div>
        </div>
      </createTheme>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
    }
  }
}
App.propTypes = {
}
App.defaultProps = {
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
