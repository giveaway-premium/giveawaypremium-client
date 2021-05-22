module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./common/constants.js":
/*!*****************************!*\
  !*** ./common/constants.js ***!
  \*****************************/
/*! exports provided: NULL_ADDRESS, KEY_STORE, REQUEST_TYPE, LOCALE_DATA, WEB3_RPC, NETWORK, OBSERVER_KEY, GAS_PRICE_DEFAULT, DEEP_LINKING, linkSupport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NULL_ADDRESS", function() { return NULL_ADDRESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KEY_STORE", function() { return KEY_STORE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_TYPE", function() { return REQUEST_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOCALE_DATA", function() { return LOCALE_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEB3_RPC", function() { return WEB3_RPC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NETWORK", function() { return NETWORK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OBSERVER_KEY", function() { return OBSERVER_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAS_PRICE_DEFAULT", function() { return GAS_PRICE_DEFAULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEEP_LINKING", function() { return DEEP_LINKING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linkSupport", function() { return linkSupport; });
const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
const KEY_STORE = {
  SET_LOCALE: 'SET_LOCALE',
  SET_USER: 'SET_USER',
  SET_LOADING: 'SET_LOADING',
  SET_SETTING: 'SET_SETTING',
  SET_TRANSFER_DATA: 'SET_TRANSFER_DATA',
  SET_WALLET_CONNECT: 'SET_WALLET_CONNECT',
  SET_GAS_PRICE: 'SET_GAS_PRICE',
  SET_GAS_CURRENT: 'SET_GAS_CURRENT'
};
const REQUEST_TYPE = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
};
const LOCALE_DATA = {
  JA: 'ja',
  CN: 'cn',
  EN: 'en'
};
const WEB3_RPC = {
  1: 'https://mainnet.infura.io/v3/',
  4: 'https://rinkeby.infura.io/v3/',
  42: 'https://kovan.infura.io/v3/',
  88: 'https://rpc.tomochain.com',
  89: 'https://rpc.testnet.tomochain.com',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  56: 'https://bsc-dataseed.binance.org/',
  128: 'https://http-mainnet.hecochain.com',
  256: 'https://http-testnet.hecochain.com'
};
const NETWORK = {
  DEVELOPMENT: {
    'ETH': 42,
    'TOMO': 89,
    'BSC': 97,
    'HECO': 256
  },
  PRODUCTION: {
    'ETH': 1,
    'TOMO': 88,
    'BSC': 56,
    'HECO': 128
  }
};
const OBSERVER_KEY = {
  SIGN_IN: 'SIGN_IN',
  ALREADY_SIGNED: 'ALREADY_SIGNED',
  CHANGED_ACCOUNT: 'CHANGED_ACCOUNT'
};
const GAS_PRICE_DEFAULT = {
  slow: 3,
  medium: 4,
  fast: 20
};
const DEEP_LINKING = {
  KEYRING: 'https://keyring.app/wc?uri=',
  PANTOGRAPH: ''
};
const linkSupport = {
  METAMASK_CHROME: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en',
  METAMASK_FIREFOX: 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/',
  PANTOGRAPH_CHROME: 'https://chrome.google.com/webstore/detail/pantograph/ocfgfhicacgipgpiapepehhpidbhijkl?hl=en',
  PANTOGRAPH_FIREFOX: 'https://addons.mozilla.org/vi/firefox/addon/pantograph/',
  HB_IOS: 'https://itunes.apple.com/vn/app/hb-wallet/id1273639572?mt=8',
  HB_GOOGLE: 'https://play.google.com/store/apps/details?id=co.bacoor.android.hbwallet',
  HB_WALLET_NAGEMON: 'hbwallet://nagemon',
  HB_WALLET_WEBSITE: 'https://www.hb-wallet.com/',
  HB_WALLET_NAGEMON_QRCAN: 'hbwallet://nagemon/scanQR',
  PANTOGRAPH_IOS: 'https://apps.apple.com/vn/app/pantograph-networking-app/id1504033778',
  PANTOGRAPH_GOOGLE: 'https://play.google.com/store/apps/details?id=pantograph.bacoor.crypto.co',
  PANTOGRAPH_DEEP_LINK: 'pantograph://openbrowser',
  PRODUCT_LINK: 'https://pantograph.app/check-url-available',
  DEMO_LINK: 'https://demo.pantograph.app/check-url-available',
  PANTOGRAPH_INSTALL: 'https://pantograph.app/install-app',
  PANTOGRAPH_NFT_SCAN: 'pantograph://nft-card/xxxxxxx',
  KEYRING: 'https://keyring.app/wc?uri='
};

/***/ }),

/***/ "./common/function.js":
/*!****************************!*\
  !*** ./common/function.js ***!
  \****************************/
/*! exports provided: saveDataLocal, getDataLocal, removeDataLocal, showNotification, destroyNotification, shuffle, convertObjectToArray, getLength, lowerCase, upperCase, validateStringNumOnly, validateNumber, validateEmail, formatDecimalJavascript, roundingNumber, convertBalanceToWei, convertWeiToBalance, generateId, trimString, isURL, convertDateFormat, calculateDiffDate, isValidJSONString, isObject, scientificToDecimal, isMobileScreen, checkIsSigned, numberWithCommas, getCurrentBrowserLanguage, convertAddressArrToString, scrollTop, countDots, getBase64FromBlob, dataURLToBlob, calculateAspectRatioFit, isUserDeniedTransaction, replaceHttps, zeroPadLeft, isEthereumNetwork, generateDataToken, randomInfuraKey, validateAddress, negative */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveDataLocal", function() { return saveDataLocal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataLocal", function() { return getDataLocal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeDataLocal", function() { return removeDataLocal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showNotification", function() { return showNotification; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destroyNotification", function() { return destroyNotification; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shuffle", function() { return shuffle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertObjectToArray", function() { return convertObjectToArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLength", function() { return getLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lowerCase", function() { return lowerCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "upperCase", function() { return upperCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateStringNumOnly", function() { return validateStringNumOnly; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateNumber", function() { return validateNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateEmail", function() { return validateEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDecimalJavascript", function() { return formatDecimalJavascript; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roundingNumber", function() { return roundingNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertBalanceToWei", function() { return convertBalanceToWei; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertWeiToBalance", function() { return convertWeiToBalance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateId", function() { return generateId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimString", function() { return trimString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isURL", function() { return isURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertDateFormat", function() { return convertDateFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateDiffDate", function() { return calculateDiffDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidJSONString", function() { return isValidJSONString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scientificToDecimal", function() { return scientificToDecimal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMobileScreen", function() { return isMobileScreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkIsSigned", function() { return checkIsSigned; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numberWithCommas", function() { return numberWithCommas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentBrowserLanguage", function() { return getCurrentBrowserLanguage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertAddressArrToString", function() { return convertAddressArrToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollTop", function() { return scrollTop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "countDots", function() { return countDots; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBase64FromBlob", function() { return getBase64FromBlob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataURLToBlob", function() { return dataURLToBlob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateAspectRatioFit", function() { return calculateAspectRatioFit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUserDeniedTransaction", function() { return isUserDeniedTransaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceHttps", function() { return replaceHttps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zeroPadLeft", function() { return zeroPadLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEthereumNetwork", function() { return isEthereumNetwork; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateDataToken", function() { return generateDataToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomInfuraKey", function() { return randomInfuraKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateAddress", function() { return validateAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negative", function() { return negative; });
/* harmony import */ var _babel_runtime_corejs2_core_js_object_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/is */ "./node_modules/@babel/runtime-corejs2/core-js/object/is.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_is__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_is__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ "./node_modules/@babel/runtime-corejs2/core-js/promise.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-int */ "./node_modules/@babel/runtime-corejs2/core-js/parse-int.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/keys */ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! validator */ "validator");
/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(validator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var hex2dec__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! hex2dec */ "hex2dec");
/* harmony import */ var hex2dec__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(hex2dec__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./redux */ "./common/redux.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var bigdecimal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! bigdecimal */ "bigdecimal");
/* harmony import */ var bigdecimal__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(bigdecimal__WEBPACK_IMPORTED_MODULE_10__);











const saveDataLocal = function (key, data) {
  // eslint-disable-next-line no-undef
  localStorage.setItem(key, _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_4___default()(data));
};
const getDataLocal = function (key) {
  // eslint-disable-next-line no-undef
  return JSON.parse(localStorage.getItem(key));
};
const removeDataLocal = function (key) {
  // eslint-disable-next-line no-undef
  localStorage.removeItem(key);
};
/**
 *
 * @param {string} description
 * @param {string} title
 * @param {string} type success|error|info|warn|open|close| at https://ant.design/components/notification/
 */

const showNotification = function (title = null, description = '', type = 'open') {
  antd__WEBPACK_IMPORTED_MODULE_9__["notification"][type]({
    message: title,
    description: description || '',
    placement: 'bottomRight',
    className: 'notification-class',
    bottom: 54,
    duration: 10
  });
};
const destroyNotification = function () {
  antd__WEBPACK_IMPORTED_MODULE_9__["notification"].destroy();
};
const shuffle = function (array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex; // While there remain elements to shuffle...

  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1; // And swap it with the current element.

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
const convertObjectToArray = function (objConvert) {
  const peopleArray = _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_3___default()(objConvert).map(function (i) {
    return objConvert[i];
  });

  return peopleArray;
};
const getLength = function (value) {
  return value ? value.length : 0;
};
const lowerCase = function (value) {
  return value ? value.toLowerCase() : value;
};
const upperCase = function (value) {
  return value ? value.toUpperCase() : value;
};
const validateStringNumOnly = function (strNumber) {
  var reg = /^([0-9a-zA-Z]+)$/;
  return reg.test(strNumber);
};
const validateNumber = function (strNumber) {
  const reg = /^[0-9]+(\.)?[0-9]*$/;
  return reg.test(scientificToDecimal(strNumber));
};
const validateEmail = function (email) {
  // eslint-disable-next-line no-useless-escape
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(String(email).toLowerCase());
};
const formatDecimalJavascript = function (number) {
  return Math.round(number * 1e12) / 1e12;
};
const roundingNumber = function (number, rounding = 7) {
  const powNumber = Math.pow(10, _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_2___default()(rounding));
  return Math.floor(number * powNumber) / powNumber;
};
const convertBalanceToWei = function (strValue, iDecimal = 18) {
  var multiplyNum = new bigdecimal__WEBPACK_IMPORTED_MODULE_10___default.a.BigDecimal(Math.pow(10, iDecimal));
  var convertValue = new bigdecimal__WEBPACK_IMPORTED_MODULE_10___default.a.BigDecimal(String(strValue));
  return multiplyNum.multiply(convertValue).toString().split('.')[0];
};
const convertWeiToBalance = function (strValue, iDecimal = 18) {
  var multiplyNum = new bigdecimal__WEBPACK_IMPORTED_MODULE_10___default.a.BigDecimal(Math.pow(10, iDecimal));
  var convertValue = new bigdecimal__WEBPACK_IMPORTED_MODULE_10___default.a.BigDecimal(String(strValue));
  return scientificToDecimal(convertValue.divide(multiplyNum).toString());
};
const generateId = function () {
  let text = '';
  const possible = 'abcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < 16; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};
const trimString = function (string) {
  return string ? string.trim() : '';
};
const isURL = function (str) {
  // let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
  // if (regexp.test(str)) {
  //   return true
  // } else {
  //   return false
  // }
  // let regexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  // console.log('result', regexp.test(str))
  // return regexp.test(str)
  return validator__WEBPACK_IMPORTED_MODULE_5___default.a.isURL(str);
};
const convertDateFormat = function (strTimestamp) {
  const lang = _redux__WEBPACK_IMPORTED_MODULE_8__["default"].getCurrentLang();
  let timeStamp;

  switch (lang) {
    case 'ja':
      timeStamp = moment__WEBPACK_IMPORTED_MODULE_6___default()(strTimestamp).format('YYYY年MM月DD日');
      break;

    case 'cn':
      timeStamp = moment__WEBPACK_IMPORTED_MODULE_6___default()(strTimestamp).format('YYYY年MM月DD日');
      break;

    default:
      timeStamp = moment__WEBPACK_IMPORTED_MODULE_6___default()(strTimestamp).format('DD MMM YYYY');
      break;
  }

  return timeStamp;
};
const calculateDiffDate = function (date1 = new Date(), date2, type) {
  const dateNow = moment__WEBPACK_IMPORTED_MODULE_6___default()(date1);
  const dateTxs = moment__WEBPACK_IMPORTED_MODULE_6___default()(date2);
  const payload = dateNow.diff(dateTxs, type);
  return payload;
};
const isValidJSONString = function (str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
};
const isObject = function (value) {
  return value && typeof value === 'object' && value.constructor === Object;
};
const scientificToDecimal = function (num) {
  const sign = Math.sign(num); // if the number is in scientific notation remove it

  if (/\d+\.?\d*e[+-]*\d+/i.test(num)) {
    const zero = '0';
    const parts = String(num).toLowerCase().split('e'); // split into coeff and exponent

    const e = parts.pop(); // store the exponential part

    let l = Math.abs(e); // get the number of zeros

    const direction = e / l; // use to determine the zeroes on the left or right

    const coeffArray = parts[0].split('.');

    if (direction === -1) {
      coeffArray[0] = Math.abs(coeffArray[0]);
      num = zero + '.' + new Array(l).join(zero) + coeffArray.join('');
    } else {
      const dec = coeffArray[1];
      if (dec) l = l - dec.length;
      num = coeffArray.join('') + new Array(l + 1).join(zero);
    }
  }

  if (sign < 0) {
    num = -num;
  }

  return num;
};
const isMobileScreen = function (width = 768) {
  return window.innerWidth < width;
};
const checkIsSigned = function (userData) {
  if (userData && userData.token) {
    return true;
  }

  return false;
};
const numberWithCommas = function (x) {
  var parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};
const getCurrentBrowserLanguage = function () {
  let language = navigator.language;

  switch (language) {
    case 'en-US':
    case 'en':
      language = 'en';
      break;

    case 'ja-JP':
    case 'ja':
    case 'jp':
      language = 'ja';
      break;

    case 'zh-CN':
    case 'zh':
    case 'cn':
      language = 'cn';
      break;

    case 'vi-VN':
    case 'vi':
      language = 'vi';
      break;
  }

  return language;
};
const convertAddressArrToString = function (arrAddress, numStart = 4, numEnd = 4) {
  if (arrAddress.length === 1) {
    return arrAddress[0].substring(0, numStart) + '...' + arrAddress[0].substring(arrAddress[0].length - numEnd, arrAddress[0].length);
  } else if (arrAddress.length > 1) {
    let stringTemp = '';
    arrAddress.map(function (item, index) {
      index !== arrAddress.length - 1 ? stringTemp += convertAddressArrToString([item]) + '\n' : stringTemp += convertAddressArrToString([item]);
    });
  }
};
const scrollTop = function () {
  if (window) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};
/**
* NAME: countDots
* PARAMS: strString, strLetter
* Count dots in string receive from user input
*/

const countDots = function (strString, strLetter) {
  let string = strString.toString();
  return (string.match(RegExp(strLetter, 'g')) || []).length;
};
const getBase64FromBlob = function (blob) {
  return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1___default.a(function (resolve, reject) {
    var reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onloadend = function () {
      var base64data = reader.result;
      resolve(base64data);
    };
  });
};
const dataURLToBlob = function (dataURL) {
  var parts = dataURL.split(';base64,');
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], {
    type: contentType
  });
};
const calculateAspectRatioFit = function (srcWidth, srcHeight, maxWidth = 500, maxHeight = 500) {
  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  return {
    width: Math.floor(srcWidth * ratio),
    height: Math.floor(srcHeight * ratio)
  };
};
const isUserDeniedTransaction = function (err = null) {
  err = isObject(err) ? err : {
    message: err.toString()
  };
  const deninedMsg = 'User denied transaction signature';
  const rejectReq = 'Failed or Rejected Request';
  return err.message && err.message.includes(deninedMsg) || err.message && err.message.includes(rejectReq) || err.stack && err.stack.includes(deninedMsg);
};
const replaceHttps = function (url) {
  let str = url.toString();

  if (str.indexOf('https') === -1) {
    str = str.replace('http', 'https');
  }

  return str;
};
const zeroPadLeft = function (text, length = 64) {
  while (text.length < length) {
    text = '0' + text;
  }

  return text;
};
const isEthereumNetwork = function (id) {
  let chainId = Number(id);

  if ([1, 2, 3, 4, 42].includes(chainId)) {
    return true;
  }

  return false;
}; // export const routeLinkScanWithAddress = (accountAddress, chain = chainType.ether) => {
//   handleOpenUrl(`${settings().web3Link[chain].linkScan + accountAddress}`)
// }
// Only send address if you want to generate data for send

const generateDataToken = function (amount = 0, address) {
  const transferOpCode = '0xa9059cbb';
  const ABIValueToTransfer = zeroPadLeft(hex2dec__WEBPACK_IMPORTED_MODULE_7___default.a.decToHex(amount.toString().split('.')[0]).replace('0x', ''), 64);

  if (address) {
    const ethNakedAddress = address.toLowerCase().replace('0x', '');
    const ABIAddressTarget = zeroPadLeft(ethNakedAddress, 64);
    return transferOpCode + ABIAddressTarget + ABIValueToTransfer;
  } else {
    return transferOpCode + ABIValueToTransfer;
  }
};
const randomInfuraKey = function () {
  const keys = [];

  for (let index = 0; index < 23; index++) {
    const infuraIndex = 'INFURA_KEY_' + index;
    keys.push(process.env['INFURA_KEY_1']);
  }

  const key = keys[Math.floor(Math.random() * keys.length)];
  return key;
};
const validateAddress = function (strAddress) {
  var reg = '';

  if (!strAddress.startsWith('0x')) {
    return false;
  }

  if (countDots(strAddress, '\\x') > 1) {
    reg = /^([A-Fa-f0-9_]+)$/;
  } else {
    reg = /^([A-Fa-f0-9_x]+)$/;
  }

  return reg.test(strAddress);
};
const negative = function (number) {
  return !_babel_runtime_corejs2_core_js_object_is__WEBPACK_IMPORTED_MODULE_0___default()(Math.abs(number), +number);
};

/***/ }),

/***/ "./common/redux.js":
/*!*************************!*\
  !*** ./common/redux.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReduxServices; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _controller_Redux_store_configureStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controller/Redux/store/configureStore */ "./controller/Redux/store/configureStore.js");
/* harmony import */ var _controller_Redux_actions_pageActions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controller/Redux/actions/pageActions */ "./controller/Redux/actions/pageActions.js");
/* harmony import */ var _controller_Redux_actions_storageActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controller/Redux/actions/storageActions */ "./controller/Redux/actions/storageActions.js");
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./function */ "./common/function.js");






const window = __webpack_require__(/*! global/window */ "global/window");

class ReduxServices {
  static async callDispatchAction(action) {
    _controller_Redux_store_configureStore__WEBPACK_IMPORTED_MODULE_1__["default"].dispatch(action);
  }

  static async refreshInternet(isConnect, isChange) {
    const {
      locale
    } = _controller_Redux_store_configureStore__WEBPACK_IMPORTED_MODULE_1__["default"].getState();
    const {
      messages
    } = locale;

    if (isConnect) {
      isChange && Object(_function__WEBPACK_IMPORTED_MODULE_4__["showNotification"])(messages.warnInternerOnline);
    } else {
      Object(_function__WEBPACK_IMPORTED_MODULE_4__["showNotification"])(messages.warnInternerOffline);
    }

    ReduxServices.callDispatchAction(_controller_Redux_actions_pageActions__WEBPACK_IMPORTED_MODULE_2__["default"].setInternet(isConnect));
  }

  static detectBrowserLanguage() {
    const lang = window.pantographLanguage || Object(_function__WEBPACK_IMPORTED_MODULE_4__["getCurrentBrowserLanguage"])();
    ReduxServices.callDispatchAction(_controller_Redux_actions_storageActions__WEBPACK_IMPORTED_MODULE_3__["default"].setLocale(lang));
  }

  static getCurrentLang() {
    const {
      locale
    } = _controller_Redux_store_configureStore__WEBPACK_IMPORTED_MODULE_1__["default"].getState();
    return locale.lang || 'en';
  }

  static getLocale() {
    const {
      locale
    } = _controller_Redux_store_configureStore__WEBPACK_IMPORTED_MODULE_1__["default"].getState();
    return locale || {};
  }

  static getCurrentNetwork() {
    const {
      network
    } = _controller_Redux_store_configureStore__WEBPACK_IMPORTED_MODULE_1__["default"].getState();
    return network || 1;
  }

  static checkIsSigned() {
    const {
      userData
    } = _controller_Redux_store_configureStore__WEBPACK_IMPORTED_MODULE_1__["default"].getState();

    if (userData && userData.token) {
      return true;
    }

    return false;
  }

  static setTransferData(transferData) {
    ReduxServices.callDispatchAction(_controller_Redux_actions_storageActions__WEBPACK_IMPORTED_MODULE_3__["default"].setTransferData(Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, transferData)));
  }

  static loginWalletConnect(tokenJWT, chainId, callback = null, callbackErr = null) {}

  static changePositionBackGround() {
    (function () {
      // Add event listener
      document.addEventListener('mousemove', parallax);
      const elem = document.querySelector('#parallax'); // Magic happens here

      function parallax(e) {
        // let _w = window.innerWidth / 2
        // let _h = window.innerHeight / 2
        // let _mouseX = e.clientX
        // let _mouseY = e.clientY
        let _depth1 = `50%  50%`;
        let _depth2 = `50%  50%`;
        let _depth3 = `50%  50%`;
        let x = `${_depth3}, ${_depth2}, ${_depth1}`; // console.log(x)

        elem.style.backgroundPosition = x;
      }
    })();
  }

  static getAuthKeyBearer() {
    const {
      userData
    } = _controller_Redux_store_configureStore__WEBPACK_IMPORTED_MODULE_1__["default"].getState();

    if (userData && userData.token) {
      return userData.token;
    } else {
      return '';
    }
  }

  static setUserToken(result) {
    const {
      userData
    } = _controller_Redux_store_configureStore__WEBPACK_IMPORTED_MODULE_1__["default"].getState();

    if (result && result.sessionToken) {
      ReduxServices.callDispatchAction(_controller_Redux_actions_storageActions__WEBPACK_IMPORTED_MODULE_3__["default"].setUserData(Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, userData, {
        token: result.sessionToken,
        name: result.fullName,
        objectId: result.objectId
      })));
    }
  }

  static deleteUserToken() {
    ReduxServices.callDispatchAction(_controller_Redux_actions_storageActions__WEBPACK_IMPORTED_MODULE_3__["default"].setUserData({}));
  }

  static async detectConnection(baseUrl) {// const { walletConnect } = storeRedux.getState()
  }

  static getConnection(chainId) {}

  static updateConnection(data) {}

  static removeConnection(chainId) {} //


  static async refreshTokensHolding() {}

  static async getGasPrice() {}

  static async getGasCurrent() {}

  static async getETHTokensHolding(address) {}

}

/***/ }),

/***/ "./common/routes.js":
/*!**************************!*\
  !*** ./common/routes.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const routes = __webpack_require__(/*! next-routes */ "next-routes");

module.exports = routes() // pages route
.add('/transaction/start', 'Screen/Transaction/start').add('/transaction/succeeded', 'Screen/Transaction/succeeded').add('/kygui', 'Screen/Consignment').add('/gioithieu', 'Screen/AboutUs').add('/muasam', 'Screen/Store') // main routes
.add('/', 'Screen/HomeScreen').add('/admin', 'Screen/DashBoard').add('/error', 'pages/_error');

/***/ }),

/***/ "./config/images/index.js":
/*!********************************!*\
  !*** ./config/images/index.js ***!
  \********************************/
/*! exports provided: images */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "images", function() { return images; });
const images = {
  logoHeaderWhite: __webpack_require__(/*! ../../static/Assets/Image/Icon/logoHeaderWhite.svg */ "./static/Assets/Image/Icon/logoHeaderWhite.svg"),
  logoHeaderBlack: __webpack_require__(/*! ../../static/Assets/Image/Icon/logoHeaderBlack.svg */ "./static/Assets/Image/Icon/logoHeaderBlack.svg"),
  giveawayTextWhite: __webpack_require__(/*! ../../static/Assets/Image/Icon/giveawayTextWhite.svg */ "./static/Assets/Image/Icon/giveawayTextWhite.svg"),
  giveawayTextBlack: __webpack_require__(/*! ../../static/Assets/Image/Icon/giveawayTextBlack.svg */ "./static/Assets/Image/Icon/giveawayTextBlack.svg"),
  aLogoBlack: __webpack_require__(/*! ../../static/Assets/Image/Icon/ALogoBlack.svg */ "./static/Assets/Image/Icon/ALogoBlack.svg"),
  aLogoWhite: __webpack_require__(/*! ../../static/Assets/Image/Icon/ALogoWhite.svg */ "./static/Assets/Image/Icon/ALogoWhite.svg"),
  instagramIcon: __webpack_require__(/*! ../../static/Assets/Image/Icon/instagramIcon.svg */ "./static/Assets/Image/Icon/instagramIcon.svg"),
  facebookIcon: __webpack_require__(/*! ../../static/Assets/Image/Icon/facebookIcon.svg */ "./static/Assets/Image/Icon/facebookIcon.svg"),
  consignmentForm: __webpack_require__(/*! ../../static/Assets/Image/Lottie/consignmentForm.json */ "./static/Assets/Image/Lottie/consignmentForm.json"),
  successJson: __webpack_require__(/*! ../../static/Assets/Image/Lottie/success.json */ "./static/Assets/Image/Lottie/success.json"),
  rightArrowJson: __webpack_require__(/*! ../../static/Assets/Image/Lottie/rightArrow.json */ "./static/Assets/Image/Lottie/rightArrow.json"),
  founderAvatar: __webpack_require__(/*! ../../static/Assets/Image/founder-avater.jpeg */ "./static/Assets/Image/founder-avater.jpeg"),
  timeLine: __webpack_require__(/*! ../../static/Assets/Image/homeScreen/timeLine.jpg */ "./static/Assets/Image/homeScreen/timeLine.jpg"),
  favicon: __webpack_require__(/*! ../../static/favicon.png */ "./static/favicon.png"),
  threeDots: __webpack_require__(/*! ../../static/Assets/Image/Common/three-dots.svg */ "./static/Assets/Image/Common/three-dots.svg"),
  error: __webpack_require__(/*! ../../static/Assets/Image/Common/error.png */ "./static/Assets/Image/Common/error.png"),
  pageNotFound: __webpack_require__(/*! ../../static/Assets/Image/Common/404.svg */ "./static/Assets/Image/Common/404.svg"),
  flags: {
    'en': __webpack_require__(/*! ../../static/Assets/Image/Flags/en.png */ "./static/Assets/Image/Flags/en.png"),
    'ja': __webpack_require__(/*! ../../static/Assets/Image/Flags/ja.png */ "./static/Assets/Image/Flags/ja.png"),
    'cn': __webpack_require__(/*! ../../static/Assets/Image/Flags/cn.png */ "./static/Assets/Image/Flags/cn.png")
  }
};

/***/ }),

/***/ "./controller/Api/Services/Gap.js":
/*!****************************************!*\
  !*** ./controller/Api/Services/Gap.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Gap; });
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/constants */ "./common/constants.js");
/* harmony import */ var _common_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/redux */ "./common/redux.js");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! query-string */ "query-string");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_3__);




