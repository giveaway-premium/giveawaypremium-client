import React from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Form, Row, Col, Input, Button, Descriptions, Divider, DatePicker, Select, Checkbox } from 'antd'
import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'
import { numberWithCommas, showNotification, generateIdMix, toLowerCaseNonAccentVietnamese, debounce } from 'common/function'
import { LoadingOutlined, CheckCircleFilled, PlusCircleFilled, PlusOneTwoTone, PlusOutlined, CloseOutlined, DollarCircleOutlined, ConsoleSqlOutlined } from '@ant-design/icons'
import { Router } from 'common/routes'
import { isMobile } from 'react-device-detect'
import './style.scss'
import Lottie from 'react-lottie'
import GapService from 'controller/Api/Services/Gap'
import moment from 'moment'
import successJson from 'static/Assets/Image/Lottie/success.json'
import { EMAIL_TITLE, EMAIL_TYPE } from 'common/constants'
import ReduxServices from 'common/redux'
import TextInput from 'pages/Components/TextInput'

const { TextArea } = Input
const { Option } = Select

const dateFormat = 'DD-MM-YYYY'
var intervalId = null
class Consignment extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      allInfoTag: [],
      isTransferMoneyWithBank: 'false',
      productList: [
        {
          hashCode: generateIdMix(),
          code: '',
          productId: 0,
          price: '',
          count: 1,
          remainNumberProduct: 1,
          priceAfterFee: '',
          totalPriceAfterFee: '',
          categoryId: '',
          subCategoryId: '',
          note: '---',
          isNew: 'false',
          rateNew: 100
        }
      ],
      formData: {
        consigneeName: this.props && this.props.userData && this.props.userData.name ? this.props.userData.name : '',
        consignerName: '',
        phoneNumber: '',
        consignerIdCard: '',
        mail: '',
        birthday: '',
        bankName: '',
        bankId: '',
        numberOfProducts: 1,
        consignmentId: '',
        timeGetMoney: '',
        numberOfConsignmentTime: 0,
        numberOfConsignment: 0
      },
      moneyBackForFullSold: 0,
      totalMoney: 0,
      isLoadingTags: false,
      objectIdFoundUser: '',
      birthday: '',
      isConsigning: false,
      isShowConfirmForm: false,
      isFoundUser: false,
      isLoadingUser: false,
      categoryList: [],
      timeGroupId: '',
      timeGroupCode: '',
      onlineCodeStringInput: '',
      isErrorFormat: false,
      note: ''
    }
    this.formRef = React.createRef()
    this.myModal = React.createRef()
  }

  componentDidMount () {
    const { categoryRedux, channelMonitorRedux, tempConsignmentRedux } = this.props
    if (tempConsignmentRedux) {
      this.setState(tempConsignmentRedux)
    }
    let categoryList = []
    if (categoryRedux) {
      categoryRedux.map((item, indexItem) => {
        if (item && item.subCategories && item.subCategories.length > 0) {
          categoryList.push(...item.subCategories)
        } else {
          categoryList.push({ ...item, isParentSelf: true })
        }
      })
    }

    this.setState({
      categoryList: categoryList
    })

    this.fetchAllTags()

    if (channelMonitorRedux && channelMonitorRedux.objectId) {
      intervalId = setInterval(async () => {
        const body = {
          data: this.state
        }
        const res = await GapService.updateChannel(body, channelMonitorRedux.objectId)
        console.log('changeData and update channel')
        console.log(res)
      }, 2000)
    }
  }

  componentDidUpdate () {

  }

  componentWillUnmount () {
    clearInterval(intervalId)
    Router.events.off('routeChangeComplete', this.handleRouteChange)
  }

  handleRouteChange = () => {
    clearInterval(intervalId)
  }

  //
  fetchAllTags = async () => {
    this.setState({
      isLoadingTags: true
    }, async () => {
      const res = await GapService.getConsignmentID()
      if (res && res.results && res.results.length > 0) {
        const reverseRes = res.results.reverse()

        this.setState({
          allInfoTag: reverseRes,
          isLoadingTags: false
        }, console.log(this.state))
      } else {
        this.setState({
          isLoadingTags: false
        })
      }
    })
  }

  onConsign = async () => {
    const { userData } = this.props
    const {
      isFoundUser, objectIdFoundUser, formData,
      timeGroupId, productList, moneyBackForFullSold, totalMoney,
      isTransferMoneyWithBank, timeGroupCode, note
    } = this.state

    // const productListTemp = productList.filter(item => {
    //   return (Number(item.price) > 0 || item.price.length > 0) && Number(item.count) > 0
    // })

    let productListTemp = []
    let productId = 0
    let productCount = 0
    let isError = false
    let productListAfterDelete = productList.filter(item => {
      return !item.isDeleted
    })

    productListAfterDelete.map((item, indexItem) => {
      console.log('item')
      console.log(indexItem)
      console.log(item)
      if (!item.isDeleted) {
        if (Number(item.price) === 0 || item.price.length === 0) {
          isError = true
          showNotification(`Chưa nhập giá sản phẩm số ${indexItem + 1}`)
        } else if (Number(item.count) === 0) {
          isError = true
          showNotification(`SL sản phẩm số ${indexItem + 1} phải lớn hơn 0`)
        } else if (!item.categoryId || item.categoryId.length === 0) {
          isError = true
          showNotification(`Chưa nhập loại sản phẩm số  ${indexItem + 1}`)
        } else if (!item.name || item.name.length === 0) {
          isError = true
          showNotification(`Chưa nhập tên sản phẩm số  ${indexItem + 1}`)
        }

        if ((Number(item.price) > 0 || item.price.length > 0) && Number(item.count) > 0 && !item.isDeleted) {
          productId += 1
          productCount += Number(item.count)
          productListTemp.push({
            ...item,
            isNew: item.isNew || 'true',
            code: formData.consignmentId + '-' + timeGroupCode + '-' + productId,
            key: indexItem,
            productId: productId,
            rateNew: item.isNew === 'true' ? 100 : 99
          })
        }
      }
    })

    if (isError) {
      //
      return
    }

    if (!productListTemp || productListTemp.length === 0) {
      showNotification('Cần ít nhất 1 sản phẩm')
      return
    } else if (!timeGroupId || timeGroupId.length === 0) {
      showNotification('Nhập thời gian tổng kết')
      return
    } else if (formData && (formData.phoneNumber.length === 0 || formData.phoneNumber.length < 10)) {
      showNotification('Nhập số điện thoại')
      return
    } else if (formData && (!formData.consignmentId || formData.consignmentId.length === 0)) {
      showNotification('Nhập số mã ký gửi')
      return
    }
    const resConsignment = await GapService.getConsignment(1, null, null, this.state.timeGroupId)
    console.log('resConsignment 1')
    console.log(resConsignment)
    let newConsignmentId
    if (resConsignment && resConsignment.count) {
      newConsignmentId = `${resConsignment.count + 1}`
    }

    console.log(userData)
    this.setState({
      isConsigning: true,
      productList: productListTemp,
      formData: {
        ...formData,
        numberOfProducts: productCount,
        consignmentId: newConsignmentId || this.state.formData.consignmentId
      }
    }, async () => {
      console.log('onConsign')
      console.log(formData)
      console.log(this.state)

      const resUSer = await GapService.getCustomer(formData.phoneNumber)
      console.log('fetchUserByPhoneNumber finish')
      console.log(resUSer)
      // if (res && res.results && res.results[0]) {
      if (resUSer && resUSer.results && resUSer.results[0]) { // for already user
        console.log('for already user')
        const result = await GapService.setConsignment(formData, userData.objectId, objectIdFoundUser, timeGroupId, timeGroupCode, productListTemp, moneyBackForFullSold, totalMoney, isTransferMoneyWithBank, note)
        console.log(result)
        if (result && result.objectId) {
          this.setState({
            isShowConfirmForm: true,
            isConsigning: false
          }, async () => {
            ReduxServices.setTempConsignment(null)
            const customerFormData = {
              consignerName: formData.consignerName,
              phoneNumber: formData.phoneNumber,
              consignerIdCard: formData.consignerIdCard,
              mail: formData.mail,
              email: formData.mail || 'nothing@giveaway.com',
              birthday: formData.birthday && formData.birthday.length > 0 && formData.birthday !== 'Invalid date' ? formData.birthday : '',
              bankName: formData.bankName,
              bankId: formData.bankId
            }
            console.log('udpate user')
            console.log(customerFormData)
            console.log(objectIdFoundUser)

            formData.mail && formData.mail.length > 0 && GapService.sendMail(customerFormData, formData, EMAIL_TYPE.CONSIGNMENT, EMAIL_TITLE.CONSIGNMENT, timeGroupCode, productListTemp)
            GapService.updateCustomer(customerFormData, objectIdFoundUser)
          })
        } else {
          // this.onRefeshAll()
          this.setState({
            isConsigning: false
          })
          showNotification('Tạo Đơn Ký gửi thất bại')
        }
      } else { // for new user
        console.log('for new user')

        const customerFormData = {
          consignerName: formData.consignerName,
          phoneNumber: formData.phoneNumber,
          consignerIdCard: formData.consignerIdCard,
          mail: formData.mail,
          // email: formData.mail || 'nothing@giveaway.com',
          username: formData.phoneNumber,
          password: formData.consignerIdCard,
          birthday: formData.birthday && formData.birthday.length > 0 && formData.birthday !== 'Invalid date' ? formData.birthday : '',
          bankName: formData.bankName,
          bankId: formData.bankId
        }
        console.log('create user')
        console.log(customerFormData)
        const resCus = await GapService.setCustomer(customerFormData)

        console.log(resCus)

        if (resCus && resCus.objectId) {
          showNotification('Thêm khách hàng thành công')
          const result = await GapService.setConsignment(formData, userData.objectId, resCus.objectId, timeGroupId, timeGroupCode, productListTemp, moneyBackForFullSold, totalMoney, isTransferMoneyWithBank, note)
          console.log(result)

          if (result && result.objectId) {
            this.setState({
              isShowConfirmForm: true,
              isConsigning: false
            })
            ReduxServices.setTempConsignment(null)
            GapService.sendMail(customerFormData, formData, EMAIL_TYPE.CONSIGNMENT, EMAIL_TITLE.CONSIGNMENT, timeGroupCode, productListTemp)
          } else {
            // this.onRefeshAll()
            this.setState({
              isConsigning: false
            })
            showNotification('Tạo khách hàng thất bại')
          }
        } else {
          // this.onRefeshAll()
          this.setState({
            isConsigning: false
          })
          showNotification('Tạo khách hàng thất bại')
        }
      }
    })
  }

  fetchUserByPhoneNumber = async (phoneKey) => {
    const { formData } = this.state

    console.log('phoneKey.target.value')
    console.log(phoneKey.target.value)

    if (phoneKey && phoneKey.target && phoneKey.target.value && phoneKey.target.value.length >= 10) {
      console.log('fetchUserByPhoneNumber run')
      this.setState({
        isLoadingUser: true
      })

      const res = await GapService.getCustomer(phoneKey.target.value)
      console.log('fetchUserByPhoneNumber finish')
      console.log(res)
      if (res && res.results && res.results[0]) {
        console.log('fetchUserByPhoneNumber set form')

        this.setState({
          formData: {
            ...this.state.formData,
            consignerName: res.results[0].fullName,
            phoneNumber: res.results[0].phoneNumber,
            consignerIdCard: res.results[0].identityNumber,
            mail: res.results[0].mail,
            birthday: res.results[0].birthday,
            bankName: res.results[0].banks[0] ? res.results[0].banks[0].type : '',
            bankId: res.results[0].banks[0] ? res.results[0].banks[0].accNumber : '',
            numberOfConsignment: res.results[0].numberOfConsignment || 0,
            numberOfConsignmentTime: res.results[0].numberOfConsignmentTime || 0
          },
          birthday: res.results[0].birthday,
          isFoundUser: true,
          isLoadingUser: false,
          objectIdFoundUser: res.results[0].objectId
        }, () => {
          console.log(this.state)
        })
      } else {
        this.setState({
          isFoundUser: false,
          isLoadingUser: false
        })
      }
    } else if (phoneKey && phoneKey.target && phoneKey.target.value && phoneKey.target.value.length < 10) {
      console.log('fetchUserByPhoneNumber == 0')
      // this.onRefeshAll()
      this.setState({
        formData: {
          ...this.state.formData,
          consignerName: '',
          phoneNumber: phoneKey.target.value,
          consignerIdCard: '',
          mail: '',
          birthday: '',
          bankName: '',
          bankId: '',
          consignmentId: ''
        },
        objectIdFoundUser: '',
        birthday: '',
        isShowConfirmForm: false,
        isFoundUser: false,
        note: ''
      })
    } else {
      console.log('fetchUserByPhoneNumber dont run 2')
      this.setState({
        formData: {
          ...this.state.formData,
          consignerName: '',
          phoneNumber: phoneKey.target.value,
          consignerIdCard: '',
          mail: '',
          birthday: '',
          bankName: '',
          bankId: '',
          consignmentId: ''
        },
        objectIdFoundUser: '',
        birthday: '',
        isShowConfirmForm: false,
        isFoundUser: false,
        note: ''
      })
      // this.onRefeshAll()
    }
  }

  onUpdateMobitorData = async () => {
    const { channelMonitorRedux } = this.props
    const body = {
      data: this.state
    }
    const res = await GapService.updateChannel(body, channelMonitorRedux.objectId)
    console.log('changeData and update channel')
    console.log(res)
  }

  onRefeshAll = async (isSetTempConsignment = false) => {
    const { timeGroupId } = this.state
    console.log('onRefeshAll', isSetTempConsignment)
    let consignmentId = ''
    if (isSetTempConsignment) {
      // if (timeGroupId) {
      //   const resConsignment = await GapService.getConsignment(1, null, null, timeGroupId)

      //   if (resConsignment && resConsignment.count) {
      //     consignmentId = `${resConsignment.count}`
      //   }
      // }
      ReduxServices.setTempConsignment(null)
    }
    this.setState({
      isTransferMoneyWithBank: 'false',
      productList: [
        {
          hashCode: generateIdMix(),
          code: '',
          productId: '',
          price: '',
          count: 1,
          remainNumberProduct: 1,
          priceAfterFee: '',
          totalPriceAfterFee: '',
          categoryId: '',
          subCategoryId: '',
          note: '---',
          isNew: 'false',
          rateNew: 100
        }
      ],
      formData: {
        consigneeName: this.props && this.props.userData && this.props.userData.name ? this.props.userData.name : '',
        consignerName: '',
        phoneNumber: '',
        consignerIdCard: '',
        mail: '',
        birthday: '',
        bankName: '',
        bankId: '',
        numberOfProducts: 1,
        consignmentId: consignmentId,
        timeGetMoney: '',
        numberOfConsignmentTime: 0,
        numberOfConsignment: 0
      },
      moneyBackForFullSold: 0,
      totalMoney: 0,
      isLoadingTags: false,
      objectIdFoundUser: '',
      birthday: '',
      isConsigning: false,
      isShowConfirmForm: false,
      isFoundUser: false,
      isLoadingUser: false,
      onlineCodeStringInput: '',
      isErrorFormat: false,
      timeGroupId: '',
      timeGroupCode: '',
      note: ''
    })
  }

  onChangeBirthday = (value) => {
    try {
      // const formatTime = moment(value).format('DD-MM-YYYY')
      const formatTime = value || ''

      this.setState({
        formData: {
          ...this.state.formData,
          birthday: formatTime
        },
        birthday: formatTime
      }, () => {
        console.log(this.state)
      })
    } catch (e) {
      console.log(e)
    }
  }

  changeData = async (value) => {
    // console.log(value)
    const { formData } = this.state
    console.log(value.target.value)
    // return

    this.setState({
      formData: {
        ...formData,
        [value.target.id]: value.target.value
      }
    }, async () => {
      // const body = {
      //   data: this.state
      // }
      // const res = await GapService.updateChannel(body)
      // console.log('changeData and update channel')
      // console.log(res)
    })
  }

  changeDataTextArea = (value, id) => {
    // console.log(value)
    console.log('value', { value, id })
    // return

    this.setState({
      [id]: value
    })
  }

  onChangeTimeGetMoney = async (value) => {
    const { formData, allInfoTag } = this.state

    const findTag = allInfoTag.filter(tag => tag.code === value)

    if (findTag && findTag[0]) {
      const resConsignment = await GapService.getConsignment(1, null, 1, findTag[0].objectId)
      console.log('resConsignment')
      console.log(resConsignment)
      let newState
      if (resConsignment && resConsignment.count) {
        let newConsignmentId = `${resConsignment.count + 1}`
        console.log('newConsignmentId')
        console.log(newConsignmentId)

        newState = {
          formData: {
            ...formData,
            timeGetMoney: moment(findTag[0].timeGetMoney).format('DD-MM-YYYY'),
            consignmentId: newConsignmentId
          },
          timeGroupCode: value,
          timeGroupId: findTag[0].objectId
        }
      } else {
        newState = {
          formData: {
            ...formData,
            timeGetMoney: moment(findTag[0].timeGetMoney).format('DD-MM-YYYY')
          },
          timeGroupCode: value,
          timeGroupId: findTag[0].objectId
        }
      }
      console.log('newState')
      console.log(newState)

      this.setState(newState, () => {
        console.log(this.state)
      })
    }
  }

  changeDataProduct = (value, indexProduct) => {
    const { productList, formData } = this.state

    let productListTemp = productList.slice()

    if (value.target.id === 'priceProduct') {
      productListTemp[indexProduct].price = Number(value.target.value)
      productListTemp[indexProduct].priceAfterFee = Math.round(Number(this.convertPriceAfterFee(Number(value.target.value))))
      productListTemp[indexProduct].totalPriceAfterFee = Math.round(Number(productListTemp[indexProduct].count * this.convertPriceAfterFee(Number(value.target.value))))

      let moneyBackForFullSold = 0
      let totalMoney = 0
      productListTemp.map(item => {
        if (!item.isDeleted) {
          moneyBackForFullSold += item.count * this.convertPriceAfterFee(Number(item.price)) * 1000
          totalMoney += item.count * Number(item.price) * 1000
        }
      })

      this.setState({
        productList: productListTemp,
        moneyBackForFullSold: moneyBackForFullSold,
        totalMoney: totalMoney
      })
    } else if (value.target.id === 'numberOfProducts' && (Number(value.target.value > 0) || value.target.value.length === 0)) {
      productListTemp[indexProduct].count = Number(value.target.value)
      productListTemp[indexProduct].remainNumberProduct = Number(value.target.value)
      productListTemp[indexProduct].priceAfterFee = Math.round(Number(this.convertPriceAfterFee(Number(productListTemp[indexProduct].price))))
      productListTemp[indexProduct].totalPriceAfterFee = Math.round(Number(value.target.value * this.convertPriceAfterFee(Number(productListTemp[indexProduct].price))))

      let numberOfProducts = 0
      let moneyBackForFullSold = 0
      let totalMoney = 0
      productListTemp.map(item => {
        if (!item.isDeleted) {
          numberOfProducts += Number(item.count)
          moneyBackForFullSold += item.count * this.convertPriceAfterFee(Number(item.price)) * 1000
          totalMoney += item.count * Number(item.price) * 1000
        }
      })

      this.setState({
        moneyBackForFullSold: moneyBackForFullSold,
        totalMoney: totalMoney,
        formData: {
          ...formData,
          numberOfProducts: numberOfProducts
        },
        productList: productListTemp
      })
    } else if (value.target.id === 'nameProduct') {
      console.log(value.target.value)
      productListTemp[indexProduct].name = value.target.value

      this.setState({
        productList: productListTemp
      })
    } else if (value.target.id === 'note') {
      console.log(value.target.value)
      productListTemp[indexProduct].note = value.target.value || '---'

      this.setState({
        productList: productListTemp
      })
    }
  }

  onPlusProductList = () => {
    const { productList, formData } = this.state

    this.setState({
      productList: [
        ...productList,
        {
          categoryId: '',
          subCategoryId: '',
          hashCode: generateIdMix(),
          price: '',
          count: 1,
          remainNumberProduct: 1,
          priceAfterFee: '',
          note: '---',
          productId: productList.length,
          isNew: 'false',
          rateNew: 100
        },
        {
          categoryId: '',
          subCategoryId: '',
          hashCode: generateIdMix(),
          price: '',
          count: 1,
          remainNumberProduct: 1,
          priceAfterFee: '',
          note: '---',
          productId: productList.length + 1,
          isNew: 'false',
          rateNew: 100
        },
        {
          categoryId: '',
          subCategoryId: '',
          hashCode: generateIdMix(),
          price: '',
          count: 1,
          remainNumberProduct: 1,
          priceAfterFee: '',
          note: '---',
          productId: productList.length + 2,
          isNew: 'false',
          rateNew: 100
        }
      ],
      formData: {
        ...formData,
        numberOfProducts: formData.numberOfProducts + 3
      }
    })
  }

  onDeleteProductList = async (hashCode) => {
    const { productList, formData, moneyBackForFullSold, totalMoney } = this.state

    let index = null

    console.log('hashCode')
    console.log(hashCode)

    productList.map((item, hashCodeIndex) => {
      if (item && item.hashCode === hashCode) {
        index = hashCodeIndex
      }
    })
    console.log(index)
    console.log(productList[index])

    console.log('onDeleteProductList -start')

    console.log(index)

    // if (index >= 0) {
    let moneyBackTemp = moneyBackForFullSold - (this.convertPriceAfterFee(Number(productList[index].price)) * 1000 * Number(productList[index].count))
    let totalMoneyTemp = totalMoney - Number(productList[index].price) * 1000 * Number(productList[index].count)
    let productNumber = Number(formData.numberOfProducts) - Number(productList[index].count)
    // delete productListTemp[index]

    let productListTemp = []
    let productId = -1
    productList.map((itemProduct, itemProductIndex) => {
      if (itemProductIndex !== index) {
        productId += 1
        productListTemp.push({
          ...itemProduct,
          productId: productId
        })
      } else {
        productListTemp.push({
          ...itemProduct,
          productId: 0,
          isDeleted: true
        })
      }
    })

    console.log(productListTemp)
    console.log(productNumber)
    console.log(moneyBackTemp)
    console.log(totalMoneyTemp)

    console.log('onDeleteProductList end')

    this.setState({
      moneyBackForFullSold: moneyBackTemp,
      totalMoney: totalMoneyTemp,
      productList: productListTemp,
      formData: {
        ...formData,
        numberOfProducts: productNumber
      }
    }, () => {
      console.log('onDeleteProductList end2')
      console.log(this.state)
    })
    // }
  }

  convertPriceAfterFee = (productPrice = 0) => {
    let moneyBackForFullSold = productPrice

    if (productPrice > 0) {
      if (productPrice < 1000) {
        moneyBackForFullSold = productPrice * 74 / 100
      } else if (productPrice >= 1000 && productPrice <= 10000) {
        moneyBackForFullSold = productPrice * 77 / 100
      } else if (productPrice > 10000) {
        moneyBackForFullSold = productPrice * 80 / 100
      }

      return moneyBackForFullSold
    } else {
      return 0
    }
  }

  onChangeRadio = (value) => {
    console.log(value)

    if (value[0] === 'true') {
      this.setState({
        isTransferMoneyWithBank: 'true'
      })
    } else {
      this.setState({
        isTransferMoneyWithBank: 'false'
      })
    }
  }

  onChangeProductTypeNewOrOld = (value, indexProduct) => {
    const { productList } = this.state

    let productListTemp = productList.slice()
    if (value[0] === 'new') {
      productListTemp[indexProduct].isNew = 'true'
      productListTemp[indexProduct].rateNew = 100
    } else {
      productListTemp[indexProduct].isNew = 'false'
      productListTemp[indexProduct].rateNew = 99
    }

    this.setState({
      productList: productListTemp
    })
  }

