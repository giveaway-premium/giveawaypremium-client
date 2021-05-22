import createReducer from '../lib/reducerConfig'
import { KEY_PAGE } from '../lib/constants'
import initState from '../lib/initState'

export const internetRedux = createReducer(initState.internet, {
  [KEY_PAGE.SET_INTERNET] (state, action) {
    return action.payload
  }
})

export const network = createReducer(initState.network, {
  [KEY_PAGE.SET_NETWORK] (state, action) {
    return action.payload
  }
})

export const tokens = createReducer(initState.tokens, {
  [KEY_PAGE.SET_TOKENS_HOLDING] (state, action) {
    return action.payload
  }
})