class Gap {
  static logInAdmin(username, password) {
    const queryBody = {
      username: username,
      password: password
    };
    return this.fetchData('/login', _common_constants__WEBPACK_IMPORTED_MODULE_1__["REQUEST_TYPE"].GET, queryBody, null, null, null, null, true);
  } // Appointment


  static async getAppointmentWithDate(dateArray) {
    const customQuery = `where={"date":{"$in":[${[...dateArray]}]}}`;
    return this.fetchData('/classes/AppointmentSchedule', _common_constants__WEBPACK_IMPORTED_MODULE_1__["REQUEST_TYPE"].GET, null, null, null, null, customQuery);
  }

  static async getAppointmentWithSlotId(slotID) {
    const customQuery = `where={"slot":${slotID}}`;
    return this.fetchData('/classes/AppointmentSchedule', _common_constants__WEBPACK_IMPORTED_MODULE_1__["REQUEST_TYPE"].GET, null, null, null, null, customQuery);
  }

  static async setAppointment(formData, slotID, formatedTime, formatedDay) {
    const res = await this.getAppointmentWithSlotId(slotID);

    if (res && res.results && res.results.length === 0) {
      const body = {
        slot: slotID,
        date: formatedDay,
        dateTime: formatedTime,
        agency: {
          '__type': 'Pointer',
          'className': 'Agency',
          'objectId': 'KcPHTActcd'
        },
        // we need set more agency after
        customerName: formData.customerName,
        phoneNumber: formData.phoneNumber,
        numberOfProduct: `${formData.numberOfProduct}`
      };
      return this.fetchData('/classes/AppointmentSchedule', _common_constants__WEBPACK_IMPORTED_MODULE_1__["REQUEST_TYPE"].POST, null, body);
    } else {
      return false;
    }
  } // Consignment Group


  static async getConsignmentID() {
    const queryBody = {
      count: true
    };
    return this.fetchData('/classes/ConsignmentGroup', _common_constants__WEBPACK_IMPORTED_MODULE_1__["REQUEST_TYPE"].GET, queryBody);
  }

  static async setConsignmentID(tag) {
    const body = {
      code: tag.code,
      timeGetMoney: tag.timeGetMoney
    };
    return this.fetchData('/classes/ConsignmentGroup', _common_constants__WEBPACK_IMPORTED_MODULE_1__["REQUEST_TYPE"].POST, null, body);
  }

  static async deleteConsignmentID(objectId) {
    try {
      return this.fetchData(`/classes/ConsignmentGroup/${objectId}`, _common_constants__WEBPACK_IMPORTED_MODULE_1__["REQUEST_TYPE"].DELETE, null);
    } catch (e) {
      console.log(e);
      return false;
    }
  } // Consignment


  static async setConsignment(formData, consigneeData, consignerData, timeGroupId) {
    const body = {
      consignmentId: formData.consignmentId,
      consignerName: formData.consignerName,
      consignerIdCard: formData.consignerIdCard,
      consignee: {
        '__type': 'Pointer',
        'className': '_User',
        'objectId': consigneeData
      },
      consigner: {
        '__type': 'Pointer',
        'className': '_User',
        'objectId': consignerData
      },
      group: {
        '__type': 'Pointer',
        'className': 'ConsignmentGroup',
        'objectId': timeGroupId
      },
      consigneeName: formData.consigneeName,
      phoneNumber: formData.phoneNumber,
      numberOfProducts: Number(formData.numberOfProducts),
      timeGetMoney: formData.timeGetMoney || '',
      banks: [{
        type: formData.bankName,
        accNumber: formData.bankId
      }]
    };
    console.log('body setConsignment');
    console.log(body);
    return this.fetchData('/classes/Consignment', _common_constants__WEBPACK_IMPORTED_MODULE_1__["REQUEST_TYPE"].POST, null, body);
  }

  static async getConsignment(page = 1, keyword = null, limit = 20) {
    let skip = 20 * page - 20;
    const queryBody = {
      limit: limit,
      skip: skip,
      count: true
    };

    if (keyword) {
      const customQuery = `where={"phoneNumber":{"$regex":"${keyword}"}}`;
      return this.fetchData('/classes/Consignment', _common_constants__WEBPACK_IMPORTED_MODULE_1__["REQUEST_TYPE"].GET, queryBody, null, null, null, customQuery);
    } else {
      return this.fetchData('/classes/Consignment', _common_constants__WEBPACK_IMPORTED_MODULE_1__["REQUEST_TYPE"].GET, queryBody);
    }
  }

  static async updateConsignment(item) {
    try {
      const body = {
        consignmentId: item.consignmentId,
        numberOfProducts: Number(item.numberOfProducts),
        numSoldConsignment: Number(item.numSoldConsignment || 0),
        remainNumConsignment: Number(item.numberOfProducts) - Number(item.numSoldConsignment || 0),
        moneyBack: Number(item.moneyBack) || 0,
        isGetMoney: item.isGetMoney || false,
        timeGetMoney: item.timeGetMoney || ''
      };
      console.log('body update consignment', body);
      console.log('item update consignment', item);
      return this.fetchData(`/classes/Consignment/${item.objectId}`, _common_constants__WEBPACK_IMPORTED_MODULE_1__["REQUEST_TYPE"].PUT, null, body);
    } catch (e) {
      console.log(e);
      return false;
    }
  } // Customer


  static async setCustomer(formData) {
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
    };
    return this.fetchData('/classes/_User', _common_constants__WEBPACK_IMPORTED_MODULE_1__["REQUEST_TYPE"].POST, null, body);
  }

  static async updateCustomerTable(formData) {
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
    };
    return this.fetchData(`/classes/_User/${formData.objectId}`, _common_constants__WEBPACK_IMPORTED_MODULE_1__["REQUEST_TYPE"].PUT, null, body, null, null, null, true);
  }

  static async updateCustomer(formData, objectId) {
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
    };
    return this.fetchData(`/classes/_User/${objectId}`, _common_constants__WEBPACK_IMPORTED_MODULE_1__["REQUEST_TYPE"].PUT, null, body, null, null, null, true);
  }

  static async getCustomerTable(page = 1, keyword = null) {
    let limit = 20;
    let skip = 20 * page - 20;
    const queryBody = {
      limit: limit,
      skip: skip,
      count: true
    };

    if (keyword) {
      const customQuery = `where={"role":"customer","phoneNumber":{"$regex":"${keyword}"}}`;
      return this.fetchData('/classes/_User', _common_constants__WEBPACK_IMPORTED_MODULE_1__["REQUEST_TYPE"].GET, queryBody, null, null, null, customQuery);
    } else {
      const customQuery = `where={"role":"customer"}`;
      return this.fetchData('/classes/_User', _common_constants__WEBPACK_IMPORTED_MODULE_1__["REQUEST_TYPE"].GET, queryBody, null, null, null, customQuery);
    }
  }

  static async getCustomer(phoneNumber) {
    const customQuery = `where={"phoneNumber":"${phoneNumber.toString()}"}`;
    return this.fetchData('/classes/_User', _common_constants__WEBPACK_IMPORTED_MODULE_1__["REQUEST_TYPE"].GET, null, null, null, null, customQuery);
  }

  static async fetchData(apiUrl, method, queryBody, postData, hostLink, authKey = '', customQuery = null, isUseAuthKey = false) {
    try {
      const key = authKey || (await _common_redux__WEBPACK_IMPORTED_MODULE_2__["default"].getAuthKeyBearer());
      const HOST = hostLink || "https://giveaway-premium.herokuapp.com/api";
      let header = {
        'X-Parse-Application-Id': "EJKfA5jFxiC98aMbvir0vSAuDHO4NQ7x",
        'X-Parse-REST-API-Key': "6t7KSmWTkxxuvrF3a1jfqT6Vu0suWfEY"
      };

      if (isUseAuthKey) {
        header = {
          'X-Parse-Application-Id': "EJKfA5jFxiC98aMbvir0vSAuDHO4NQ7x",
          'X-Parse-REST-API-Key': "6t7KSmWTkxxuvrF3a1jfqT6Vu0suWfEY",
          'X-Parse-Session-Token': `${key}`
        };
      }

      let params = {
        method: method || _common_constants__WEBPACK_IMPORTED_MODULE_1__["REQUEST_TYPE"].GET,
        headers: header
      };

      if (postData) {
        params.body = _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()(postData);
      }

      let queryStr = queryBody ? '?' + query_string__WEBPACK_IMPORTED_MODULE_3___default.a.stringify(queryBody) : '';

      if (customQuery) {
        queryStr = `?${encodeURI(customQuery)}`;
      }

      const response = await fetch(HOST + apiUrl + queryStr, params);
      const responJson = await response.json();
      return responJson || response;
    } catch (error) {
      return null;
    }
  }

}

/***/ }),

/***/ "./controller/Redux/actions/pageActions.js":
/*!*************************************************!*\
  !*** ./controller/Redux/actions/pageActions.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PageReduxAction; });
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/constants */ "./controller/Redux/lib/constants.js");

class PageReduxAction {
  static setInternet(payload) {
    return {
      type: _lib_constants__WEBPACK_IMPORTED_MODULE_0__["KEY_PAGE"].SET_INTERNET,
      payload
    };
  }

  static setNetwork(payload) {
    return {
      type: _lib_constants__WEBPACK_IMPORTED_MODULE_0__["KEY_PAGE"].SET_NETWORK,
      payload
    };
  }

  static setTokensHolding(payload) {
    return {
      type: _lib_constants__WEBPACK_IMPORTED_MODULE_0__["KEY_PAGE"].SET_TOKENS_HOLDING,
      payload
    };
  }

}

/***/ }),

/***/ "./controller/Redux/actions/storageActions.js":
/*!****************************************************!*\
  !*** ./controller/Redux/actions/storageActions.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StorageActions; });
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../common/constants */ "./common/constants.js");
/* harmony import */ var _common_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/function */ "./common/function.js");


class StorageActions {
  static setLocale(payload) {
    Object(_common_function__WEBPACK_IMPORTED_MODULE_1__["saveDataLocal"])(_common_constants__WEBPACK_IMPORTED_MODULE_0__["KEY_STORE"].SET_LOCALE, payload);
    return {
      type: _common_constants__WEBPACK_IMPORTED_MODULE_0__["KEY_STORE"].SET_LOCALE,
      payload
    };
  }

  static setUserData(payload) {
    Object(_common_function__WEBPACK_IMPORTED_MODULE_1__["saveDataLocal"])(_common_constants__WEBPACK_IMPORTED_MODULE_0__["KEY_STORE"].SET_USER, payload);
    return {
      type: _common_constants__WEBPACK_IMPORTED_MODULE_0__["KEY_STORE"].SET_USER,
      payload
    };
  }

  static setSetting(payload) {
    Object(_common_function__WEBPACK_IMPORTED_MODULE_1__["saveDataLocal"])(_common_constants__WEBPACK_IMPORTED_MODULE_0__["KEY_STORE"].SET_SETTING, payload);
    return {
      type: _common_constants__WEBPACK_IMPORTED_MODULE_0__["KEY_STORE"].SET_SETTING,
      payload
    };
  }

  static setTransferData(payload) {
    Object(_common_function__WEBPACK_IMPORTED_MODULE_1__["saveDataLocal"])(_common_constants__WEBPACK_IMPORTED_MODULE_0__["KEY_STORE"].SET_TRANSFER_DATA, payload);
    return {
      type: _common_constants__WEBPACK_IMPORTED_MODULE_0__["KEY_STORE"].SET_TRANSFER_DATA,
      payload
    };
  }

  static setWalletConnect(payload) {
    Object(_common_function__WEBPACK_IMPORTED_MODULE_1__["saveDataLocal"])(_common_constants__WEBPACK_IMPORTED_MODULE_0__["KEY_STORE"].SET_WALLET_CONNECT, payload);
    return {
      type: _common_constants__WEBPACK_IMPORTED_MODULE_0__["KEY_STORE"].SET_WALLET_CONNECT,
      payload
    };
  }

  static setGasPrice(payload) {
    Object(_common_function__WEBPACK_IMPORTED_MODULE_1__["saveDataLocal"])(_common_constants__WEBPACK_IMPORTED_MODULE_0__["KEY_STORE"].SET_GAS_PRICE, payload);
    return {
      type: _common_constants__WEBPACK_IMPORTED_MODULE_0__["KEY_STORE"].SET_GAS_PRICE,
      payload
    };
  }

  static setGasCurrent(payload) {
    Object(_common_function__WEBPACK_IMPORTED_MODULE_1__["saveDataLocal"])(_common_constants__WEBPACK_IMPORTED_MODULE_0__["KEY_STORE"].SET_GAS_CURRENT, payload);
    return {
      type: _common_constants__WEBPACK_IMPORTED_MODULE_0__["KEY_STORE"].SET_GAS_CURRENT,
      payload
    };
  }

}

/***/ }),

/***/ "./controller/Redux/lib/constants.js":
/*!*******************************************!*\
  !*** ./controller/Redux/lib/constants.js ***!
  \*******************************************/
/*! exports provided: KEY_PAGE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KEY_PAGE", function() { return KEY_PAGE; });
const KEY_PAGE = {
  SET_INTERNET: 'SET_INTERNET',
  SET_NETWORK: 'SET_NETWORK',
  SET_TOKENS_HOLDING: 'SET_TOKENS_HOLDING'
};

/***/ }),

/***/ "./controller/Redux/lib/initState.js":
/*!*******************************************!*\
  !*** ./controller/Redux/lib/initState.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var initState = {
  lang: 'en',
  userData: null,
  walletConnect: [],
  internet: true,
  isloading: true,
  setting: {},
  transferData: {},
  network: 1,
  tokens: [],
  gasPrice: {},
  gasCurrent: 0
};
/* harmony default export */ __webpack_exports__["default"] = (initState);

/***/ }),

/***/ "./controller/Redux/lib/reducerConfig.js":
/*!***********************************************!*\
  !*** ./controller/Redux/lib/reducerConfig.js ***!
  \***********************************************/
/*! exports provided: default, checkLocalStoreToRedux */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkLocalStoreToRedux", function() { return checkLocalStoreToRedux; });
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ "./node_modules/@babel/runtime-corejs2/core-js/promise.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/function */ "./common/function.js");


function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}
const checkLocalStoreToRedux = function (storeRedux, keyStoreNew, action, initData) {
  return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a(function (resolve, reject) {
    try {
      let data = Object(_common_function__WEBPACK_IMPORTED_MODULE_1__["getDataLocal"])(keyStoreNew);

      if (data) {
        data !== initData && storeRedux.dispatch(action(data));
      }

      resolve();
    } catch (error) {
      return resolve();
    }
  });
};

/***/ }),

/***/ "./controller/Redux/reducers/index.js":
/*!********************************************!*\
  !*** ./controller/Redux/reducers/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _pageReducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pageReducers */ "./controller/Redux/reducers/pageReducers.js");
/* harmony import */ var _storageReducers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storageReducers */ "./controller/Redux/reducers/storageReducers.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_3__);




const rootReducer = Object(redux__WEBPACK_IMPORTED_MODULE_3__["combineReducers"])(Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _pageReducers__WEBPACK_IMPORTED_MODULE_1__, _storageReducers__WEBPACK_IMPORTED_MODULE_2__));
/* harmony default export */ __webpack_exports__["default"] = (rootReducer);

/***/ }),

/***/ "./controller/Redux/reducers/pageReducers.js":
/*!***************************************************!*\
  !*** ./controller/Redux/reducers/pageReducers.js ***!
  \***************************************************/
/*! exports provided: internetRedux, network, tokens */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "internetRedux", function() { return internetRedux; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "network", function() { return network; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokens", function() { return tokens; });
/* harmony import */ var _lib_reducerConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/reducerConfig */ "./controller/Redux/lib/reducerConfig.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/constants */ "./controller/Redux/lib/constants.js");
/* harmony import */ var _lib_initState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/initState */ "./controller/Redux/lib/initState.js");



const internetRedux = Object(_lib_reducerConfig__WEBPACK_IMPORTED_MODULE_0__["default"])(_lib_initState__WEBPACK_IMPORTED_MODULE_2__["default"].internet, {
  [_lib_constants__WEBPACK_IMPORTED_MODULE_1__["KEY_PAGE"].SET_INTERNET](state, action) {
    return action.payload;
  }

});
const network = Object(_lib_reducerConfig__WEBPACK_IMPORTED_MODULE_0__["default"])(_lib_initState__WEBPACK_IMPORTED_MODULE_2__["default"].network, {
  [_lib_constants__WEBPACK_IMPORTED_MODULE_1__["KEY_PAGE"].SET_NETWORK](state, action) {
    return action.payload;
  }

});
const tokens = Object(_lib_reducerConfig__WEBPACK_IMPORTED_MODULE_0__["default"])(_lib_initState__WEBPACK_IMPORTED_MODULE_2__["default"].tokens, {
  [_lib_constants__WEBPACK_IMPORTED_MODULE_1__["KEY_PAGE"].SET_TOKENS_HOLDING](state, action) {
    return action.payload;
  }

});

/***/ }),

/***/ "./controller/Redux/reducers/storageReducers.js":
/*!******************************************************!*\
  !*** ./controller/Redux/reducers/storageReducers.js ***!
  \******************************************************/
/*! exports provided: locale, userData, settingRedux, transferDataRedux */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "locale", function() { return locale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userData", function() { return userData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settingRedux", function() { return settingRedux; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transferDataRedux", function() { return transferDataRedux; });
/* harmony import */ var _lib_reducerConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/reducerConfig */ "./controller/Redux/lib/reducerConfig.js");
/* harmony import */ var _static_Assets_Lang_ja_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../static/Assets/Lang/ja.json */ "./static/Assets/Lang/ja.json");
var _static_Assets_Lang_ja_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../../static/Assets/Lang/ja.json */ "./static/Assets/Lang/ja.json", 1);
/* harmony import */ var _static_Assets_Lang_en_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../static/Assets/Lang/en.json */ "./static/Assets/Lang/en.json");
var _static_Assets_Lang_en_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../../static/Assets/Lang/en.json */ "./static/Assets/Lang/en.json", 1);
/* harmony import */ var _static_Assets_Lang_cn_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../static/Assets/Lang/cn.json */ "./static/Assets/Lang/cn.json");
var _static_Assets_Lang_cn_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../../static/Assets/Lang/cn.json */ "./static/Assets/Lang/cn.json", 1);
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/constants */ "./common/constants.js");
/* harmony import */ var _lib_initState__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/initState */ "./controller/Redux/lib/initState.js");






