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

  static setTempConsignment (payload) {
    saveDataLocal(KEY_STORE.SET_TEMP_CONSIGNMENT, payload)
    return {
      type: KEY_STORE.SET_TEMP_CONSIGNMENT,
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

  static setAddressInfoArray (payload) {
    saveDataLocal(KEY_STORE.SET_ADDRESS_INFO_ARRAY, payload)
    return {
      type: KEY_STORE.SET_ADDRESS_INFO_ARRAY,
      payload
    }
  }

  static setAddressInfoArrayAfterSort (payload) {
    saveDataLocal(KEY_STORE.SET_ADDRESS_INFO_ARRAY_AFFTER_SORT, payload)
    return {
      type: KEY_STORE.SET_ADDRESS_INFO_ARRAY_AFFTER_SORT,
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
