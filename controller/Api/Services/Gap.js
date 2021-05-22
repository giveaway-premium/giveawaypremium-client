
import { REQUEST_TYPE } from 'common/constants'
import ReduxService from 'common/redux'
import QueryString from 'query-string'

export default class Gap {
  static logInAdmin (username, password) {
    const queryBody = {
      username: username,
      password: password
    }

    return this.fetchData('/login', REQUEST_TYPE.GET, queryBody, null, null, null, null, true)
  }

  // Appointment

  static async getAppointmentWithDate (dateArray) {
    const customQuery = `where={"date":{"$in":[${[...dateArray]}]}}`
    return this.fetchData('/classes/AppointmentSchedule', REQUEST_TYPE.GET, null, null, null, null, customQuery)
  }

  static async getAppointmentWithSlotId (slotID) {
    const customQuery = `where={"slot":${slotID}}`
    return this.fetchData('/classes/AppointmentSchedule', REQUEST_TYPE.GET, null, null, null, null, customQuery)
  }

  static async setAppointment (formData, slotID, formatedTime, formatedDay) {
    const res = await this.getAppointmentWithSlotId(slotID)

    if (res && res.results && res.results.length === 0) {
      const body = {
        slot: slotID,
        date: formatedDay,
        dateTime: formatedTime,
        agency: { '__type': 'Pointer', 'className': 'Agency', 'objectId': 'KcPHTActcd' }, // we need set more agency after
        customerName: formData.customerName,
        phoneNumber: formData.phoneNumber,
        numberOfProduct: `${formData.numberOfProduct}`
      }
      return this.fetchData('/classes/AppointmentSchedule', REQUEST_TYPE.POST, null, body)
    } else {
      return false
    }
  }

  // Consignment Group

  static async getConsignmentID () {
    const queryBody = {
      count: true
    }
    return this.fetchData('/classes/ConsignmentGroup', REQUEST_TYPE.GET, queryBody)
  }

  static async setConsignmentID (tag) {
    const body = {
      code: tag.code,
      timeGetMoney: tag.timeGetMoney
    }
    return this.fetchData('/classes/ConsignmentGroup', REQUEST_TYPE.POST, null, body)
  }

  static async deleteConsignmentID (objectId) {
    try {
      return this.fetchData(`/classes/ConsignmentGroup/${objectId}`, REQUEST_TYPE.DELETE, null)
    } catch (e) {
      console.log(e)
      return false
    }
  }

  // Consignment
  static async setConsignment (formData, consigneeData, consignerData, timeGroupId) {
    const body = {
      consignmentId: formData.consignmentId,
      consignerName: formData.consignerName,
      consignerIdCard: formData.consignerIdCard,
      consignee: { '__type': 'Pointer', 'className': '_User', 'objectId': consigneeData },
      consigner: { '__type': 'Pointer', 'className': '_User', 'objectId': consignerData },
      group: { '__type': 'Pointer', 'className': 'ConsignmentGroup', 'objectId': timeGroupId },
      consigneeName: formData.consigneeName,
      phoneNumber: formData.phoneNumber,
      numberOfProducts: Number(formData.numberOfProducts),
      timeGetMoney: formData.timeGetMoney || '',
      banks: [{
        type: formData.bankName,
        accNumber: formData.bankId
      }]
    }
    console.log('body setConsignment')
    console.log(body)
    return this.fetchData('/classes/Consignment', REQUEST_TYPE.POST, null, body)
  }

  static async getConsignment (page = 1, keyword = null, limit = 20) {
    let skip = (20 * page) - 20

    const queryBody = {
      limit: limit,
      skip: skip,
      count: true
    }

    if (keyword) {
      const customQuery = `where={"phoneNumber":{"$regex":"${keyword}"}}`
      return this.fetchData('/classes/Consignment', REQUEST_TYPE.GET, queryBody, null, null, null, customQuery)
    } else {
      return this.fetchData('/classes/Consignment', REQUEST_TYPE.GET, queryBody)
    }
  }

