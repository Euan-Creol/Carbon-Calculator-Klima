import React, { Component }     from 'react'
import PropTypes                from 'prop-types'
import { withRouter }           from 'react-router-dom'
import { Paper, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import AccountGrid from './components/AccountGrid'
import { styles } from './styles.scss'

import staticSubscriptionData from '../../data/SubscriptionData/SubInfo.json'
import SubscriptionCard from '../../components/SubscriptionCard'
import CreolFooter from '../../components/CreolFooter'

class AccountView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      isSubscribed: false,
      subscriptionTier: null
    }
  }
  componentDidMount() {
    const ghostArtifact = document.querySelector('.landing-header')
    if (ghostArtifact !== null) {
      ghostArtifact.parentNode.removeChild(ghostArtifact)
    }
    const { drizzle, drizzleState } = this.props
    // eslint-disable-next-line react/prop-types
    drizzle.contracts.CreolSubscription.methods.isSubscribed(
      drizzleState.accounts[0]).call().then((isSubscribedResponse) => {
      if (isSubscribedResponse === true) {
        // eslint-disable-next-line react/prop-types
        drizzle.contracts.CreolSubscription.methods.subscriptionInfo(
          drizzleState.accounts[0]).call().then((subInfo) => {
          this.setState({
            address: drizzleState.accounts[0],
            isSubscribed: isSubscribedResponse,
            subscriptionTier: subInfo.tier
          })
        })
      } else {
        this.setState({
          address: drizzleState.accounts[0]
        })
      }
    }).catch((error) => {
      console.error(error)
    })
  }


  // eslint-disable-next-line class-methods-use-this
  getButtonText(subscription, isSubscribed, subscriptionTier) {
    if (isSubscribed) {
      const subID = parseInt(subscription.tierID, 10)
      const tierIDInt = parseInt(subscriptionTier, 10)
      if (subID === tierIDInt) {
        return 'Your Subscription'
      } else if (subID > tierIDInt) {
        return 'Upgrade Your Subscription'
      } else if (subID < tierIDInt) {
        return 'Downgrade Your Subscription'
      }

      return 'Subscribe'
    }

    return 'Subscribe'
  }

  // eslint-disable-next-line class-methods-use-this
  formatSubscriptionData(subData) {
    const subArray = []
    let x
    // eslint-disable-next-line no-restricted-syntax
    for (x in subData.subscriptions) {
      if (Object.prototype.hasOwnProperty.call(subData.subscriptions, x)) {
        subArray.push(subData.subscriptions[x])
      }
    }
    return subArray
  }

  render() {
    const { address, isSubscribed, subscriptionTier } = this.state
    const { stripe } = this.props
    const subscriptions = this.formatSubscriptionData(staticSubscriptionData)
    return (
      <div className={styles}>
        <div className="account-view">
          <Paper className="account-paper">
            <Grid container direction="column" justify="center" alignContent="center" spacing={0}>
              <Grid item xs className="top-item">
                <AccountGrid address={address} headerText="Account" />
              </Grid>
              <Grid item xs>
                <Typography color="primary" align="center" gutterBottom variant="body2">
                  <span className="spans">Manage and Update your subscription type below</span>
                </Typography>
              </Grid>
              <Grid item xs className="subscription-item">
                <Grid container direction="row" justify="center" alignContent="center" spacing={2}>
                  {subscriptions.map((subscription, index) => {
                    const buttonText = this
                      .getButtonText(subscription, isSubscribed, subscriptionTier)
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <Grid item xs={12} md={4} key={index}>
                        <SubscriptionCard
                          subscription={subscription}
                          stripe={stripe}
                          address={address}
                          buttonText={buttonText}
                        />
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
        <CreolFooter />
      </div>
    )
  }
}
AccountView.propTypes = {
  drizzle: PropTypes.shape({}).isRequired,
  drizzleState: PropTypes.shape({ accounts: PropTypes.shape({}) }).isRequired,
  stripe: PropTypes.shape({}).isRequired
}

export default withRouter(AccountView)