const localeJA = {
  lang: 'ja',
  messages: _static_Assets_Lang_ja_json__WEBPACK_IMPORTED_MODULE_1__
};
const localeEN = {
  lang: 'en',
  messages: _static_Assets_Lang_en_json__WEBPACK_IMPORTED_MODULE_2__
};
const localeCN = {
  lang: 'cn',
  messages: _static_Assets_Lang_cn_json__WEBPACK_IMPORTED_MODULE_3__
};
const locale = Object(_lib_reducerConfig__WEBPACK_IMPORTED_MODULE_0__["default"])(localeEN, {
  [_common_constants__WEBPACK_IMPORTED_MODULE_4__["KEY_STORE"].SET_LOCALE](state, action) {
    switch (action.payload) {
      case 'en':
        return localeEN;

      case 'ja':
        return localeJA;

      case 'cn':
        return localeCN;

      default:
        return localeEN;
    }
  }

});
const userData = Object(_lib_reducerConfig__WEBPACK_IMPORTED_MODULE_0__["default"])(_lib_initState__WEBPACK_IMPORTED_MODULE_5__["default"].userData, {
  [_common_constants__WEBPACK_IMPORTED_MODULE_4__["KEY_STORE"].SET_USER](state, action) {
    return action.payload;
  }

});
const settingRedux = Object(_lib_reducerConfig__WEBPACK_IMPORTED_MODULE_0__["default"])(_lib_initState__WEBPACK_IMPORTED_MODULE_5__["default"].setting, {
  [_common_constants__WEBPACK_IMPORTED_MODULE_4__["KEY_STORE"].SET_SETTING](state, action) {
    return action.payload;
  }

});
const transferDataRedux = Object(_lib_reducerConfig__WEBPACK_IMPORTED_MODULE_0__["default"])(_lib_initState__WEBPACK_IMPORTED_MODULE_5__["default"].transferData, {
  [_common_constants__WEBPACK_IMPORTED_MODULE_4__["KEY_STORE"].SET_TRANSFER_DATA](state, action) {
    return action.payload;
  }

});

/***/ }),

/***/ "./controller/Redux/store/configureStore.js":
/*!**************************************************!*\
  !*** ./controller/Redux/store/configureStore.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-thunk */ "redux-thunk");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reducers */ "./controller/Redux/reducers/index.js");



const middleWare = [redux_thunk__WEBPACK_IMPORTED_MODULE_1___default.a];

var window = __webpack_require__(/*! global/window */ "global/window"); // user redux tools


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux__WEBPACK_IMPORTED_MODULE_0__["compose"]; // const store = createStore(rootReducer, applyMiddleware(...middleWare))

const store = Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(_reducers__WEBPACK_IMPORTED_MODULE_2__["default"], composeEnhancers(Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(...middleWare)));
/* harmony default export */ __webpack_exports__["default"] = (store);

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/json/stringify */ "core-js/library/fn/json/stringify");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/assign.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/assign */ "core-js/library/fn/object/assign");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/define-property */ "core-js/library/fn/object/define-property");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-own-property-descriptor */ "core-js/library/fn/object/get-own-property-descriptor");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-own-property-symbols */ "core-js/library/fn/object/get-own-property-symbols");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/is.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/is.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/is */ "core-js/library/fn/object/is");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/keys.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/keys */ "core-js/library/fn/object/keys");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/parse-int.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/parse-int.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/parse-int */ "core-js/library/fn/parse-int");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/promise.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/promise.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/promise */ "core-js/library/fn/promise");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _defineProperty; });
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _extends; });
/* harmony import */ var _core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/assign */ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js");
/* harmony import */ var _core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__);

function _extends() {
  _extends = _core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default.a || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _objectSpread; });
/* harmony import */ var _core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/get-own-property-descriptor */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js");
/* harmony import */ var _core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-js/object/get-own-property-symbols */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js");
/* harmony import */ var _core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_object_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core-js/object/keys */ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js");
/* harmony import */ var _core_js_object_keys__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_keys__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");




function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    var ownKeys = _core_js_object_keys__WEBPACK_IMPORTED_MODULE_2___default()(source);

    if (typeof _core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default.a === 'function') {
      ownKeys = ownKeys.concat(_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default()(source).filter(function (sym) {
        return _core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_0___default()(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      Object(_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(target, key, source[key]);
    });
  }

  return target;
}

/***/ }),

/***/ "./pages/Components/MyModal/index.js":
/*!*******************************************!*\
  !*** ./pages/Components/MyModal/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "./pages/Components/MyModal/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_3__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;




class MyModal extends react__WEBPACK_IMPORTED_MODULE_1___default.a.Component {
  constructor(props) {
    var _this;

    super(props);
    _this = this;

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "openModal", function (modalContent, config = {
      modalWidth: 480,
      closable: true,
      wrapClassName: ''
    }) {
      _this.setState({
        isShowModal: true,
        modalContent,
        config
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "closeModal", function () {
      _this.setState({
        isShowModal: false,
        modalContent: null
      });

      const {
        customClose
      } = _this.props;
      customClose && customClose();
    });

    this.state = {
      isShowModal: false,
      modalContent: null,
      config: {
        modalWidth: 480,
        closable: true,
        wrapClassName: ''
      }
    };
  }

  componentDidMount() {// code here
  }

  render() {
    const {
      isShowModal,
      modalContent,
      config
    } = this.state;
    return __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
      wrapClassName: config.wrapClassName,
      width: config.modalWidth,
      title: null,
      footer: null,
      centered: true,
      visible: isShowModal,
      onOk: null,
      onCancel: this.closeModal,
      closable: config.closable,
      maskClosable: config.closable
    }, modalContent && modalContent);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MyModal);

/***/ }),

/***/ "./pages/Components/MyModal/style.scss":
/*!*********************************************!*\
  !*** ./pages/Components/MyModal/style.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./pages/Screen/Consignment/components/BookingForm/index.js":
/*!******************************************************************!*\
  !*** ./pages/Screen/Consignment/components/BookingForm/index.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../common/routes */ "./common/routes.js");
/* harmony import */ var _common_routes__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_common_routes__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _common_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../common/redux */ "./common/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _config_images__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../config/images */ "./config/images/index.js");
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-device-detect */ "react-device-detect");
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_device_detect__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _Components_MyModal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../Components/MyModal */ "./pages/Components/MyModal/index.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _controller_Api_Services_Gap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../controller/Api/Services/Gap */ "./controller/Api/Services/Gap.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var react_lottie__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-lottie */ "react-lottie");
/* harmony import */ var react_lottie__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_lottie__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./style.scss */ "./pages/Screen/Consignment/components/BookingForm/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _common_function__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../../common/function */ "./common/function.js");



var __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;















class ConsignmentScreen extends react__WEBPACK_IMPORTED_MODULE_3___default.a.PureComponent {
  static async getInitialProps({
    query
  }) {
    return {
      query
    };
  }

  constructor(props) {
    var _this;

    super(props);
    _this = this;

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "fetchAppointment", async function () {
      const {
        dayBooking
      } = _this.state;
      const arrayDate = [];
      let bookingDataCode = '';
      dayBooking.map(function (itemDate, indexdate) {
        arrayDate.push(`"${itemDate.date}"`);
      });
      const res = await _controller_Api_Services_Gap__WEBPACK_IMPORTED_MODULE_12__["default"].getAppointmentWithDate(arrayDate);

      if (res && res.results) {
        res.results.map(function (itemData, indexItem) {
          if (itemData && itemData.slot) {
            bookingDataCode += '-' + itemData.slot + '-';
          }
        });
      }

      console.log('res');
      console.log(res);
      console.log(bookingDataCode);

      _this.setState({
        bookingDataCode: bookingDataCode
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "translationDate", function (key) {
      switch (key) {
        case 'Sunday':
          return 'Chủ Nhật';

        case 'Monday':
          return 'Thứ hai';

        case 'Tuesday':
          return 'Thứ ba';

        case 'Wednesday':
          return 'Thứ tư';

        case 'Thursday':
          return 'Thứ năm';

        case 'Friday':
          return 'Thứ sáu';

        case 'Saturday':
          return 'Thứ bảy';

        default:
          return key;
      }
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "onChooseDay", function (choosenDay) {
      console.log(choosenDay);

      _this.setState({
        step: 1,
        isHideUserForm: true,
        choosenTimeCode: null,
        choosenDayCode: choosenDay ? choosenDay.dayCode : ''
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "onChooseTime", function (choosenTime) {
      console.log(choosenTime);

      _this.setState({
        step: 1,
        choosenTimeCode: choosenTime ? choosenTime.timeCode : ''
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "onHandleOpenContent", function () {});

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "onConsign", async function () {
      const {
        formData,
        choosenDayCode,
        choosenTimeCode,
        bookingDataCode
      } = _this.state;

      if (choosenTimeCode && choosenDayCode) {
        _this.setState({
          isConsigning: true
        }, async function () {
          console.log('onConsign');
          const formatedTime = choosenTimeCode.substring(0, 2) + ':' + choosenTimeCode.substring(2, 4);
          const formatedDay = choosenDayCode.substring(0, 2) + '-' + choosenDayCode.substring(2, 4) + '-' + choosenDayCode.substring(4, 8);
          const slotID = choosenTimeCode + choosenDayCode;
          const bookingDataCode = _this.state.bookingDataCode + '-' + slotID + '-';
          const res = await _controller_Api_Services_Gap__WEBPACK_IMPORTED_MODULE_12__["default"].setAppointment(formData, slotID, formatedTime, formatedDay);
          console.log('res');
          console.log(res);

          if (res && res.objectId) {
            _this.setState({
              bookingDataCode: bookingDataCode,
              isHideUserForm: true,
              isConsigning: false
            }, function () {
              setTimeout(function () {
                _this.setState({
                  step: 3,
                  isHideDayColumn: true
                });
              }, 1000);
            });
          } else {
            _this.setState({
              isConsigning: false
            }, function () {
              return _this.fetchAppointment();
            });

            Object(_common_function__WEBPACK_IMPORTED_MODULE_16__["showNotification"])('Đặt lịch thất bại!');
          }
        });
      }
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "onHandleStepTwo", function () {
      _this.setState({
        isHideUserForm: false
      }, function () {
        setTimeout(function () {
          _this.setState({
            step: 2
          });
        }, 500);
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "backStepOne", function () {
      _this.setState({
        isHideUserForm: true
      }, function () {
        _this.fetchAppointment();

        setTimeout(function () {
          _this.setState({
            step: 1
          });
        }, 500);
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "resetAndBackProps", function () {
      _this.setState({
        formData: {
          customerName: '',
          phoneNumber: '',
          numberOfProduct: 1
        },
        step: 0,
        isHideDayColumn: false,
        choosenDayCode: null,
        choosenTimeCode: null
      }, function () {
        _this.fetchAppointment();

        _this.props.backConsignment();
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "convertCodeToTime", function () {
      const {
        choosenTimeCode,
        choosenDayCode
      } = _this.state;

      if (choosenTimeCode && choosenDayCode) {
        const formatedTime = choosenTimeCode.substring(0, 2) + ':' + choosenTimeCode.substring(2, 4);
        const formatedDay = choosenDayCode.substring(0, 2) + '-' + choosenDayCode.substring(2, 4) + '-' + choosenDayCode.substring(4, 8);
        return formatedDay + ' ' + formatedTime;
      }

      return '---';
    });

    this.state = {
      dayBooking: [],
      formData: {
        customerName: '',
        phoneNumber: '',
        numberOfProduct: 1
      },
      timeBooking: [{
        timeName: '10:00',
        timeCode: '1000'
      }, {
        timeName: '10:30',
        timeCode: '1030'
      }, {
        timeName: '11:00',
        timeCode: '1100'
      }, {
        timeName: '11:30',
        timeCode: '1130'
      }, {
        timeName: '12:00',
        timeCode: '1200'
      }, {
        timeName: '12:30',
        timeCode: '1230'
      }, {
        timeName: '13:00',
        timeCode: '1300'
      }, {
        timeName: '13:30',
        timeCode: '1330'
      }, {
        timeName: '14:00',
        timeCode: '1400'
      }, {
        timeName: '14:30',
        timeCode: '1430'
      }, {
        timeName: '15:00',
        timeCode: '1500'
      }, {
        timeName: '15:30',
        timeCode: '1530'
      }, {
        timeName: '16:00',
        timeCode: '1600'
      }, {
        timeName: '16:30',
        timeCode: '1630'
      }, {
        timeName: '17:00',
        timeCode: '1700'
      }, {
        timeName: '17:30',
        timeCode: '1730'
      }, {
        timeName: '18:00',
        timeCode: '1800'
      }, {
        timeName: '18:30',
        timeCode: '1830'
      }],
      step: 0,
      isHideUserForm: true,
      isHideDayColumn: false,
      choosenDayCode: null,
      choosenTimeCode: null,
      bookingDataCode: []
    };
    this.myModal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createRef();
  }

  async componentDidMount() {
    var _this2 = this;

    let dayBookingCount = ['', '', '', '', '', '', ''];
    let dayBookingTemp = [];
    console.log('componentDidMount');
    console.log(moment__WEBPACK_IMPORTED_MODULE_11___default()(Date().now));
    dayBookingCount.map(function (item, index) {
      dayBookingTemp.push({
        dayName: moment__WEBPACK_IMPORTED_MODULE_11___default()().add(index, 'day').format('dddd'),
        date: moment__WEBPACK_IMPORTED_MODULE_11___default()().add(index, 'day').format('DD-MM-YYYY'),
        dayCode: moment__WEBPACK_IMPORTED_MODULE_11___default()().add(index, 'day').format('DD-MM-YYYY').replaceAll('-', '')
      });
    });
    this.setState({
      dayBooking: dayBookingTemp
    }, async function () {
      await _this2.fetchAppointment();
    });
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    var _this3 = this;

    const {
      step,
      dayBooking,
      choosenDayCode,
      timeBooking,
      bookingDataCode,
      choosenTimeCode,
      formData,
      isHideUserForm,
      isConsigning,
      isHideDayColumn
    } = this.state;
    const layout = {
      labelCol: {
        span: 9
      },
      wrapperCol: {
        span: 15
      }
    };
    const defaultOptionsSuccess = {
      loop: false,
      autoplay: true,
      animationData: _config_images__WEBPACK_IMPORTED_MODULE_8__["images"].successJson
    };
    return __jsx("div", {
      className: "bookingform-home-container"
    }, __jsx("div", {
      className: "bookingform"
    }, __jsx("div", {
      className: 'dayBooking-box' + (!isHideDayColumn ? ' show' : '')
    }, dayBooking.map(function (dayItem, dayIndex) {
      return __jsx("div", {
        key: dayIndex,
        className: 'day-box',
        onClick: function () {
          return _this3.onChooseDay(dayItem);
        },
        style: choosenDayCode && choosenDayCode === dayItem.dayCode ? {
          borderColor: 'black',
          opacity: 1
        } : choosenDayCode && choosenDayCode !== dayItem.dayCode ? {
          opacity: 0.4
        } : {}
      }, __jsx("span", {
        className: "text day-name"
      }, dayIndex === 0 ? 'Hôm nay' : _this3.translationDate(dayItem.dayName)), __jsx("span", {
        className: "text day-txt"
      }, dayItem.date));
    })), __jsx("div", {
      className: "timeBooking-box"
    }, __jsx("div", {
      className: 'timeBooking-grid' + (step === 1 && isHideUserForm ? ' show' : '')
    }, timeBooking.map(function (itemTime, indexTime) {
      const isReady = !bookingDataCode.includes(choosenTimeCode + choosenDayCode) && itemTime.timeCode === choosenTimeCode;
      const isBusy = bookingDataCode.includes(itemTime.timeCode + choosenDayCode); // console.log(bookingDataCode)
      // console.log(itemTime.timeCode + choosenDayCode)
      // console.log(isReady)
      // console.log(isBusy)

      return __jsx("div", {
        style: isBusy ? {
          pointerEvents: 'none',
          cursor: 'none'
        } : {},
        onClick: function () {
          return isBusy ? {} : _this3.onChooseTime(itemTime);
        },
        key: indexTime,
        className: 'time-box' + (isReady ? ' ready' : isBusy ? ' busy' : '')
      }, __jsx("span", {
        className: "text"
      }, itemTime.timeName));
    })), __jsx("div", {
      className: 'timeBooking-footer' + (step === 1 && isHideUserForm ? ' show' : '')
    }, __jsx("span", {
      onClick: this.resetAndBackProps,
      className: "text"
    }, `< Quay lại`), __jsx("span", {
      onClick: this.onHandleStepTwo,
      className: "text",
      style: choosenTimeCode ? {
        color: 'black'
      } : {
        opacity: 0.5,
        pointerEvents: 'none'
      }
    }, `Tiếp tục >`)), __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Form"], Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      className: 'timeBooking-form' + (!isHideUserForm && step === 2 ? ' show' : ''),
      ref: this.formRef
    }, layout, {
      name: "consignment",
      initialValues: formData // onFinish={this.onFinish}
      ,
      onFinish: this.onConsign,
      onValuesChange: function (changedValues, allValues) {
        _this3.setState({
          formData: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, formData, changedValues)
        }, function () {
          return console.log(_this3.state);
        });
      }
    }), __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Row"], {
      className: "flex sell-card-form",
      justify: "center"
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Form"].Item, {
      name: "dayTime",
      label: "Th\u1EDDi gian"
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Col"], {
      sm: 24,
      md: 22
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Input"], {
      size: "small",
      value: this.convertCodeToTime(),
      placeholder: "..."
    }))), __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Form"].Item, {
      name: "customerName",
      rules: [{
        required: true,
        message: 'Vui lòng nhập tên quý khách'
      }],
      label: "H\u1ECD v\xE0 T\xEAn"
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Col"], {
      sm: 24,
      md: 22
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Input"], {
      value: formData.customerName,
      size: "small",
      allowClear: true,
      id: "customerName",
      key: "customerName",
      onChange: this.changeData,
      placeholder: "..."
    }))), __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Form"].Item, {
      name: "phoneNumber",
      rules: [{
        required: true,
        message: 'Vui lòng nhập số điện thoại'
      }],
      label: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i"
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Col"], {
      sm: 24,
      md: 22
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Input"], {
      value: formData.phoneNumber,
      size: "small",
      type: 'number',
      id: "phoneNumber",
      key: "phoneNumber",
      onChange: this.changeData,
      allowClear: true,
      placeholder: "..."
    }))), __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Form"].Item, {
      name: "numberOfProduct",
      rules: [{
        required: true,
        message: 'Vui lòng nhập số lượng hàng'
      }],
      label: "S\u1ED1 l\u01B0\u1EE3ng H\xE0ng Ho\xE1"
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Col"], {
      sm: 24,
      md: 6
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Input"], {
      value: formData.numberOfProduct,
      size: "small",
      defaultValue: 1,
      type: 'number',
      id: "numberOfProduct",
      key: "numberOfProduct",
      onChange: this.changeData,
      allowClear: true,
      placeholder: "..."
    }))), __jsx("div", {
      className: "flex justify-around align-center",
      style: {
        width: '100%'
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Button"], {
      onClick: this.backStepOne,
      type: "secondary"
    }, "Quay l\u1EA1i"), __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Button"], {
      loading: isConsigning,
      type: "secondary",
      htmlType: "submit"
    }, "X\xE1c nh\u1EADn")))), __jsx("div", {
      className: 'timeBooking-confirm' + (isHideUserForm && step === 3 ? ' show' : '')
    }, __jsx(react_lottie__WEBPACK_IMPORTED_MODULE_14___default.a, {
      options: defaultOptionsSuccess,
      delay: 2000,
      height: 150,
      width: 150,
      isStopped: false,
      isPaused: false
    }), __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Row"], {
      justify: "center"
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Col"], {
      span: 20
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Descriptions"], null, __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Descriptions"].Item, {
      span: 24,
      label: "Th\u1EDDi gian k\xFD g\u1EEDi"
    }, this.convertCodeToTime()), __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Descriptions"].Item, {
      span: 24,
      label: "T\xEAn Kh\xE1ch H\xE0ng"
    }, formData.customerName), __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Descriptions"].Item, {
      span: 24,
      label: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i"
    }, formData.phoneNumber), __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Descriptions"].Item, {
      span: 24,
      label: "S\u1ED1 l\u01B0\u1EE3ng h\xE0ng ho\xE1"
    }, formData.numberOfProduct)))), __jsx(antd__WEBPACK_IMPORTED_MODULE_13__["Button"], {
      className: "MT20",
      onClick: this.resetAndBackProps
    }, "Quay l\u1EA1i")))), __jsx(_Components_MyModal__WEBPACK_IMPORTED_MODULE_10__["default"], {
      ref: this.myModal
    }));
  }

}

const mapStateToProps = function (state) {
  return {
    locale: state.locale,
    userData: state.userData
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(next_router__WEBPACK_IMPORTED_MODULE_7__["withRouter"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_6__["connect"])(mapStateToProps)(ConsignmentScreen)));

/***/ }),

/***/ "./pages/Screen/Consignment/components/BookingForm/style.scss":
/*!********************************************************************!*\
  !*** ./pages/Screen/Consignment/components/BookingForm/style.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./pages/Screen/Consignment/components/SearchForm/index.js":
/*!*****************************************************************!*\
  !*** ./pages/Screen/Consignment/components/SearchForm/index.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../common/routes */ "./common/routes.js");
/* harmony import */ var _common_routes__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_common_routes__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _common_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../common/redux */ "./common/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _config_images__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../config/images */ "./config/images/index.js");
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-device-detect */ "react-device-detect");
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_device_detect__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _Components_MyModal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../Components/MyModal */ "./pages/Components/MyModal/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _controller_Api_Services_Gap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../controller/Api/Services/Gap */ "./controller/Api/Services/Gap.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./style.scss */ "./pages/Screen/Consignment/components/SearchForm/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _common_function__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../../common/function */ "./common/function.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_15__);



var __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;














class SearchForm extends react__WEBPACK_IMPORTED_MODULE_3___default.a.PureComponent {
  static async getInitialProps({
    query
  }) {
    return {
      query
    };
  }

