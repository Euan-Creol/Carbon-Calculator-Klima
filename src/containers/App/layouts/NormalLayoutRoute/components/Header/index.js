import React, { Component } from 'react'
import { withRouter }       from 'react-router-dom'
import Toolbar              from '@material-ui/core/Toolbar'

import { styles }           from './styles.scss'
import Web3Button           from './components/Web3Button'

class Header extends Component {
  render() {
    return (
      <div className={styles}>
        <Toolbar>
          <Web3Button />
        </Toolbar>
      </div>
    )
  }
}

export default withRouter(Header)
