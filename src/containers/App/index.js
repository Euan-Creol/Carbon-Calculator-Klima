import React, { Component }       from 'react'
import { connect }                from 'react-redux'
import {
  Switch,
  withRouter
}                                 from 'react-router-dom'
import theme                      from 'configs/theme/config-theme'
import QuestionnaireView          from 'containers/QuestionnaireView'
import OfficeQuestionnaireView    from 'containers/OfficeQuestionnaireView'

import './styles.scss'
import LandingLayoutRoute         from './layouts/LandingLayoutRoute'

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
              <LandingLayoutRoute path="/office" component={OfficeQuestionnaireView} />
            </Switch>
          </div>
        </div>
      </createTheme>
    )
  }
}

function mapStateToProps() {
  return {
  }
}
function mapDispatchToProps() {
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
