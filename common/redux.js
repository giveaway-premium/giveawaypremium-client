
import storeRedux from 'controller/Redux/store/configureStore'
import PageReduxAction from 'controller/Redux/actions/pageActions'
import StorageActions from 'controller/Redux/actions/storageActions'
import { showNotification, getCurrentBrowserLanguage } from './function'
import GapService from 'controller/Api/Services/Gap'

const window = require('global/window')

export default class ReduxServices {
  static async callDispatchAction (action) {
    storeRedux.dispatch(action)
  }

  static async refreshInternet (isConnect, isChange) {
    const { locale } = storeRedux.getState()
    const { messages } = locale

    if (isConnect) {
      isChange && showNotification(messages.warnInternerOnline)
    } else {
      showNotification(messages.warnInternerOffline)
    }

    ReduxServices.callDispatchAction(PageReduxAction.setInternet(isConnect))
  }

  static detectBrowserLanguage () {
    const lang = window.pantographLanguage || getCurrentBrowserLanguage()
    ReduxServices.callDispatchAction(StorageActions.setLocale(lang))
  }

  static getCurrentLang () {
    const { locale } = storeRedux.getState()
    return locale.lang || 'en'
  }

  static getLocale () {
    const { locale } = storeRedux.getState()
    return locale || {}
  }

  static getCurrentNetwork () {
    const { network } = storeRedux.getState()
    return network || 1
  }

  static checkIsSigned () {
    const { userData } = storeRedux.getState()

    if (userData && userData.token) {
      return true
    }

    return false
  }

  static setTransferData (transferData) {
    ReduxServices.callDispatchAction(StorageActions.setTransferData({ ...transferData }))
  }

  static loginWalletConnect (tokenJWT, chainId, callback = null, callbackErr = null) {

  }

  static changePositionBackGround () {
    (function () {
      // Add event listener
      document.addEventListener('mousemove', parallax)
      const elem = document.querySelector('#parallax')
      // Magic happens here
      function parallax (e) {
        // let _w = window.innerWidth / 2
        // let _h = window.innerHeight / 2
        // let _mouseX = e.clientX
        // let _mouseY = e.clientY
        let _depth1 = `50%  50%`
        let _depth2 = `50%  50%`
        let _depth3 = `50%  50%`
        let x = `${_depth3}, ${_depth2}, ${_depth1}`
        // console.log(x)
        elem.style.backgroundPosition = x
      }
    })()
  }

  static getAuthKeyBearer () {
    const { userData } = storeRedux.getState()
    if (userData && userData.token) {
      return userData.token
    } else {
      return ''
    }
  }

  static setUserToken (result) {
    const { userData } = storeRedux.getState()

    if (result && result.sessionToken) {
      ReduxServices.callDispatchAction(StorageActions.setUserData({ ...userData, token: result.sessionToken, name: result.fullName, objectId: result.objectId }))
    }
  }

  static deleteUserToken () {
    ReduxServices.callDispatchAction(StorageActions.setUserData({}))
  }

  static async getCategory () {
    const res = await GapService.getCategory()

    console.log('getCategory')
    console.log(res)

    if (res && res.results) {
      ReduxServices.callDispatchAction(StorageActions.setCategory(res.results))
    }
  }

  static async getCategoryNhanh () {
    const res = await GapService.getCategoryNhanh()

    console.log('getCategoryNhanh')
    console.log(res)

    if (res && res.results) {
      ReduxServices.callDispatchAction(StorageActions.setCategory(res.results))
    }
  }

  static async detectConnection (baseUrl) {
    // const { walletConnect } = storeRedux.getState()
  }

  static getConnection (chainId) {
  }

  static updateConnection (data) {
  }

  static removeConnection (chainId) {
  }

  //
  static async refreshTokensHolding () {
  }

  static async getGasPrice () {

  }

  static async getGasCurrent () {
  }

  static async getETHTokensHolding (address) {

  }
}
