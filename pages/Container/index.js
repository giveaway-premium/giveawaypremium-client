import React, { PureComponent } from 'react'
import ReduxServices from 'common/redux'
import { connect } from 'react-redux'
import { Detector } from 'common/components/InternetDetect'
import { Layout, Row, Col, Input, Cascader, Button, message } from 'antd'
import { isMobile } from 'react-device-detect'
import Header from './Header'
import innerHeight from 'ios-inner-height'
import './style.scss'
import { withRouter } from 'next/router'
import { getDataLocal, saveDataLocal, showNotification } from 'common/function'
import MyModal from 'pages/Components/MyModal'
import Gap from 'controller/Api/Services/Gap'
import StorageActions from 'controller/Redux/actions/storageActions'
const { Content } = Layout

class BaseContainer extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      clientInfo: {
        fullName: '',
        phoneNumber: '',
        bankName: '',
        bankId: '',
        mail: '',
        userAddress: ''
      },
      optionsAddressArr: props.addressInfoArrayAfterSortRedux || [],
      shippingInfo: {},
      isLoadingAddress: true
    }
    this.myModal = React.createRef()
  }
  componentDidMount () {
    //
    this.convertAddressOptionArray()

    if (getDataLocal('CUSTOMER_DATA')) {
      const userData = getDataLocal('CUSTOMER_DATA')
      this.setState({
        clientInfo: userData.clientInfo,
        shippingInfo: userData.shippingInfo || null
      })
    }

    (function () {
      // Add event listener
      document.addEventListener('mousemove', parallax)
      const elem = document.querySelector('#parallax')
      // Magic happens here
      function parallax (e) {
        let _w = window.innerWidth / 2
        let _h = window.innerHeight / 2
        let _mouseX = e.clientX
        let _mouseY = e.clientY
        let _depth1 = `${50 - (_mouseX - _w) * 0.003}% ${50 - (_mouseY - _h) * 0.003}%`
        let _depth2 = `${50 - (_mouseX - _w) * 0.003}% ${50 - (_mouseY - _h) * 0.003}%`
        let _depth3 = `${25 - (_mouseX - _w) * 0.004}% ${70 - (_mouseY - _h) * 0.002}%`
        let x = `${_depth3}, ${_depth2}, ${_depth1}`
        // console.log(x)
        if (elem && elem.style && elem.style.backgroundPosition) {
          elem.style.backgroundPosition = x
        }
      }
    })()

    setTimeout(() => {
      const elem = document.querySelector('#parallax')
      if (elem) {
        elem.style.transition = 'all 1s'
        elem.style.opacity = 1
      }
    }, 1000)
  }

  convertAddressOptionArray = async () => {
    const { addressInfoArrayRedux, addressInfoArrayAfterSortRedux } = this.props
    let PROVINCE = []

    try {
      if (addressInfoArrayAfterSortRedux?.length > 0) {
        console.log('addressInfoArrayAfterSortRedux', addressInfoArrayAfterSortRedux)
        this.setState({
          optionsAddressArr: addressInfoArrayAfterSortRedux
        })
      } else if (addressInfoArrayAfterSortRedux?.length > 0) {
        console.log('addressInfoArrayRedux', addressInfoArrayRedux)
        const addressInfoArrayReduxTemp = [...addressInfoArrayRedux]
        PROVINCE = addressInfoArrayReduxTemp.map((optionAddress, optionAddressIndex) => (
          {
            value: optionAddress.name,
            label: optionAddress.name,
            children: optionAddress.districts.map((districtItem, districtItemIndex) => (
              {
                value: districtItem.name,
                label: districtItem.name,
                children: districtItem.wards.map((wardItem, wardItemIndex) => (
                  {
                    value: wardItem.name,
                    label: wardItem.name
                  }
                ))
              }
            ))
          }
        ))
        console.log('PROVINCE', PROVINCE)
        this.setState({
          optionsAddressArr: PROVINCE
        })
      } else {
        const res = await Gap.getUnitAddress()
        if (res && res.result && res.result.length > 0) {
          ReduxServices.callDispatchAction(StorageActions.setAddressInfoArray(res.result))
          PROVINCE = [...res.result].map((optionAddress, optionAddressIndex) => (
            {
              value: optionAddress.name,
              label: optionAddress.name,
              children: optionAddress.districts.map((districtItem, districtItemIndex) => (
                {
                  value: districtItem.name,
                  label: districtItem.name,
                  children: districtItem.wards.map((wardItem, wardItemIndex) => (
                    {
                      value: wardItem.name,
                      label: wardItem.name
                    }
                  ))
                }
              ))
            }
          ))
        }

        this.setState({
          optionsAddressArr: PROVINCE
        })
      }
    } catch (error) {
      console.log('error', error)
      //
    } finally {
      this.setState({
        isLoadingAddress: false
      })
    }
  }

  onChangeDataClient = (event, keyValue) => {
    const { clientInfo } = this.state

    console.log('onChangeDataClient', event.target.value)
    if (keyValue === 'bankName') {
      this.setState({
        clientInfo: {
          ...clientInfo,
          bankName: event.target.value ? event.target.value.trim() : ''
        }
      })
    } else if (keyValue === 'bankId') {
      this.setState({
        clientInfo: {
          ...clientInfo,
          bankId: event.target.value ? event.target.value.trim() : ''
        }
      })
    } else if (keyValue === 'fullName') {
      this.setState({
        clientInfo: {
          ...clientInfo,
          fullName: event.target.value ? event.target.value.trim() : ''
        }
      })
    } else if (keyValue === 'userAddress') {
      this.setState({
        clientInfo: {
          ...clientInfo,
          userAddress: event.target.value ? event.target.value.trim() : ''
        }
      })
    } else if (keyValue === 'mail') {
      this.setState({
        clientInfo: {
          ...clientInfo,
          mail: event.target.value ? event.target.value.trim() : ''
        }
      })
    } else if (keyValue === 'phoneNumber') {
      this.setState({
        clientInfo: {
          ...clientInfo,
          phoneNumber: event.target.value ? event.target.value.trim() : ''
        }
      })
    }
  }

  onUpdateUserData = () => {
    const { clientInfo, shippingInfo } = this.state
    saveDataLocal('CUSTOMER_DATA', {
      clientInfo: clientInfo,
      shippingInfo: shippingInfo
    })

    message.success('Cập nhật thông tin khách hàng thành công')
  }

  renderUserInfoPopup = () => {
    const { clientInfo, shippingInfo } = this.state
    return (
      <div className='customerInfoBoxContainer'>
        <span className='titleCustomerInfoBox'>Thông tin khách hàng</span>
        <p className='phoneTxt'>*Chúng tôi chỉ sử dụng thông tin này cho vận đơn, quản lý thông tin đơn hàng và cam kết bảo mật tuyệt đối</p>

        <div className='phoneBox'>
          <span className='phoneTxt'>Số điện thoại: </span>
          <Input defaultValue={clientInfo?.phoneNumber} minLength={10} maxLength={11} allowClear onChange={(value) => this.onChangeDataClient(value, 'phoneNumber')} placeholder='...' />
        </div>

        <div className='phoneBox'>
          <span className='phoneTxt'>Tên khách hàng: </span>
          <Input defaultValue={clientInfo?.fullName} minLength={10} maxLength={30} allowClear onChange={(value) => this.onChangeDataClient(value, 'fullName')} placeholder='...' />
        </div>

        <div className='phoneBox'>
          <span className='phoneTxt'>Email: </span>
          <Input defaultValue={clientInfo?.mail} minLength={10} maxLength={30} allowClear onChange={(value) => this.onChangeDataClient(value, 'mail')} placeholder='...' />
        </div>

        {/* <div className='phoneBox'>
          <span className='phoneTxt'>Tên ngân hàng: </span>
          <Input defaultValue={clientInfo?.bankName} allowClear onChange={(value) => this.onChangeDataClient(value, 'bankName')} placeholder='...' />
        </div>

        <div className='phoneBox'>
          <span className='phoneTxt'>ID ngân hàng: </span>
          <Input defaultValue={clientInfo?.bankId} allowClear onChange={(value) => this.onChangeDataClient(value, 'bankId')} placeholder='...' />
        </div> */}

        <div className='phoneBox'>
          <span className='phoneTxt'>Địa chỉ: </span>
          <Input defaultValue={clientInfo?.userAddress} minLength={10} maxLength={11} allowClear onChange={(value) => this.onChangeDataClient(value, 'userAddress')} placeholder='Số nhà & Tên Đường' />
        </div>

        <div className='phoneBox'>
          {
            this.state.isLoadingAddress ? <span>Đang lấy dữ liệu các quận huyện, quý khách chờ trong giây lát</span> : (
              <Cascader
                allowClear
                showSearch
                placeholder={(shippingInfo.orderAdressProvince && shippingInfo.orderAdressDistrict && shippingInfo.orderAdressWard) ? `${shippingInfo.orderAdressProvince}-${shippingInfo.orderAdressDistrict}-${shippingInfo.orderAdressWard}` : 'Thành phố/Tỉnh - Quận/Huyện - Xã/Phường'}
                options={this.state.optionsAddressArr}
                defaultValue={[]}
                displayRender={this.displayRender}
                style={{ width: '100%' }}
                onChange={this.onChangeCasacderSeller}
              />
            )
          }
        </div>

        <Button className='updateBox' onClick={this.onUpdateUserData}>
          Cập nhật
        </Button>
      </div>
    )
  }

  onChangeCasacderSeller = async (value) => {
    console.log('onChangeOrderAddressStreet', value)
    const shippingInfo = {
      orderAdressProvince: value[0],
      orderAdressDistrict: value[1],
      orderAdressWard: value[2]
    }

    this.setState({
      shippingInfo
    })
    // const formDataFee = {
    //   orderAdressProvince: value[0],
    //   orderAdressDistrict: value[1],
    //   orderAdressWard: value[2]
    // }
    // message.loading('Đang lấy thông tin phí shipping...', 2)
    // const resFee = await Gap.getFeeForTransport(formDataFee, false)
    // console.log('getFeeForTransport', resFee)

    // if (resFee && resFee.result) {
    //   shippingInfo.shippingFee = resFee.result
    //   this.setState({
    //     shippingInfo
    //   })
    // } else {
    //   this.setState({
    //     shippingInfo
    //   })
    //   showNotification('Không thể ước tính phí ship')
    // }
  }

  onOpenUserDetail = () => {
    this.myModal.current.openModal(this.renderUserInfoPopup(), { closable: true })
  }

  render () {
    const isFullScreen = this.props.router.asPath === '/admin'
    const isStoreScreen = this.props.router.asPath === '/muasam' || this.props.router.asPath.includes('/sanpham')
    return (
      <>
        <div className='main-base-container'>
          <div id='parallax' />
          <Header />
          <div className='contentLayout' style={isFullScreen ? { maxWidth: '100%', minHeight: isMobile && innerHeight } : { minHeight: isMobile && innerHeight }}>
            {this.props.children}
          </div>
          {/* <Row type='flex' justify='center'>
              <Col span={24}>
                <div className='base-container'>{this.props.children}</div>
              </Col>
            </Row> */}
          {/* <Footer /> */}
          {isStoreScreen && <div className='UserInfoBox' onClick={this.onOpenUserDetail}>Thông tin khách hàng</div>}
          <MyModal ref={this.myModal} />
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  addressInfoArrayRedux: state.addressInfoArrayRedux,
  addressInfoArrayAfterSortRedux: state.addressInfoArrayAfterSortRedux
})

export default withRouter(connect(mapStateToProps)(BaseContainer))
