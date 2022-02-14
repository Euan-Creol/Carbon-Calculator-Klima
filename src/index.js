import React          from 'react'
import ReactDOM       from 'react-dom'
import { Provider }   from 'react-redux'
import configureStore from 'core/store/configureStore'
import App            from 'containers/App'
import { HashRouter } from 'react-router-dom'
import ReactGA from 'react-ga'
import stripePubKey from './configs/config-stripe'

ReactGA.initialize('UA-168829221-2')
ReactGA.pageview(window.location.pathname + window.location.search)

const store = configureStore()
  ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
          <App/>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
  )
  console.error('Live Keys Failed, falling back to test site, no real transactions can occur')
  console.error(err)
      ReactDOM.render(
        <Provider store={store}>
                <HashRouter>
                  <App />
                </HashRouter>
        </Provider>,
        document.getElementById('root')
      )
