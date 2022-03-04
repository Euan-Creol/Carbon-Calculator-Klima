import React          from 'react'
import ReactDOM       from 'react-dom'
import { Provider }   from 'react-redux'
import configureStore from 'core/store/configureStore'
import App            from 'containers/App'
import { HashRouter } from 'react-router-dom'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-168829221-2')
ReactGA.pageview(window.location.pathname + window.location.search)

const store = configureStore()
ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)
