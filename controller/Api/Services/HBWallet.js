
import { REQUEST_TYPE } from 'common/constants'
import ReduxService from 'common/redux'
import QueryString from 'query-string'

export default class HBWallet {
  static getTokensHolding (address) {
    return this.fetchData(`/tokens/${address}`, REQUEST_TYPE.GET)
  }

  static getAllTokenClients () {
    return this.fetchData(`/token-clients`, REQUEST_TYPE.GET)
  }

  static async fetchData (apiUrl, method, queryBody, postData, hostLink, authKey) {
    try {
      const key = authKey || await ReduxService.getAuthKeyBearer()
      const HOST = hostLink || process.env.API_HB_WALLET
      let params = {
        method: method || REQUEST_TYPE.GET,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': key !== '' ? key : ''
        }
      }

      if (postData) {
        params.body = JSON.stringify(postData)
      }

      let queryStr = queryBody
        ? '?' + QueryString.stringify(queryBody)
        : ''
      queryStr = queryStr.replace('%25', '%')

      const response = await fetch(HOST + apiUrl + queryStr, params)
      const responJson = await response.json()
      return responJson || response
    } catch (error) {
      return null
    }
  }
}
