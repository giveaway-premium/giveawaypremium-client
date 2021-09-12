import createReducer from '../lib/reducerConfig'
import MessageVI from 'static/Assets/Lang/ja.json'
import MessageEN from 'static/Assets/Lang/en.json'
import MessageCN from 'static/Assets/Lang/cn.json'
import { KEY_STORE } from 'common/constants'
import initState from '../lib/initState'
const localeJA = {
  lang: 'ja',
  messages: MessageVI
}

const localeEN = {
  lang: 'en',
  messages: MessageEN
}

const localeCN = {
  lang: 'cn',
  messages: MessageCN
}

export const locale = createReducer(localeEN, {
  [KEY_STORE.SET_LOCALE] (state, action) {
    switch (action.payload) {
    case 'en':
      return localeEN
    case 'ja':
      return localeJA
    case 'cn':
      return localeCN
    default:
      return localeEN
    }
  }
})

export const userData = createReducer(initState.userData, {
  [KEY_STORE.SET_USER] (state, action) {
    return action.payload
  }
})

export const settingRedux = createReducer(initState.setting, {
  [KEY_STORE.SET_SETTING] (state, action) {
    return action.payload
  }
})

export const transferDataRedux = createReducer(initState.transferData, {
  [KEY_STORE.SET_TRANSFER_DATA] (state, action) {
    return action.payload
  }
})

export const categoryRedux = createReducer(initState.category, {
  [KEY_STORE.SET_CATEGORY] (state, action) {
    return action.payload
  }
})