onChangeCategory = async (valueProp) => {
  const { productList } = this.state
  let productListTemp = productList.slice()

  let filterTxt

  if (valueProp && valueProp.value) {
    filterTxt = valueProp.value
  } else if (valueProp && !valueProp.value) {
    filterTxt = valueProp
  }

  const categorySplitTxt = filterTxt && filterTxt.split('+')
  let categoryId
  let subCategoryId
  let hashCode
  let indexProduct
  let defaultCategoryCode

  if (categorySplitTxt.length === 3) {
    categoryId = categorySplitTxt[0]
    subCategoryId = categorySplitTxt[1]
    hashCode = categorySplitTxt[2]
    defaultCategoryCode = {
      key: categoryId + '+' + subCategoryId + '+' + hashCode,
      label: valueProp.label,
      value: categoryId + '+' + subCategoryId + '+' + hashCode
    }
  } else if (categorySplitTxt.length === 2) {
    // this is also parent category
    categoryId = categorySplitTxt[0]
    hashCode = categorySplitTxt[1]
    subCategoryId = null
    defaultCategoryCode = {
      key: categoryId + '+' + hashCode,
      label: valueProp.label,
      value: categoryId + '+' + hashCode
    }
  }

  console.log(categoryId)
  console.log(hashCode)
  console.log(subCategoryId)

  await productListTemp.map((item, hashCodeIndex) => {
    if (item.hashCode === hashCode) {
      indexProduct = hashCodeIndex
    }
  })

  console.log(indexProduct)

  productListTemp[indexProduct].categoryId = categoryId
  productListTemp[indexProduct].subCategoryId = subCategoryId
  productListTemp[indexProduct].defaultCategoryCode = defaultCategoryCode

  console.log('productListTemp')
  console.log(productListTemp)

  this.setState({
    productList: productListTemp
  })
}

