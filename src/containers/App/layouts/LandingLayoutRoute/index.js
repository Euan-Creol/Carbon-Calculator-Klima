import React             from 'react'
import PropTypes         from 'prop-types'
import { Route }         from 'react-router-dom'
import { styles }        from './styles.scss'

const LandingLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      component={matchProps => (
        <div className={styles}>
          <div className="main-content normal-layout">
            <Component {...rest} {...matchProps} />
          </div>
        </div>
      )}
    />
  )
}

LandingLayoutRoute.propTypes = {
  component: PropTypes.func.isRequired
}

export default LandingLayoutRoute
