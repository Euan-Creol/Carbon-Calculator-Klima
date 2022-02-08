import React, { Component } from 'react'
import { withRouter }       from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import PropTypes from 'prop-types'
import { styles }           from './styles.scss'

const landingAnchors = ['Home', 'Process', 'Benefits', 'Products', 'Projects', 'Trial', 'FAQ', 'Roadmap']

class Header extends Component {
  constructor() {
    super()
    this.state = {
      currentTab: 0
    }
  }

  handleChange = (event, newValue) => {
    this.setState({ currentTab: newValue })
    // this.updateURL(newValue)
  }

  updateURL(tab) {
    const { history } = this.props
    switch (tab) {
    case 0:
      history.push('')
      break
    case 1:
      history.push('/Process')
      break
    case 2:
      history.push('#Benefits')
      break
    case 3:
      history.push('#Products')
      break
    case 4:
      history.push('#projects')
      break
    case 5:
      history.push('#trial')
      break
    case 6:
      history.push('#faq')
      break
    case 7:
      history.push('#roadmap')
      break

    default:
      break
    }
  }

  render() {
    const { currentTab } = this.state


    return (
      <div className={styles}>
        <Tabs
          value={currentTab}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {landingAnchors.map((anchor) => {
            return (
              <Tab label={anchor} key={anchor} className="tab-names" />
            )
          })}
        </Tabs>
      </div>
    )
  }
}

Header.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
}
export default withRouter(Header)