  constructor(props) {
    var _this;

    super(props);
    _this = this;

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "fetchTableData", async function (page = 1, keyword) {
      const {
        formData
      } = _this.state;

      _this.setState({
        isLoadingData: true
      }, async function () {
        let res;
        res = await _controller_Api_Services_Gap__WEBPACK_IMPORTED_MODULE_12__["default"].getConsignment(page, formData.phoneNumber);
        console.log('res');
        console.log(res);
        let consignmentData = [];

        if (res && res.results) {
          res.results.map(function (item, indexItem) {
            consignmentData.push({
              key: item.objectId,
              objectId: item.objectId,
              consignerName: item.consignerName,
              consignmentId: item.consignmentId,
              consignerIdCard: item.consignerIdCard,
              consigneeName: item.consigneeName,
              timeGetMoney: item.timeGetMoney,
              phoneNumber: item.phoneNumber,
              numberOfProducts: `${Number(item.numberOfProducts)}`,
              numSoldConsignment: `${Number(item.numSoldConsignment || 0)}`,
              remainNumConsignment: `${Number(item.numberOfProducts) - Number(item.numSoldConsignment || 0)}`,
              bankName: item.bankName,
              bankId: item.bankId,
              moneyBack: item.moneyBack,
              email: item.email,
              isGetMoney: item.isGetMoney
            });
          });

          _this.setState({
            total: res.count,
            consignmentData: consignmentData,
            isLoadingData: false
          });
        } else {
          _this.setState({
            isLoadingData: false
          });
        }
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "onConsign", async function () {
      const {
        page,
        formData
      } = _this.state;

      _this.setState({
        isSearching: true
      }, async function () {
        const res = await _controller_Api_Services_Gap__WEBPACK_IMPORTED_MODULE_12__["default"].getConsignment(page, formData.phoneNumber, 20);
        console.log('res: ', res);

        if (res && res.results) {
          _this.setState({
            total: res.results.length,
            consignmentData: res.results,
            isHideUserForm: true,
            isSearching: false
          }, function () {
            setTimeout(function () {
              _this.setState({
                step: 1
              });
            }, 1000);
          });
        } else {
          _this.setState({
            isSearching: false
          });
        }
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "paginationChange", function (page) {
      console.log(page);

      _this.fetchTableData(page);
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "backPropStepOne", function () {
      _this.setState({
        isHideUserForm: false
      }, function () {
        setTimeout(function () {
          _this.setState({
            step: 0
          });
        }, 1000);
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "backProp", function () {
      _this.setState({
        step: 0,
        formData: {
          phoneNumber: ''
        },
        consignmentData: [],
        total: 0,
        page: 1,
        isSearching: false,
        isHideUserForm: false,
        isLoadingData: false
      });

      _this.props.backConsignment();
    });

    this.columns = [{
      title: 'Tên khách hàng',
      width: 12,
      dataIndex: 'consignerName',
      key: 'consignerName'
    }, {
      title: 'Mã ký gửi',
      dataIndex: 'consignmentId',
      key: 'consignmentId',
      width: 10
    }, {
      title: 'SL ký gửi',
      dataIndex: 'numberOfProducts',
      key: '3',
      width: 5
    }, {
      title: 'Đã bán',
      dataIndex: 'numSoldConsignment',
      key: '4',
      width: 5
    }, {
      title: 'Còn lại',
      dataIndex: 'remainNumConsignment',
      key: '5',
      width: 5
    }, {
      title: 'Số tiền trả khách',
      dataIndex: 'moneyBack',
      key: '6',
      width: 10,
      render: function (value) {
        return __jsx("span", null, value ? Object(_common_function__WEBPACK_IMPORTED_MODULE_14__["numberWithCommas"])(value) : '0', " \u0111");
      }
    }, {
      title: 'Thời gian trả tiền',
      dataIndex: 'timeGetMoney',
      key: '7',
      width: 10
    }, {
      title: 'Chuyển tiền',
      key: '8',
      fixed: 'right',
      width: 6,
      render: function (value) {
        return _this.state.consignmentData.length >= 1 ? __jsx(antd__WEBPACK_IMPORTED_MODULE_11__["Radio"].Button, {
          className: value.isGetMoney ? 'radio-true-isGetMoney' : 'radio-false-isGetMoney',
          value: value.isGetMoney
        }, value.isGetMoney ? 'Rồi' : 'Chưa') : null;
      }
    }];
    this.state = {
      step: 0,
      formData: {
        phoneNumber: ''
      },
      consignmentData: [],
      total: 0,
      page: 1,
      isSearching: false,
      isHideUserForm: false,
      isLoadingData: false
    };
    this.myModal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createRef();
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  // closeModal = () => {
  //   this.myModal.current.closeModal()
  // }
  render() {
    var _this2 = this;

    const {
      isHideUserForm,
      formData,
      step,
      isSearching,
      consignmentData,
      isLoadingData,
      total
    } = this.state;
    const layout = {
      labelCol: {
        span: 9
      },
      wrapperCol: {
        span: 15
      }
    };
    return __jsx("div", {
      className: "searchform-home-container"
    }, __jsx("div", {
      className: "searching-form"
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_11__["Form"], Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      className: 'searching-box' + (!isHideUserForm && step === 0 ? ' show' : ''),
      ref: this.formRef
    }, layout, {
      name: "consignment",
      initialValues: formData // onFinish={this.onFinish}
      ,
      onFinish: this.onConsign,
      onValuesChange: function (changedValues, allValues) {
        _this2.setState({
          formData: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, formData, changedValues)
        }, function () {
          return console.log(_this2.state);
        });
      }
    }), __jsx(antd__WEBPACK_IMPORTED_MODULE_11__["Row"], {
      className: "flex sell-card-form",
      justify: "center"
    }, __jsx("h1", {
      className: 'text text-searching-title'
    }, "T\xECm th\xF4ng tin k\xFD g\u1EEDi qua s\u1ED1 \u0111i\u1EC7n tho\u1EA1i"), __jsx(antd__WEBPACK_IMPORTED_MODULE_11__["Form"].Item, {
      name: "phoneNumber",
      rules: [{
        required: true,
        message: 'Vui lòng nhập số điện thoại'
      }],
      label: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i"
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_11__["Col"], {
      sm: 24,
      md: 22
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_11__["Input"], {
      size: "small",
      type: 'number',
      id: "phoneNumber",
      key: "phoneNumber",
      onChange: this.changeData,
      allowClear: true,
      placeholder: "..."
    }))), __jsx("div", {
      className: "flex justify-around align-center",
      style: {
        width: '100%'
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_11__["Button"], {
      onClick: this.backProp,
      type: "secondary"
    }, "Quay l\u1EA1i"), __jsx(antd__WEBPACK_IMPORTED_MODULE_11__["Button"], {
      loading: isSearching,
      type: "secondary",
      htmlType: "submit"
    }, "T\xECm ki\u1EBFm")))), __jsx("div", {
      className: 'searching-table' + (isHideUserForm && step === 1 ? ' show' : '')
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_11__["Table"], {
      size: "small",
      loading: isLoadingData,
      columns: this.columns,
      dataSource: consignmentData,
      bordered: true,
      pagination: {
        total: total,
        pageSize: 20,
        onChange: this.paginationChange
      },
      scroll: {
        x: 1500,
        y: '65vh'
      }
    }), __jsx("div", {
      className: "flex justify-around align-center",
      style: {
        width: '100%'
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_11__["Button"], {
      onClick: this.backPropStepOne,
      type: "secondary"
    }, "Quay l\u1EA1i")))), __jsx(_Components_MyModal__WEBPACK_IMPORTED_MODULE_10__["default"], {
      ref: this.myModal
    }));
  }

}

const mapStateToProps = function (state) {
  return {
    locale: state.locale,
    userData: state.userData
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(next_router__WEBPACK_IMPORTED_MODULE_7__["withRouter"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_6__["connect"])(mapStateToProps)(SearchForm)));

/***/ }),

/***/ "./pages/Screen/Consignment/components/SearchForm/style.scss":
/*!*******************************************************************!*\
  !*** ./pages/Screen/Consignment/components/SearchForm/style.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./pages/Screen/Consignment/index.js":
/*!*******************************************!*\
  !*** ./pages/Screen/Consignment/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/routes */ "./common/routes.js");
/* harmony import */ var _common_routes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_common_routes__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/redux */ "./common/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _config_images__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../config/images */ "./config/images/index.js");
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-device-detect */ "react-device-detect");
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_device_detect__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Components_MyModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../Components/MyModal */ "./pages/Components/MyModal/index.js");
/* harmony import */ var _components_BookingForm__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/BookingForm */ "./pages/Screen/Consignment/components/BookingForm/index.js");
/* harmony import */ var _components_SearchForm__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/SearchForm */ "./pages/Screen/Consignment/components/SearchForm/index.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./style.scss */ "./pages/Screen/Consignment/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_12__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;













class ConsignmentScreen extends react__WEBPACK_IMPORTED_MODULE_1___default.a.PureComponent {
  static async getInitialProps({
    query
  }) {
    return {
      query
    };
  }

  constructor(props) {
    var _this;

    super(props);
    _this = this;

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "onHandleOpenContent", function (formName) {
      _this.setState({
        isShowText1: false,
        isShowText2: false,
        isShowText3: false,
        isShowText: false
      }, function () {
        switch (formName) {
          case 'consignment':
            setTimeout(function () {
              _this.setState({
                isShowForm: true,
                isShowSearchForm: false,
                isShowBookingForm: true
              });
            }, 1200);
            break;

          case 'search':
            setTimeout(function () {
              _this.setState({
                isShowForm: true,
                isShowSearchForm: true,
                isShowBookingForm: false
              });
            }, 1200);
            break;

          case 'instrument':
            setTimeout(function () {
              _this.setState({
                isShowForm: true,
                isShowBookingForm: false,
                isShowInstrumentForm: true
              });
            }, 1200);
            break;
        }
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "onBackConsignment", function () {
      _this.setState({
        isShowForm: false,
        isShowText1: true,
        isShowText2: true,
        isShowText3: true,
        isShowText: true
      });
    });

    this.state = {
      isShowText1: false,
      isShowText2: false,
      isShowText3: false,
      isShowText: false,
      isShowBookingForm: false,
      isShowSearchForm: false,
      isShowInstrumentForm: false,
      isShowForm: false
    };
    this.myModal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createRef();
  }

  componentDidMount() {
    var _this2 = this;

    setTimeout(function () {
      _this2.setState({
        isShowText: true,
        isShowText1: true,
        isShowText2: true,
        isShowText3: true
      });
    }, 200);
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  // closeModal = () => {
  //   this.myModal.current.closeModal()
  // }
  render() {
    var _this3 = this;

    const {
      isShowText1,
      isShowText2,
      isShowText3,
      isShowForm,
      isShowText,
      isShowSearchForm,
      isShowBookingForm
    } = this.state;
    return __jsx("div", {
      className: "consignment-home-container"
    }, __jsx("div", {
      className: "body-box",
      style: !isShowText && isShowForm ? {
        position: 'absolute',
        width: 0
      } : {}
    }, __jsx("span", {
      onClick: function () {
        return _this3.onHandleOpenContent('consignment');
      },
      className: 'text consignment-txt' + (isShowText1 ? ' show' : '')
    }, "\u0110\u1EB7t L\u1ECBch"), __jsx("span", {
      onClick: function () {
        return _this3.onHandleOpenContent('search');
      },
      className: 'text info-search-txt' + (isShowText2 ? ' show' : '')
    }, "T\xECm Ki\u1EBFm Th\xF4ng Tin"), __jsx("span", {
      onClick: function () {
        return _this3.onHandleOpenContent('instrument');
      },
      className: 'text instrument-txt' + (isShowText3 ? ' show' : '')
    }, "H\u01B0\u1EDBng D\u1EABn")), __jsx("div", {
      className: 'content-box' + (isShowForm && isShowBookingForm ? ' show' : '')
    }, __jsx(_components_BookingForm__WEBPACK_IMPORTED_MODULE_10__["default"], {
      backConsignment: this.onBackConsignment
    })), __jsx("div", {
      className: 'content-box' + (isShowForm && isShowSearchForm ? ' show' : '')
    }, __jsx(_components_SearchForm__WEBPACK_IMPORTED_MODULE_11__["default"], {
      backConsignment: this.onBackConsignment
    })), __jsx(_Components_MyModal__WEBPACK_IMPORTED_MODULE_9__["default"], {
      ref: this.myModal
    }));
  }

}

const mapStateToProps = function (state) {
  return {
    locale: state.locale,
    userData: state.userData
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(next_router__WEBPACK_IMPORTED_MODULE_6__["withRouter"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps)(ConsignmentScreen)));

/***/ }),

/***/ "./pages/Screen/Consignment/style.scss":
/*!*********************************************!*\
  !*** ./pages/Screen/Consignment/style.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./static/Assets/Image/Common/404.svg":
/*!********************************************!*\
  !*** ./static/Assets/Image/Common/404.svg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/404-c93d75d2444ef485e2308d312ae461fb.svg";

/***/ }),

/***/ "./static/Assets/Image/Common/error.png":
/*!**********************************************!*\
  !*** ./static/Assets/Image/Common/error.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/error-01f39bf7277ab137e7d76a4c75497b9b.png";

/***/ }),

/***/ "./static/Assets/Image/Common/three-dots.svg":
/*!***************************************************!*\
  !*** ./static/Assets/Image/Common/three-dots.svg ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjMiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDIzIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yMS45MTQzIDEuMDU1NDZDMjIuOTg4MiAyLjEyOTQgMjIuOTg4MiAzLjg3MDYxIDIxLjkxNDMgNC45NDQ1NUMyMC44NDAzIDYuMDE4NDkgMTkuMDk5MSA2LjAxODQ5IDE4LjAyNTIgNC45NDQ1NUMxNi45NTEyIDMuODcwNjEgMTYuOTUxMiAyLjEyOTQgMTguMDI1MiAxLjA1NTQ2QzE5LjA5OTEgLTAuMDE4NDg1MSAyMC44NDAzIC0wLjAxODQ4NTEgMjEuOTE0MyAxLjA1NTQ2WiIgZmlsbD0iIzgyODI4MiIvPgo8cGF0aCBkPSJNMTMuNjY0MiAxLjA1NTQ2QzE0LjczODIgMi4xMjk0IDE0LjczODIgMy44NzA2MSAxMy42NjQyIDQuOTQ0NTVDMTIuNTkwMyA2LjAxODQ5IDEwLjg0OTEgNi4wMTg0OSA5Ljc3NTE4IDQuOTQ0NTVDOC43MDEyNCAzLjg3MDYxIDguNzAxMjQgMi4xMjk0IDkuNzc1MTggMS4wNTU0NkMxMC44NDkxIC0wLjAxODQ4NTEgMTIuNTkwMyAtMC4wMTg0ODUxIDEzLjY2NDIgMS4wNTU0NloiIGZpbGw9IiM4MjgyODIiLz4KPHBhdGggZD0iTTUuNDE0MjYgMS4wNTU0NkM2LjQ4ODIgMi4xMjk0IDYuNDg4MiAzLjg3MDYxIDUuNDE0MjYgNC45NDQ1NUM0LjM0MDMyIDYuMDE4NDkgMi41OTkxMiA2LjAxODQ5IDEuNTI1MTggNC45NDQ1NUMwLjQ1MTI0MiAzLjg3MDYxIDAuNDUxMjQyIDIuMTI5NCAxLjUyNTE4IDEuMDU1NDZDMi41OTkxMiAtMC4wMTg0ODUxIDQuMzQwMzIgLTAuMDE4NDg1MSA1LjQxNDI2IDEuMDU1NDZaIiBmaWxsPSIjODI4MjgyIi8+Cjwvc3ZnPgo="

/***/ }),

/***/ "./static/Assets/Image/Flags/cn.png":
/*!******************************************!*\
  !*** ./static/Assets/Image/Flags/cn.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAACrCAIAAAAGvNWoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkEwNThFNEEwMEMzQjExRTZCMDVFRjUxMzZGNjY1QjZDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkEwNThFNEExMEMzQjExRTZCMDVFRjUxMzZGNjY1QjZDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTA1OEU0OUUwQzNCMTFFNkIwNUVGNTEzNkY2NjVCNkMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTA1OEU0OUYwQzNCMTFFNkIwNUVGNTEzNkY2NjVCNkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5vjsP2AAAPXklEQVR42uyd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"

/***/ }),

/***/ "./static/Assets/Image/Flags/en.png":
/*!******************************************!*\
  !*** ./static/Assets/Image/Flags/en.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABACAYAAADS1n9/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFEMzBCREE3MEQyRDExRTZCOUU5OTBCOEE0NDE0QzQ5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFEMzBCREE4MEQyRDExRTZCOUU5OTBCOEE0NDE0QzQ5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUQzMEJEQTUwRDJEMTFFNkI5RTk5MEI4QTQ0MTRDNDkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUQzMEJEQTYwRDJEMTFFNkI5RTk5MEI4QTQ0MTRDNDkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6VnHEeAAATkUlEQVR42uxd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"

/***/ }),

/***/ "./static/Assets/Image/Flags/ja.png":
/*!******************************************!*\
  !*** ./static/Assets/Image/Flags/ja.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABVCAIAAAAOr3sAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBDQkUxMEQ1MEM3RjExRTY4Q0IxRjFGOEU1QzFERjk0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBDQkUxMEQ2MEM3RjExRTY4Q0IxRjFGOEU1QzFERjk0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MENCRTEwRDMwQzdGMTFFNjhDQjFGMUY4RTVDMURGOTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MENCRTEwRDQwQzdGMTFFNjhDQjFGMUY4RTVDMURGOTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5uCDJIAAAGIElEQVR42uyd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"

/***/ }),

/***/ "./static/Assets/Image/Icon/ALogoBlack.svg":
/*!*************************************************!*\
  !*** ./static/Assets/Image/Icon/ALogoBlack.svg ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/ALogoBlack-8157c6e1c5bb3b0a7035bf1a3d1e3a8a.svg";

/***/ }),

/***/ "./static/Assets/Image/Icon/ALogoWhite.svg":
/*!*************************************************!*\
  !*** ./static/Assets/Image/Icon/ALogoWhite.svg ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/ALogoWhite-944145136ac75d5e93bf507250df94d5.svg";

/***/ }),

/***/ "./static/Assets/Image/Icon/facebookIcon.svg":
/*!***************************************************!*\
  !*** ./static/Assets/Image/Icon/facebookIcon.svg ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik05LjA2MjUgMTUuOTY4OEg2LjUwMDI0QzYuMDcyMjcgMTUuOTY4OCA1LjcyNDEyIDE1LjYyMDYgNS43MjQxMiAxNS4xOTI2VjkuNDEzMzNINC4yMjkyNUMzLjgwMTI3IDkuNDEzMzMgMy40NTMxMiA5LjA2NTA2IDMuNDUzMTIgOC42MzcyMVY2LjE2MDc3QzMuNDUzMTIgNS43MzI3OSAzLjgwMTI3IDUuMzg0NjQgNC4yMjkyNSA1LjM4NDY0SDUuNzI0MTJWNC4xNDQ1M0M1LjcyNDEyIDIuOTE0OTIgNi4xMTAyMyAxLjg2ODc3IDYuODQwNTggMS4xMTkzOEM3LjU3NDIyIDAuMzY2NTc3IDguNTk5NDkgLTAuMDMxMjUgOS44MDU1NCAtMC4wMzEyNUwxMS43NTk2IC0wLjAyODA3NjJDMTIuMTg2OSAtMC4wMjczNDM3IDEyLjUzNDQgMC4zMjA4MDEgMTIuNTM0NCAwLjc0ODA0N1YzLjA0NzM2QzEyLjUzNDQgMy40NzUzNCAxMi4xODY0IDMuODIzNDkgMTEuNzU4NSAzLjgyMzQ5TDEwLjQ0MjkgMy44MjM5OEMxMC4wNDE2IDMuODIzOTggOS45Mzk0NSAzLjkwNDQyIDkuOTE3NiAzLjkyOTA4QzkuODgxNTkgMy45Njk5NyA5LjgzODc1IDQuMDg1NTcgOS44Mzg3NSA0LjQwNDc5VjUuMzg0NTJIMTEuNjU5N0MxMS43OTY4IDUuMzg0NTIgMTEuOTI5NiA1LjQxODM0IDEyLjA0MzcgNS40ODIwNkMxMi4yODk5IDUuNjE5NjMgMTIuNDQzIDUuODc5NzYgMTIuNDQzIDYuMTYwODlMMTIuNDQyIDguNjM3MzNDMTIuNDQyIDkuMDY1MDYgMTIuMDkzOSA5LjQxMzIxIDExLjY2NTkgOS40MTMyMUg5LjgzODc1VjE1LjE5MjZDOS44Mzg3NSAxNS42MjA2IDkuNDkwNDggMTUuOTY4OCA5LjA2MjUgMTUuOTY4OFpNNi42NjIxMSAxNS4wMzA4SDguOTAwNjRWOC45OTM0MUM4LjkwMDY0IDguNzA3NjQgOS4xMzMxOCA4LjQ3NTIyIDkuNDE4ODIgOC40NzUyMkgxMS41MDRMMTEuNTA0OSA2LjMyMjYzSDkuNDE4N0M5LjEzMzA2IDYuMzIyNjMgOC45MDA2NCA2LjA5MDIxIDguOTAwNjQgNS44MDQ0NFY0LjQwNDc5QzguOTAwNjQgNC4wMzgzMyA4LjkzNzg3IDMuNjIxNTggOS4yMTQ0OCAzLjMwODM1QzkuNTQ4NzEgMi45Mjk2OSAxMC4wNzU0IDIuODg1OTkgMTAuNDQyNiAyLjg4NTk5TDExLjU5NjQgMi44ODU1VjAuOTA5NjY4TDkuODA0ODEgMC45MDY3MzhDNy44NjY1OCAwLjkwNjczOCA2LjY2MjExIDIuMTQ3NDYgNi42NjIxMSA0LjE0NDUzVjUuODA0NDRDNi42NjIxMSA2LjA5MDA5IDYuNDI5NjkgNi4zMjI2MyA2LjE0NDA0IDYuMzIyNjNINC4zOTExMVY4LjQ3NTIySDYuMTQ0MDRDNi40Mjk2OSA4LjQ3NTIyIDYuNjYyMTEgOC43MDc2NCA2LjY2MjExIDguOTkzNDFWMTUuMDMwOFpNMTEuNzU3OCAwLjkwOTkxMkgxMS43NTc5SDExLjc1NzhaIiBmaWxsPSJibGFjayIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwIj4KPHJlY3Qgd2lkdGg9IjE1Ljk2ODgiIGhlaWdodD0iMTYiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg=="

/***/ }),

