import React, { Component }         from 'react'
import PropTypes from 'prop-types'
import { withRouter }           from 'react-router-dom'
import { Button } from '@material-ui/core'
import { styles } from './styles.scss'

class StripeCheckoutButton extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {

  }

  handleStripe = async (event) => {
    event.preventDefault()
    const { stripe, address, plan } = this.props
    stripe.redirectToCheckout({
      items: [{
        plan,
        quantity: 1
      }],
      successUrl: 'https://beta.creol.io/#/success',
      cancelUrl: 'https://beta.creol.io/#/',
      clientReferenceId: address
    }).then((result) => {
      result.error.message()
    })
  }

  render() {
    const {
      buttonText, stripe, address, plan, inverted
    } = this.props
    let variantStyle = 'outlined'
    let isDisabled = true
    if (inverted) {
      variantStyle = 'contained'
      isDisabled = false
    }
    return (
      <div className={styles}>
        <Button variant={variantStyle} color="primary" plan={plan} address={address} stripe={stripe} onClick={this.handleStripe} disabled={isDisabled} className="stripe-btn">{buttonText}</Button>
      </div>)
  }
}
StripeCheckoutButton.propTypes = {
  stripe: PropTypes.shape({ redirectToCheckout: PropTypes.func.isRequired }).isRequired,
  address: PropTypes.string.isRequired,
  plan: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  inverted: PropTypes.bool.isRequired
}

export default withRouter(StripeCheckoutButton)
