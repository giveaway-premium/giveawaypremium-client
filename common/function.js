import validator from 'validator'
import moment from 'moment'
import converter from 'hex2dec'
import ReduxService from 'common/redux'
import { notification } from 'antd'
import bigdecimal from 'bigdecimal'

export const saveDataLocal = (key, data) => {
  // eslint-disable-next-line no-undef
  localStorage.setItem(key, JSON.stringify(data))
}

export const randomString = () => {
  const chars = '0123456789'
  const stringLength = 10
  let randomstring = ''
  for (let i = 0; i < stringLength; i++) {
    const rnum = Math.floor(Math.random() * chars.length)
    randomstring += chars[rnum]
  }
  return randomstring
}

export const copyToClipboard = (text) => {
  const tmp = document.createElement('input')
  tmp.value = text
  document.body.appendChild(tmp)
  tmp.select()
  document.execCommand('copy')
  tmp.remove()
}

export const getDataLocal = (key) => {
  // eslint-disable-next-line no-undef
  return JSON.parse(localStorage.getItem(key))
}

export const removeDataLocal = (key) => {
  // eslint-disable-next-line no-undef
  localStorage.removeItem(key)
}

export const generateIdMix = () => {
  let text = ''
  const possible = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'
  for (let i = 0; i < 16; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

/**
 *
 * @param {string} description
 * @param {string} title
 * @param {string} type success|error|info|warn|open|close| at https://ant.design/components/notification/
 */
export const showNotification = (title = null, description = '', type = 'open') => {
  notification[type]({
    message: title,
    description: description || '',
    placement: 'bottomRight',
    className: 'notification-class',
    bottom: 54,
    duration: 10
  })
}

export const destroyNotification = () => {
  notification.destroy()
}

export const shuffle = (array) => {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

export const toLowerCaseNonAccentVietnamese = (strProps) => {
  let str = strProps.toLowerCase()
  //     We can also use this instead of from line 11 to line 17
  //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
  //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
  //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
  //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
  //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
  //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
  //     str = str.replace(/\u0111/g, "d");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, '') // Â, Ê, Ă, Ơ, Ư
  return str
}

export const debounce = (func, timeout = 1000) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => { func.apply(this, args) }, timeout)
  }
}

export const convertObjectToArray = (objConvert) => {
  const peopleArray = Object.keys(objConvert).map(i => objConvert[i])
  return peopleArray
}

export const getLength = (value) => {
  return value ? value.length : 0
}

export const lowerCase = (value) => {
  return value ? value.toLowerCase() : value
}

export const upperCase = (value) => {
  return value ? value.toUpperCase() : value
}

export const validateStringNumOnly = (strNumber) => {
  var reg = /^([0-9a-zA-Z]+)$/
  return reg.test(strNumber)
}

export const validateNumber = (strNumber) => {
  const reg = /^[0-9]+(\.)?[0-9]*$/
  return reg.test(scientificToDecimal(strNumber))
}

export const validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return !re.test(String(email).toLowerCase())
}

export const formatDecimalJavascript = (number) => {
  return Math.round(number * 1e12) / 1e12
}

export const roundingNumber = (number, rounding = 7) => {
  const powNumber = Math.pow(10, parseInt(rounding))
  return Math.floor(number * powNumber) / powNumber
}

export const convertBalanceToWei = (strValue, iDecimal = 18) => {
  var multiplyNum = new bigdecimal.BigDecimal(Math.pow(10, iDecimal))
  var convertValue = new bigdecimal.BigDecimal(String(strValue))
  return multiplyNum.multiply(convertValue).toString().split('.')[0]
}

export const convertWeiToBalance = (strValue, iDecimal = 18) => {
  var multiplyNum = new bigdecimal.BigDecimal(Math.pow(10, iDecimal))
  var convertValue = new bigdecimal.BigDecimal(String(strValue))
  return scientificToDecimal(convertValue.divide(multiplyNum).toString())
}

export const generateId = () => {
  let text = ''
  const possible = 'abcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < 16; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export const trimString = (string) => {
  return string ? string.trim() : ''
}

