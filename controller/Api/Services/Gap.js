
import { REQUEST_TYPE } from 'common/constants'
import ReduxService from 'common/redux'
import QueryString from 'query-string'
import moment from 'moment'
import { numberWithCommas } from 'common/function'

export default class Gap {
  static uploadSingleFileWithFormData = async (file) => {
    // eslint-disable-next-line no-undef
    console.log('file uploading ======', file)
    const key = await ReduxService.getAuthKeyBearer()

    return new Promise(resolve => {
      const isOnline = () => resolve(true)
      const isOffline = () => resolve(false)

      var data = new FormData()
      data.append('media', file)

      fetch('https://giveaway-premium.herokuapp.com/media',
        {
          body: data,
          method: 'POST',
          headers: {
            // "Content-Type": "multipart/form-data",
            'x-parse-application-id': process.env.APP_ID,
            'x-parse-rest-api-key': process.env.REST_API_KEY,
            'x-parse-revocable-session': '1',
            'x-parse-session-token': key,
            'cache-control': 'no-cache'
          }
        }
      ).then(result => resolve(result.json()))
    })
  }

  static logInAdmin (username, password) {
    const queryBody = {
      username: username,
      password: password
    }

    return this.fetchData('/login', REQUEST_TYPE.GET, queryBody, null, null, null, null, true)
  }

  // Mail