onOpenInputOnline = () => {
  this.onRefeshAll()
  this.myModal.current.openModal(this.renderStringCodeBox(), { closable: true })
}

onOpenInputOnlineWithError = () => {
  this.setState({
    isErrorFormat: true,
    onlineCodeStringInput: ''
  }, () => {
    console.log(this.state)
    this.myModal.current.openModal(this.renderStringCodeBox(), { closable: true })
  })
}

onChangeOnlineInput = (valueTxt) => {
  console.log('onChangeOnlineInput')
  console.log(valueTxt.target.value)
  this.setState({
    onlineCodeStringInput: valueTxt.target.value
  })
}

renderStringCodeBox = () => {
  const { isErrorFormat } = this.state
  console.log('isErrorFormat')
  console.log(isErrorFormat)
  console.log(this.state)

  return (
    <div>
      <p className='text text-title MB10'>Thông tin đơn ký gửi</p>
      <p className='text'>Tên sản phẩm / giá tiền (k) /tt tình trạng /sl số lượng</p>
      <p className='text'>Tên sản phẩm / giá tiền (k) /sl số lượng /tt tình trạng</p>
      <p className='text'>Tên sản phẩm / giá tiền (k) /tt tình trạng</p>
      <p className='text'>Tên sản phẩm / giá tiền (k) /sl số lượng</p>
      <p className='text MB10'>Tên sản phẩm / giá tiền (k)</p>

      {isErrorFormat ? <span className='text text-color-6 MB10'>Sai Định dạng</span> : null}
      <div className='product-item-note MB20'>
        <TextArea style={{ minHeight: '300px', maxHeight: '50vh' }} onChange={this.onChangeOnlineInput} placeholder='Ghi Chú' id='onlineInput' key='onlineInput' />
      </div>
      <Button className='ML10' onClick={this.convertStringToConsignment}>Ok</Button>
    </div>
  )
}

