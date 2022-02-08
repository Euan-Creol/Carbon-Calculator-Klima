import React, { Component } from 'react'
import { withRouter }       from 'react-router-dom'
import AppBarInverse               from 'components/AppBarInverse'
import Toolbar              from '@material-ui/core/Toolbar'
import { styles }           from './styles.scss'
import Web3Button from './components/Web3Button'

class Header extends Component {
  render() {
    return (
      <div className={styles}>
        <AppBarInverse>
          <Toolbar>
            <Web3Button />
          </Toolbar>
        </AppBarInverse>
      </div>
    )
  }
}

export default withRouter(Header)
