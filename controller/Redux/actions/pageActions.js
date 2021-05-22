import { KEY_PAGE } from '../lib/constants'

export default class PageReduxAction {
  static setInternet (payload) {
    return {
      type: KEY_PAGE.SET_INTERNET,
      payload
    }
  }

  static setNetwork (payload) {
    return {
      type: KEY_PAGE.SET_NETWORK,
      payload
    }
  }

  static setTokensHolding (payload) {
    return {
      type: KEY_PAGE.SET_TOKENS_HOLDING,
      payload
    }
  }
}