convertStringNameToObjectIdCategory = (stringName = '') => {
  // const lowerCaseStringCode = toLowerCaseNonAccentVietnamese(stringName)
  const lowerCaseStringCode = stringName.toLowerCase()

  console.log('lowerCaseStringCode')
  console.log(lowerCaseStringCode)
  console.log(lowerCaseStringCode)

  // quần áo
  if (lowerCaseStringCode.includes('áo') || lowerCaseStringCode.includes('bra')) {
    return 'ao'
  } else if (lowerCaseStringCode.includes('đầm')) {
    return 'dam'
  } else if (lowerCaseStringCode.includes('quần')) {
    return 'quan'
  } else if (lowerCaseStringCode.includes('chân váy') || lowerCaseStringCode.includes('chan váy') || lowerCaseStringCode.includes('cv') || lowerCaseStringCode.includes('cvay') || lowerCaseStringCode.includes('chân vay') || lowerCaseStringCode.includes('váy') || lowerCaseStringCode.includes('vay')) {
    return 'vay'
  } else if (lowerCaseStringCode.includes('body') || lowerCaseStringCode.includes('bodysuit') || lowerCaseStringCode.includes('suit') || lowerCaseStringCode.includes('jum') || lowerCaseStringCode.includes('jumsuit')) {
    return 'set'
  } else if (lowerCaseStringCode.includes('ao khoác') || lowerCaseStringCode.includes('áo khoác') || lowerCaseStringCode.includes('áo khoac') || lowerCaseStringCode.includes('ao khoac') || lowerCaseStringCode.includes('aokhoac')) {
    return 'khoac'
  // eslint-disable-next-line brace-style
  }
  // giày dép
  else if (lowerCaseStringCode.includes('giày') || lowerCaseStringCode.includes('giay') || lowerCaseStringCode.includes('giày thể thao') || lowerCaseStringCode.includes('giay the thao') || lowerCaseStringCode.includes('sneaker') || lowerCaseStringCode.includes('giày the thao') || lowerCaseStringCode.includes('giay thể thao')) {
    return 'thao'
  } else if (lowerCaseStringCode.includes('cao gót') || lowerCaseStringCode.includes('cao got') || lowerCaseStringCode.includes('giày cao gót') || lowerCaseStringCode.includes('giay cao gót') || lowerCaseStringCode.includes('giay cao got')) {
    return 'cao'
  } else if (lowerCaseStringCode.includes('dép') || lowerCaseStringCode.includes('đôi dép') || lowerCaseStringCode.includes('doi dep ')) {
    return 'dep'
  } else if (lowerCaseStringCode.includes('boot')) {
    return 'boot'
  } else if (lowerCaseStringCode.includes('sandal')) {
    return 'sandal'
    // eslint-disable-next-line brace-style
  }
  // Túi Ví
  else if (lowerCaseStringCode.includes('balo') || lowerCaseStringCode.includes('balô') || lowerCaseStringCode.includes('ba lô')) {
    return 'balo'
  } else if (lowerCaseStringCode.includes('túi') || lowerCaseStringCode.includes('chiếc túi')) {
    return 'tui'
  } else if (lowerCaseStringCode.includes('clutch')) {
    return 'clutch'
  } else if (lowerCaseStringCode.includes('beltbag') || lowerCaseStringCode.includes('belt bag')) {
    return 'bag'
  } else if (lowerCaseStringCode.includes('ví')) {
    return 'vi'
    // eslint-disable-next-line brace-style
  }
  // Phụ kiện
  else if (lowerCaseStringCode.includes('vòng') || lowerCaseStringCode.includes('vòng tay') || lowerCaseStringCode.includes('vong tay') || lowerCaseStringCode.includes('lắc') || lowerCaseStringCode.includes('cuff')) {
    return 'vong'
  } else if (lowerCaseStringCode.includes('hoa tai') || lowerCaseStringCode.includes('bông tai') || lowerCaseStringCode.includes('bong tai')) {
    return 'tai'
  } else if (lowerCaseStringCode.includes('nhẫn')) {
    return 'nhan'
  } else if (lowerCaseStringCode.includes('dây chuyền') || lowerCaseStringCode.includes('set vòng cổ') || lowerCaseStringCode.includes('day chuyen') || lowerCaseStringCode.includes('vòng cổ')) {
    return 'chuyen'
  } else if (lowerCaseStringCode.includes('cài') || lowerCaseStringCode.includes('charm')) {
    return 'pkhac'
  } else if (lowerCaseStringCode.includes('đồng hồ') || lowerCaseStringCode.includes('dong ho') || lowerCaseStringCode.includes('đồnghồ') || lowerCaseStringCode.includes('watch') || lowerCaseStringCode.includes('đh') || lowerCaseStringCode.includes('dh')) {
    return 'ho'
  } else if (lowerCaseStringCode.includes('mắt kính') || lowerCaseStringCode.includes('kính')) {
    return 'kinh'
    // eslint-disable-next-line brace-style
  }
  // Mỹ phẩm
  else if (
    lowerCaseStringCode.includes('mascara') || lowerCaseStringCode.includes('son') || lowerCaseStringCode.includes('phấn') ||
    lowerCaseStringCode.includes('phấn má') || lowerCaseStringCode.includes('nền') || lowerCaseStringCode.includes('phấn mắt') ||
    lowerCaseStringCode.includes('tẩy trang') || lowerCaseStringCode.includes('cọ') || lowerCaseStringCode.includes('set mỹ phẩm') ||
    lowerCaseStringCode.includes('set mp') || lowerCaseStringCode.includes('mỹ phẩm') || lowerCaseStringCode.includes('mĩ phẩm') ||
    lowerCaseStringCode.includes('phấn nước') || lowerCaseStringCode.includes('cushion') || lowerCaseStringCode.includes('bút kẻ') ||
    lowerCaseStringCode.includes('nước cân bằng') || lowerCaseStringCode.includes('tạo khối') || lowerCaseStringCode.includes('phần phủ') ||
    lowerCaseStringCode.includes('bắt sáng') || lowerCaseStringCode.includes('kem lót') || lowerCaseStringCode.includes('kem nền') ||
    lowerCaseStringCode.includes('bộ mỹ phẩm') || lowerCaseStringCode.includes('trang điểm') || lowerCaseStringCode.includes('má hồng') ||
    lowerCaseStringCode.includes('bảng mắt')
  ) {
    return 'diem'
  } else if (
    lowerCaseStringCode.includes('tonner') || lowerCaseStringCode.includes('toner') || lowerCaseStringCode.includes('kem dưỡng') ||
    lowerCaseStringCode.includes('dưỡng') || lowerCaseStringCode.includes('dưỡng tóc') || lowerCaseStringCode.includes('sữa rửa mặt') ||
    lowerCaseStringCode.includes('kem tay') || lowerCaseStringCode.includes('serum') || lowerCaseStringCode.includes('kem chống nắng') ||
    lowerCaseStringCode.includes('kcn') || lowerCaseStringCode.includes('lotion') || lowerCaseStringCode.includes('mặt nạ') ||
    lowerCaseStringCode.includes('lăn nách') || lowerCaseStringCode.includes('sữa tắm') || lowerCaseStringCode.includes('gel') ||
    lowerCaseStringCode.includes('dầu gội') || lowerCaseStringCode.includes('xịt khoáng') || lowerCaseStringCode.includes('dưỡng da') ||
    lowerCaseStringCode.includes('tinh chất') || lowerCaseStringCode.includes('dầu dưỡng') || lowerCaseStringCode.includes('mask')
  ) {
    return 'da'
    // eslint-disable-next-line brace-style
  }
  // Nước hoa
  else if (lowerCaseStringCode.includes('nước hoa') || lowerCaseStringCode.includes('nuoc hoa') || lowerCaseStringCode.includes('perfume') || lowerCaseStringCode.includes('scent') || lowerCaseStringCode.includes('fragrance')) {
    return 'YIUniNrIKb'
    // eslint-disable-next-line brace-style
  }
  // Thiết bị làm đẹp
  else if (lowerCaseStringCode.includes('máy rửa mặt') || lowerCaseStringCode.includes('thiết bị') || lowerCaseStringCode.includes('máy rửa') || lowerCaseStringCode.includes('máy')) {
    return 'B3OQuAChW1'
    // eslint-disable-next-line brace-style
  } else {
    return 'ao'
  }
}