export const isURL = (str) => {
  // let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
  // if (regexp.test(str)) {
  //   return true
  // } else {
  //   return false
  // }
  // let regexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  // console.log('result', regexp.test(str))
  // return regexp.test(str)
  return validator.isURL(str)
}

export const convertDateFormat = (strTimestamp) => {
  const lang = ReduxService.getCurrentLang()
  let timeStamp
  switch (lang) {
  case 'ja':
    timeStamp = moment(strTimestamp).format('YYYY年MM月DD日')
    break
  case 'cn' :
    timeStamp = moment(strTimestamp).format('YYYY年MM月DD日')
    break
  default:
    timeStamp = moment(strTimestamp).format('DD MMM YYYY')
    break
  }
  return timeStamp
}

export const calculateDiffDate = (date1 = new Date(), date2, type) => {
  const dateNow = moment(date1)
  const dateTxs = moment(date2)
  const payload = dateNow.diff(dateTxs, type)
  return payload
}

export const isValidJSONString = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const isObject = (value) => {
  return value && typeof value === 'object' && value.constructor === Object
}

export const convertMediaArrayToPointerArray = (medias) => {
  let pointerArr = []
  if (medias && medias.length > 0) {
    medias.map(item => {
      if (item && item.objectId) {
        pointerArr.push({
          '__type': 'Pointer',
          'className': 'Media',
          'objectId': item.objectId
        })
      }
    })

    return pointerArr
  } else {
    return medias
  }
}

export const scientificToDecimal = (num) => {
  const sign = Math.sign(num)
  // if the number is in scientific notation remove it
  if (/\d+\.?\d*e[+-]*\d+/i.test(num)) {
    const zero = '0'
    const parts = String(num).toLowerCase().split('e') // split into coeff and exponent
    const e = parts.pop() // store the exponential part
    let l = Math.abs(e) // get the number of zeros
    const direction = e / l // use to determine the zeroes on the left or right
    const coeffArray = parts[0].split('.')

    if (direction === -1) {
      coeffArray[0] = Math.abs(coeffArray[0])
      num = zero + '.' + new Array(l).join(zero) + coeffArray.join('')
    } else {
      const dec = coeffArray[1]
      if (dec) l = l - dec.length
      num = coeffArray.join('') + new Array(l + 1).join(zero)
    }
  }

  if (sign < 0) {
    num = -num
  }

  return num
}

export const isMobileScreen = (width = 768) => {
  return window.innerWidth < width
}

export const checkIsSigned = (userData) => {
  if (userData && userData.token) {
    return true
  }

  return false
}

export const isBottomElement = (el) => {
  return el && el.getBoundingClientRect().bottom <= window.innerHeight
}

export const numberWithCommas = (x) => {
  var parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

export const getCurrentBrowserLanguage = () => {
  let language = navigator.language
  switch (language) {
  case 'en-US':
  case 'en':
    language = 'en'
    break
  case 'ja-JP':
  case 'ja':
  case 'jp':
    language = 'ja'
    break
  case 'zh-CN':
  case 'zh':
  case 'cn':
    language = 'cn'
    break
  case 'vi-VN':
  case 'vi':
    language = 'vi'
    break
  }
  return language
}

export const convertAddressArrToString = (arrAddress, numStart = 4, numEnd = 4) => {
  if (arrAddress.length === 1) {
    return arrAddress[0].substring(0, numStart) + '...' + arrAddress[0].substring(arrAddress[0].length - numEnd, arrAddress[0].length)
  } else if ((arrAddress.length > 1)) {
    let stringTemp = ''
    arrAddress.map((item, index) => {
      index !== arrAddress.length - 1 ? stringTemp += convertAddressArrToString([item]) + '\n' : stringTemp += convertAddressArrToString([item])
    })
  }
}

export const scrollTop = (topProps = 0) => {
  if (window) {
    window.scrollTo({ top: topProps, behavior: 'smooth' })
  }
}

export const getCurrentUrl = (req, fallback) => {
  if (req) {
    // server side request object(req)
    return req.protocol + '://' + req.get('host') + req.originalUrl
  } else if (!(typeof window === 'undefined')) {
    // making sure we are on the client side
    // return window.location.href
    return window.location
  } else {
    return fallback
  }
}

/**
* NAME: countDots
* PARAMS: strString, strLetter
* Count dots in string receive from user input
*/
export const countDots = (strString, strLetter) => {
  let string = strString.toString()
  return (string.match(RegExp(strLetter, 'g')) || []).length
}

export const getBase64FromBlob = (blob) => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = function () {
      var base64data = reader.result
      resolve(base64data)
    }
  })
}