/***/ "./static/Assets/Image/Icon/giveawayTextBlack.svg":
/*!********************************************************!*\
  !*** ./static/Assets/Image/Icon/giveawayTextBlack.svg ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzYiIGhlaWdodD0iNDciIHZpZXdCb3g9IjAgMCA3NiA0NyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuOTM2IDguMjE2SDUuODMyVjEwLjMwNEg3LjU2VjE0Ljg0QzcuNDE2IDE0LjkxMiA3LjEyOCAxNC45NiA2LjY5NiAxNC45NkM1LjAxNiAxNC45NiAzLjMzNiAxMy40NzIgMy4zMzYgOS4wOEMzLjMzNiA0LjUyIDUuMjU2IDIuOTg0IDcuMzQ0IDIuOTg0QzguMTYgMi45ODQgOC43NiAzLjEyOCA5LjE5MiAzLjM2OEw5LjY5NiAxLjE2QzkuMTkyIDAuODk2IDguMzI4IDAuNjggNy4yIDAuNjhDNC4wMzIgMC42OCAwLjcyIDIuOTg0IDAuNjcyIDkuMDU2QzAuNjQ4IDExLjkzNiAxLjQxNiAxNC4yNCAyLjY4OCAxNS41NkMzLjc2OCAxNi42ODggNS4xMzYgMTcuMTQ0IDYuNzkyIDE3LjE0NEM3Ljg5NiAxNy4xNDQgOS4yNCAxNi44NTYgOS45MzYgMTYuNTY4VjguMjE2Wk0xMi4zNjEzIDAuODIzOTk5VjE3SDE0LjkyOTNWMC44MjM5OTlIMTIuMzYxM1pNMjIuOTgzNCAxN0wyNi43Mjc0IDAuODIzOTk5SDIzLjk0MzRMMjIuNjIzNCA4LjAyNEMyMi4zMTE0IDkuODk2IDIxLjk1MTQgMTEuOTYgMjEuNzM1NCAxMy45NTJIMjEuNjYzNEMyMS40MjM0IDExLjk4NCAyMS4wMTU0IDkuODQ4IDIwLjcwMzQgOC4wNzJMMTkuMzU5NCAwLjgyMzk5OUgxNi41NTE0TDIwLjE5OTQgMTdIMjIuOTgzNFpNMzQuNzA2OCA3LjQ5NkgzMC44NjY4VjMuMDU2SDM0Ljk0NjhWMC44MjM5OTlIMjguMjk4OFYxN0gzNS4yMzQ4VjE0Ljc2OEgzMC44NjY4VjkuNjMySDM0LjcwNjhWNy40OTZaTTQxLjg1NDkgMTdMNDMuMTc0OSAxMC41OTJDNDMuNTEwOSA4LjkxMiA0My43OTg5IDcuMTM2IDQ0LjA2MjkgNS4yNEg0NC4xMTA5QzQ0LjMwMjkgNy4xMTIgNDQuNTY2OSA4LjkzNiA0NC44NTQ5IDEwLjU0NEw0Ni4wNzg5IDE3SDQ4LjY5NDlMNTEuNjcwOSAwLjgyMzk5OUg0OS4xNzQ5TDQ4LjExODkgNy44MDhDNDcuODc4OSA5LjY4IDQ3LjYzODkgMTEuNDA4IDQ3LjM5ODkgMTMuNjRINDcuMzUwOUM0Ny4xMzQ5IDExLjQzMiA0Ni44MjI5IDkuNjMyIDQ2LjQ4NjkgNy43Nkw0NS4yMzg5IDAuODIzOTk5SDQzLjEyNjlMNDEuODMwOSA3Ljg1NkM0MS40NzA5IDkuODQ4IDQxLjExMDkgMTEuNiA0MC44OTQ5IDEzLjY0SDQwLjgyMjlDNDAuNjA2OSAxMS42NDggNDAuNDE0OSA5LjggNDAuMTUwOSA3Ljg4TDM5LjA5NDkgMC44MjM5OTlIMzYuNDMwOUwzOS4zNTg5IDE3SDQxLjg1NDlaTTU4LjMxMDQgMTIuNzc2TDU5LjE3NDQgMTdINjEuNjcwNEw1OC4zMzQ0IDAuODIzOTk5SDU1LjMzNDRMNTEuNzM0NCAxN0g1NC4yMzA0TDU1LjA5NDQgMTIuNzc2SDU4LjMxMDRaTTU1LjM4MjQgMTAuNzg0TDU2LjEwMjQgNy4wNjRDNTYuMjk0NCA2LjA1NiA1Ni41MzQ0IDQuNTIgNTYuNzAyNCAzLjM5Mkg1Ni43NzQ0QzU2Ljk2NjQgNC41MiA1Ny4xODI0IDYuMDA4IDU3LjM3NDQgNy4wNjRMNTguMDQ2NCAxMC43ODRINTUuMzgyNFpNNjcuMjY2MiAxN1YxMC40MjRMNzAuOTM4MiAwLjgyMzk5OUg2OC4yNzQyTDY3LjEyMjIgNC42ODhDNjYuNzYyMiA1Ljg4OCA2Ni40MjYyIDcuMDg4IDY2LjE4NjIgOC4zMTJINjYuMTM4MkM2NS44MjYyIDcuMDg4IDY1LjQ2NjIgNS44NCA2NS4xMzAyIDQuNzZMNjMuODgyMiAwLjgyMzk5OUg2MS4xNDYyTDY0LjY5ODIgMTAuNTJWMTdINjcuMjY2MlpNMS40MTYgNDZIMy45NlYzOS43MTJDNC4yIDM5LjcxMiA0LjQxNiAzOS43MTIgNC42OCAzOS43MTJDNi4wNDggMzkuNzEyIDcuNjA4IDM5LjE4NCA4LjU2OCAzOC4wNTZDOS4zMTIgMzcuMTkyIDkuNzY4IDM2LjA2NCA5Ljc2OCAzNC40MzJDOS43NjggMzMuMDQgOS4zMzYgMzEuNzkyIDguNDcyIDMwLjk3NkM3LjUxMiAzMC4wNjQgNi4xNDQgMjkuNzUyIDQuNDQgMjkuNzUyQzMuMjg4IDI5Ljc1MiAyLjI1NiAyOS44NzIgMS40MTYgMzAuMDY0VjQ2Wk0zLjk2IDMxLjk2QzQuMTc2IDMxLjg4OCA0LjUxMiAzMS44NCA0Ljg0OCAzMS44NEM2LjU3NiAzMS44NCA3LjIgMzMuMTEyIDcuMiAzNC42MjRDNy4yIDM2LjQ5NiA2LjI2NCAzNy42NDggNC41ODQgMzcuNjQ4QzQuMzQ0IDM3LjY0OCA0LjE1MiAzNy42NDggMy45NiAzNy42VjMxLjk2Wk0xMS43NTE5IDQ2SDE0LjI5NTlWMzkuMjhIMTQuODk1OUMxNi4xNjc5IDM5LjI4IDE2Ljc2NzkgMzkuOTc2IDE3LjA3OTkgNDIuMDY0QzE3LjM2NzkgNDMuOTYgMTcuNzAzOSA0NS41NDQgMTcuOTE5OSA0NkgyMC41ODM5QzIwLjMxOTkgNDUuNDQ4IDE5LjkzNTkgNDMuNzIgMTkuNTc1OSA0MS43NTJDMTkuMjYzOSAzOS44MzIgMTguNjYzOSAzOC43NTIgMTcuNTM1OSAzOC4zNDRWMzguMjk2QzE5LjE2NzkgMzcuNTUyIDIwLjA3OTkgMzYuMDg4IDIwLjA3OTkgMzQuMjE2QzIwLjA3OTkgMzIuODcyIDE5Ljc0MzkgMzEuNzkyIDE4Ljg1NTkgMzAuOTI4QzE3Ljg5NTkgMzAuMDQgMTYuNTAzOSAyOS43NTIgMTQuODQ3OSAyOS43NTJDMTMuNzY3OSAyOS43NTIgMTIuNjM5OSAyOS44NDggMTEuNzUxOSAzMC4wNjRWNDZaTTE0LjI5NTkgMzEuODY0QzE0LjUxMTkgMzEuNzkyIDE0Ljg0NzkgMzEuNzY4IDE1LjE1OTkgMzEuNzY4QzE2LjgzOTkgMzEuNzkyIDE3LjQ2MzkgMzIuODcyIDE3LjQ2MzkgMzQuNDU2QzE3LjQ2MzkgMzYuMTEyIDE2LjUwMzkgMzcuMzEyIDE0Ljk2NzkgMzcuMzEySDE0LjI5NTlWMzEuODY0Wk0yOC44MDA2IDM2LjQ5NkgyNC45NjA2VjMyLjA1NkgyOS4wNDA2VjI5LjgyNEgyMi4zOTI2VjQ2SDI5LjMyODZWNDMuNzY4SDI0Ljk2MDZWMzguNjMySDI4LjgwMDZWMzYuNDk2Wk00MS41NjggNDZINDMuODk2TDQyLjkzNiAyOS44MjRINDAuMTc2TDM4LjY2NCAzNi4zNzZDMzguMTg0IDM4LjQ4OCAzNy44MjQgNDAuMTY4IDM3LjUzNiA0MS45OTJIMzcuNDg4QzM3LjE3NiA0MC4xNjggMzYuNzY4IDM4LjQ2NCAzNi4yNjQgMzYuMzc2TDM0LjcwNCAyOS44MjRIMzEuOTkyTDMwLjkxMiA0NkgzMy4xNDRMMzMuNDMyIDM5LjgzMkMzMy41MjggMzcuOTEyIDMzLjYyNCAzNS43NzYgMzMuNjQ4IDMzLjk1MkgzMy43MkMzNC4wMDggMzUuNzUyIDM0LjQ0IDM3Ljc2OCAzNC44NzIgMzkuNEwzNi40NTYgNDUuODA4SDM4LjIwOEwzOS44ODggMzkuMjMyQzQwLjI3MiAzNy42NzIgNDAuNzA0IDM1LjcyOCA0MS4wMTYgMzMuOTUySDQxLjA4OEM0MS4wNjQgMzUuNzI4IDQxLjE2IDM3LjkzNiA0MS4yNTYgMzkuNzZMNDEuNTY4IDQ2Wk00Ni4yOTg4IDI5LjgyNFY0Nkg0OC44NjY4VjI5LjgyNEg0Ni4yOTg4Wk01MS42NDA5IDI5LjgyNFY0MC4xNjhDNTEuNjQwOSA0NC4yIDUzLjA4MDkgNDYuMTkyIDU2LjAzMjkgNDYuMTkyQzU4Ljg0MDkgNDYuMTkyIDYwLjQ3MjkgNDQuMjI0IDYwLjQ3MjkgNDAuMDQ4VjI5LjgyNEg1Ny45MDQ5VjQwLjQ4QzU3LjkwNDkgNDMuMTIgNTcuMTYwOSA0My45MzYgNTYuMDU2OSA0My45MzZDNTUuMDI0OSA0My45MzYgNTQuMjA4OSA0My4wOTYgNTQuMjA4OSA0MC40OFYyOS44MjRINTEuNjQwOVpNNzMuMzQ5MyA0Nkg3NS42NzczTDc0LjcxNzMgMjkuODI0SDcxLjk1NzNMNzAuNDQ1MyAzNi4zNzZDNjkuOTY1MyAzOC40ODggNjkuNjA1MyA0MC4xNjggNjkuMzE3MyA0MS45OTJINjkuMjY5M0M2OC45NTczIDQwLjE2OCA2OC41NDkzIDM4LjQ2NCA2OC4wNDUzIDM2LjM3Nkw2Ni40ODUzIDI5LjgyNEg2My43NzMzTDYyLjY5MzMgNDZINjQuOTI1M0w2NS4yMTMzIDM5LjgzMkM2NS4zMDkyIDM3LjkxMiA2NS40MDUzIDM1Ljc3NiA2NS40MjkzIDMzLjk1Mkg2NS41MDEzQzY1Ljc4OTMgMzUuNzUyIDY2LjIyMTMgMzcuNzY4IDY2LjY1MzMgMzkuNEw2OC4yMzczIDQ1LjgwOEg2OS45ODkzTDcxLjY2OTMgMzkuMjMyQzcyLjA1MzMgMzcuNjcyIDcyLjQ4NTMgMzUuNzI4IDcyLjc5NzMgMzMuOTUySDcyLjg2OTNDNzIuODQ1MyAzNS43MjggNzIuOTQxMyAzNy45MzYgNzMuMDM3MyAzOS43Nkw3My4zNDkzIDQ2WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg=="

/***/ }),

/***/ "./static/Assets/Image/Icon/giveawayTextWhite.svg":
/*!********************************************************!*\
  !*** ./static/Assets/Image/Icon/giveawayTextWhite.svg ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzYiIGhlaWdodD0iNDciIHZpZXdCb3g9IjAgMCA3NiA0NyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuOTM2IDguMjE2SDUuODMyVjEwLjMwNEg3LjU2VjE0Ljg0QzcuNDE2IDE0LjkxMiA3LjEyOCAxNC45NiA2LjY5NiAxNC45NkM1LjAxNiAxNC45NiAzLjMzNiAxMy40NzIgMy4zMzYgOS4wOEMzLjMzNiA0LjUyIDUuMjU2IDIuOTg0IDcuMzQ0IDIuOTg0QzguMTYgMi45ODQgOC43NiAzLjEyOCA5LjE5MiAzLjM2OEw5LjY5NiAxLjE2QzkuMTkyIDAuODk2IDguMzI4IDAuNjggNy4yIDAuNjhDNC4wMzIgMC42OCAwLjcyIDIuOTg0IDAuNjcyIDkuMDU2QzAuNjQ4IDExLjkzNiAxLjQxNiAxNC4yNCAyLjY4OCAxNS41NkMzLjc2OCAxNi42ODggNS4xMzYgMTcuMTQ0IDYuNzkyIDE3LjE0NEM3Ljg5NiAxNy4xNDQgOS4yNCAxNi44NTYgOS45MzYgMTYuNTY4VjguMjE2Wk0xMi4zNjEzIDAuODIzOTk5VjE3SDE0LjkyOTNWMC44MjM5OTlIMTIuMzYxM1pNMjIuOTgzNCAxN0wyNi43Mjc0IDAuODIzOTk5SDIzLjk0MzRMMjIuNjIzNCA4LjAyNEMyMi4zMTE0IDkuODk2IDIxLjk1MTQgMTEuOTYgMjEuNzM1NCAxMy45NTJIMjEuNjYzNEMyMS40MjM0IDExLjk4NCAyMS4wMTU0IDkuODQ4IDIwLjcwMzQgOC4wNzJMMTkuMzU5NCAwLjgyMzk5OUgxNi41NTE0TDIwLjE5OTQgMTdIMjIuOTgzNFpNMzQuNzA2OCA3LjQ5NkgzMC44NjY4VjMuMDU2SDM0Ljk0NjhWMC44MjM5OTlIMjguMjk4OFYxN0gzNS4yMzQ4VjE0Ljc2OEgzMC44NjY4VjkuNjMySDM0LjcwNjhWNy40OTZaTTQxLjg1NDkgMTdMNDMuMTc0OSAxMC41OTJDNDMuNTEwOSA4LjkxMiA0My43OTg5IDcuMTM2IDQ0LjA2MjkgNS4yNEg0NC4xMTA5QzQ0LjMwMjkgNy4xMTIgNDQuNTY2OSA4LjkzNiA0NC44NTQ5IDEwLjU0NEw0Ni4wNzg5IDE3SDQ4LjY5NDlMNTEuNjcwOSAwLjgyMzk5OUg0OS4xNzQ5TDQ4LjExODkgNy44MDhDNDcuODc4OSA5LjY4IDQ3LjYzODkgMTEuNDA4IDQ3LjM5ODkgMTMuNjRINDcuMzUwOUM0Ny4xMzQ5IDExLjQzMiA0Ni44MjI5IDkuNjMyIDQ2LjQ4NjkgNy43Nkw0NS4yMzg5IDAuODIzOTk5SDQzLjEyNjlMNDEuODMwOSA3Ljg1NkM0MS40NzA5IDkuODQ4IDQxLjExMDkgMTEuNiA0MC44OTQ5IDEzLjY0SDQwLjgyMjlDNDAuNjA2OSAxMS42NDggNDAuNDE0OSA5LjggNDAuMTUwOSA3Ljg4TDM5LjA5NDkgMC44MjM5OTlIMzYuNDMwOUwzOS4zNTg5IDE3SDQxLjg1NDlaTTU4LjMxMDQgMTIuNzc2TDU5LjE3NDQgMTdINjEuNjcwNEw1OC4zMzQ0IDAuODIzOTk5SDU1LjMzNDRMNTEuNzM0NCAxN0g1NC4yMzA0TDU1LjA5NDQgMTIuNzc2SDU4LjMxMDRaTTU1LjM4MjQgMTAuNzg0TDU2LjEwMjQgNy4wNjRDNTYuMjk0NCA2LjA1NiA1Ni41MzQ0IDQuNTIgNTYuNzAyNCAzLjM5Mkg1Ni43NzQ0QzU2Ljk2NjQgNC41MiA1Ny4xODI0IDYuMDA4IDU3LjM3NDQgNy4wNjRMNTguMDQ2NCAxMC43ODRINTUuMzgyNFpNNjcuMjY2MiAxN1YxMC40MjRMNzAuOTM4MiAwLjgyMzk5OUg2OC4yNzQyTDY3LjEyMjIgNC42ODhDNjYuNzYyMiA1Ljg4OCA2Ni40MjYyIDcuMDg4IDY2LjE4NjIgOC4zMTJINjYuMTM4MkM2NS44MjYyIDcuMDg4IDY1LjQ2NjIgNS44NCA2NS4xMzAyIDQuNzZMNjMuODgyMiAwLjgyMzk5OUg2MS4xNDYyTDY0LjY5ODIgMTAuNTJWMTdINjcuMjY2MlpNMS40MTYgNDZIMy45NlYzOS43MTJDNC4yIDM5LjcxMiA0LjQxNiAzOS43MTIgNC42OCAzOS43MTJDNi4wNDggMzkuNzEyIDcuNjA4IDM5LjE4NCA4LjU2OCAzOC4wNTZDOS4zMTIgMzcuMTkyIDkuNzY4IDM2LjA2NCA5Ljc2OCAzNC40MzJDOS43NjggMzMuMDQgOS4zMzYgMzEuNzkyIDguNDcyIDMwLjk3NkM3LjUxMiAzMC4wNjQgNi4xNDQgMjkuNzUyIDQuNDQgMjkuNzUyQzMuMjg4IDI5Ljc1MiAyLjI1NiAyOS44NzIgMS40MTYgMzAuMDY0VjQ2Wk0zLjk2IDMxLjk2QzQuMTc2IDMxLjg4OCA0LjUxMiAzMS44NCA0Ljg0OCAzMS44NEM2LjU3NiAzMS44NCA3LjIgMzMuMTEyIDcuMiAzNC42MjRDNy4yIDM2LjQ5NiA2LjI2NCAzNy42NDggNC41ODQgMzcuNjQ4QzQuMzQ0IDM3LjY0OCA0LjE1MiAzNy42NDggMy45NiAzNy42VjMxLjk2Wk0xMS43NTE5IDQ2SDE0LjI5NTlWMzkuMjhIMTQuODk1OUMxNi4xNjc5IDM5LjI4IDE2Ljc2NzkgMzkuOTc2IDE3LjA3OTkgNDIuMDY0QzE3LjM2NzkgNDMuOTYgMTcuNzAzOSA0NS41NDQgMTcuOTE5OSA0NkgyMC41ODM5QzIwLjMxOTkgNDUuNDQ4IDE5LjkzNTkgNDMuNzIgMTkuNTc1OSA0MS43NTJDMTkuMjYzOSAzOS44MzIgMTguNjYzOSAzOC43NTIgMTcuNTM1OSAzOC4zNDRWMzguMjk2QzE5LjE2NzkgMzcuNTUyIDIwLjA3OTkgMzYuMDg4IDIwLjA3OTkgMzQuMjE2QzIwLjA3OTkgMzIuODcyIDE5Ljc0MzkgMzEuNzkyIDE4Ljg1NTkgMzAuOTI4QzE3Ljg5NTkgMzAuMDQgMTYuNTAzOSAyOS43NTIgMTQuODQ3OSAyOS43NTJDMTMuNzY3OSAyOS43NTIgMTIuNjM5OSAyOS44NDggMTEuNzUxOSAzMC4wNjRWNDZaTTE0LjI5NTkgMzEuODY0QzE0LjUxMTkgMzEuNzkyIDE0Ljg0NzkgMzEuNzY4IDE1LjE1OTkgMzEuNzY4QzE2LjgzOTkgMzEuNzkyIDE3LjQ2MzkgMzIuODcyIDE3LjQ2MzkgMzQuNDU2QzE3LjQ2MzkgMzYuMTEyIDE2LjUwMzkgMzcuMzEyIDE0Ljk2NzkgMzcuMzEySDE0LjI5NTlWMzEuODY0Wk0yOC44MDA2IDM2LjQ5NkgyNC45NjA2VjMyLjA1NkgyOS4wNDA2VjI5LjgyNEgyMi4zOTI2VjQ2SDI5LjMyODZWNDMuNzY4SDI0Ljk2MDZWMzguNjMySDI4LjgwMDZWMzYuNDk2Wk00MS41NjggNDZINDMuODk2TDQyLjkzNiAyOS44MjRINDAuMTc2TDM4LjY2NCAzNi4zNzZDMzguMTg0IDM4LjQ4OCAzNy44MjQgNDAuMTY4IDM3LjUzNiA0MS45OTJIMzcuNDg4QzM3LjE3NiA0MC4xNjggMzYuNzY4IDM4LjQ2NCAzNi4yNjQgMzYuMzc2TDM0LjcwNCAyOS44MjRIMzEuOTkyTDMwLjkxMiA0NkgzMy4xNDRMMzMuNDMyIDM5LjgzMkMzMy41MjggMzcuOTEyIDMzLjYyNCAzNS43NzYgMzMuNjQ4IDMzLjk1MkgzMy43MkMzNC4wMDggMzUuNzUyIDM0LjQ0IDM3Ljc2OCAzNC44NzIgMzkuNEwzNi40NTYgNDUuODA4SDM4LjIwOEwzOS44ODggMzkuMjMyQzQwLjI3MiAzNy42NzIgNDAuNzA0IDM1LjcyOCA0MS4wMTYgMzMuOTUySDQxLjA4OEM0MS4wNjQgMzUuNzI4IDQxLjE2IDM3LjkzNiA0MS4yNTYgMzkuNzZMNDEuNTY4IDQ2Wk00Ni4yOTg4IDI5LjgyNFY0Nkg0OC44NjY4VjI5LjgyNEg0Ni4yOTg4Wk01MS42NDA5IDI5LjgyNFY0MC4xNjhDNTEuNjQwOSA0NC4yIDUzLjA4MDkgNDYuMTkyIDU2LjAzMjkgNDYuMTkyQzU4Ljg0MDkgNDYuMTkyIDYwLjQ3MjkgNDQuMjI0IDYwLjQ3MjkgNDAuMDQ4VjI5LjgyNEg1Ny45MDQ5VjQwLjQ4QzU3LjkwNDkgNDMuMTIgNTcuMTYwOSA0My45MzYgNTYuMDU2OSA0My45MzZDNTUuMDI0OSA0My45MzYgNTQuMjA4OSA0My4wOTYgNTQuMjA4OSA0MC40OFYyOS44MjRINTEuNjQwOVpNNzMuMzQ5MyA0Nkg3NS42NzczTDc0LjcxNzMgMjkuODI0SDcxLjk1NzNMNzAuNDQ1MyAzNi4zNzZDNjkuOTY1MyAzOC40ODggNjkuNjA1MyA0MC4xNjggNjkuMzE3MyA0MS45OTJINjkuMjY5M0M2OC45NTczIDQwLjE2OCA2OC41NDkzIDM4LjQ2NCA2OC4wNDUzIDM2LjM3Nkw2Ni40ODUzIDI5LjgyNEg2My43NzMzTDYyLjY5MzMgNDZINjQuOTI1M0w2NS4yMTMzIDM5LjgzMkM2NS4zMDkyIDM3LjkxMiA2NS40MDUzIDM1Ljc3NiA2NS40MjkzIDMzLjk1Mkg2NS41MDEzQzY1Ljc4OTMgMzUuNzUyIDY2LjIyMTMgMzcuNzY4IDY2LjY1MzMgMzkuNEw2OC4yMzczIDQ1LjgwOEg2OS45ODkzTDcxLjY2OTMgMzkuMjMyQzcyLjA1MzMgMzcuNjcyIDcyLjQ4NTMgMzUuNzI4IDcyLjc5NzMgMzMuOTUySDcyLjg2OTNDNzIuODQ1MyAzNS43MjggNzIuOTQxMyAzNy45MzYgNzMuMDM3MyAzOS43Nkw3My4zNDkzIDQ2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg=="

/***/ }),

