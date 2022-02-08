import React, { Component }         from 'react'
import PropTypes from 'prop-types'
import { withRouter }           from 'react-router-dom'
import { Button, Grid } from '@material-ui/core'
import autoBind from 'auto-bind'
import { styles } from './styles.scss'

class StripeOneOffButton extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    autoBind(this)
  }
  componentDidMount() {
    const { stripe } = this.props
  }

  handleStripe(stripe, itemPrice, itemQuantity) {
    stripe.redirectToCheckout({
      lineItems: [{
        price: itemPrice,
        quantity: itemQuantity
      }],
      mode: 'payment',
      successUrl: 'https://beta.creol.io/#/success',
      cancelUrl: 'https://beta.creol.io/#/'
    }).then((result) => {
      result.error.message()
    })
  }

  render() {
    const {
      Currency, TotalPrice, stripe, itemPrice,  itemQuantity
    } = this.props
    return (
      <div className={styles}>
        <Button
          variant="contained"
          color="primary"
          code={itemPrice}
          stripe={stripe}
          onClick={() => this.handleStripe(stripe, itemPrice, itemQuantity)}
          className="stripe-btn"
          quantity={itemQuantity}
        >
          <Grid container direction="row" justify="space-evenly" alignItems="center">
            <Grid item xs >
              <h2 style={{ padding: 0, margin: 0 }}>{Currency}{TotalPrice.toFixed(2)}</h2>
            </Grid>
            <Grid item xs>
              Proceed to Checkout
            </Grid>
          </Grid>
        </Button>
      </div>)
  }
}
StripeOneOffButton.propTypes = {
  stripe: PropTypes.shape({ redirectToCheckout: PropTypes.func.isRequired }).isRequired,
  itemPrice: PropTypes.string.isRequired
}

export default withRouter(StripeOneOffButton)