convertStringToConsignment = () => {
  const { onlineCodeStringInput, categoryList } = this.state
  console.log('convertStringToConsignment run')
  let productList = []
  let isErrorFormat = false
  let categoryListObjectTemp = {}
  categoryList.map((itemCate, itemCateIndex) => {
    switch (itemCate.objectId) {
    case 'B3OQuAChW1': {
      categoryListObjectTemp.B3OQuAChW1 = { ...itemCate, keyCode: 'thiet' }
      break
    }
    case 'YIUniNrIKb': {
      categoryListObjectTemp.YIUniNrIKb = { ...itemCate, keyCode: 'hoa' }
      break
    }
    default: {
      categoryListObjectTemp[itemCate.keyCode] = { ...itemCate }
    }
    }
  })

  const result = onlineCodeStringInput.trim().split(/\r?\n/)

  console.log(result)

  result.map((item, itemIndex) => {
    let type
    let name
    let amount
    let price
    let detail
    let subCategoryId
    let categoryId
    const stringCodeArr = item.trim().split('/')

    // if (isErrorFormat === false && stringCodeArr && (((stringCodeArr.length === 3 || stringCodeArr.length === 4) && Number(stringCodeArr[3].trim()) + 1 > 0) || stringCodeArr.length === 2) && Number(stringCodeArr[1].trim().replaceAll('k', '').replaceAll('K', '')) + 1 > 0) {
    // type = stringCodeArr[0].trim().toLowerCase()
    // if (isErrorFormat === false && stringCodeArr && (((stringCodeArr.length === 4) && Number(stringCodeArr[3].trim()) + 1 > 0) || stringCodeArr.length === 3) && Number(stringCodeArr[1].trim().replaceAll('k', '').replaceAll('K', '')) + 1 > 0) {
    if (isErrorFormat === false && stringCodeArr && Number(stringCodeArr[1] && stringCodeArr[1].trim().replaceAll('k', '').replaceAll('K', '')) + 1 > 0 &&
    (
      (
        stringCodeArr.length === 4 &&
          (
            (
              (stringCodeArr[2] && stringCodeArr[2] && stringCodeArr[2].trim().substr(0, 2) === 'tt') &&
              (stringCodeArr[3] && stringCodeArr[3] && stringCodeArr[3].trim().substr(0, 2) === 'sl')) ||
            (
              (stringCodeArr[2] && stringCodeArr[2] && stringCodeArr[2].trim().substr(0, 2) === 'sl') &&
              (stringCodeArr[3] && stringCodeArr[3] && stringCodeArr[3].trim().substr(0, 2) === 'tt')
            )
          )
      ) ||
      (
        (stringCodeArr.length === 3) &&
        (stringCodeArr[2] && stringCodeArr[2] && (stringCodeArr[2].trim().substr(0, 2) === 'tt' || stringCodeArr[2].trim().substr(0, 2) === 'sl'))
      ) || stringCodeArr.length === 2
    )
    ) {
      switch (stringCodeArr.length) {
      case 4: {
        name = stringCodeArr[0].trim()
        price = Number(stringCodeArr[1].trim().replaceAll('k', '').replaceAll('K', ''))
        if (stringCodeArr[2].trim().substr(0, 2) === 'tt') {
          if (Number(stringCodeArr[3].trim().replace('sl', '').trim()) + 1 > 0) {
            detail = stringCodeArr[2].trim().replace('tt', '').trim() || '---'
            amount = Number(stringCodeArr[3].trim().replace('sl', '').trim()) || 1
          } else {
            console.log('isErrorFormat')
            isErrorFormat = true
          }
        } else if (stringCodeArr[2].trim().substr(0, 2) === 'sl') {
          if (Number(stringCodeArr[2].trim().replace('sl', '').trim()) + 1 > 0) {
            amount = Number(stringCodeArr[2].trim().replace('sl', '').trim()) || 1
            detail = stringCodeArr[3].trim().replace('tt', '').trim() || '---'
          } else {
            console.log('isErrorFormat')
            isErrorFormat = true
          }
        } else {
          console.log('isErrorFormat')
          isErrorFormat = true
        }
        break
      }
      case 3: {
        name = stringCodeArr[0].trim()
        price = Number(stringCodeArr[1].trim().replaceAll('k', '').replaceAll('K', ''))

        if (stringCodeArr[2].trim().substr(0, 2) === 'tt') {
          detail = stringCodeArr[2].trim().replace('tt', '').trim() || '---'
          amount = 1
        } else if (stringCodeArr[2].trim().substr(0, 2) === 'sl') {
          if (Number(stringCodeArr[2].trim().replace('sl', '').trim()) + 1 > 0) {
            amount = Number(stringCodeArr[2].trim().replace('sl', '').trim()) || 1
            detail = '---'
          } else {
            console.log('isErrorFormat')
            isErrorFormat = true
          }
        } else {
          console.log('isErrorFormat')
          isErrorFormat = true
        }
        break
      }
      case 2: {
        name = stringCodeArr[0].trim()
        price = Number(stringCodeArr[1].trim().replaceAll('k', '').replaceAll('K', ''))
        amount = 1
        detail = '---'
        break
      }
      }

      type = this.convertStringNameToObjectIdCategory(name)

      if (type && categoryListObjectTemp && categoryListObjectTemp[type]) {
        if (categoryListObjectTemp[type].isParentSelf) {
          subCategoryId = categoryListObjectTemp[type].objectId
          categoryId = categoryListObjectTemp[type].objectId
        } else {
          subCategoryId = categoryListObjectTemp[type].objectId
          categoryId = categoryListObjectTemp[type].category.objectId
        }
      }

      const hashCode = generateIdMix()

      productList.push({
        name: name,
        productId: itemIndex,
        hashCode: hashCode,
        price: price,
        count: amount,
        remainNumberProduct: amount,
        totalPriceAfterFee: Math.round(Number(amount * this.convertPriceAfterFee(price))),
        priceAfterFee: Math.round(Number(this.convertPriceAfterFee(price))),
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        note: detail || '---',
        defaultCategoryCode: {
          key: categoryListObjectTemp[type].isParentSelf ? `${categoryId}+${subCategoryId}+${hashCode}` : `${subCategoryId}+${hashCode}`,
          label: categoryListObjectTemp[type].name,
          value: categoryListObjectTemp[type].isParentSelf ? `${categoryId}+${subCategoryId}+${hashCode}` : `${subCategoryId}+${hashCode}`
        },
        rateNew: detail && detail.includes('new') ? 100 : 99,
        isNew: detail && detail.includes('new') ? 'true' : 'false'
      })
      isErrorFormat = false
    } else {
      console.log('isErrorFormat')
      isErrorFormat = true
    }
  })

  if (!isErrorFormat) {
    let moneyBackForFullSold = 0
    let totalMoney = 0
    let numberOfProducts = 0
    productList.map(item => {
      numberOfProducts = numberOfProducts + item.count
      moneyBackForFullSold += item.count * this.convertPriceAfterFee(Number(item.price)) * 1000
      totalMoney += item.count * Number(item.price) * 1000
    })

    this.setState({
      isErrorFormat: false,
      productList: productList,
      moneyBackForFullSold: moneyBackForFullSold,
      totalMoney: totalMoney,
      formData: {
        ...this.state.formData,
        numberOfProducts: numberOfProducts
      }
    })

    this.myModal.current.closeModal()
  } else {
    this.setState({
      isErrorFormat: true
    })

    this.onOpenInputOnlineWithError()
  }
}

