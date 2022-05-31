import React from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Form, Row, Col, Input, Button, Descriptions, Divider, DatePicker, Select, Checkbox } from 'antd'
import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'
import { numberWithCommas, showNotification, generateIdMix } from 'common/function'
import { LoadingOutlined, CheckCircleFilled, PlusCircleFilled, PlusOneTwoTone, PlusOutlined, CloseOutlined, DollarCircleOutlined } from '@ant-design/icons'
import { Router } from 'common/routes'
import { isMobile } from 'react-device-detect'
import './style.scss'
import Lottie from 'react-lottie'
import GapService from 'controller/Api/Services/Gap'
import moment from 'moment'
import successJson from 'static/Assets/Image/Lottie/success.json'
import { EMAIL_TITLE, EMAIL_TYPE } from 'common/constants'

const { TextArea } = Input
const { Option } = Select

const dateFormat = 'DD-MM-YYYY'
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
          note: '---'
        }
      ],
      formData: {
        consigneeName: this.props && this.props.userData && this.props.userData.name ? this.props.userData.name : '',
        consignerName: '',
        phoneNumber: '',
        consignerIdCard: '',
        mail: '',
        birthday: moment().format('DD-MM-YYYY'),
        bankName: '',
        bankId: '',
        numberOfProducts: 1,
        consignmentId: '',
        timeGetMoney: moment().format('DD-MM-YYYY'),
        numberOfConsignmentTime: 0,
        numberOfConsignment: 0
      },
      moneyBackForFullSold: 0,
      totalMoney: 0,
      isLoadingTags: false,
      objectIdFoundUser: '',
      birthday: moment().format('DD-MM-YYYY'),
      isConsigning: false,
      isShowConfirmForm: false,
      isFoundUser: false,
      isLoadingUser: false,
      categoryList: [],
      timeGroupId: '',
      timeGroupCode: '',
      onlineCodeStringInput: '',
      isErrorFormat: false
    }
    this.formRef = React.createRef()
    this.myModal = React.createRef()
  }

  componentDidMount () {
    const { categoryRedux } = this.props
    console.log('categoryRedux')
    console.log(categoryRedux)
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

    console.log(categoryList)

    this.fetchAllTags()
  }

  componentDidUpdate () {

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

  onConsign = () => {
    const { userData } = this.props
    const {
      isFoundUser, objectIdFoundUser, formData,
      timeGroupId, productList, moneyBackForFullSold, totalMoney,
      isTransferMoneyWithBank, timeGroupCode
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
            code: formData.consignmentId + '-' + timeGroupCode + '-' + productId,
            key: indexItem,
            productId: productId
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
    }

    console.log(userData)
    this.setState({
      isConsigning: true,
      productList: productListTemp,
      formData: {
        ...formData,
        numberOfProducts: productCount
      }
    }, async () => {
      console.log('onConsign')
      console.log(formData)
      console.log(this.state)
      if (isFoundUser && objectIdFoundUser) { // for already user
        console.log('for already user')
        const result = await GapService.setConsignment(formData, userData.objectId, objectIdFoundUser, timeGroupId, timeGroupCode, productListTemp, moneyBackForFullSold, totalMoney, isTransferMoneyWithBank)
        console.log(result)
        if (result && result.objectId) {
          this.setState({
            isShowConfirmForm: true,
            isConsigning: false
          }, async () => {
            const customerFormData = {
              consignerName: formData.consignerName,
              phoneNumber: formData.phoneNumber,
              consignerIdCard: formData.consignerIdCard,
              mail: formData.mail,
              email: formData.mail || 'nothing@giveaway.com',
              birthday: formData.birthday,
              bankName: formData.bankName,
              bankId: formData.bankId
            }
            console.log('udpate user')
            console.log(customerFormData)
            console.log(objectIdFoundUser)

            formData.mail && formData.mail.length > 0 && GapService.sendMail(customerFormData, formData, EMAIL_TYPE.CONSIGNMENT, EMAIL_TITLE.CONSIGNMENT, timeGroupCode)
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
          birthday: formData.birthday,
          bankName: formData.bankName,
          bankId: formData.bankId
        }
        console.log('create user')
        console.log(customerFormData)
        const resCus = await GapService.setCustomer(customerFormData)

        console.log(resCus)

        if (resCus && resCus.objectId) {
          showNotification('Thêm khách hàng thành công')
          const result = await GapService.setConsignment(formData, userData.objectId, resCus.objectId, timeGroupId, timeGroupCode, productListTemp, moneyBackForFullSold, totalMoney, isTransferMoneyWithBank)
          console.log(result)

          if (result && result.objectId) {
            this.setState({
              isShowConfirmForm: true,
              isConsigning: false
            })
            GapService.sendMail(customerFormData, formData, EMAIL_TYPE.CONSIGNMENT, EMAIL_TITLE.CONSIGNMENT, timeGroupCode)
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
          birthday: moment().format('DD-MM-YYYY'),
          bankName: '',
          bankId: '',
          consignmentId: ''
        },
        objectIdFoundUser: '',
        birthday: moment().format('DD-MM-YYYY'),
        isShowConfirmForm: false,
        isFoundUser: false
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
          birthday: moment().format('DD-MM-YYYY'),
          bankName: '',
          bankId: '',
          consignmentId: ''
        },
        objectIdFoundUser: '',
        birthday: moment().format('DD-MM-YYYY'),
        isShowConfirmForm: false,
        isFoundUser: false
      })
      // this.onRefeshAll()
    }
  }

  onRefeshAll = () => {
    const { formData } = this.state
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
          note: '---'
        }
      ],
      formData: {
        consigneeName: this.props && this.props.userData && this.props.userData.name ? this.props.userData.name : '',
        consignerName: '',
        phoneNumber: '',
        consignerIdCard: '',
        mail: '',
        birthday: moment(),
        bankName: '',
        bankId: '',
        numberOfProducts: 1,
        consignmentId: '',
        timeGetMoney: moment().format('DD-MM-YYYY'),
        numberOfConsignmentTime: 0,
        numberOfConsignment: 0
      },
      moneyBackForFullSold: 0,
      totalMoney: 0,
      isLoadingTags: false,
      objectIdFoundUser: '',
      birthday: moment().format('DD-MM-YYYY'),
      isConsigning: false,
      isShowConfirmForm: false,
      isFoundUser: false,
      isLoadingUser: false,
      onlineCodeStringInput: '',
      isErrorFormat: false
    })
  }

  onChangeBirthday = (value) => {
    try {
      const formatTime = moment(value).format('DD-MM-YYYY')
      console.log(formatTime)
      console.log(value)

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

  changeData = (value) => {
    console.log(value.target.id)
    const { formData } = this.state

    this.setState({
      formData: {
        ...formData,
        [value.target.id]: value.target.value
      }
    }, () => console.log(this.state))
  }

  onChangeTimeGetMoney = (value) => {
    const { formData, allInfoTag } = this.state

    console.log('onChangeTimeGetMoney')
    console.log(value)
    const findTag = allInfoTag.filter(tag => tag.code === value)

    if (findTag && findTag[0]) {
      this.setState({
        formData: {
          ...formData,
          timeGetMoney: moment(findTag[0].timeGetMoney).format('DD-MM-YYYY')
        },
        timeGroupCode: value,
        timeGroupId: findTag[0].objectId
      }, () => {
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
        moneyBackForFullSold += item.count * this.convertPriceAfterFee(Number(item.price)) * 1000
        totalMoney += item.count * Number(item.price) * 1000
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
        numberOfProducts += Number(item.count)
        moneyBackForFullSold += item.count * this.convertPriceAfterFee(Number(item.price)) * 1000
        totalMoney += item.count * Number(item.price) * 1000
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
          productId: productList.length
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
          productId: productList.length + 1
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
          productId: productList.length + 2
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

    if (index >= 0) {
      let moneyBackTemp = moneyBackForFullSold - (this.convertPriceAfterFee(Number(productList[index].price)) * 1000 * Number(productList[index].count))
      let totalMoneyTemp = totalMoney - Number(productList[index].price) * 1000 * Number(productList[index].count)
      let productNumber = formData.numberOfProducts - productList[index].count
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
      console.log('onDeleteProductList end')
  
      this.setState({
        moneyBackForFullSold: moneyBackTemp,
        totalMoney: totalMoneyTemp,
        productList: productListTemp,
        formData: {
          ...formData,
          numberOfProducts: productNumber
        }
      })
    }
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

onChangeCategory = async (valueProp) => {
  const { productList } = this.state
  let productListTemp = productList.slice()

  let filterTxt

  if (valueProp && valueProp.value) {
    filterTxt = valueProp.value
  } else if (valueProp && !valueProp.value) {
    filterTxt = valueProp
  }
  console.log(valueProp)

  const categorySplitTxt = filterTxt && filterTxt.split('+')
  let categoryId
  let subCategoryId
  let hashCode
  let indexProduct

  if (categorySplitTxt.length === 3) {
    categoryId = categorySplitTxt[0]
    subCategoryId = categorySplitTxt[1]
    hashCode = categorySplitTxt[2]
  } else if (categorySplitTxt.length === 2) {
    // this is also parent category
    categoryId = categorySplitTxt[0]
    hashCode = categorySplitTxt[1]
    subCategoryId = null
  }

  await productListTemp.map((item, hashCodeIndex) => {
    if (item.hashCode === hashCode) {
      indexProduct = hashCodeIndex
    }
  })

  productListTemp[indexProduct].categoryId = categoryId
  productListTemp[indexProduct].subCategoryId = subCategoryId

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
      <p className='text'>Loại / tên sản phẩm / số lượng / giá tiền / tình trạng</p>
      {isErrorFormat ? <span className='text text-color-6 MB10'>Sai Định dạng</span> : null}
      <div className='product-item-note MB20'>
        <TextArea style={{ minHeight: '300px'}} onChange={this.onChangeOnlineInput} placeholder='Ghi Chú' id='onlineInput' key='onlineInput' />
      </div>
      <Button className='ML10' onClick={this.convertStringToConsignment}>Ok</Button>
    </div>
  )
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
      categoryListObjectTemp.thiet = { ...itemCate, keyCode: 'thiet' }
      break
    }
    case 'YIUniNrIKb': {
      categoryListObjectTemp.hoa = { ...itemCate, keyCode: 'hoa' }
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
    console.log(stringCodeArr)
    if (isErrorFormat === false && stringCodeArr && stringCodeArr.length === 5 && Number(stringCodeArr[2].trim()) + 1 > 0 && Number(stringCodeArr[3].trim()) + 1 > 0) {
      type = stringCodeArr[0].trim().toLowerCase()
      name = stringCodeArr[1].trim()
      amount = Number(stringCodeArr[2].trim())
      price = Number(stringCodeArr[3].trim())
      detail = stringCodeArr[4].trim()
      console.log(categoryListObjectTemp[type])

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
        }
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
  const { userData, categoryRedux } = this.props
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
            <Button className='MT20 MB20' onClick={this.onRefeshAll} >Quay lại</Button>
            </>
          : <>
            <Form
              ref={this.formRef}
              {...layout}
              name='consignment'
              initialValues={formData}
              // onFinish={this.onFinish}
              onFinish={this.onConsign}
              onValuesChange={(changedValues, allValues) => {
                console.log('changedValues')
                console.log(changedValues)

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
                <Form.Item name='phoneNumber' rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]} label='Số điện thoại'>
                  <Col sm={24} md={12}>
                    {/* <Search placeholder="input search loading default" loading /> */}
                    <Input value={formData.phoneNumber} minLength={10} maxLength={12} allowClear onChange={this.fetchUserByPhoneNumber} style={{ minWidth: 100 }} placeholder='...' suffix={isLoadingUser ? <LoadingOutlined /> : isFoundUser ? <CheckCircleFilled style={{ color: 'green ' }} /> : null} />
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
                    <DatePicker allowClear={false} disabled={!formData.phoneNumber || formData.phoneNumber.length < 10} id='birthday' key='birthday' defaultValue={moment()} value={moment(formData.birthday, dateFormat)} onChange={this.onChangeBirthday} format={dateFormat} placeholder={dateFormat} style={{ width: '100%' }} />
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

                <Form.Item name='consignmentId' rules={[{ required: true, message: 'Vui lòng nhập mã ký gửi' }]} label='Mã ký gửi'>
                  <Col sm={24} md={12}>
                    <Input allowClear id='consignmentId' key='consignmentId' onChange={this.changeData} placeholder='...' />
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
                    <Select onChange={this.onChangeTimeGetMoney} defaultValue={allInfoTag && allInfoTag[0] && allInfoTag[0].code} size='large' loading={isLoadingTags} id='timeGetMoney' key='timeGetMoney' placeholder='...'>
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

                <Form.Item name='consigneeName' label='Tên Nhân Viên'>
                  <Col sm={24} md={12}>
                    <Input defaultValue={userData && userData.name ? userData.name : ''} id='consigneeName' key='consigneeName' value={userData && userData.name ? userData.name : ''} disabled placeholder={userData && userData.name ? userData.name : ''} />
                  </Col>
                </Form.Item>

                <Form.Item className='button-confirm-box MT20 MB40'>
                  <Button className='MR20' onClick={this.onRefeshAll}>Khôi phục</Button>
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
  locale: state.locale,
  categoryRedux: state.categoryRedux,
  userData: state.userData
})

export default withRouter(connect(mapStateToProps, null)(Consignment))