  static async sendMail (customerInfo, consignmentInfo, type, title, timeGroupCode) {
    console.log(customerInfo)
    console.log(consignmentInfo)
    console.log(type)
    console.log(title)
    console.log(timeGroupCode)

    if (type) {
      const body = {
        'mailTo': customerInfo.mail,
        'title': customerInfo.timeConfirmGetMoney && customerInfo.timeConfirmGetMoney.length > 0 ? ((title || 'GAP') + ' ' + consignmentInfo.consignmentId + '*' + (consignmentInfo.timeConfirmGetMoney)) : ((title || 'GAP') + ' ' + consignmentInfo.consignmentId + '*' + (consignmentInfo.timeGetMoney)),
        'type': type,
        'data': {
          'moneyBack': consignmentInfo.moneyBack ? `${numberWithCommas(consignmentInfo.moneyBack)} vnd` : '0 vnd',
          'customerName': customerInfo.consignerName,
          'phoneNumber': customerInfo.phoneNumber,
          'identityId': customerInfo.consignerIdCard,
          'consignmentId': timeGroupCode ? consignmentInfo.consignmentId + '-' + timeGroupCode : consignmentInfo.consignmentId,
          'numberOfProduct': consignmentInfo.numberOfProducts.toString(),
          'bankName': consignmentInfo.bankName,
          'bankId': consignmentInfo.bankId,
          // 'timeGetMoney': consignmentInfo.timeGetMoney,
          'timeGetMoney': `${moment(consignmentInfo.timeGetMoney, 'DD-MM-YYYY')} -> ${moment(consignmentInfo.timeGetMoney, 'DD-MM-YYYY').add(10, 'day').format('DD-MM-YYYY')}`,
          'timeCheck': moment(consignmentInfo.timeGetMoney, 'DD-MM-YYYY').subtract(3, 'day').format('DD-MM-YYYY')
        }
      }
      console.log('body')
      console.log(body)

      return this.fetchData('/functions/email', REQUEST_TYPE.POST, null, body, null, null, null, true)
    }
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

  static async deleteAppointmentWithSlotId (objectId) {
    return this.fetchData(`/classes/AppointmentSchedule/${objectId}`, REQUEST_TYPE.DELETE)
  }

  static async setAppointment (formData, slotID, formatedTime, formatedDay) {
    const res = await this.getAppointmentWithSlotId(slotID)

    if (res && res.results && res.results.length === 0) {
      const body = {
        slot: slotID,
        date: formatedDay,
        dateTime: formatedTime,
        agency: { '__type': 'Pointer', 'className': 'Agency', 'objectId': 'HApHfw0saq' }, // we need set more agency after
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

  // Product
  static async getProduct (page = 1, keyword = null, limit = 20, currentTagId) {
    let limited = limit || 100
    let skip = (limited * page) - limited

    if (keyword) {
      const customQuery = `include=medias&skip=${skip}&limit=${limited}&count=1&where={"name":{"$regex":"${keyword}"},"group":{"__type":"Pointer","className":"ConsignmentGroup","objectId":"${currentTagId}"}}`
      return this.fetchData('/classes/Product', REQUEST_TYPE.GET, null, null, null, null, customQuery)
    } else {
      const customQuery = `include=medias&skip=${skip}&limit=${limited}&count=1&where={"group":{"__type":"Pointer","className":"ConsignmentGroup","objectId":"${currentTagId}"}}`

      return this.fetchData('/classes/Product', REQUEST_TYPE.GET, null, null, null, null, customQuery)
    }
  }

  static async updateProduct (item) {
    try {
      const body = {
        medias: item.medias
      }

      console.log('body update product', body)
      console.log('item update product', item)

      return this.fetchData(`/classes/Product/${item.objectId}`, REQUEST_TYPE.PUT, null, body)
    } catch (e) {
      console.log(e)
      return false
    }
  }

  // Consignment
  static async setConsignment (formData, consigneeData, consignerData, timeGroupId, timeGroupCode, productList, moneyBackForFullSold, totalMoney, isTransferMoneyWithBank = false) {
    const body = {
      consignmentId: formData.consignmentId + '-' + timeGroupCode,
      consignerName: formData.consignerName,
      consignerIdCard: formData.consignerIdCard,
      mail: formData.mail,
      consignee: { '__type': 'Pointer', 'className': '_User', 'objectId': consigneeData },
      consigner: { '__type': 'Pointer', 'className': '_User', 'objectId': consignerData },
      group: { '__type': 'Pointer', 'className': 'ConsignmentGroup', 'objectId': timeGroupId },
      consigneeName: formData.consigneeName,
      phoneNumber: formData.phoneNumber,
      numberOfProducts: Number(formData.numberOfProducts),
      timeGetMoney: formData.timeGetMoney || '',
      moneyBackForFullSold: Math.round(Number(moneyBackForFullSold)) || 0,
      totalMoney: totalMoney,
      banks: [{
        type: formData.bankName,
        accNumber: formData.bankId
      }],
      isTransferMoneyWithBank: isTransferMoneyWithBank === 'true',
      productList: productList || []
    }
    console.log('body setConsignment')
    console.log(body)
    return this.fetchData('/classes/Consignment', REQUEST_TYPE.POST, null, body)
  }

  static async getConsignmentWithPhone (page = 1, keyword = null, limit = 20) {
    let limited = limit || 100
    let skip = (limited * page) - limited
    const customQuery = `order=-createdAt&include=group&skip=${skip}&limit=${limited}&count=1&where={"phoneNumber":"${keyword}"}`
    // const customQuery = `order=-createdAt&include=group&skip=${skip}&limit=${limited}&count=1&where={"$or":[{"phoneNumber":"${keyword}"},{"consignerIdCard":"${keyword}"]}`

    return this.fetchData('/classes/Consignment', REQUEST_TYPE.GET, null, null, null, null, customQuery)
  }

  static async getConsignmentWithID (page = 1, keyword = null, limit = 20) {
    let limited = limit || 100
    let skip = (limited * page) - limited
    const customQuery = `order=-createdAt&include=group&skip=${skip}&limit=${limited}&count=1&where={"consignerIdCard":"${keyword}"}`
    // const customQuery = `order=-createdAt&include=group&skip=${skip}&limit=${limited}&count=1&where={"$or":[{"phoneNumber":"${keyword}"},{"consignerIdCard":"${keyword}"]}`

    return this.fetchData('/classes/Consignment', REQUEST_TYPE.GET, null, null, null, null, customQuery)
  }

  static async getConsignmentWithPhoneIncludeText (page = 1, keyword = null, limit = 20) {
    let limited = limit || 100
    let skip = (limited * page) - limited

    const customQuery = `order=-createdAt&include=group&skip=${skip}&limit=${limited}&count=1&where={"phoneNumber":{"$regex":"${keyword}"}}`
    return this.fetchData('/classes/Consignment', REQUEST_TYPE.GET, null, null, null, null, customQuery)
  }

  static async getConsignment (page = 1, keyword = null, limit = 100, currentTagId) {
    console.log('getConsignment')
    console.log(page)
    let limited = limit || 100
    let skip = (limited * page) - limited

    if (keyword) {
      const customQuery = `skip=${skip}&limit=${limited}&count=1&where={"phoneNumber":{"$regex":"${keyword}"},"group":{"__type":"Pointer","className":"ConsignmentGroup","objectId":"${currentTagId}"}}`
      return this.fetchData('/classes/Consignment', REQUEST_TYPE.GET, null, null, null, null, customQuery)
    } else {
      // const customQuery = `count=1,where={"group":{"__type":"Pointer","className":"ConsignmentGroup","objectId":"${currentTagId}"}}`
      const customQuery = `skip=${skip}&limit=${limited}&count=1&where={"group":{"__type":"Pointer","className":"ConsignmentGroup","objectId":"${currentTagId}"}}`

      return this.fetchData('/classes/Consignment', REQUEST_TYPE.GET, null, null, null, null, customQuery)
    }
  }

  static async deleteConsignment (objectId) {
    try {
      return this.fetchData(`/classes/Consignment/${objectId}`, REQUEST_TYPE.DELETE, null)
    } catch (e) {
      console.log(e)
      return false
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
        moneyBackForFullSold: Number(item.moneyBackForFullSold) || 0,
        isGetMoney: item.isGetMoney || false,
        productList: item.productList,
        timeConfirmGetMoney: item.timeConfirmGetMoney
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
      role: 'customer',
      fullName: formData.consignerName,
      phoneNumber: formData.phoneNumber,
      identityNumber: formData.consignerIdCard,
      mail: formData.mail,
      // email: formData.mail || 'nothing@giveaway.com',
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
    let limited = 100
    let skip = (limited * page) - limited

    if (keyword) {
      const customQuery = `skip=${skip}&limit=${limited}&count=1&where={"role":"customer","phoneNumber":"${keyword.toString()}"}`
      return this.fetchData('/classes/_User', REQUEST_TYPE.GET, null, null, null, null, customQuery)
    } else {
      const customQuery = `skip=${skip}&limit=${limited}&count=1&where={"role":"customer"}`
      return this.fetchData('/classes/_User', REQUEST_TYPE.GET, null, null, null, null, customQuery)
    }
  }

  static async getCustomer (phoneNumber, limit = 100) {
    let limited = limit
    let skip = (limited * 1) - limited

    const customQuery = `skip=${skip}&limit=${limited}&count=1&where={"phoneNumber":"${phoneNumber.toString()}"}`

    return this.fetchData('/classes/_User', REQUEST_TYPE.GET, null, null, null, null, customQuery)
  }

  static async getCategory () {
    return this.fetchData('/classes/Category?include=subCategories', REQUEST_TYPE.GET, null, null, null, null)
  }

  static async getCategoryNhanh () {
    return this.fetchData('functions/nhanh-category', REQUEST_TYPE.GET, null, null, null, null)
  }

  static async fetchData (apiUrl, method, queryBody, postData, hostLink, authKey = '', customQuery = null, isUseAuthKey = false) {
    try {
      const key = authKey || await ReduxService.getAuthKeyBearer()
      const HOST = hostLink || process.env.SERVER_URL

      console.log(HOST)
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
