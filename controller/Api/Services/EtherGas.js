import { GAS_PRICE_DEFAULT } from 'common/constants'
export default class EtherGas {
  static async fromEthGasStation () {
    try {
      // GWei
      const GAS_STATION_URL = 'https://ethgasstation.info/json/ethgasAPI.json'
      let response = await fetch(GAS_STATION_URL, {
        'async': true,
        'method': 'GET'
      })
      response = await response.json()
      if (response && response.fastest && typeof response === 'object') {
        return response
      } else {
        return null
      }
    } catch (error) {
      throw error
    }
  }

  static async fromEthChain () {
    try {
      // GWei
      const GAS_STATION_URL = 'https://www.etherchain.org/api/gasPriceOracle'
      let response = await fetch(GAS_STATION_URL, {
        'async': true,
        'method': 'GET'
      })
      response = await response.json()
      if (response && response.fastest && typeof response === 'object') {
        response.average = response.standard
        return response
      } else {
        return null
      }
    } catch (error) {
      throw error
    }
  }

  static async getGasPrice () {
    try {
      let gasPrice = await this.fromEthGasStation()
      if (gasPrice && !gasPrice.error && gasPrice.fastest) {
        return {
          slow: gasPrice.safeLow / 10,
          medium: gasPrice.average / 10,
          fast: gasPrice.fastest / 10
        }
      } else {
        gasPrice = await this.fromEthChain()
        if (gasPrice && !gasPrice.error && gasPrice.fastest) {
          return {
            slow: gasPrice.safeLow,
            medium: gasPrice.standard,
            fast: gasPrice.fastest
          }
        }
      }
      return GAS_PRICE_DEFAULT
    } catch (error) {
      return GAS_PRICE_DEFAULT
    }
  }
}
