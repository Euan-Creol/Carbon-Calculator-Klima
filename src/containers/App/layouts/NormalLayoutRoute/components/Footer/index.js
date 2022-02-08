import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { withRouter }       from 'react-router-dom'
import BottomNavigation     from 'components/BottomNavigation'
import Grid                 from '@material-ui/core/Grid'
import OpenIconSpeedDial    from './components/OpenIconSpeedDialMenu'
import { styles }           from './styles.scss'

class Footer extends Component {
  onClick = () => {
    const { history } = this.props
    history.push('/login')
  }

  render() {
    const { history } = this.props

    return (
      <div className={styles}>
        <BottomNavigation>
          <Grid container className="second-btn" alignContent="center" justify="center" direction="row">
            <OpenIconSpeedDial color="primary" className="second-btn" history={history} />
          </Grid>
        </BottomNavigation>

      </div>
    )
  }
}

Footer.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
}

export default withRouter(Footer)