onBlurCategory = () => {
  console.log('blur')
}

onFocusCategory = () => {
  console.log('focus')
}

onSearchCategory = (val) => {
  console.log('search:', val)
}

render () {
  const { userData, categoryRedux, channelMonitorRedux } = this.props
  const {
    formData, isConsigning, isShowConfirmForm, moneyBackForFullSold, totalMoney, timeGroupId, isTransferMoneyWithBank,
    birthday, isLoadingUser, isFoundUser, isLoadingTags, allInfoTag, productList, categoryList, timeGroupCode
  } = this.state

  const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 }
  }

  // const defaultOptions = {
  //   loop: false,
  //   autoplay: true,
  //   animationData: images.consignmentForm
  // }

  const defaultOptionsSuccess = {
    loop: false,
    autoplay: true,
    animationData: successJson
  }

  const options = [
    { label: 'Chuyển khoản', value: 'true' },
    { label: 'Trực tiếp', value: 'false' }
  ]

  const optionsTypeProduct = [
    { label: 'Hàng mới', value: 'new' },
    { label: 'Hàng đã sử dụng', value: 'old' }
  ]

  ReduxServices.setTempConsignment(this.state)
  // console.log('tempConsignmentRedux')
  // console.log(this.props.tempConsignmentRedux)

  return (
    <div className='consignment-container'>
      {
        isShowConfirmForm
          ? <>
            <Lottie
              options={defaultOptionsSuccess}
              height={150}
              width={150}
              isStopped={false}
              isPaused={false}
            />
            <Row justify='center'>
              <Col span={20}>
                <Descriptions>
                  <Descriptions.Item span={24} label='Mã Ký gửi'>{formData.consignmentId + '-' + timeGroupCode}</Descriptions.Item>
                  <Descriptions.Item span={24} label='Số lượng Hàng Hoá'>{formData.numberOfProducts}</Descriptions.Item>
                  <Descriptions.Item span={24} label='Ngày trả tiền'>{formData.timeGetMoney}</Descriptions.Item>
                  <Descriptions.Item span={24} label='Tên Khách Hàng'>{formData.consignerName}</Descriptions.Item>
                  <Descriptions.Item span={24} label='Tên Nhân Viên'>{formData.consigneeName}</Descriptions.Item>
                  <Descriptions.Item span={24} label='Số điện thoại'>{formData.phoneNumber}</Descriptions.Item>
                  <Descriptions.Item span={24} label='Email'>{formData.mail}</Descriptions.Item>
                  <Descriptions.Item span={24} label='Ngân hàng'>{formData.bankName}</Descriptions.Item>
                  <Descriptions.Item span={24} label='ID Ngân hàng'>{formData.bankId}</Descriptions.Item>
                  <Descriptions.Item span={24} label='Hình thức nhận tiền'>{isTransferMoneyWithBank === 'true' ? 'Chuyển khoản' : 'Trực tiếp'}</Descriptions.Item>
                  <Descriptions.Item span={24} label='Chứng minh thư'>{formData.consignerIdCard}</Descriptions.Item>
                  <Descriptions.Item span={24} label='Sinh nhật'>{formData.birthday}</Descriptions.Item>
                  <Descriptions.Item span={24} label='Ghi chú'>{this.state.note || '--'}</Descriptions.Item>

                </Descriptions>
                {productList.map((item, indexItem) => {
                  return (
                    <div key={indexItem} className='product-box MB30'>
                      <div className='close-box MB5'>
                        <span>{indexItem}</span>
                      </div>
                      <div className='product-item-name'>
                        <Input disabled style={{ width: '100%' }} value={item.name} type={'text'} id='nameProduct' key='nameProduct' placeholder='Tên sản phẩm' />
                      </div>
                      <div className='product-item-value'>
                        <Input disabled style={{ marginRight: '10px' }} value={item.price} type={'number'} id='priceProduct' key='priceProduct' placeholder='Giá tiền' />
                        <Input disabled value={item.count} prefix={<span>SL</span>} defaultValue={1} type={'number'} id='numberOfProducts' key='numberOfProducts' placeholder='Số lượng' />
                      </div>
                      <div className='product-item-note'>
                        <TextArea disabled placeholder='Ghi Chú' value={item.note ? item.note : '---'} type={'number'} id='note' key='note' />
                      </div>
                    </div>
                  )
                })}
              </Col>
            </Row>
            <Button className='MT20 MB20' onClick={() => this.onRefeshAll(true)} >Quay lại</Button>
            </>
          : <>
            <Form
              ref={this.formRef}
              {...layout}
              name='consignment'
              initialValues={formData}
              // onFinish={this.onFinish}
              onFinish={this.onConsign}
              onValuesChange={async (changedValues, allValues) => {
                // console.log('changedValues')
                // console.log(changedValues)
                // if (channelMonitorRedux && channelMonitorRedux.objectId) {
                //   const body = {
                //     data: {
                //       ...this.state,
                //       formData: {
                //         ...formData,
                //         ...changedValues
                //       }
                //     }
                //   }
                //   const res = await GapService.updateChannel(body, channelMonitorRedux.objectId)
                //   console.log('changeData and update channel')
                //   console.log(res)
                // }
                this.setState({
                  formData: {
                    ...formData,
                    ...changedValues
                  }
                }, () => console.log(this.state))
              }}
            >
              <Row className='flex sell-card-form PT40 PB35' justify='center'>
                <Button onClick={this.onOpenInputOnline} type='secondary' className='MB30'><DollarCircleOutlined /> Ký gửi online</Button>
                <Form.Item name='phoneNumber' rules={[{ required: !isFoundUser, message: 'Vui lòng nhập số điện thoại' }]} label='Số điện thoại'>
                  <Col sm={24} md={12}>
                    {/* <Search placeholder="input search loading default" loading /> */}
                    <Input value={formData.phoneNumber} minLength={10} maxLength={11} allowClear onChange={this.fetchUserByPhoneNumber} style={{ minWidth: 100 }} placeholder='...' suffix={isLoadingUser ? <LoadingOutlined /> : isFoundUser ? <CheckCircleFilled style={{ color: 'green ' }} /> : null} />
                  </Col>
                </Form.Item>
                <Form.Item name='consignerName' rules={[{ required: !isFoundUser, message: 'Vui lòng nhập tên khách hàng' }]} label='Tên Khách Hàng'>
                  <Col sm={24} md={24}>
                    <Input disabled={!formData.phoneNumber || formData.phoneNumber.length < 10} value={formData.consignerName} id='consignerName' key='consignerName' allowClear onChange={this.changeData} placeholder='...' />
                  </Col>
                </Form.Item>
                <Form.Item name='consignerIdCard' rules={[{ required: !isFoundUser, message: 'Vui lòng nhập chứng minh thư' }]} label='CMND'>
                  <Col sm={24} md={12}>
                    <Input disabled={!formData.phoneNumber || formData.phoneNumber.length < 10} value={formData.consignerIdCard} id='consignerIdCard' key='consignerIdCard' onChange={this.changeData} allowClear placeholder='...' />
                  </Col>
                </Form.Item>
                <Form.Item name='mail' rules={[{ type: 'email', message: 'Email không hợp lệ' }]} label='Email'>
                  <Col sm={24} md={24}>
                    <Input disabled={!formData.phoneNumber || formData.phoneNumber.length < 10} value={formData.mail} id='mail' key='mail' onChange={this.changeData} allowClear placeholder='...' />
                  </Col>
                </Form.Item>
                <Form.Item name='bankName' rules={[{ required: !isFoundUser && isTransferMoneyWithBank === 'true', message: 'Vui lòng nhập tên ngân hàng' }]} label='Ngân hàng'>
                  <Col sm={24} md={24}>
                    <Input disabled={!formData.phoneNumber || formData.phoneNumber.length < 10} value={formData.bankName} id='bankName' key='bankName' onChange={this.changeData} allowClear placeholder='...' />
                  </Col>
                </Form.Item>
                <Form.Item name='bankId' rules={[{ required: !isFoundUser && isTransferMoneyWithBank === 'true', message: 'Vui lòng nhập id ngân hàng' }]} label='ID Ngân hàng'>
                  <Col sm={24} md={12}>
                    <Input disabled={!formData.phoneNumber || formData.phoneNumber.length < 10} value={formData.bankId} id='bankId' key='bankId' onChange={this.changeData} type={'number'} allowClear placeholder='...' />
                  </Col>
                </Form.Item>
                <Form.Item name='birthday' label='Sinh nhật'>
                  <Col sm={24} md={12}>
                    <Input allowClear={false} disabled={!formData.phoneNumber || formData.phoneNumber.length < 10} id='birthday' key='birthday' value={formData.birthday} onChange={this.onChangeBirthday} placeholder={dateFormat} style={{ width: '100%' }} />
                  </Col>
                </Form.Item>

                <Divider />

                <Row className='productListBox'>
                  {productList.map((item, indexItem) => {
                    if (!item.isDeleted) {
                      return (
                        <div key={indexItem} className='product-box MB30'>
                          <div className='close-box MB5'>
                            <span style={{ opacity: 0 }}>{indexItem + 1}</span>

                            <div onClick={() => this.onDeleteProductList(item.hashCode)}>
                              <CloseOutlined />
                            </div>
                          </div>
                          <div className='product-item-name'>
                            <Input style={{ width: '50%', marginRight: '10px' }} value={item.name} allowClear type={'text'} id='nameProduct' key='nameProduct' onChange={(value) => this.changeDataProduct(value, indexItem)} placeholder='Tên sản phẩm' />
                            <Select
                              labelInValue
                              showSearch
                              key={indexItem}
                              style={{ width: '50%' }}
                              placeholder='Danh mục'
                              // optionFilterProp='children'
                              onChange={this.onChangeCategory}
                              autoFocus={false}
                              defaultActiveFirstOption
                              // {...item.defaultCategoryCode ? { defaultValue: item.defaultCategoryCode } : null}
                              {...item.defaultCategoryCode ? { value: item.defaultCategoryCode } : null}
                              // onFocus={this.onFocusCategory}
                              // onBlur={this.onBlurCategory}
                              onSearch={this.onSearchCategory}
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {
                                categoryRedux && categoryRedux.length > 0 && categoryList &&
                                categoryList.map((categoryItem, categoryIndex) => {
                                  // console.log(categoryItem)
                                  if (!categoryItem.isParentSelf) {
                                    return (
                                      <>
                                        <Option key={categoryIndex} style={{ width: '100%' }} value={`${categoryItem.category.objectId}+${categoryItem.objectId}+${item.hashCode}`}>{categoryItem.name}</Option>
                                        {/* <Option key={categoryIndex} style={{ width: '100%' }} value={categoryIndex}>{categoryItem.name}</Option> */}
                                      </>
                                    )
                                  } else {
                                    return (
                                      <>
                                        {/* <Option key={categoryIndex} style={{ width: '100%' }} value={categoryIndex}>{categoryItem.name}</Option> */}
                                        <Option key={categoryIndex} style={{ width: '100%' }} value={`${categoryItem.objectId}+${item.hashCode}`}>{categoryItem.name}</Option>
                                      </>
                                    )
                                  }
                                })
                              }
                            </Select>
                          </div>
                          <div className='product-item-value'>
                            <Input style={{ marginRight: '10px' }} value={item.price} allowClear type={'number'} id='priceProduct' key='priceProduct' onChange={(value) => this.changeDataProduct(value, indexItem)} placeholder='Giá tiền' />
                            <Input value={item.count} prefix={<span>SL</span>} defaultValue={1} type={'number'} id='numberOfProducts' key='numberOfProducts' onChange={(value) => this.changeDataProduct(value, indexItem)} allowClear placeholder='Số lượng' />
                          </div>

                          <div>
                            <Checkbox.Group options={optionsTypeProduct} value={this.state.productList[indexItem].isNew === 'true' ? 'new' : 'old'} defaultValue={['new']} onChange={(value) => this.onChangeProductTypeNewOrOld(value, indexItem)} />
                          </div>

                          <div className='product-item-note'>
                            <TextArea placeholder='Ghi Chú' value={item.note || '---'} type={'number'} id='note' key='note' onChange={(value) => this.changeDataProduct(value, indexItem)} />
                          </div>
                        </div>
                      )
                    } else {
                      return null
                    }
                  })}

                  <Button onClick={this.onPlusProductList} type='secondary' className=' MT20 MB10'><PlusOutlined /> Thêm sản phẩm</Button>
                </Row>

                <Divider />

                <Form.Item label='Ghi chú đơn ký gửi'>
                  <Col sm={24} md={12}>
                    <TextInput
                      name='note'
                      handleInput={(value) => this.changeDataTextArea(value, 'note')}
                      isTextArea
                      value={this.state.note}
                      inputStyle='noteBox'
                    />

                  </Col>
                </Form.Item>

                <Form.Item label='Tổng tiền sau thu phí'>
                  <Col sm={24} md={12}>
                    <Input suffix='vnđ' id='moneyBackForFullSold' key='moneyBackForFullSold' value={numberWithCommas(Math.round(moneyBackForFullSold))} disabled placeholder={'...000 vnd'} />
                  </Col>
                </Form.Item>

                <Form.Item label='Tổng tiền trước thu phí'>
                  <Col sm={24} md={12}>
                    <Input suffix='vnđ' id='totalMoney' key='totalMoney' value={numberWithCommas(Math.round(totalMoney))} disabled placeholder={'...000 vnd'} />
                  </Col>
                </Form.Item>
                <Form.Item name='numberOfProducts' label='Số lượng Hàng Hoá'>
                  <Col sm={24} md={12}>
                    <Input disabled defaultValue={1} value={formData.numberOfProducts} type={'number'} id='numberOfProducts' key='numberOfProducts' allowClear placeholder='...' />
                  </Col>
                </Form.Item>

                <Form.Item label='Hình thức nhận tiền'>
                  <Col sm={24} md={24}>
                    <Checkbox.Group options={options} value={this.state.isTransferMoneyWithBank} defaultValue={['false']} onChange={this.onChangeRadio} />
                  </Col>
                </Form.Item>

                <Form.Item label='Ngày trả tiền'>
                  <Input.Group compact>
                    <Select onChange={this.onChangeTimeGetMoney} value={this.state.timeGroupCode} defaultValue={this.state.timeGroupCode} size='large' loading={isLoadingTags} id='timeGetMoney' key='timeGetMoney' placeholder='...'>
                      {
                        isLoadingTags ? null
                          : allInfoTag.map(tag => {
                            return (
                              <>
                                <Option style={{ width: '100px' }} value={tag.code}>{tag.code}</Option>
                              </>
                            )
                          })
                      }
                    </Select>
                    <Input disabled style={{ width: '50%' }} value={formData.timeGetMoney} defaultValue={moment().format('DD-MM-YYYY')} />
                  </Input.Group>
                </Form.Item>

                <Form.Item name='consignmentId' rules={[{ message: 'Vui lòng nhập mã ký gửi' }]} label='Mã ký gửi'>
                  <Col sm={24} md={12}>
                    <Input allowClear id='consignmentId' key='consignmentId' value={this.state.formData.consignmentId} onChange={this.changeData} placeholder='...' />
                  </Col>
                </Form.Item>

                <Form.Item name='consigneeName' label='Tên Nhân Viên'>
                  <Col sm={24} md={12}>
                    <Input defaultValue={userData && userData.name ? userData.name : ''} id='consigneeName' key='consigneeName' value={userData && userData.name ? userData.name : ''} disabled placeholder={userData && userData.name ? userData.name : ''} />
                  </Col>
                </Form.Item>

                <Form.Item className='button-confirm-box MT20 MB40'>
                  {channelMonitorRedux && channelMonitorRedux.objectId && (
                    <Button className='MR20' onClick={this.onUpdateMobitorData}>Cập nhật monitor</Button>
                  )}
                  <Button className='MR20' onClick={() => this.onRefeshAll(true)}>Khôi phục</Button>
                  <Button disabled={isLoadingTags || isLoadingUser || !formData.phoneNumber} loading={isConsigning} type='primary' htmlType='submit'>Xác nhận</Button>
                </Form.Item>
              </Row>
            </Form>
            </>
      }
      <MyModal ref={this.myModal} />
    </div>
  )
}
}

const mapStateToProps = (state) => ({
  channelMonitorRedux: state.channelMonitorRedux,
  locale: state.locale,
  categoryRedux: state.categoryRedux,
  userData: state.userData,
  tempConsignmentRedux: state.tempConsignmentRedux
})

export default withRouter(connect(mapStateToProps, null)(Consignment))
