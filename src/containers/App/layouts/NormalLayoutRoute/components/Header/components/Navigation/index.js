import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { withRouter }       from 'react-router-dom'
import Paper                from '@material-ui/core/Paper'
import { Tabs, Tab }        from '@material-ui/core'
import HomeIcon        from '@material-ui/icons/Home'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ToysIcon from '@material-ui/icons/Toys'
import { styles }           from './styles.scss'

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: 0
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { location } = nextProps
    let currentTab

    switch (location.pathname) {
    case '/home':
      currentTab = 0
      break
    case '/account':
      currentTab = 1
      break
    case '/carbon':
      currentTab = 2
      break
    default:
      currentTab = 0
      break
    }

    return { currentTab }
  }

  handleChange=(evt, tab) => {
    this.setState({ currentTab: tab })
    this.updateURL(tab)
  }

  updateURL(tab) {
    const { history } = this.props

    switch (tab) {
    case 0:
      history.push('/home')
      break
    case 1:
      history.push('/account')
      break
    case 2:
      history.push('/carbon')
      break
    default:
      break
    }
  }

  render() {
    const { currentTab } = this.state

    return (
      <div className={styles}>
        <Paper>
          <Tabs
            className="main-navigation"
            value={currentTab}
            onChange={this.handleChange}
            indicatorColor="primary"
            variant="fullWidth"
            centered
          >
            <Tab
              icon={<HomeIcon />}
              label="Home"
              className="tab"
            />
            <Tab
              icon={<AccountBoxIcon />}
              label="Account"
              className="tab"
            />
            <Tab
              icon={<ToysIcon />}
              label="Your Carbon"
              className="tab"
            />
          </Tabs>
        </Paper>
      </div>
    )
  }
}

Navigation.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
}

export default withRouter(Navigation)
