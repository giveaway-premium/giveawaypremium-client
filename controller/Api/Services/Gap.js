
import { ADDRESS_GET_ORDER_ARRAY, ADDRESS_STREET_GET_ORDER, REQUEST_TYPE } from 'common/constants'
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

  static async sendMail (customerInfo, consignmentInfo, type, title, timeGroupCode, productList = []) {
    const productListTemp = []
    productList.map(itemProduct => {
      productListTemp.push({
        name: itemProduct.name || '',
        amount: itemProduct.count,
        status: itemProduct.note || '---',
        price: itemProduct.price ? `${numberWithCommas(itemProduct.price * 1000)} vnd` : '0 vnd',
        priceAfterFee: itemProduct.priceAfterFee ? `${numberWithCommas(itemProduct.priceAfterFee * 1000)} vnd` : '0 vnd'
      })
    })

    console.log(productListTemp)
    if (type) {
      let formatedTitle = customerInfo && customerInfo.timeConfirmGetMoney && customerInfo.timeConfirmGetMoney.length > 0 ? ((`GAP ${title}` || 'GAP') + ' ' + consignmentInfo.consignmentId + ' ' + (consignmentInfo.timeConfirmGetMoney)) : ((`GAP ${title}` || 'GAP') + ' ' + consignmentInfo.consignmentId + ' ' + (consignmentInfo.timeGetMoney))
      formatedTitle = formatedTitle.replaceAll('-', '/')
      const body = {
        'mailTo': customerInfo.mail.toLowerCase(),
        'title': formatedTitle,
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
          'timeGetMoney': `${consignmentInfo.timeGetMoney} -> ${moment(consignmentInfo.timeGetMoney, 'DD-MM-YYYY').add(10, 'day').format('DD-MM-YYYY')}`,
          'timeCheck': moment(consignmentInfo.timeGetMoney, 'DD-MM-YYYY').subtract(3, 'day').format('DD-MM-YYYY'),
          'products': productListTemp || []
        }
      }
      console.log('body')
      console.log(body)

      return this.fetchData('/functions/email', REQUEST_TYPE.POST, null, body, null, null, null, true)
    }
  }

  // Appointment

  static async getAppointmentWithPhone (phoneNumber, limit = 1, page = 1) {
    let limited = limit || 1
    let skip = (limited * page) - limited
    const customQuery = `order=-createdAt&include=group&skip=${skip}&limit=${limited}&count=1&where={"deletedAt":${null},"phoneNumber":"${phoneNumber}"}`
    // const customQuery = `order=-createdAt&include=group&skip=${skip}&limit=${limited}&count=1&where={"$or":[{"phoneNumber":"${keyword}"},{"consignerIdCard":"${keyword}"]}`

    return this.fetchData('/classes/AppointmentSchedule', REQUEST_TYPE.GET, null, null, null, null, customQuery)
  }

  static async getAppointmentWithDate (dateArray) {
    let limited = 300
    let skip = (limited * 1) - limited

    const customQuery = `skip=${skip}&limit=${limited}&count=1&where={"deletedAt":${null},"date":{"$in":[${[...dateArray]}]}}`
    return this.fetchData('/classes/AppointmentSchedule', REQUEST_TYPE.GET, null, null, null, null, customQuery)
  }

  static async getAppointmentWithSlotId (slotID) {
    const customQuery = `where={"slot":${slotID}}`
    return this.fetchData('/classes/AppointmentSchedule', REQUEST_TYPE.GET, null, null, null, null, customQuery)
  }

  static async deleteAppointmentWithSlotId (objectId) {
    // return this.fetchData(`/classes/AppointmentSchedule/${objectId}`, REQUEST_TYPE.DELETE)

    try {
      const body = {
        deletedAt:
        {
          '__type': 'Date',
          'iso': moment()
        }
      }

      return this.fetchData(`/classes/AppointmentSchedule/${objectId}`, REQUEST_TYPE.PUT, null, body)
    } catch (e) {
      console.log(e)
      return false
    }
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
    const customQuery = `where={"deletedAt":${null}}`
    return this.fetchData('/classes/ConsignmentGroup', REQUEST_TYPE.GET, null, null, null, null, customQuery)
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
      const body = {
        deletedAt: {
          '__type': 'Date',
          'iso': moment()
        }
      }

      return this.fetchData(`/classes/ConsignmentGroup/${objectId}`, REQUEST_TYPE.PUT, null, body)
    } catch (e) {
      console.log(e)
      return false
    }
  }

  // Product
  // static async getProduct (page = 1, keyword = null, limit = 20, currentTagId) {
  //   let limited = limit || 100
  //   let skip = (limited * page) - limited

  //   if (keyword) {
  //     const customQuery = `include=medias&skip=${skip}&limit=${limited}&count=1&where={"name":{"$regex":"${keyword}"},"group":{"__type":"Pointer","className":"ConsignmentGroup","objectId":"${currentTagId}"}}`
  //     return this.fetchData('/classes/Product', REQUEST_TYPE.GET, null, null, null, null, customQuery)
  //   } else {
  //     const customQuery = `include=medias&skip=${skip}&limit=${limited}&count=1&where={"group":{"__type":"Pointer","className":"ConsignmentGroup","objectId":"${currentTagId}"}}`

  //     return this.fetchData('/classes/Product', REQUEST_TYPE.GET, null, null, null, null, customQuery)
  //   }
  // }

  static async getProduct (page = 1, selectedKeys = null, limit = 100, currentTagId) {
    let limited = limit || 100
    let skip = (limited * page) - limited

    if (selectedKeys) {
      const whereUpperCase = {}
      const whereLowerCase = {}

      if (selectedKeys?.name && selectedKeys?.name.length > 0) {
        whereUpperCase.name = { '$regex': selectedKeys?.name.trim() }
        whereLowerCase.name = { '$regex': selectedKeys?.name.trim().toLowerCase() }
      }

      if (selectedKeys?.code && selectedKeys?.code.length > 0) {
        whereUpperCase.code = selectedKeys?.code.trim()
        whereLowerCase.code = selectedKeys?.code.trim().toLowerCase()
      }

      if (selectedKeys?.soldNumberProduct && selectedKeys?.soldNumberProduct.length > 0) {
        whereUpperCase.soldNumberProduct = Number(selectedKeys.soldNumberProduct.trim())
        whereLowerCase.soldNumberProduct = Number(selectedKeys.soldNumberProduct.trim())
      }

      if (selectedKeys?.remainNumberProduct && selectedKeys?.remainNumberProduct.length > 0) {
        whereUpperCase.remainNumberProduct = Number(selectedKeys.remainNumberProduct.trim())
        whereLowerCase.remainNumberProduct = Number(selectedKeys.remainNumberProduct.trim())
      }
      whereUpperCase.deletedAt = { '$exists': false }
      whereLowerCase.deletedAt = { '$exists': false }
      whereLowerCase.group = {
        '__type': 'Pointer',
        'className': 'ConsignmentGroup',
        'objectId': `${currentTagId}`
      }
      whereUpperCase.group = {
        '__type': 'Pointer',
        'className': 'ConsignmentGroup',
        'objectId': `${currentTagId}`
      }

      const allSearchRegex = JSON.stringify({
        '$or': [whereUpperCase, whereLowerCase]
      })

      // if (selectedKeys?.name && selectedKeys?.name.length > 0) {
      //   // allSearchRegex += `,"name":{"$text":{"$search":{"$term":"${selectedKeys.name.trim()}"}}}`
      //   allSearchRegex += `,"name":{"$or":[{"$regex":"${selectedKeys?.name.trim()}"}, {"$regex":"${selectedKeys?.name.trim().toLowerCase()}"}]}`

      //   console.log('allSearchRegex2', allSearchRegex)
      // }

      // if (selectedKeys?.code && selectedKeys?.code.length > 0) {
      //   allSearchRegex += `,"code":{"$or":[{"$regex":"${selectedKeys?.code.trim()}"}, {"$regex":"${selectedKeys?.code.trim().toLowerCase()}"}]}`

      //   // allSearchRegex += `,"code":{"$text":{"$search":{"$term":"${selectedKeys.code.trim()}"}}}`
      //   console.log('allSearchRegex2', allSearchRegex)
      // }

      // if (selectedKeys?.soldNumberProduct && selectedKeys?.soldNumberProduct.length > 0) {
      //   allSearchRegex += `,"soldNumberProduct":${Number(selectedKeys.soldNumberProduct.trim())}`
      //   console.log('allSearchRegex2', allSearchRegex)
      // }

      // if (selectedKeys?.remainNumberProduct && selectedKeys?.remainNumberProduct.length > 0) {
      //   allSearchRegex += `,"remainNumberProduct":${Number(selectedKeys.remainNumberProduct.trim())}`
      //   console.log('allSearchRegex2', allSearchRegex)
      // }

      // // if (selectedKeys?.isGetMoney) {
      // //   allSearchRegex += `,"isGetMoney":${selectedKeys.isGetMoney}`
      // //   console.log('allSearchRegex2', allSearchRegex)
      // // }
      // console.log('allSearchRegex')
      // console.log(allSearchRegex)

      // const customQuery = `skip=${skip}&limit=${limited}&count=1&where=${whereStr}`
      // const customQuery = `skip=${skip}&limit=${limited}&count=1&where={"deletedAt":${null},"group":{"__type":"Pointer","className":"ConsignmentGroup","objectId":"${currentTagId}"}}`
      const customQuery = `skip=${skip}&limit=${limited}&count=1&where=${allSearchRegex}`

      console.log('customQuery')
      console.log(customQuery)
      return this.fetchData('/classes/Product', REQUEST_TYPE.GET, null, null, null, null, customQuery)
    } else {
      console.log('getConsignment 3')
      // const customQuery = `count=1,where={"group":{"__type":"Pointer","className":"ConsignmentGroup","objectId":"${currentTagId}"}}`
      const customQuery = `skip=${skip}&limit=${limited}&count=1&where={"deletedAt":${null},"group":{"__type":"Pointer","className":"ConsignmentGroup","objectId":"${currentTagId}"}}`
      return this.fetchData('/classes/Product', REQUEST_TYPE.GET, null, null, null, null, customQuery)
    }
  }

  static async getProductWithCode (keyword) {
    const customQuery = `include=medias&limit=${1}&count=1&where={"code":"${keyword}"}`
    return this.fetchData('/classes/Product', REQUEST_TYPE.GET, null, null, null, null, customQuery)
  }

  static async getProductWithObjectKey (objectId) {
    return this.fetchData(`/classes/Product/${objectId}`, REQUEST_TYPE.GET, null)
  }

  static async updateProduct (item) {
    console.log('updateProduct', item)
    try {
      const body = {
        code: item.code,
        name: item.name,
        price: item.price,
        priceAfterFee: item.priceAfterFee,
        count: item.count,
        soldNumberProduct: item.soldNumberProduct,
        remainNumberProduct: item.remainNumberProduct
      }

      if (item.medias) {
        body.medias = item.medias
      }

      console.log('body update product', body)
      console.log('item update product', item)

      return this.fetchData(`/classes/Product/${item.objectId}`, REQUEST_TYPE.PUT, null, body)
    } catch (e) {
      console.log(e)
      return false
    }
  }

  // /////// Order

  static async setOrder (dataOrder, consigneeData, consignerData) {
    const body = {
      phoneNumber: dataOrder.clientInfo.phoneNumber,
      fullName: dataOrder.clientInfo.fullName,
      consignerIdCard: dataOrder.clientInfo.consignerIdCard,
      clientInfo: dataOrder.clientInfo,
      consignee: { '__type': 'Pointer', 'className': '_User', 'objectId': consigneeData },
      client: { '__type': 'Pointer', 'className': '_User', 'objectId': consignerData },
      isTransferMoneyWithBank: dataOrder.isTransferWithBank === 'true',
      productList: dataOrder.productList || [],
      totalNumberOfProductForSale: `${dataOrder.totalNumberOfProductForSale}`,
      totalMoneyForSale: `${dataOrder.totalMoneyForSale}`,
      totalMoneyForSaleAfterFee: `${dataOrder.totalMoneyForSaleAfterFee}`,
      note: dataOrder.note,
      isOnlineSale: dataOrder.isOnlineSale === 'true',
      shippingInfo: dataOrder.shippingInfo
    }
    console.log('body setConsignment')
    console.log(body)
    return this.fetchData('/classes/Order', REQUEST_TYPE.POST, null, body)
  }

  static async updateOrder (item) {
    try {
      const body = {
        isGetMoney: item.isGetMoney || false
      }

      if (item && item.timeConfirmGetMoney) {
        body.timeConfirmGetMoney = item.timeConfirmGetMoney
      }

      console.log('body update updateOrder', body)
      console.log('item update updateOrder', item)

      return this.fetchData(`/classes/Order/${item.objectId}`, REQUEST_TYPE.PUT, null, body, null, null, null, true)
    } catch (e) {
      console.log(e)
      return false
    }
  }

  static async deleteOrder (objectId) {
    try {
      const body = {
        deletedAt: {
          '__type': 'Date',
          'iso': moment()
        }
      }

      return this.fetchData(`/classes/Order/${objectId}`, REQUEST_TYPE.PUT, null, body)
    } catch (e) {
      console.log(e)
      return false
    }
  }

  // "createdAt": {
  //   "$gte": {
  //     "__type": "Date",
  //     "iso": "2019-01-15"
  //   },
  //   "$lte": {
  //     "__type": "Date",
  //     "iso": "2019-07-15"
  //   }
  // }
  static async getOrder (page = 1, selectedKeys = null, limit = 100, fromDateMoment, toDateMoment) {
    console.log('getConsignment')
    console.log(page)
    console.log(selectedKeys)

    let limited = limit || 100
    let skip = (limited * page) - limited

    // selectedKeys.phoneNumber ||
    // selectedKeys.consignerName ||
    // selectedKeys.objectId ||
    // selectedKeys.isTransferMoneyWithBank ||
    // selectedKeys.totalNumberOfProductForSale ||
    // selectedKeys.isOnlineSale)) {

    if (selectedKeys) {
      console.log('getConsignment 1')
      console.log(selectedKeys.phoneNumber)
      console.log(selectedKeys.remainNumConsignment)
      const fromDateFormated = moment(fromDateMoment, 'YYYY-MM-DD')
      const toDateFormated = moment(toDateMoment, 'YYYY-MM-DD')
      let allSearchRegex = `"deletedAt":${null}, "createdAt": {"$gte": {"__type": "Date","iso": "${fromDateFormated}"},"$lte": {"__type": "Date","iso": "${toDateFormated}"}}`
      if (selectedKeys.phoneNumber) {
        console.log('getConsignment 2')

        allSearchRegex += `,"phoneNumber":{"$regex":"${selectedKeys.phoneNumber.trim()}"}`
        console.log('allSearchRegex', allSearchRegex)
      }
      if (selectedKeys.fullName) {
        // allSearchRegex += `,"fullName":{"$regex":"${selectedKeys.fullName.trim()}"}`

        allSearchRegex += `,"fullName":{"$text":{"$search":{"$term":"${selectedKeys.fullName}"}}}`
        console.log('allSearchRegex2', allSearchRegex)
      }

      if (selectedKeys.isTransferMoneyWithBank) {
        allSearchRegex += `,"isTransferMoneyWithBank":${selectedKeys.isTransferMoneyWithBank}`
        console.log('allSearchRegex2', allSearchRegex)
      }

      if (selectedKeys.totalNumberOfProductForSale) {
        allSearchRegex += `,"totalNumberOfProductForSale":${selectedKeys.totalNumberOfProductForSale.trim()}`
        console.log('allSearchRegex2', allSearchRegex)
      }

      if (selectedKeys.isOnlineSale) {
        allSearchRegex += `,"isOnlineSale":${selectedKeys.isOnlineSale}`
        console.log('allSearchRegex2', allSearchRegex)
      }
      console.log('allSearchRegex')
      console.log(allSearchRegex)

      const customQuery = `skip=${skip}&limit=${limited}&count=1&include=client,transporter&where={${allSearchRegex}}`
      console.log('customQuery')
      console.log(customQuery)
      const customQueryWithoutCondition = `include=client,transporter`

      if (selectedKeys.objectId) {
        return this.fetchData(`/classes/Order/${selectedKeys.objectId.trim()}`, REQUEST_TYPE.GET, null, null, null, null, customQueryWithoutCondition)
      } else {
        return this.fetchData('/classes/Order', REQUEST_TYPE.GET, null, null, null, null, customQuery)
      }
    } else {
      console.log('getConsignment 3')
      const fromDateFormated = moment(fromDateMoment, 'YYYY-MM-DD')
      const toDateFormated = moment(toDateMoment, 'YYYY-MM-DD')
      console.log('fromDateFormated', fromDateFormated)
      console.log('toDateFormated', toDateFormated)

      const customQuery = `skip=${skip}&limit=${limited}&count=1&include=client,transporter&where={"deletedAt":${null}, "createdAt": {"$gte": {"__type": "Date","iso": "${fromDateFormated}"},"$lte": {"__type": "Date","iso": "${toDateFormated}"}}}`
      return this.fetchData('/classes/Order', REQUEST_TYPE.GET, null, null, null, null, customQuery)
    }
  }

  // Consignment
  static async setConsignment (formData, consigneeData, consignerData, timeGroupId, timeGroupCode, productList, moneyBackForFullSold, totalMoney, isTransferMoneyWithBank = false, note = '') {
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
      note: note,
      isTransferMoneyWithBank: isTransferMoneyWithBank === 'true',
      productList: productList || []
    }
    console.log('body setConsignment')
    console.log(body)
    return this.fetchData('/classes/Consignment', REQUEST_TYPE.POST, null, body, null, null, null, true)
  }

  static async getConsignmentWithPhone (page = 1, keyword = null, limit = 20) {
    let limited = limit || 100
    let skip = (limited * page) - limited
    const customQuery = `order=-createdAt&include=group&skip=${skip}&limit=${limited}&count=1&where={"deletedAt":${null},"phoneNumber":"${keyword}"}`
    // const customQuery = `order=-createdAt&include=group&skip=${skip}&limit=${limited}&count=1&where={"$or":[{"phoneNumber":"${keyword}"},{"consignerIdCard":"${keyword}"]}`

    return this.fetchData('/classes/Consignment', REQUEST_TYPE.GET, null, null, null, null, customQuery)
  }

  static async getConsignmentWithID (page = 1, keyword = null, limit = 20) {
    let limited = limit || 100
    let skip = (limited * page) - limited
    const customQuery = `order=-createdAt&include=group&skip=${skip}&limit=${limited}&count=1&where={"deletedAt":${null},"consignerIdCard":"${keyword}"}`
    // const customQuery = `order=-createdAt&include=group&skip=${skip}&limit=${limited}&count=1&where={"$or":[{"phoneNumber":"${keyword}"},{"consignerIdCard":"${keyword}"]}`

    return this.fetchData('/classes/Consignment', REQUEST_TYPE.GET, null, null, null, null, customQuery)
  }

  static async getConsignmentWithPhoneIncludeText (page = 1, keyword = null, limit = 20) {
    let limited = limit || 100
    let skip = (limited * page) - limited

    const customQuery = `order=-createdAt&include=group&skip=${skip}&limit=${limited}&count=1&where={"deletedAt":${null},"phoneNumber":{"$regex":"${keyword}"}}`
    return this.fetchData('/classes/Consignment', REQUEST_TYPE.GET, null, null, null, null, customQuery)
  }

  static async getConsignment (page = 1, selectedKeys = null, limit = 100, currentTagId) {
    console.log('getConsignment')
    console.log(page)
    console.log(selectedKeys)

    let limited = limit || 100
    let skip = (limited * page) - limited

    if (selectedKeys) {
      console.log('getConsignment 1')
      console.log(selectedKeys.phoneNumber)
      console.log(selectedKeys.remainNumConsignment)

      let allSearchRegex = `"deletedAt":${null}`
      if (selectedKeys.phoneNumber && selectedKeys.phoneNumber.length > 0) {
        console.log('getConsignment 2')

        allSearchRegex += `,"phoneNumber":{"$regex":"${selectedKeys.phoneNumber.trim()}"}`
        console.log('allSearchRegex', allSearchRegex)
      }
      if (selectedKeys.consignerName && selectedKeys.consignerName.length > 0) {
        allSearchRegex += `,"consignerName":{"$text":{"$search":{"$term":"${selectedKeys.consignerName.trim()}"}}}`
        console.log('allSearchRegex2', allSearchRegex)
      }

      if (selectedKeys.consignmentId && selectedKeys.consignmentId.length > 0) {
        allSearchRegex += `,"consignmentId":{"$text":{"$search":{"$term":"${selectedKeys.consignmentId.trim()}"}}}`
        console.log('allSearchRegex2', allSearchRegex)
      }

      if (selectedKeys.isTransferMoneyWithBank) {
        allSearchRegex += `,"isTransferMoneyWithBank":${selectedKeys.isTransferMoneyWithBank}`
        console.log('allSearchRegex2', allSearchRegex)
      }

      if (selectedKeys.remainNumConsignment && selectedKeys.remainNumConsignment.length > 0) {
        allSearchRegex += `,"remainNumConsignment":${selectedKeys.remainNumConsignment.trim()}`
        console.log('allSearchRegex2', allSearchRegex)
      }

      if (selectedKeys.isGetMoney) {
        allSearchRegex += `,"isGetMoney":${selectedKeys.isGetMoney}`
        console.log('allSearchRegex2', allSearchRegex)
      }
      console.log('allSearchRegex')
      console.log(allSearchRegex)

      const customQuery = `skip=${skip}&limit=${limited}&count=1&where={${allSearchRegex},"group":{"__type":"Pointer","className":"ConsignmentGroup","objectId":"${currentTagId}"}}`
      console.log('customQuery')
      console.log(customQuery)
      return this.fetchData('/classes/Consignment', REQUEST_TYPE.GET, null, null, null, null, customQuery)
    } else {
      console.log('getConsignment 3')
      // const customQuery = `count=1,where={"group":{"__type":"Pointer","className":"ConsignmentGroup","objectId":"${currentTagId}"}}`
      const customQuery = `skip=${skip}&limit=${limited}&count=1&where={"deletedAt":${null},"group":{"__type":"Pointer","className":"ConsignmentGroup","objectId":"${currentTagId}"}}`
      return this.fetchData('/classes/Consignment', REQUEST_TYPE.GET, null, null, null, null, customQuery)
    }
  }

  static async deleteConsignment (objectId) {
    try {
      const body = {
        deletedAt: {
          '__type': 'Date',
          'iso': moment()
        }
      }

      return this.fetchData(`/classes/Consignment/${objectId}`, REQUEST_TYPE.PUT, null, body)
    } catch (e) {
      console.log(e)
      return false
    }
  }

  static async updateConsignment (item) {
    try {
      const productListTemp = [...item.productList]
      productListTemp.map((item, itemIndex) => {
        if (!productListTemp[itemIndex].note) {
          productListTemp[itemIndex].note = '---'
        }
      })
      const body = {
        consignmentId: item.consignmentId,
        numberOfProducts: Number(item.numberOfProducts),
        numSoldConsignment: Number(item.numSoldConsignment || 0),
        remainNumConsignment: Number(item.numberOfProducts) - Number(item.numSoldConsignment || 0),
        moneyBack: Number(item.moneyBack) || 0,
        moneyBackForFullSold: Number(item.moneyBackForFullSold) || 0,
        isGetMoney: item.isGetMoney || false,
        productList: productListTemp,
        timeConfirmGetMoney: item.timeConfirmGetMoney,
        note: item.note || ''
      }

      console.log('body update consignment', body)
      console.log('item update consignment', item)

      return this.fetchData(`/classes/Consignment/${item.objectId}`, REQUEST_TYPE.PUT, null, body, null, null, null, true)
    } catch (e) {
      console.log(e)
      return false
    }
  }

  // CHANNEL
  static async updateChannel (dataBody, objectId) {
    const body = {
      ...dataBody
    }

    return this.fetchData(`/classes/Channel/${objectId}`, REQUEST_TYPE.PUT, null, body, null, null, null, true)
  }

  static async getChannel () {
    const customQuery = `where={"deletedAt":${null}}`
    return this.fetchData('/classes/Channel', REQUEST_TYPE.GET, null, null, null, null, customQuery)
  }

  static async setChannel (dataBody) {
    const body = {
      name: dataBody.name,
      data: dataBody.data || {},
      type: dataBody.type
    }
    return this.fetchData('/classes/Channel', REQUEST_TYPE.POST, null, body, null, null, null, true)
  }

  static async deleteChannel (objectId) {
    try {
      const body = {
        deletedAt: {
          '__type': 'Date',
          'iso': moment()
        }
      }

      return this.fetchData(`/classes/Channel/${objectId}`, REQUEST_TYPE.PUT, null, body)
    } catch (e) {
      console.log(e)
      return false
    }
  }

  // IP HASH
  static async setIPHASH (formData) {
    const body = {
      HashIP: formData.HashIP
    }
    return this.fetchData('/classes/IP', REQUEST_TYPE.POST, null, body)
  }

  static async updateIPHASH (formData = {}) {
    const ipHash = ReduxService.getIpHash()
    const userData = ReduxService.getUserData()

    const body = {
      userData: { ...userData, ...formData.userData }
    }

    if (ipHash && ipHash.objectId) {
      return this.fetchData(`/classes/IP/${ipHash.objectId}`, REQUEST_TYPE.PUT, null, body)
    } else {
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
      username: formData.username || formData.phoneNumber,
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

    // totalMoneyForSale: resUSer.results[0].totalMoneyForSale ? Number(resUSer.results[0].totalMoneyForSale || 0) + Number(dataOrder.totalMoneyForSale || 0) : Number(dataOrder.totalMoneyForSale || 0),
    // numberOfSale: resUSer.results[0].numberOfSale ? Number(resUSer.results[0].numberOfSale || 0) + Number(dataOrder.totalMoneyForSale || 0) : Number(dataOrder.totalMoneyForSale || 0),
    // totalProductForSale: resUSer.results[0].totalProductForSale ? Number(resUSer.results[0].totalProductForSale || 0) + Number(dataOrder.totalNumberOfProductForSale || 0) : Number(dataOrder.totalNumberOfProductForSale || 0)

    if (formData.totalMoneyForSale) {
      body.totalMoneyForSale = `${formData.totalMoneyForSale}`
    }

    if (formData.numberOfSale) {
      body.numberOfSale = `${formData.numberOfSale}`
    }

    if (formData.totalProductForSale) {
      body.totalProductForSale = `${formData.totalProductForSale}`
    }

    console.log('updateCustomer')
    console.log(body)

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

  static async getBookingFormat () {
    return this.fetchData('/classes/Setting/meu8SzyuLd', REQUEST_TYPE.GET, null, null, null, null)
  }

  // SETTING

  static async updateSetting (settingObject) {
    const body = {
      Setting: settingObject
    }

    console.log('updateSetting')
    console.log(body)

    return this.fetchData(`/classes/Setting/meu8SzyuLd`, REQUEST_TYPE.PUT, null, body, null, null, null, true)
  }

  static async updateSettingWithKeyAndValue (keyString = '', valueString = '') {
    const settingAPI = await ReduxService.getSetting()
    const newSettingAPI = {
      ...settingAPI,
      [keyString]: valueString
    }
    const body = {
      Setting: newSettingAPI
    }
    console.log('updateSetting')
    console.log(body)

    return this.fetchData(`/classes/Setting/meu8SzyuLd`, REQUEST_TYPE.PUT, null, body, null, null, null, true)
  }

  static async deleteSettingWithKey (keyString = '') {
    const settingAPI = await ReduxService.getSetting()
    const newSettingAPI = {
      ...settingAPI
    }
    delete newSettingAPI[keyString]
    const body = {
      Setting: newSettingAPI
    }
    console.log('updateSetting')
    console.log(body)

    return this.fetchData(`/classes/Setting/meu8SzyuLd`, REQUEST_TYPE.PUT, null, body, null, null, null, true)
  }

  static async getSetting () {
    return this.fetchData('/classes/Setting', REQUEST_TYPE.GET, null, null, null, null)
  }

  // custom API server

  static async getUnitAddress () {
    return this.fetchData('/functions/administativeUnits', REQUEST_TYPE.POST, null, null)
  }

  static async getFeeForTransport (formData, isXteam = false) {
    const body = {
      service: 'giaohangtietkiem',
      action: 'PRICE_ESTIMATE',
      data: {
        weight: 0.1,
        serviceLevel: isXteam ? 'xteam' : 'none',
        from: {
          province: ADDRESS_GET_ORDER_ARRAY[0],
          district: ADDRESS_GET_ORDER_ARRAY[1],
          address: ADDRESS_GET_ORDER_ARRAY[2]
        },
        to: {
          province: formData.orderAdressProvince,
          district: formData.orderAdressDistrict,
          address: formData.orderAdressWard
        },
        transport: 'road',
        value: 0
      }
    }
    return this.fetchData('/functions/transporter', REQUEST_TYPE.POST, null, body)
  }

  static async pushOrderToGHTK (formData) {
    const body = {
      service: 'giaohangtietkiem',
      action: 'CREATE_ORDER',
      data: {
        from: {
          province: ADDRESS_GET_ORDER_ARRAY[0],
          district: ADDRESS_GET_ORDER_ARRAY[1],
          address: '1 Phó Đức Chính',
          ward: ADDRESS_GET_ORDER_ARRAY[2],
          name: 'Giveaway Premium store',
          phone: '0703334443'
        },
        to: {
          province: formData.shippingInfo.orderAdressProvince,
          district: formData.shippingInfo.orderAdressDistrict,
          address: formData.shippingInfo.orderAdressStreet,
          ward: formData.shippingInfo.orderAdressWard,
          name: formData.clientInfo.fullName,
          phone: formData.clientInfo.phoneNumber
        },
        orderId: formData.objectId,
        codMoney: 0,
        isFreeShipping: false,
        serviceLevel: 'road',
        value: Number(formData.totalMoneyForSale) * 1000 >= 20000 ? 20000 : Number(formData.totalMoneyForSale) * 1000,
        items: []
      }
    }

    if (formData.productList && formData.productList.length > 0) {
      formData.productList.map((item, indexItem) => {
        body.data.items.push({
          name: item.name,
          weight: 0.2,
          quantity: Number(item.numberOfProductForSale)
        })
      })
    }

    if (formData?.shippingInfo?.optionTransfer === 'ht') {
      body.data.pick_option = 'cod'
      body.data.deliver_option = 'xteam'
      body.data.pick_session = 2
    }

    console.log('body GHTK', body)
    return this.fetchData('/functions/transporter', REQUEST_TYPE.POST, null, body)
  }

  static async getLabelTransform (orderId) {
    const body = {
      service: 'giaohangtietkiem',
      action: 'GET_ORDER_LABEL',
      data: {
        'orderId': orderId
      }
    }
    return this.fetchData('/functions/transporter', REQUEST_TYPE.POST, null, body)
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