  static async updateConsignment (item) {
    try {
      const body = {
        consignmentId: item.consignmentId,
        numberOfProducts: Number(item.numberOfProducts),
        numSoldConsignment: Number(item.numSoldConsignment || 0),
        remainNumConsignment: Number(item.numberOfProducts) - Number(item.numSoldConsignment || 0),
        moneyBack: Number(item.moneyBack) || 0,
        isGetMoney: item.isGetMoney || false,
        timeGetMoney: item.timeGetMoney || ''
      }

      console.log('body update consignment', body)
      console.log('item update consignment', item)

      return this.fetchData(`/classes/Consignment/${item.objectId}`, REQUEST_TYPE.PUT, null, body)
    } catch (e) {
      console.log(e)
      return false
    }
  }

  // Customer
  static async setCustomer (formData) {
    const body = {
      fullName: formData.consignerName,
      phoneNumber: formData.phoneNumber,
      identityNumber: formData.consignerIdCard,
      mail: formData.mail,
      email: formData.mail || 'nothing@giveaway.com',
      birthday: formData.birthday,
      username: formData.username,
      password: formData.password,
      banks: [{
        type: formData.bankName,
        accNumber: formData.bankId
      }]
    }
    return this.fetchData('/classes/_User', REQUEST_TYPE.POST, null, body)
  }

  static async updateCustomerTable (formData) {
    const body = {
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      identityNumber: formData.identityNumber,
      mail: formData.mail,
      birthday: formData.birthday,
      banks: [{
        type: formData.bankName,
        accNumber: formData.bankId
      }]
    }

    return this.fetchData(`/classes/_User/${formData.objectId}`, REQUEST_TYPE.PUT, null, body, null, null, null, true)
  }

  static async updateCustomer (formData, objectId) {
    const body = {
      fullName: formData.consignerName,
      phoneNumber: formData.phoneNumber,
      identityNumber: formData.consignerIdCard,
      mail: formData.mail,
      birthday: formData.birthday,
      banks: [{
        type: formData.bankName,
        accNumber: formData.bankId
      }]
    }
    return this.fetchData(`/classes/_User/${objectId}`, REQUEST_TYPE.PUT, null, body, null, null, null, true)
  }

  static async getCustomerTable (page = 1, keyword = null) {
    let limit = 20
    let skip = (20 * page) - 20

    const queryBody = {
      limit: limit,
      skip: skip,
      count: true
    }

    if (keyword) {
      const customQuery = `where={"role":"customer","phoneNumber":{"$regex":"${keyword}"}}`
      return this.fetchData('/classes/_User', REQUEST_TYPE.GET, queryBody, null, null, null, customQuery)
    } else {
      const customQuery = `where={"role":"customer"}`
      return this.fetchData('/classes/_User', REQUEST_TYPE.GET, queryBody, null, null, null, customQuery)
    }
  }

  static async getCustomer (phoneNumber) {
    const customQuery = `where={"phoneNumber":"${phoneNumber.toString()}"}`

    return this.fetchData('/classes/_User', REQUEST_TYPE.GET, null, null, null, null, customQuery)
  }

  static async fetchData (apiUrl, method, queryBody, postData, hostLink, authKey = '', customQuery = null, isUseAuthKey = false) {
    try {
      const key = authKey || await ReduxService.getAuthKeyBearer()
      const HOST = hostLink || process.env.SERVER_URL

      let header = {
        'X-Parse-Application-Id': process.env.APP_ID,
        'X-Parse-REST-API-Key': process.env.REST_API_KEY
      }

      if (isUseAuthKey) {
        header = {
          'X-Parse-Application-Id': process.env.APP_ID,
          'X-Parse-REST-API-Key': process.env.REST_API_KEY,
          'X-Parse-Session-Token': `${key}`
        }
      }

      let params = {
        method: method || REQUEST_TYPE.GET,
        headers: header
      }

      if (postData) {
        params.body = JSON.stringify(postData)
      }

      let queryStr = queryBody
        ? '?' + QueryString.stringify(queryBody)
        : ''

      if (customQuery) {
        queryStr = `?${encodeURI(customQuery)}`
      }
      const response = await fetch(HOST + apiUrl + queryStr, params)
      const responJson = await response.json()
      return responJson || response
    } catch (error) {
      return null
    }
  }
}
