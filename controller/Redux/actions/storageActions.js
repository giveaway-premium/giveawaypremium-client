import { KEY_STORE } from 'common/constants'
import { saveDataLocal } from 'common/function'

export default class StorageActions {
  static setLocale (payload) {
    saveDataLocal(KEY_STORE.SET_LOCALE, payload)
    return {
      type: KEY_STORE.SET_LOCALE,
      payload
    }
  }

  static setCategory (payload) {
    saveDataLocal(KEY_STORE.SET_CATEGORY, payload)
    return {
      type: KEY_STORE.SET_CATEGORY,
      payload
    }
  }

  static setUserData (payload) {
    saveDataLocal(KEY_STORE.SET_USER, payload)
    return {
      type: KEY_STORE.SET_USER,
      payload
    }
  }

  static setIPHASH (payload) {
    saveDataLocal(KEY_STORE.SET_IP_HASH, payload)
    return {
      type: KEY_STORE.SET_IP_HASH,
      payload
    }
  }

  static setChannelMonitor (payload) {
    saveDataLocal(KEY_STORE.SET_CHANNEL_MONITOR, payload)
    return {
      type: KEY_STORE.SET_CHANNEL_MONITOR,
      payload
    }
  }

  static setSetting (payload) {
    saveDataLocal(KEY_STORE.SET_SETTING, payload)
    return {
      type: KEY_STORE.SET_SETTING,
      payload
    }
  }

  static setTransferData (payload) {
    saveDataLocal(KEY_STORE.SET_TRANSFER_DATA, payload)
    return {
      type: KEY_STORE.SET_TRANSFER_DATA,
      payload
    }
  }

  static setWalletConnect (payload) {
    saveDataLocal(KEY_STORE.SET_WALLET_CONNECT, payload)
    return {
      type: KEY_STORE.SET_WALLET_CONNECT,
      payload
    }
  }

  static setGasPrice (payload) {
    saveDataLocal(KEY_STORE.SET_GAS_PRICE, payload)
    return {
      type: KEY_STORE.SET_GAS_PRICE,
      payload
    }
  }

  static setGasCurrent (payload) {
    saveDataLocal(KEY_STORE.SET_GAS_CURRENT, payload)
    return {
      type: KEY_STORE.SET_GAS_CURRENT,
      payload
    }
  }
}