/***/ "./static/Assets/Image/Icon/instagramIcon.svg":
/*!****************************************************!*\
  !*** ./static/Assets/Image/Icon/instagramIcon.svg ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjY2ODkgMEg0LjMzMTA1QzEuOTQyODcgMCAwIDEuOTQyODcgMCA0LjMzMTA1VjExLjY2OUMwIDE0LjA1NzEgMS45NDI4NyAxNiA0LjMzMTA1IDE2SDExLjY2OUMxNC4wNTcxIDE2IDE2IDE0LjA1NzEgMTYgMTEuNjY5VjQuMzMxMDVDMTYgMS45NDI4NyAxNC4wNTcxIDAgMTEuNjY4OSAwVjBaTTE1LjA2MiAxMS42NjlDMTUuMDYyIDEzLjUzOTkgMTMuNTM5OSAxNS4wNjIgMTEuNjY4OSAxNS4wNjJINC4zMzEwNUMyLjQ2MDA4IDE1LjA2MiAwLjkzNzk4NiAxMy41Mzk5IDAuOTM3OTg2IDExLjY2OVY0LjMzMTA1QzAuOTM3OTg2IDIuNDYwMDggMi40NjAwOCAwLjkzNzk4NiA0LjMzMTA1IDAuOTM3OTg2SDExLjY2OUMxMy41Mzk5IDAuOTM3OTg2IDE1LjA2MiAyLjQ2MDA4IDE1LjA2MiA0LjMzMTA1VjExLjY2OVoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik04LjAwMDA1IDMuNjI1MThDNS41ODc3IDMuNjI1MTggMy42MjUxOCA1LjU4NzcgMy42MjUxOCA4LjAwMDA1QzMuNjI1MTggMTAuNDEyNCA1LjU4NzcgMTIuMzc0OSA4LjAwMDA1IDEyLjM3NDlDMTAuNDEyNCAxMi4zNzQ5IDEyLjM3NDkgMTAuNDEyNCAxMi4zNzQ5IDguMDAwMDVDMTIuMzc0OSA1LjU4NzcgMTAuNDEyNCAzLjYyNTE4IDguMDAwMDUgMy42MjUxOFpNOC4wMDAwNSAxMS40MzY5QzYuMTA1MDQgMTEuNDM2OSA0LjU2MzE3IDkuODk1MTkgNC41NjMxNyA4LjAwMDA1QzQuNTYzMTcgNi4xMDUwNCA2LjEwNTA0IDQuNTYzMTcgOC4wMDAwNSA0LjU2MzE3QzkuODk1MTkgNC41NjMxNyAxMS40MzY5IDYuMTA1MDQgMTEuNDM2OSA4LjAwMDA1QzExLjQzNjkgOS44OTUxOSA5Ljg5NTE5IDExLjQzNjkgOC4wMDAwNSAxMS40MzY5WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTEyLjQ3OTQgMi4wNzE0N0MxMS43NjY1IDIuMDcxNDcgMTEuMTg2NyAyLjY1MTQzIDExLjE4NjcgMy4zNjQxOUMxMS4xODY3IDQuMDc3MDggMTEuNzY2NSA0LjY1NzA0IDEyLjQ3OTQgNC42NTcwNEMxMy4xOTIzIDQuNjU3MDQgMTMuNzcyMyA0LjA3NzA4IDEzLjc3MjMgMy4zNjQxOUMxMy43NzIzIDIuNjUxMzEgMTMuMTkyMyAyLjA3MTQ3IDEyLjQ3OTQgMi4wNzE0N1pNMTIuNDc5NCAzLjcxODkzQzEyLjI4MzkgMy43MTg5MyAxMi4xMjQ3IDMuNTU5NzUgMTIuMTI0NyAzLjM2NDE5QzEyLjEyNDcgMy4xNjg1MiAxMi4yODM5IDMuMDA5NDYgMTIuNDc5NCAzLjAwOTQ2QzEyLjY3NTEgMy4wMDk0NiAxMi44MzQzIDMuMTY4NTIgMTIuODM0MyAzLjM2NDE5QzEyLjgzNDMgMy41NTk3NSAxMi42NzUxIDMuNzE4OTMgMTIuNDc5NCAzLjcxODkzWiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg=="

/***/ }),

/***/ "./static/Assets/Image/Icon/logoHeaderBlack.svg":
/*!******************************************************!*\
  !*** ./static/Assets/Image/Icon/logoHeaderBlack.svg ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/logoHeaderBlack-10d48844d9631f00ecf8b843511a7628.svg";

/***/ }),

/***/ "./static/Assets/Image/Icon/logoHeaderWhite.svg":
/*!******************************************************!*\
  !*** ./static/Assets/Image/Icon/logoHeaderWhite.svg ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/logoHeaderWhite-10d48844d9631f00ecf8b843511a7628.svg";

/***/ }),

/***/ "./static/Assets/Image/Lottie/consignmentForm.json":
/*!*********************************************************!*\
  !*** ./static/Assets/Image/Lottie/consignmentForm.json ***!
  \*********************************************************/
/*! exports provided: v, fr, ip, op, w, h, nm, ddd, assets, layers, markers, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"v\":\"5.5.9\",\"fr\":24,\"ip\":0,\"op\":120,\"w\":1000,\"h\":1000,\"nm\":\"Comp 1\",\"ddd\":0,\"assets\":[],\"layers\":[{\"ddd\":0,\"ind\":1,\"ty\":4,\"nm\":\"Shape Layer 3\",\"sr\":1,\"ks\":{\"o\":{\"a\":0,\"k\":100,\"ix\":11},\"r\":{\"a\":0,\"k\":0,\"ix\":10},\"p\":{\"a\":1,\"k\":[{\"i\":{\"x\":0.667,\"y\":1},\"o\":{\"x\":0.333,\"y\":0},\"t\":45,\"s\":[666,256,0],\"to\":[3.167,12.167,0],\"ti\":[38.333,-13.167,0]},{\"i\":{\"x\":0.667,\"y\":1},\"o\":{\"x\":0.333,\"y\":0},\"t\":47,\"s\":[685,329,0],\"to\":[-38.333,13.167,0],\"ti\":[-0.5,-21.333,0]},{\"i\":{\"x\":0.667,\"y\":1},\"o\":{\"x\":0.333,\"y\":0},\"t\":60,\"s\":[436,335,0],\"to\":[0.5,21.333,0],\"ti\":[19,-20.333,0]},{\"i\":{\"x\":0.667,\"y\":1},\"o\":{\"x\":0.333,\"y\":0},\"t\":63,\"s\":[688,457,0],\"to\":[-19,20.333,0],\"ti\":[-0.667,-17.333,0]},{\"i\":{\"x\":0.667,\"y\":1},\"o\":{\"x\":0.333,\"y\":0},\"t\":76,\"s\":[322,457,0],\"to\":[0.667,17.333,0],\"ti\":[1,-17.333,0]},{\"i\":{\"x\":0.667,\"y\":1},\"o\":{\"x\":0.333,\"y\":0},\"t\":80,\"s\":[692,561,0],\"to\":[-1,17.333,0],\"ti\":[4.333,50.833,0]},{\"i\":{\"x\":0,\"y\":1},\"o\":{\"x\":0.333,\"y\":0},\"t\":93,\"s\":[316,561,0],\"to\":[-4.333,-50.833,0],\"ti\":[-58.333,50.833,0]},{\"t\":107,\"s\":[666,256,0]}],\"ix\":2},\"a\":{\"a\":0,\"k\":[182,-328,0],\"ix\":1},\"s\":{\"a\":1,\"k\":[{\"i\":{\"x\":[0,0,0.667],\"y\":[1,1,1]},\"o\":{\"x\":[0.333,0.333,0.333],\"y\":[0,0,0]},\"t\":0,\"s\":[0,0,100]},{\"t\":18,\"s\":[100,100,100]}],\"ix\":6}},\"ao\":0,\"shapes\":[{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,0],[0,0],[0,0]],\"o\":[[0,0],[0,0],[0,0]],\"v\":[[168.75,-326],[168.125,-310],[184.625,-312.125]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"fl\",\"c\":{\"a\":0,\"k\":[0.070588235294,0.050980392157,0.192156862745,1],\"ix\":4},\"o\":{\"a\":0,\"k\":100,\"ix\":5},\"r\":1,\"bm\":0,\"nm\":\"Fill 1\",\"mn\":\"ADBE Vector Graphic - Fill\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":0,\"k\":[0,0],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Shape 2\",\"np\":3,\"cix\":2,\"bm\":0,\"ix\":1,\"mn\":\"ADBE Vector Group\",\"hd\":false},{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,0],[0,0],[0,0],[0,0],[0,0]],\"o\":[[0,0],[0,0],[0,0],[0,0],[0,0]],\"v\":[[325,-495],[170,-348],[168,-310],[206,-315],[334.75,-486]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"fl\",\"c\":{\"a\":0,\"k\":[0.188235294118,0.18431372549,0.301960784314,1],\"ix\":4},\"o\":{\"a\":0,\"k\":100,\"ix\":5},\"r\":1,\"bm\":0,\"nm\":\"Fill 1\",\"mn\":\"ADBE Vector Graphic - Fill\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":0,\"k\":[0,0],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Shape 1\",\"np\":3,\"cix\":2,\"bm\":0,\"ix\":2,\"mn\":\"ADBE Vector Group\",\"hd\":false}],\"ip\":0,\"op\":120,\"st\":0,\"bm\":0},{\"ddd\":0,\"ind\":2,\"ty\":4,\"nm\":\"Shape Layer 5\",\"sr\":1,\"ks\":{\"o\":{\"a\":0,\"k\":100,\"ix\":11},\"r\":{\"a\":0,\"k\":0,\"ix\":10},\"p\":{\"a\":0,\"k\":[564,568,0],\"ix\":2},\"a\":{\"a\":0,\"k\":[80,-236,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100,100],\"ix\":6}},\"ao\":0,\"shapes\":[{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[-168,-234],[194,-234]],\"c\":false},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"st\",\"c\":{\"a\":0,\"k\":[0.941176470588,0.827450980392,0.96862745098,1],\"ix\":3},\"o\":{\"a\":0,\"k\":100,\"ix\":4},\"w\":{\"a\":0,\"k\":30,\"ix\":5},\"lc\":2,\"lj\":1,\"ml\":4,\"bm\":0,\"nm\":\"Stroke 1\",\"mn\":\"ADBE Vector Graphic - Stroke\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":0,\"k\":[0,0],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Shape 1\",\"np\":3,\"cix\":2,\"bm\":0,\"ix\":1,\"mn\":\"ADBE Vector Group\",\"hd\":false},{\"ty\":\"tm\",\"s\":{\"a\":1,\"k\":[{\"i\":{\"x\":[0.667],\"y\":[1]},\"o\":{\"x\":[0.333],\"y\":[0]},\"t\":80,\"s\":[100]},{\"t\":93,\"s\":[0]}],\"ix\":1},\"e\":{\"a\":0,\"k\":100,\"ix\":2},\"o\":{\"a\":0,\"k\":0,\"ix\":3},\"m\":1,\"ix\":2,\"nm\":\"Trim Paths 1\",\"mn\":\"ADBE Vector Filter - Trim\",\"hd\":false}],\"ip\":20,\"op\":120,\"st\":0,\"bm\":0},{\"ddd\":0,\"ind\":3,\"ty\":4,\"nm\":\"Shape Layer 4\",\"sr\":1,\"ks\":{\"o\":{\"a\":0,\"k\":100,\"ix\":11},\"r\":{\"a\":0,\"k\":0,\"ix\":10},\"p\":{\"a\":0,\"k\":[564,468,0],\"ix\":2},\"a\":{\"a\":0,\"k\":[80,-236,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100,100],\"ix\":6}},\"ao\":0,\"shapes\":[{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[-168,-234],[194,-234]],\"c\":false},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"st\",\"c\":{\"a\":0,\"k\":[0.941176470588,0.827450980392,0.96862745098,1],\"ix\":3},\"o\":{\"a\":0,\"k\":100,\"ix\":4},\"w\":{\"a\":0,\"k\":30,\"ix\":5},\"lc\":2,\"lj\":1,\"ml\":4,\"bm\":0,\"nm\":\"Stroke 1\",\"mn\":\"ADBE Vector Graphic - Stroke\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":0,\"k\":[0,0],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Shape 1\",\"np\":3,\"cix\":2,\"bm\":0,\"ix\":1,\"mn\":\"ADBE Vector Group\",\"hd\":false},{\"ty\":\"tm\",\"s\":{\"a\":1,\"k\":[{\"i\":{\"x\":[0.667],\"y\":[1]},\"o\":{\"x\":[0.333],\"y\":[0]},\"t\":63,\"s\":[100]},{\"t\":76,\"s\":[0]}],\"ix\":1},\"e\":{\"a\":0,\"k\":100,\"ix\":2},\"o\":{\"a\":0,\"k\":0,\"ix\":3},\"m\":1,\"ix\":2,\"nm\":\"Trim Paths 1\",\"mn\":\"ADBE Vector Filter - Trim\",\"hd\":false}],\"ip\":20,\"op\":120,\"st\":0,\"bm\":0},{\"ddd\":0,\"ind\":4,\"ty\":4,\"nm\":\"Shape Layer 2\",\"sr\":1,\"ks\":{\"o\":{\"a\":0,\"k\":100,\"ix\":11},\"r\":{\"a\":0,\"k\":0,\"ix\":10},\"p\":{\"a\":0,\"k\":[564,348,0],\"ix\":2},\"a\":{\"a\":0,\"k\":[80,-236,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100,100],\"ix\":6}},\"ao\":0,\"shapes\":[{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[-52,-234],[194,-234]],\"c\":false},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"st\",\"c\":{\"a\":0,\"k\":[0.941176470588,0.827450980392,0.96862745098,1],\"ix\":3},\"o\":{\"a\":0,\"k\":100,\"ix\":4},\"w\":{\"a\":0,\"k\":30,\"ix\":5},\"lc\":2,\"lj\":1,\"ml\":4,\"bm\":0,\"nm\":\"Stroke 1\",\"mn\":\"ADBE Vector Graphic - Stroke\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":0,\"k\":[0,0],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Shape 1\",\"np\":3,\"cix\":2,\"bm\":0,\"ix\":1,\"mn\":\"ADBE Vector Group\",\"hd\":false},{\"ty\":\"tm\",\"s\":{\"a\":1,\"k\":[{\"i\":{\"x\":[0.667],\"y\":[1]},\"o\":{\"x\":[0.333],\"y\":[0]},\"t\":45,\"s\":[100]},{\"t\":60,\"s\":[0]}],\"ix\":1},\"e\":{\"a\":0,\"k\":100,\"ix\":2},\"o\":{\"a\":0,\"k\":0,\"ix\":3},\"m\":1,\"ix\":2,\"nm\":\"Trim Paths 1\",\"mn\":\"ADBE Vector Filter - Trim\",\"hd\":false}],\"ip\":20,\"op\":120,\"st\":0,\"bm\":0},{\"ddd\":0,\"ind\":5,\"ty\":4,\"nm\":\"Shape Layer 1\",\"sr\":1,\"ks\":{\"o\":{\"a\":0,\"k\":100,\"ix\":11},\"r\":{\"a\":0,\"k\":0,\"ix\":10},\"p\":{\"a\":0,\"k\":[484,584,0],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0,0],\"ix\":1},\"s\":{\"a\":1,\"k\":[{\"i\":{\"x\":[0.667,0.667,0.667],\"y\":[1,1,1]},\"o\":{\"x\":[0.333,0.333,0.333],\"y\":[0,0,0]},\"t\":6,\"s\":[0,0,100]},{\"t\":18,\"s\":[100,100,100]}],\"ix\":6}},\"ao\":0,\"shapes\":[{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":1,\"k\":[{\"i\":{\"x\":0.415,\"y\":1},\"o\":{\"x\":0.333,\"y\":0},\"t\":18,\"s\":[{\"i\":[[0,-37.003],[0,0],[37.003,0],[0,0],[0,37.003],[0,0],[-37.003,0],[0,0]],\"o\":[[0,0],[0,37.003],[0,0],[-37.003,0],[0,0],[0,-37.003],[0,0],[37.003,0]],\"v\":[[258,-269],[258,269],[191,336],[165,336],[98,269],[98,-269],[165,-336],[191,-336]],\"c\":true}]},{\"t\":39,\"s\":[{\"i\":[[0,-37.003],[0,0],[37.003,0],[0,0],[0,37.003],[0,0],[-37.003,0],[0,0]],\"o\":[[0,0],[0,37.003],[0,0],[-37.003,0],[0,0],[0,-37.003],[0,0],[37.003,0]],\"v\":[[258,-269],[258,269],[191,336],[-191,336],[-258,269],[-258,-269],[-191,-336],[191,-336]],\"c\":true}]}],\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"fl\",\"c\":{\"a\":0,\"k\":[0.6980392156862745,0.8666666666666667,0.30196078431372547,1],\"ix\":4},\"o\":{\"a\":0,\"k\":100,\"ix\":5},\"r\":1,\"bm\":0,\"nm\":\"Fill 1\",\"mn\":\"ADBE Vector Graphic - Fill\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":0,\"k\":[10,-36],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Rectangle 1\",\"np\":3,\"cix\":2,\"bm\":0,\"ix\":1,\"mn\":\"ADBE Vector Group\",\"hd\":false}],\"ip\":0,\"op\":120,\"st\":0,\"bm\":0}],\"markers\":[]}");

/***/ }),

/***/ "./static/Assets/Image/Lottie/rightArrow.json":
/*!****************************************************!*\
  !*** ./static/Assets/Image/Lottie/rightArrow.json ***!
  \****************************************************/
/*! exports provided: v, fr, ip, op, w, h, nm, ddd, assets, layers, markers, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"v\":\"5.5.9\",\"fr\":60,\"ip\":0,\"op\":151,\"w\":500,\"h\":500,\"nm\":\"scroll_up 2\",\"ddd\":0,\"assets\":[{\"id\":\"comp_0\",\"layers\":[{\"ddd\":0,\"ind\":1,\"ty\":3,\"nm\":\"Null 1\",\"sr\":1,\"ks\":{\"o\":{\"a\":0,\"k\":0,\"ix\":11},\"r\":{\"a\":0,\"k\":0,\"ix\":10},\"p\":{\"a\":1,\"k\":[{\"i\":{\"x\":0.667,\"y\":1},\"o\":{\"x\":0.333,\"y\":0},\"t\":0,\"s\":[250,468,0],\"to\":[0,-36.333,0],\"ti\":[0,36.333,0]},{\"t\":79,\"s\":[250,250,0]}],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100,100],\"ix\":6}},\"ao\":0,\"ip\":0,\"op\":3600,\"st\":0,\"bm\":0},{\"ddd\":0,\"ind\":2,\"ty\":4,\"nm\":\"Path 2\",\"sr\":1,\"ks\":{\"o\":{\"a\":1,\"k\":[{\"i\":{\"x\":[0.667],\"y\":[1]},\"o\":{\"x\":[0.333],\"y\":[0]},\"t\":62,\"s\":[0]},{\"i\":{\"x\":[0.833],\"y\":[1]},\"o\":{\"x\":[0.167],\"y\":[0]},\"t\":108,\"s\":[100]},{\"i\":{\"x\":[0.833],\"y\":[1]},\"o\":{\"x\":[0.167],\"y\":[0]},\"t\":126,\"s\":[100]},{\"t\":143,\"s\":[0]}],\"ix\":11},\"r\":{\"a\":0,\"k\":0,\"ix\":10},\"p\":{\"a\":1,\"k\":[{\"i\":{\"x\":0.667,\"y\":1},\"o\":{\"x\":0.333,\"y\":0},\"t\":48,\"s\":[243.769,343.23,0],\"to\":[0,-11.5,0],\"ti\":[0,11.5,0]},{\"t\":99,\"s\":[243.769,274.23,0]}],\"ix\":2},\"a\":{\"a\":0,\"k\":[63.846,26.538,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100,100],\"ix\":6}},\"ao\":0,\"shapes\":[{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,0],[0,0],[0,0],[0,0]],\"o\":[[0,0],[0,0],[0,0],[0,0]],\"v\":[[0,53.077],[65.384,0],[100.697,30.081],[127.692,53.077]],\"c\":false},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"st\",\"c\":{\"a\":0,\"k\":[0,0,0,1],\"ix\":3},\"o\":{\"a\":0,\"k\":100,\"ix\":4},\"w\":{\"a\":0,\"k\":18,\"ix\":5},\"lc\":2,\"lj\":2,\"bm\":0,\"nm\":\"Stroke 1\",\"mn\":\"ADBE Vector Graphic - Stroke\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":0,\"k\":[0,0],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Path 2\",\"np\":3,\"cix\":2,\"bm\":0,\"ix\":1,\"mn\":\"ADBE Vector Group\",\"hd\":false}],\"ip\":0,\"op\":3600,\"st\":0,\"bm\":0},{\"ddd\":0,\"ind\":3,\"ty\":4,\"nm\":\"Path 1\",\"parent\":1,\"sr\":1,\"ks\":{\"o\":{\"a\":1,\"k\":[{\"i\":{\"x\":[0.667],\"y\":[1]},\"o\":{\"x\":[0.333],\"y\":[0]},\"t\":32,\"s\":[0]},{\"i\":{\"x\":[0.833],\"y\":[1]},\"o\":{\"x\":[0.333],\"y\":[0]},\"t\":92,\"s\":[100]},{\"i\":{\"x\":[0.833],\"y\":[1]},\"o\":{\"x\":[0.167],\"y\":[0]},\"t\":117,\"s\":[100]},{\"t\":132,\"s\":[1]}],\"ix\":11},\"r\":{\"a\":0,\"k\":0,\"ix\":10},\"p\":{\"a\":0,\"k\":[-5.231,-51.77,0],\"ix\":2},\"a\":{\"a\":0,\"k\":[63.846,26.538,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100,100],\"ix\":6}},\"ao\":0,\"shapes\":[{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,0],[0,0],[0,0],[0,0]],\"o\":[[0,0],[0,0],[0,0],[0,0]],\"v\":[[0,53.077],[65.384,0],[100.697,30.081],[127.692,53.077]],\"c\":false},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"st\",\"c\":{\"a\":0,\"k\":[0,0,0,1],\"ix\":3},\"o\":{\"a\":0,\"k\":100,\"ix\":4},\"w\":{\"a\":0,\"k\":18,\"ix\":5},\"lc\":2,\"lj\":2,\"bm\":0,\"nm\":\"Stroke 1\",\"mn\":\"ADBE Vector Graphic - Stroke\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":0,\"k\":[0,0],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Path 1\",\"np\":3,\"cix\":2,\"bm\":0,\"ix\":1,\"mn\":\"ADBE Vector Group\",\"hd\":false}],\"ip\":0,\"op\":3600,\"st\":0,\"bm\":0}]}],\"layers\":[{\"ddd\":0,\"ind\":1,\"ty\":0,\"nm\":\"scroll_up\",\"refId\":\"comp_0\",\"sr\":1,\"ks\":{\"o\":{\"a\":0,\"k\":100,\"ix\":11},\"r\":{\"a\":0,\"k\":90,\"ix\":10},\"p\":{\"a\":0,\"k\":[249,250,0],\"ix\":2},\"a\":{\"a\":0,\"k\":[250,250,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100,100],\"ix\":6}},\"ao\":0,\"w\":500,\"h\":500,\"ip\":0,\"op\":3600,\"st\":0,\"bm\":0}],\"markers\":[]}");

/***/ }),