export const base64toBlob = (data) => {
  // Cut the prefix `data:application/pdf;base64` from the raw base 64
  const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length)

  const bytes = Buffer.from(base64WithoutPrefix, 'base64')
  let length = bytes.length
  let out = new Uint8Array(length)

  while (length--) {
    out[length] = bytes.charCodeAt(length)
  }

  return new Blob([out], { type: 'application/pdf' })
}

export const dataURLToBlob = (dataURL) => {
  var parts = dataURL.split(';base64,')
  var contentType = parts[0].split(':')[1]
  var raw = Buffer.from(parts[1], 'base64')
  var rawLength = raw.length
  var uInt8Array = new Uint8Array(rawLength)

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  return new Blob([uInt8Array], { type: contentType })
}

export const calculateAspectRatioFit = (srcWidth, srcHeight, maxWidth = 500, maxHeight = 500) => {
  var ratio = (Math.min(maxWidth / srcWidth, maxHeight / srcHeight))
  return { width: Math.floor(srcWidth * ratio), height: Math.floor(srcHeight * ratio) }
}

export const isUserDeniedTransaction = (err = null) => {
  err = isObject(err) ? err : { message: err.toString() }
  const deninedMsg = 'User denied transaction signature'
  const rejectReq = 'Failed or Rejected Request'
  return (err.message && err.message.includes(deninedMsg)) || (err.message && err.message.includes(rejectReq)) || (err.stack && err.stack.includes(deninedMsg))
}

export const replaceHttps = (url) => {
  let str = url.toString()
  if (str.indexOf('https') === -1) {
    str = str.replace('http', 'https')
  }
  return str
}

export const zeroPadLeft = (text, length = 64) => {
  while (text.length < length) {
    text = '0' + text
  }
  return text
}

export const isEthereumNetwork = (id) => {
  let chainId = Number(id)
  if ([1, 2, 3, 4, 42].includes(chainId)) {
    return true
  }
  return false
}

// export const routeLinkScanWithAddress = (accountAddress, chain = chainType.ether) => {
//   handleOpenUrl(`${settings().web3Link[chain].linkScan + accountAddress}`)
// }

// Only send address if you want to generate data for send
export const generateDataToken = (amount = 0, address) => {
  const transferOpCode = '0xa9059cbb'
  const ABIValueToTransfer = zeroPadLeft(converter.decToHex(amount.toString().split('.')[0]).replace('0x', ''), 64)

  if (address) {
    const ethNakedAddress = address.toLowerCase().replace('0x', '')
    const ABIAddressTarget = zeroPadLeft(ethNakedAddress, 64)
    return transferOpCode + ABIAddressTarget + ABIValueToTransfer
  } else {
    return transferOpCode + ABIValueToTransfer
  }
}

export const randomInfuraKey = () => {
  const keys = []
  for (let index = 0; index < 23; index++) {
    const infuraIndex = 'INFURA_KEY_' + index
    keys.push(process.env['INFURA_KEY_1'])
  }
  const key = keys[Math.floor(Math.random() * keys.length)]
  return key
}

export const validateAddress = (strAddress) => {
  var reg = ''
  if (!strAddress.startsWith('0x')) {
    return false
  }

  if (countDots(strAddress, '\\x') > 1) {
    reg = /^([A-Fa-f0-9_]+)$/
  } else {
    reg = /^([A-Fa-f0-9_x]+)$/
  }

  return reg.test(strAddress)
}

export const negative = (number) => {
  return !Object.is(Math.abs(number), +number)
}
