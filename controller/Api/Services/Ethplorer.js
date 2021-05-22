
import { REQUEST_TYPE } from 'common/constants'
import QueryString from 'query-string'

export default class Ethplorer {
  static getAddressInfo (address) {
    const query = {
      apiKey: process.env.API_ETHPLORER_KEY,
      limit: 1000
    }
    return this.fetchData(`/getAddressInfo/${address}`, REQUEST_TYPE.GET, query)
  }

  static async fetchData (apiUrl, method, queryBody, postData, hostLink, authKey) {
    try {
      const HOST = hostLink || process.env.API_ETHPLORER
      let params = {
        method: method || REQUEST_TYPE.GET
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