/***/ "./static/Assets/Image/Lottie/success.json":
/*!*************************************************!*\
  !*** ./static/Assets/Image/Lottie/success.json ***!
  \*************************************************/
/*! exports provided: v, meta, fr, ip, op, w, h, nm, ddd, assets, layers, markers, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"v\":\"5.5.7\",\"meta\":{\"g\":\"LottieFiles AE 0.1.21\",\"a\":\"\",\"k\":\"\",\"d\":\"\",\"tc\":\"\"},\"fr\":29.9700012207031,\"ip\":0,\"op\":50.0000020365418,\"w\":360,\"h\":360,\"nm\":\"Success\",\"ddd\":0,\"assets\":[],\"layers\":[{\"ddd\":0,\"ind\":1,\"ty\":4,\"nm\":\"Tick Outlines\",\"sr\":1,\"ks\":{\"o\":{\"a\":1,\"k\":[{\"t\":0,\"s\":[0],\"h\":1},{\"i\":{\"x\":[0.833],\"y\":[0.833]},\"o\":{\"x\":[1],\"y\":[0.005]},\"t\":20,\"s\":[0]},{\"t\":26.0000010590017,\"s\":[100]}],\"ix\":11},\"r\":{\"a\":0,\"k\":0,\"ix\":10},\"p\":{\"a\":0,\"k\":[180.056,180.011,0],\"ix\":2},\"a\":{\"a\":0,\"k\":[28.402,25.421,0],\"ix\":1},\"s\":{\"a\":1,\"k\":[{\"i\":{\"x\":[0.833,0.833,0.833],\"y\":[0.833,0.833,-24]},\"o\":{\"x\":[1,1,0.333],\"y\":[0.003,0.003,0]},\"t\":20,\"s\":[0,0,100]},{\"i\":{\"x\":[0.833,0.833,0.833],\"y\":[1,1,1]},\"o\":{\"x\":[0.333,0.333,0.333],\"y\":[0,0,0]},\"t\":26,\"s\":[150,150,100]},{\"i\":{\"x\":[0.599,0.599,0.833],\"y\":[1.945,1.945,1]},\"o\":{\"x\":[0.211,0.211,0.167],\"y\":[1.647,1.647,0]},\"t\":30,\"s\":[80,80,100]},{\"t\":36.0000014663101,\"s\":[100,100,100]}],\"ix\":6}},\"ao\":0,\"shapes\":[{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[-2.283,-2.474],[0,0],[0,0],[-2.652,-2.073],[2.073,-2.652],[0,0],[2.549,2.761],[0,0],[-2.474,2.283]],\"o\":[[0,0],[0,0],[2.074,-2.651],[2.652,2.074],[0,0],[-2.315,2.96],[0,0],[-2.283,-2.474],[2.473,-2.283]],\"v\":[[-16.911,-1.097],[-7.709,8.873],[16.476,-22.051],[25.032,-23.098],[26.079,-14.541],[-2.523,22.03],[-11.804,22.41],[-25.868,7.172],[-25.524,-1.442]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"fl\",\"c\":{\"a\":0,\"k\":[1,1,1,1],\"ix\":4},\"o\":{\"a\":0,\"k\":100,\"ix\":5},\"r\":1,\"bm\":0,\"nm\":\"Fill 1\",\"mn\":\"ADBE Vector Graphic - Fill\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":0,\"k\":[28.401,25.421],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Group 1\",\"np\":2,\"cix\":2,\"bm\":0,\"ix\":1,\"mn\":\"ADBE Vector Group\",\"hd\":false}],\"ip\":0,\"op\":50.0000020365418,\"st\":0,\"bm\":0},{\"ddd\":0,\"ind\":2,\"ty\":4,\"nm\":\"Solid Circle Outlines\",\"sr\":1,\"ks\":{\"o\":{\"a\":1,\"k\":[{\"i\":{\"x\":[0.833],\"y\":[0.833]},\"o\":{\"x\":[0.167],\"y\":[0.167]},\"t\":0,\"s\":[0]},{\"i\":{\"x\":[0.833],\"y\":[0.833]},\"o\":{\"x\":[0.167],\"y\":[0.167]},\"t\":10,\"s\":[0]},{\"t\":20.0000008146167,\"s\":[100]}],\"ix\":11},\"r\":{\"a\":0,\"k\":0,\"ix\":10},\"p\":{\"a\":0,\"k\":[180,179.999,0],\"ix\":2},\"a\":{\"a\":0,\"k\":[60.25,60.25,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100,100],\"ix\":6}},\"ao\":0,\"shapes\":[{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[-33.138,0],[0,33.138],[33.137,0],[0,-33.137]],\"o\":[[33.137,0],[0,-33.137],[-33.138,0],[0,33.138]],\"v\":[[0,60],[60,0],[0,-60],[-60,0]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"fl\",\"c\":{\"a\":0,\"k\":[0.305220211253,0.725116265989,0.096665498322,1],\"ix\":4},\"o\":{\"a\":0,\"k\":100,\"ix\":5},\"r\":1,\"bm\":0,\"nm\":\"Fill 1\",\"mn\":\"ADBE Vector Graphic - Fill\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":0,\"k\":[60.25,60.25],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Group 1\",\"np\":2,\"cix\":2,\"bm\":0,\"ix\":1,\"mn\":\"ADBE Vector Group\",\"hd\":false}],\"ip\":0,\"op\":50.0000020365418,\"st\":0,\"bm\":0},{\"ddd\":0,\"ind\":3,\"ty\":4,\"nm\":\"Big Green Border Outlines\",\"sr\":1,\"ks\":{\"o\":{\"a\":1,\"k\":[{\"i\":{\"x\":[0.833],\"y\":[0.833]},\"o\":{\"x\":[0.167],\"y\":[0.167]},\"t\":16,\"s\":[0]},{\"i\":{\"x\":[0.833],\"y\":[0.833]},\"o\":{\"x\":[0.167],\"y\":[0.167]},\"t\":18,\"s\":[50]},{\"t\":21.0000008553475,\"s\":[0]}],\"ix\":11},\"r\":{\"a\":0,\"k\":0,\"ix\":10},\"p\":{\"a\":0,\"k\":[180,179.999,0],\"ix\":2},\"a\":{\"a\":0,\"k\":[89.955,89.955,0],\"ix\":1},\"s\":{\"a\":1,\"k\":[{\"i\":{\"x\":[0.833,0.833,0.833],\"y\":[0.833,0.833,0.833]},\"o\":{\"x\":[0.167,0.167,0.167],\"y\":[0.167,0.167,0.167]},\"t\":0,\"s\":[0,0,100]},{\"i\":{\"x\":[0.833,0.833,0.833],\"y\":[0.833,0.833,0.833]},\"o\":{\"x\":[0.167,0.167,0.167],\"y\":[0.167,0.167,0.167]},\"t\":16,\"s\":[72,72,100]},{\"t\":21.0000008553475,\"s\":[150,150,100]}],\"ix\":6}},\"ao\":0,\"shapes\":[{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[-44.183,0],[0,44.184],[44.183,0],[0,-44.183]],\"o\":[[44.183,0],[0,-44.183],[-44.183,0],[0,44.184]],\"v\":[[0,80],[80,0],[0,-80],[-80,0]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"st\",\"c\":{\"a\":0,\"k\":[0.305220211253,0.725116265989,0.096665498322,1],\"ix\":3},\"o\":{\"a\":0,\"k\":100,\"ix\":4},\"w\":{\"a\":0,\"k\":3.982,\"ix\":5},\"lc\":1,\"lj\":1,\"ml\":10,\"bm\":0,\"nm\":\"Stroke 1\",\"mn\":\"ADBE Vector Graphic - Stroke\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":0,\"k\":[89.955,89.955],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Group 1\",\"np\":2,\"cix\":2,\"bm\":0,\"ix\":1,\"mn\":\"ADBE Vector Group\",\"hd\":false}],\"ip\":0,\"op\":50.0000020365418,\"st\":0,\"bm\":0},{\"ddd\":0,\"ind\":4,\"ty\":4,\"nm\":\"Green Border Outlines\",\"sr\":1,\"ks\":{\"o\":{\"a\":1,\"k\":[{\"i\":{\"x\":[0.833],\"y\":[0.833]},\"o\":{\"x\":[0.167],\"y\":[0.167]},\"t\":10,\"s\":[100]},{\"t\":20.0000008146167,\"s\":[0]}],\"ix\":11},\"r\":{\"a\":0,\"k\":0,\"ix\":10},\"p\":{\"a\":0,\"k\":[180,179.999,0],\"ix\":2},\"a\":{\"a\":0,\"k\":[67.465,67.465,0],\"ix\":1},\"s\":{\"a\":1,\"k\":[{\"i\":{\"x\":[0.833,0.833,0.833],\"y\":[0.833,0.833,0.833]},\"o\":{\"x\":[0.167,0.167,0.167],\"y\":[0.167,0.167,0.167]},\"t\":10,\"s\":[100,100,100]},{\"t\":20.0000008146167,\"s\":[150,150,100]}],\"ix\":6}},\"ao\":0,\"shapes\":[{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[-33.138,0],[0,33.138],[33.137,0],[0,-33.137]],\"o\":[[33.137,0],[0,-33.137],[-33.138,0],[0,33.138]],\"v\":[[0,60],[60,0],[0,-60],[-60,0]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"tm\",\"s\":{\"a\":1,\"k\":[{\"i\":{\"x\":[0.833],\"y\":[0.833]},\"o\":{\"x\":[0.167],\"y\":[0.167]},\"t\":0,\"s\":[100]},{\"t\":10.0000004073083,\"s\":[0]}],\"ix\":1},\"e\":{\"a\":0,\"k\":100,\"ix\":2},\"o\":{\"a\":0,\"k\":0,\"ix\":3},\"m\":1,\"ix\":2,\"nm\":\"Trim Paths 1\",\"mn\":\"ADBE Vector Filter - Trim\",\"hd\":false},{\"ty\":\"st\",\"c\":{\"a\":0,\"k\":[0.305220211253,0.725116265989,0.096665498322,1],\"ix\":3},\"o\":{\"a\":0,\"k\":100,\"ix\":4},\"w\":{\"a\":0,\"k\":2.986,\"ix\":5},\"lc\":1,\"lj\":1,\"ml\":10,\"bm\":0,\"nm\":\"Stroke 1\",\"mn\":\"ADBE Vector Graphic - Stroke\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":0,\"k\":[67.465,67.465],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Group 1\",\"np\":3,\"cix\":2,\"bm\":0,\"ix\":1,\"mn\":\"ADBE Vector Group\",\"hd\":false}],\"ip\":0,\"op\":50.0000020365418,\"st\":0,\"bm\":0},{\"ddd\":0,\"ind\":5,\"ty\":4,\"nm\":\"Burst Outlines\",\"sr\":1,\"ks\":{\"o\":{\"a\":1,\"k\":[{\"t\":0,\"s\":[0],\"h\":1},{\"i\":{\"x\":[0.833],\"y\":[0.833]},\"o\":{\"x\":[0.167],\"y\":[0.167]},\"t\":23,\"s\":[0]},{\"i\":{\"x\":[0.833],\"y\":[0.833]},\"o\":{\"x\":[0.333],\"y\":[0]},\"t\":25,\"s\":[100]},{\"t\":30.0000012219251,\"s\":[0]}],\"ix\":11},\"r\":{\"a\":0,\"k\":0,\"ix\":10},\"p\":{\"a\":0,\"k\":[180.734,175.365,0],\"ix\":2},\"a\":{\"a\":0,\"k\":[104.611,106.395,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100,100],\"ix\":6}},\"ao\":0,\"shapes\":[{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,-1.811],[1.81,0],[0,1.811],[-1.811,0]],\"o\":[[0,1.811],[-1.811,0],[0,-1.811],[1.81,0]],\"v\":[[3.279,0],[0,3.278],[-3.279,0],[0,-3.278]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"fl\",\"c\":{\"a\":0,\"k\":[0.305220211253,0.725116265989,0.096665498322,1],\"ix\":4},\"o\":{\"a\":0,\"k\":100,\"ix\":5},\"r\":1,\"bm\":0,\"nm\":\"Fill 1\",\"mn\":\"ADBE Vector Graphic - Fill\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":1,\"k\":[{\"i\":{\"x\":0.833,\"y\":0.833},\"o\":{\"x\":0.167,\"y\":0.167},\"t\":19,\"s\":[106,106],\"to\":[14.492,8.317],\"ti\":[-14.492,-8.317]},{\"t\":26.0000010590017,\"s\":[192.95,155.899]}],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Group 1\",\"np\":2,\"cix\":2,\"bm\":0,\"ix\":1,\"mn\":\"ADBE Vector Group\",\"hd\":false},{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,-1.811],[1.81,0],[0,1.812],[-1.811,0]],\"o\":[[0,1.812],[-1.811,0],[0,-1.811],[1.81,0]],\"v\":[[3.279,-0.001],[0,3.279],[-3.279,-0.001],[0,-3.279]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"fl\",\"c\":{\"a\":0,\"k\":[0.305220211253,0.725116265989,0.096665498322,1],\"ix\":4},\"o\":{\"a\":0,\"k\":100,\"ix\":5},\"r\":1,\"bm\":0,\"nm\":\"Fill 1\",\"mn\":\"ADBE Vector Graphic - Fill\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":1,\"k\":[{\"i\":{\"x\":0.833,\"y\":0.833},\"o\":{\"x\":0.167,\"y\":0.167},\"t\":19,\"s\":[105,105],\"to\":[13.019,-6.16],\"ti\":[-13.019,6.16]},{\"t\":26.0000010590017,\"s\":[183.114,68.041]}],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Group 2\",\"np\":2,\"cix\":2,\"bm\":0,\"ix\":2,\"mn\":\"ADBE Vector Group\",\"hd\":false},{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,-3.621],[3.621,0],[0,3.621],[-3.621,0]],\"o\":[[0,3.621],[-3.621,0],[0,-3.621],[3.621,0]],\"v\":[[6.557,0],[-0.001,6.557],[-6.557,0],[-0.001,-6.557]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"fl\",\"c\":{\"a\":0,\"k\":[0.305220211253,0.725116265989,0.096665498322,1],\"ix\":4},\"o\":{\"a\":0,\"k\":100,\"ix\":5},\"r\":1,\"bm\":0,\"nm\":\"Fill 1\",\"mn\":\"ADBE Vector Graphic - Fill\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":1,\"k\":[{\"i\":{\"x\":0.833,\"y\":0.833},\"o\":{\"x\":0.167,\"y\":0.167},\"t\":19,\"s\":[105,105],\"to\":[11.926,-14.076],\"ti\":[-11.926,14.076]},{\"t\":26.0000010590017,\"s\":[176.557,20.546]}],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Group 3\",\"np\":2,\"cix\":2,\"bm\":0,\"ix\":3,\"mn\":\"ADBE Vector Group\",\"hd\":false},{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,-1.811],[1.811,0],[0,1.811],[-1.811,0]],\"o\":[[0,1.811],[-1.811,0],[0,-1.811],[1.811,0]],\"v\":[[3.279,0],[0,3.278],[-3.279,0],[0,-3.278]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"fl\",\"c\":{\"a\":0,\"k\":[0.305220211253,0.725116265989,0.096665498322,1],\"ix\":4},\"o\":{\"a\":0,\"k\":100,\"ix\":5},\"r\":1,\"bm\":0,\"nm\":\"Fill 1\",\"mn\":\"ADBE Vector Graphic - Fill\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":1,\"k\":[{\"i\":{\"x\":0.833,\"y\":0.833},\"o\":{\"x\":0.167,\"y\":0.167},\"t\":19,\"s\":[105,105],\"to\":[-13.176,-8.053],\"ti\":[13.176,8.053]},{\"t\":26.0000010590017,\"s\":[25.942,56.679]}],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Group 4\",\"np\":2,\"cix\":2,\"bm\":0,\"ix\":4,\"mn\":\"ADBE Vector Group\",\"hd\":false},{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,-1.811],[1.81,0],[0,1.811],[-1.811,0]],\"o\":[[0,1.811],[-1.811,0],[0,-1.811],[1.81,0]],\"v\":[[3.279,0],[0,3.278],[-3.279,0],[0,-3.278]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"fl\",\"c\":{\"a\":0,\"k\":[0.305220211253,0.725116265989,0.096665498322,1],\"ix\":4},\"o\":{\"a\":0,\"k\":100,\"ix\":5},\"r\":1,\"bm\":0,\"nm\":\"Fill 1\",\"mn\":\"ADBE Vector Graphic - Fill\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":1,\"k\":[{\"i\":{\"x\":0.833,\"y\":0.833},\"o\":{\"x\":0.167,\"y\":0.167},\"t\":19,\"s\":[105,105],\"to\":[-4.759,16.085],\"ti\":[4.759,-16.085]},{\"t\":26.0000010590017,\"s\":[76.448,201.512]}],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Group 5\",\"np\":2,\"cix\":2,\"bm\":0,\"ix\":5,\"mn\":\"ADBE Vector Group\",\"hd\":false},{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,-1.811],[1.81,0],[0,1.811],[-1.811,0]],\"o\":[[0,1.811],[-1.811,0],[0,-1.811],[1.81,0]],\"v\":[[3.279,0],[0,3.278],[-3.279,0],[0,-3.278]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"fl\",\"c\":{\"a\":0,\"k\":[0.305220211253,0.725116265989,0.096665498322,1],\"ix\":4},\"o\":{\"a\":0,\"k\":100,\"ix\":5},\"r\":1,\"bm\":0,\"nm\":\"Fill 1\",\"mn\":\"ADBE Vector Graphic - Fill\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":1,\"k\":[{\"i\":{\"x\":0.833,\"y\":0.833},\"o\":{\"x\":0.167,\"y\":0.167},\"t\":19,\"s\":[105,105],\"to\":[6.502,16.085],\"ti\":[-6.502,-16.085]},{\"t\":26.0000010590017,\"s\":[144.009,201.512]}],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Group 6\",\"np\":2,\"cix\":2,\"bm\":0,\"ix\":6,\"mn\":\"ADBE Vector Group\",\"hd\":false},{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,-1.812],[1.81,0],[0,1.811],[-1.811,0]],\"o\":[[0,1.811],[-1.811,0],[0,-1.812],[1.81,0]],\"v\":[[3.279,0],[0,3.279],[-3.279,0],[0,-3.279]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"fl\",\"c\":{\"a\":0,\"k\":[0.305220211253,0.725116265989,0.096665498322,1],\"ix\":4},\"o\":{\"a\":0,\"k\":100,\"ix\":5},\"r\":1,\"bm\":0,\"nm\":\"Fill 1\",\"mn\":\"ADBE Vector Graphic - Fill\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":1,\"k\":[{\"i\":{\"x\":0.833,\"y\":0.833},\"o\":{\"x\":0.167,\"y\":0.167},\"t\":19,\"s\":[105,105],\"to\":[16.782,4.522],\"ti\":[-16.782,-4.522]},{\"t\":26.0000010590017,\"s\":[205.693,132.132]}],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Group 7\",\"np\":2,\"cix\":2,\"bm\":0,\"ix\":7,\"mn\":\"ADBE Vector Group\",\"hd\":false},{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,-3.621],[3.621,0],[0,3.621],[-3.622,0]],\"o\":[[0,3.621],[-3.622,0],[0,-3.621],[3.621,0]],\"v\":[[6.557,0],[0,6.557],[-6.557,0],[0,-6.557]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"fl\",\"c\":{\"a\":0,\"k\":[0.305220211253,0.725116265989,0.096665498322,1],\"ix\":4},\"o\":{\"a\":0,\"k\":100,\"ix\":5},\"r\":1,\"bm\":0,\"nm\":\"Fill 1\",\"mn\":\"ADBE Vector Graphic - Fill\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":1,\"k\":[{\"i\":{\"x\":0.833,\"y\":0.833},\"o\":{\"x\":0.167,\"y\":0.167},\"t\":19,\"s\":[105,105],\"to\":[-12.083,15.368],\"ti\":[12.083,-15.368]},{\"t\":26.0000010590017,\"s\":[32.499,197.209]}],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Group 8\",\"np\":2,\"cix\":2,\"bm\":0,\"ix\":8,\"mn\":\"ADBE Vector Group\",\"hd\":false},{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,-1.812],[1.81,0],[0,1.811],[-1.811,0]],\"o\":[[0,1.811],[-1.811,0],[0,-1.812],[1.81,0]],\"v\":[[3.279,0],[0.001,3.279],[-3.279,0],[0.001,-3.279]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"fl\",\"c\":{\"a\":0,\"k\":[0.305220211253,0.725116265989,0.096665498322,1],\"ix\":4},\"o\":{\"a\":0,\"k\":100,\"ix\":5},\"r\":1,\"bm\":0,\"nm\":\"Fill 1\",\"mn\":\"ADBE Vector Graphic - Fill\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":1,\"k\":[{\"i\":{\"x\":0.833,\"y\":0.833},\"o\":{\"x\":0.167,\"y\":0.167},\"t\":19,\"s\":[105,105],\"to\":[-11.537,-14.622],\"ti\":[11.537,14.622]},{\"t\":26.0000010590017,\"s\":[35.778,17.268]}],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Group 9\",\"np\":2,\"cix\":2,\"bm\":0,\"ix\":9,\"mn\":\"ADBE Vector Group\",\"hd\":false},{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,-1.811],[1.81,0],[0,1.811],[-1.811,0]],\"o\":[[0,1.811],[-1.811,0],[0,-1.811],[1.81,0]],\"v\":[[3.279,0],[0,3.278],[-3.279,0],[0,-3.278]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"fl\",\"c\":{\"a\":0,\"k\":[0.305220211253,0.725116265989,0.096665498322,1],\"ix\":4},\"o\":{\"a\":0,\"k\":100,\"ix\":5},\"r\":1,\"bm\":0,\"nm\":\"Fill 1\",\"mn\":\"ADBE Vector Graphic - Fill\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":1,\"k\":[{\"i\":{\"x\":0.833,\"y\":0.833},\"o\":{\"x\":0.167,\"y\":0.167},\"t\":19,\"s\":[105,105],\"to\":[7.594,-12.436],\"ti\":[-7.594,12.436]},{\"t\":26.0000010590017,\"s\":[150.566,30.382]}],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Group 10\",\"np\":2,\"cix\":2,\"bm\":0,\"ix\":10,\"mn\":\"ADBE Vector Group\",\"hd\":false},{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,-1.811],[1.81,0],[0,1.811],[-1.811,0]],\"o\":[[0,1.811],[-1.811,0],[0,-1.811],[1.81,0]],\"v\":[[3.279,0],[0.001,3.278],[-3.279,0],[0.001,-3.278]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"fl\",\"c\":{\"a\":0,\"k\":[0.305220211253,0.725116265989,0.096665498322,1],\"ix\":4},\"o\":{\"a\":0,\"k\":100,\"ix\":5},\"r\":1,\"bm\":0,\"nm\":\"Fill 1\",\"mn\":\"ADBE Vector Graphic - Fill\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":1,\"k\":[{\"i\":{\"x\":0.833,\"y\":0.833},\"o\":{\"x\":0.167,\"y\":0.167},\"t\":19,\"s\":[105,105],\"to\":[-15.819,10.036],\"ti\":[15.819,-10.036]},{\"t\":26.0000010590017,\"s\":[10.084,165.214]}],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Group 11\",\"np\":2,\"cix\":2,\"bm\":0,\"ix\":11,\"mn\":\"ADBE Vector Group\",\"hd\":false},{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,-3.621],[3.621,0],[0,3.621],[-3.622,0]],\"o\":[[0,3.621],[-3.622,0],[0,-3.621],[3.621,0]],\"v\":[[6.557,0],[0,6.557],[-6.557,0],[0,-6.557]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"fl\",\"c\":{\"a\":0,\"k\":[0.305220211253,0.725116265989,0.096665498322,1],\"ix\":4},\"o\":{\"a\":0,\"k\":100,\"ix\":5},\"r\":1,\"bm\":0,\"nm\":\"Fill 1\",\"mn\":\"ADBE Vector Graphic - Fill\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":1,\"k\":[{\"i\":{\"x\":0.833,\"y\":0.833},\"o\":{\"x\":0.167,\"y\":0.167},\"t\":19,\"s\":[105,105],\"to\":[16.236,-4.49],\"ti\":[-16.236,4.49]},{\"t\":26.0000010590017,\"s\":[202.414,78.057]}],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Group 12\",\"np\":2,\"cix\":2,\"bm\":0,\"ix\":12,\"mn\":\"ADBE Vector Group\",\"hd\":false},{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,-3.621],[3.622,0],[0,3.621],[-3.621,0]],\"o\":[[0,3.621],[-3.621,0],[0,-3.621],[3.622,0]],\"v\":[[6.557,0],[-0.001,6.557],[-6.557,0],[-0.001,-6.557]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"fl\",\"c\":{\"a\":0,\"k\":[0.305220211253,0.725116265989,0.096665498322,1],\"ix\":4},\"o\":{\"a\":0,\"k\":100,\"ix\":5},\"r\":1,\"bm\":0,\"nm\":\"Fill 1\",\"mn\":\"ADBE Vector Graphic - Fill\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":1,\"k\":[{\"i\":{\"x\":0.833,\"y\":0.833},\"o\":{\"x\":0.167,\"y\":0.167},\"t\":19,\"s\":[105,105],\"to\":[-6.398,-14.076],\"ti\":[6.398,14.076]},{\"t\":26.0000010590017,\"s\":[66.613,20.546]}],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Group 13\",\"np\":2,\"cix\":2,\"bm\":0,\"ix\":13,\"mn\":\"ADBE Vector Group\",\"hd\":false},{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,-1.811],[1.81,0],[0,1.811],[-1.811,0]],\"o\":[[0,1.811],[-1.811,0],[0,-1.811],[1.81,0]],\"v\":[[3.279,0],[0,3.278],[-3.279,0],[0,-3.278]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"fl\",\"c\":{\"a\":0,\"k\":[0.305220211253,0.725116265989,0.096665498322,1],\"ix\":4},\"o\":{\"a\":0,\"k\":100,\"ix\":5},\"r\":1,\"bm\":0,\"nm\":\"Fill 1\",\"mn\":\"ADBE Vector Graphic - Fill\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":1,\"k\":[{\"i\":{\"x\":0.833,\"y\":0.833},\"o\":{\"x\":0.167,\"y\":0.167},\"t\":19,\"s\":[105,105],\"to\":[1.09,17.377],\"ti\":[-1.09,-17.377]},{\"t\":26.0000010590017,\"s\":[111.542,209.261]}],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Group 14\",\"np\":2,\"cix\":2,\"bm\":0,\"ix\":14,\"mn\":\"ADBE Vector Group\",\"hd\":false},{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,-3.621],[3.621,0],[0,3.621],[-3.621,0]],\"o\":[[0,3.621],[-3.621,0],[0,-3.621],[3.621,0]],\"v\":[[6.557,0],[-0.001,6.557],[-6.557,0],[-0.001,-6.557]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"fl\",\"c\":{\"a\":0,\"k\":[0.305220211253,0.725116265989,0.096665498322,1],\"ix\":4},\"o\":{\"a\":0,\"k\":100,\"ix\":5},\"r\":1,\"bm\":0,\"nm\":\"Fill 1\",\"mn\":\"ADBE Vector Graphic - Fill\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":1,\"k\":[{\"i\":{\"x\":0.833,\"y\":0.833},\"o\":{\"x\":0.167,\"y\":0.167},\"t\":19,\"s\":[105,105],\"to\":[-16.366,-0.088],\"ti\":[16.366,0.088]},{\"t\":26.0000010590017,\"s\":[6.806,104.472]}],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Group 15\",\"np\":2,\"cix\":2,\"bm\":0,\"ix\":15,\"mn\":\"ADBE Vector Group\",\"hd\":false},{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,-3.621],[3.621,0],[0,3.621],[-3.621,0]],\"o\":[[0,3.621],[-3.621,0],[0,-3.621],[3.621,0]],\"v\":[[6.557,-0.001],[-0.001,6.557],[-6.557,-0.001],[-0.001,-6.557]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"fl\",\"c\":{\"a\":0,\"k\":[0.305220211253,0.725116265989,0.096665498322,1],\"ix\":4},\"o\":{\"a\":0,\"k\":100,\"ix\":5},\"r\":1,\"bm\":0,\"nm\":\"Fill 1\",\"mn\":\"ADBE Vector Graphic - Fill\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":1,\"k\":[{\"i\":{\"x\":0.833,\"y\":0.833},\"o\":{\"x\":0.167,\"y\":0.167},\"t\":19,\"s\":[105,105],\"to\":[13.019,13.182],\"ti\":[-13.019,-13.182]},{\"t\":26.0000010590017,\"s\":[183.115,184.095]}],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Group 16\",\"np\":2,\"cix\":2,\"bm\":0,\"ix\":16,\"mn\":\"ADBE Vector Group\",\"hd\":false},{\"ty\":\"gr\",\"it\":[{\"ind\":0,\"ty\":\"sh\",\"ix\":1,\"ks\":{\"a\":0,\"k\":{\"i\":[[0,-1.811],[1.811,0],[0,1.811],[-1.811,0]],\"o\":[[0,1.811],[-1.811,0],[0,-1.811],[1.811,0]],\"v\":[[3.279,0],[0,3.278],[-3.279,0],[0,-3.278]],\"c\":true},\"ix\":2},\"nm\":\"Path 1\",\"mn\":\"ADBE Vector Shape - Group\",\"hd\":false},{\"ty\":\"fl\",\"c\":{\"a\":0,\"k\":[0.305220211253,0.725116265989,0.096665498322,1],\"ix\":4},\"o\":{\"a\":0,\"k\":100,\"ix\":5},\"r\":1,\"bm\":0,\"nm\":\"Fill 1\",\"mn\":\"ADBE Vector Graphic - Fill\",\"hd\":false},{\"ty\":\"tr\",\"p\":{\"a\":1,\"k\":[{\"i\":{\"x\":0.833,\"y\":0.833},\"o\":{\"x\":0.167,\"y\":0.167},\"t\":19,\"s\":[105,105],\"to\":[1.146,-16.912],\"ti\":[-1.146,16.912]},{\"t\":26.0000010590017,\"s\":[111.875,3.528]}],\"ix\":2},\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"o\":{\"a\":0,\"k\":100,\"ix\":7},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"nm\":\"Transform\"}],\"nm\":\"Group 17\",\"np\":2,\"cix\":2,\"bm\":0,\"ix\":17,\"mn\":\"ADBE Vector Group\",\"hd\":false}],\"ip\":0,\"op\":50.0000020365418,\"st\":0,\"bm\":0}],\"markers\":[]}");

/***/ }),

