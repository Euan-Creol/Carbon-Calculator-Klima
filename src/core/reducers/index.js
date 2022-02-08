import { combineReducers } from 'redux'
import { providerReducer } from 'core/reducers/reducer-provider'
import uiReducer           from 'core/reducers/reducer-ui'
import { loginReducer }    from 'core/reducers/reducer-login'


const rootReducer = combineReducers({
  provider: providerReducer,
  ui: uiReducer,
  authentication: loginReducer
})

export default rootReducer
