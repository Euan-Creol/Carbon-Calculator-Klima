import React          from 'react'
import ReactDOM       from 'react-dom'
import { Provider }   from 'react-redux'
import configureStore from 'core/store/configureStore'
import App            from 'containers/App'
import { loadStripe } from '@stripe/stripe-js'
import { HashRouter } from 'react-router-dom'
import {
  Elements,
  ElementsConsumer
} from '@stripe/react-stripe-js'
import ReactGA from 'react-ga'
import stripePubKey from './configs/config-stripe'

ReactGA.initialize('UA-168829221-2')
ReactGA.pageview(window.location.pathname + window.location.search)

const store = configureStore()
loadStripe(stripePubKey.pubKeyTest).then((stripePromise) => {
  ReactDOM.render(
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ stripe }) => (
            <HashRouter>
              <App stripe={stripe} />
            </HashRouter>
          )}
        </ElementsConsumer>
      </Elements>
    </Provider>,
    document.getElementById('root')
  )
}).catch((err) => {
  console.error('Live Keys Failed, falling back to test site, no real transactions can occur')
  console.error(err)
  loadStripe(stripePubKey.pubKeyTest)
    .then((stripePromise) => {
      ReactDOM.render(
        <Provider store={store}>
          <Elements stripe={stripePromise}>
            <ElementsConsumer>
              {({ stripe }) => (
                <HashRouter>
                  <App stripe={stripe} />
                </HashRouter>
              )}
            </ElementsConsumer>
          </Elements>
        </Provider>,
        document.getElementById('root')
      )
    })
})