/***/ "./static/Assets/Image/founder-avater.jpeg":
/*!*************************************************!*\
  !*** ./static/Assets/Image/founder-avater.jpeg ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/founder-avater-11a3fc407f1fcd4209d5665602bcfecd.jpeg";

/***/ }),

/***/ "./static/Assets/Image/homeScreen/timeLine.jpg":
/*!*****************************************************!*\
  !*** ./static/Assets/Image/homeScreen/timeLine.jpg ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/timeLine-9c534b3883225d36a5472bc7f45d38b7.jpg";

/***/ }),

/***/ "./static/Assets/Lang/cn.json":
/*!************************************!*\
  !*** ./static/Assets/Lang/cn.json ***!
  \************************************/
/*! exports provided: signIn, warnInternerOffline, warnInternerOnline, txtWarningActiveMetaMask, txtWarningInstallMetaMask, txtWarningSigninMetaMaskError, common, form, errors, payment, policy, terms, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"signIn\":\"登录\",\"warnInternerOffline\":\"Keyring当前为离线模式运行。请检查网络连接\",\"warnInternerOnline\":\"网络连接已恢复\",\"txtWarningActiveMetaMask\":\"首先请激活您的钱包。\",\"txtWarningInstallMetaMask\":\"请先安装Pantograph。\",\"txtWarningSigninMetaMaskError\":\"无法登录。请重新尝试\",\"common\":{\"back\":\"返回\",\"backHomepage\":\"返回首页\",\"yes\":\"同意\",\"no\":\"不同意\",\"next\":\"下一步\",\"uploading\":\"上传...\",\"create\":\"创建\",\"cancel\":\"取消\",\"confirm\":\"Confirm\"},\"form\":{\"pleaseUseOnlyNumber\":\"Please use only number.\",\"pleaseInputNumber\":\"请输入数字!\",\"notSupport\":\"不支持文件的类型\",\"notSupportVideo\":\"不支持文件的类型\",\"smallerThan2MB\":\"请将图片小于2MB\",\"smallerThan10MB\":\"请将图片小于10MB\",\"uploadVideoFailed\":\"无法上传。请重新尝试。\"},\"errors\":{\"deniedTransaction\":\"发生了错误。用户拒绝了交易签名\",\"somethingWrong\":\"出了些问题。请稍后再进行尝试。\",\"insufficientBalance\":\"余额不足\",\"invalidAddress\":\"无效的地址（从0x开始的42文字）\",\"numberMustGreaterThanZero\":\"数字必须为大于0！\",\"numberMustGreaterThan\":\"数字必须为大于[number]！\",\"noLogin\":\"请您先登录\",\"txtNoLogin\":\"登录\",\"notAllowed\":\"You are not allowed to create NFT\",\"pageNotFound\":\"SORRY! PAGE NOT FOUND\",\"weCanNotSeem\":\"We can't seem to find the page you’re looking for.\"},\"payment\":{\"confirmPayment\":\"确认付款\",\"waitingBlockchain\":\"等待来自区块链的确认...\",\"createNFTHasStarted\":\"您的NFT已创建。\",\"createNFTSucceeded\":\"您的NFT已创建。\",\"pleaseWaitForNftName\":\"在您的账户显示[nftName]之前请耐心等候。\",\"tomoNetworkProcessing\":\"Tomo网络正在处理您的交易，请稍候。\"},\"policy\":{\"title\":\"隐私政策\"},\"terms\":{\"title\":\"使用规章\"}}");

/***/ }),

/***/ "./static/Assets/Lang/en.json":
/*!************************************!*\
  !*** ./static/Assets/Lang/en.json ***!
  \************************************/
/*! exports provided: signIn, warnInternerOffline, warnInternerOnline, txtWarningActiveMetaMask, txtWarningInstallMetaMask, txtWarningSigninMetaMaskError, networkNotMatched, common, form, errors, policy, terms, connectApp, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"signIn\":\"Sign in\",\"warnInternerOffline\":\"Keyring currently works in Offline mode. Please check your network connection!!\",\"warnInternerOnline\":\"Internet connection is back\",\"txtWarningActiveMetaMask\":\"Please activate wallet first.\",\"txtWarningInstallMetaMask\":\"Please install Pantograph first.\",\"txtWarningSigninMetaMaskError\":\"Sign in Error. Please try again!\",\"networkNotMatched\":\"Network is not matched. Please check the network of your application.\",\"common\":{\"back\":\"Back\",\"backToHome\":\"Back to Homepage\",\"yes\":\"Yes\",\"no\":\"No\",\"next\":\"Next\",\"uploading\":\"Uploading...\",\"create\":\"Create\",\"cancel\":\"Cancel\",\"confirm\":\"Confirm\"},\"form\":{\"pleaseUseOnlyNumber\":\"Please use only number.\",\"pleaseInputNumber\":\"Please input a number!\",\"notSupport\":\"File type is not support\",\"notSupportVideo\":\"File type is not support! Only support MP4 or MOV file type\",\"smallerThan2MB\":\"File size must smaller than 10MB!\",\"smallerThan10MB\":\"File size must smaller than 10MB!\",\"uploadVideoFailed\":\"Uploading video is failed. Please try to upload again!\"},\"errors\":{\"deniedTransaction\":\"Error: User denied transaction signature\",\"somethingWrong\":\"Something went wrong with your transaction. Please wait a minute and try again.\",\"insufficientBalance\":\"Insufficient balance\",\"invalidAddress\":\"Invalid address (42 characters start with 0x)\",\"numberMustGreaterThanZero\":\"The number must be greater than zero!\",\"numberMustGreaterThan\":\"The number must be greater than [number]!\",\"noLogin\":\"Please register (Sign in) to the website first\",\"txtNoLogin\":\"register (Sign in)\",\"notAllowed\":\"You are not allowed to create NFT\",\"pageNotFound\":\"SORRY! PAGE NOT FOUND\",\"weCanNotSeem\":\"We can't seem to find the page you’re looking for.\"},\"policy\":{\"title\":\"Privacy Policy\"},\"terms\":{\"title\":\"Terms of Service\"},\"connectApp\":{\"connectWebsiteWith\":\"Connect this website with\",\"pantographExtension\":\"Pantograph extension\",\"useAppToScanQRcode\":\"To connect, please use KeyRing app to scan this QR code.\",\"disconnect\":\"Disconnect\",\"copyToClipboard\":\"Copy to clipboard\",\"qrCodeWillUnavailable\":\"The QR Code above will become unavailable if you turn this off\"}}");

/***/ }),

/***/ "./static/Assets/Lang/ja.json":
/*!************************************!*\
  !*** ./static/Assets/Lang/ja.json ***!
  \************************************/
/*! exports provided: signIn, warnInternerOffline, warnInternerOnline, txtWarningActiveMetaMask, txtWarningInstallMetaMask, txtWarningSigninMetaMaskError, networkNotMatched, common, form, errors, policy, terms, connectApp, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"signIn\":\"Sign in\",\"warnInternerOffline\":\"Keyring currently works in Offline mode. Please check your network connection!!\",\"warnInternerOnline\":\"Internet connection is back\",\"txtWarningActiveMetaMask\":\"Please activate wallet first.\",\"txtWarningInstallMetaMask\":\"Please install Pantograph first.\",\"txtWarningSigninMetaMaskError\":\"Sign in Error. Please try again!\",\"networkNotMatched\":\"Network is not matched. Please check the network of your application.\",\"common\":{\"back\":\"Back\",\"backToHome\":\"Back to Homepage\",\"yes\":\"Yes\",\"no\":\"No\",\"next\":\"Next\",\"uploading\":\"Uploading...\",\"create\":\"Create\",\"cancel\":\"Cancel\",\"confirm\":\"Confirm\"},\"form\":{\"pleaseUseOnlyNumber\":\"Please use only number.\",\"pleaseInputNumber\":\"Please input a number!\",\"notSupport\":\"File type is not support\",\"notSupportVideo\":\"File type is not support! Only support MP4 or MOV file type\",\"smallerThan2MB\":\"File size must smaller than 10MB!\",\"smallerThan10MB\":\"File size must smaller than 10MB!\",\"uploadVideoFailed\":\"Uploading video is failed. Please try to upload again!\"},\"errors\":{\"deniedTransaction\":\"Error: User denied transaction signature\",\"somethingWrong\":\"Something went wrong with your transaction. Please wait a minute and try again.\",\"insufficientBalance\":\"Insufficient balance\",\"invalidAddress\":\"Invalid address (42 characters start with 0x)\",\"numberMustGreaterThanZero\":\"The number must be greater than zero!\",\"numberMustGreaterThan\":\"The number must be greater than [number]!\",\"noLogin\":\"Please register (Sign in) to the website first\",\"txtNoLogin\":\"register (Sign in)\",\"notAllowed\":\"You are not allowed to create NFT\",\"pageNotFound\":\"SORRY! PAGE NOT FOUND\",\"weCanNotSeem\":\"We can't seem to find the page you’re looking for.\"},\"policy\":{\"title\":\"Privacy Policy\"},\"terms\":{\"title\":\"Terms of Service\"},\"connectApp\":{\"connectWebsiteWith\":\"Connect this website with\",\"pantographExtension\":\"Pantograph extension\",\"useAppToScanQRcode\":\"To connect, please use KeyRing app to scan this QR code.\",\"disconnect\":\"Disconnect\",\"copyToClipboard\":\"Copy to clipboard\",\"qrCodeWillUnavailable\":\"The QR Code above will become unavailable if you turn this off\"}}");

/***/ }),

/***/ "./static/favicon.png":
/*!****************************!*\
  !*** ./static/favicon.png ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 6:
/*!*************************************************!*\
  !*** multi ./pages/Screen/Consignment/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/macbook/Desktop/giveawaypremium-client/pages/Screen/Consignment/index.js */"./pages/Screen/Consignment/index.js");


/***/ }),

/***/ "antd":
/*!***********************!*\
  !*** external "antd" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd");

/***/ }),

/***/ "bigdecimal":
/*!*****************************!*\
  !*** external "bigdecimal" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bigdecimal");

/***/ }),

/***/ "core-js/library/fn/json/stringify":
/*!****************************************************!*\
  !*** external "core-js/library/fn/json/stringify" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/json/stringify");

/***/ }),

/***/ "core-js/library/fn/object/assign":
/*!***************************************************!*\
  !*** external "core-js/library/fn/object/assign" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/assign");

/***/ }),

/***/ "core-js/library/fn/object/define-property":
/*!************************************************************!*\
  !*** external "core-js/library/fn/object/define-property" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/define-property");

/***/ }),

/***/ "core-js/library/fn/object/get-own-property-descriptor":
/*!************************************************************************!*\
  !*** external "core-js/library/fn/object/get-own-property-descriptor" ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-descriptor");

/***/ }),

/***/ "core-js/library/fn/object/get-own-property-symbols":
/*!*********************************************************************!*\
  !*** external "core-js/library/fn/object/get-own-property-symbols" ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-symbols");

/***/ }),

/***/ "core-js/library/fn/object/is":
/*!***********************************************!*\
  !*** external "core-js/library/fn/object/is" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/is");

/***/ }),

/***/ "core-js/library/fn/object/keys":
/*!*************************************************!*\
  !*** external "core-js/library/fn/object/keys" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/keys");

/***/ }),

/***/ "core-js/library/fn/parse-int":
/*!***********************************************!*\
  !*** external "core-js/library/fn/parse-int" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/parse-int");

/***/ }),

/***/ "core-js/library/fn/promise":
/*!*********************************************!*\
  !*** external "core-js/library/fn/promise" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/promise");

/***/ }),

/***/ "global/window":
/*!********************************!*\
  !*** external "global/window" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("global/window");

/***/ }),

/***/ "hex2dec":
/*!**************************!*\
  !*** external "hex2dec" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("hex2dec");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "next-routes":
/*!******************************!*\
  !*** external "next-routes" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next-routes");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "query-string":
/*!*******************************!*\
  !*** external "query-string" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("query-string");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-device-detect":
/*!**************************************!*\
  !*** external "react-device-detect" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-device-detect");

/***/ }),

/***/ "react-lottie":
/*!*******************************!*\
  !*** external "react-lottie" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-lottie");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ "validator":
/*!****************************!*\
  !*** external "validator" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ })

/******/ });
//# sourceMappingURL=Consignment.js.map