import React from 'react'
import ReduxServices from 'common/redux'
import GapService from 'controller/Api/Services/Gap'
import { connect } from 'react-redux'
import { Router } from 'common/routes'
import { withRouter } from 'next/router'
import { Layout, Button, Drawer, Menu, Dropdown, Input, Cascader, message } from 'antd'
import CustomLink from 'pages/Components/CustomLink/index.js'
import Media from 'react-media'
import { CloseOutlined, DownOutlined } from '@ant-design/icons'
import Observer from 'common/observer'
import { images } from 'config/images'
import './style.scss'
import { checkIsSigned, getDataLocal, saveDataLocal, showNotification } from 'common/function'
import MyModal from 'pages/Components/MyModal'

class Header extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      visible: false,
      isShowAboutUs: false,
      isShowConsignment: false,
      isShowStore: false,
      isShowRightSideHeader: false,
      isShowRightSideHeaderAnimation: false,
      clientInfo: {
        fullName: '',
        phoneNumber: '',
        bankName: '',
        bankId: '',
        mail: '',
        userAddress: ''
      },
      optionsAddressArr: [],
      shippingInfo: {}
    }
    this.myModal = React.createRef()
  }

  componentDidMount () {
    // this.convertAddressOptionArray()
    setTimeout(() => {
      this.setState({
        isShowRightSideHeader: true
      })
    }, 200)

    // if (getDataLocal('CUSTOMER_DATA')) {
    //   const userData = getDataLocal('CUSTOMER_DATA')
    //   this.setState({
    //     clientInfo: userData.clientInfo,
    //     shippingInfo: userData.shippingInfo || null
    //   })
    // }

    // console.log('CUSTOMER_DATA', getDataLocal('CUSTOMER_DATA'))
  }

  convertAddressOptionArray = () => {
    const { addressInfoArrayRedux } = this.props
    let PROVINCE = []
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
  }

  backHome = () => {
    Router.pushRoute('/')
  }

  goToAccountPage = () => {
    Router.pushRoute('/account')
  }

  showDrawer = () => {
    this.setState({
      isOpen: true
    })
  }

  closeDrawer = () => {
    this.setState({
      isOpen: false
    })
  }

  handleSignIn = async () => {
    this.closeDrawer()
    // const result = await GapService.logInAdmin()
    // console.log('handleSignIn --- run')
    // console.log(result)
    // Observer.emit(OBSERVER_KEY.SIGN_IN)
  }

  closePopover = () => {
    this.setState({
      visible: false
    })
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

  handleVisibleChange = visible => {
    this.setState({ visible })
  }

  renderUserInfoPopup = () => {
    const { clientInfo, shippingInfo } = this.state
    return (
      <div className='customerInfoBox'>
        <span className='titleCustomerInfoBox'>Thông tin khách hàng</span>
        <p className='phoneTxt'>*Chúng tôi sử dụng thông tin này để hỗ trợ công việc vận chuyển đơn hàng và quản lý thông tin đơn hàng.</p>

        <div className='phoneBox'>
          <span className='phoneTxt'>*Số điện thoại: </span>
          <Input defaultValue={clientInfo?.phoneNumber} minLength={10} maxLength={11} allowClear onChange={(value) => this.onChangeDataClient(value, 'phoneNumber')} placeholder='...' />
        </div>

        <div className='phoneBox'>
          <span className='phoneTxt'>*Tên khách hàng: </span>
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
          <span className='phoneTxt'>*Địa chỉ: </span>
          <Input defaultValue={clientInfo?.userAddress} minLength={10} maxLength={11} allowClear onChange={(value) => this.onChangeDataClient(value, 'userAddress')} placeholder='Số nhà & Tên Đường' />
        </div>

        <div className='phoneBox'>
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
        </div>

        <Button className='updateBox' onClick={this.onUpdateUserData}>
          Cập nhật
        </Button>
      </div>
    )
  }

  onUpdateUserData = () => {
    const { clientInfo, shippingInfo } = this.state
    saveDataLocal('CUSTOMER_DATA', {
      clientInfo: clientInfo,
      shippingInfo: shippingInfo
    })

    message.success('Cập nhật thông tin khách hàng thành công')
  }

  handleAreaClick = (
    e,
    label,
    option
  ) => {
    e.stopPropagation()
    console.log('clicked', label, option)
  }

  displayRender = (labels, selectedOptions) =>
    labels.map((label, i) => {
      const option = selectedOptions[i]
      if (i === labels.length - 1) {
        return (
          <span key={option.value}>
            <a onClick={e => this.handleAreaClick(e, label, option)}>{label}</a>
          </span>
        )
      }
      return <span key={option.value}>{label} / </span>
    })

    onChangeCasacderSeller = async (value) => {
      console.log('onChangeOrderAddressStreet', value)
      const shippingInfo = {
        orderAdressProvince: value[0],
        orderAdressDistrict: value[1],
        orderAdressWard: value[2]
      }
      const formDataFee = {
        orderAdressProvince: value[0],
        orderAdressDistrict: value[1],
        orderAdressWard: value[2]
      }
      message.loading('Đang lấy thông tin phí shipping...', 2)
      const resFee = await GapService.getFeeForTransport(formDataFee, false)
      console.log('getFeeForTransport', resFee)

      if (resFee && resFee.result) {
        shippingInfo.shippingFee = resFee.result
        this.setState({
          shippingInfo
        })
      } else {
        showNotification('Không thể ước tính phí ship')
      }
    }

  onOpenUserDetail = () => {
    this.myModal.current.openModal(this.renderUserInfoPopup(), { closable: true })
  }

  renderLeftSide () {
    return (
      <div className='left-side'>

        <CustomLink route='/'>
          <div className='logo cursor-pointer'>
            <img className='' src={images.logoHeaderWhite} style={{ objectFit: 'contain', height: '100%', width: 'auto', marginRight: '10px' }} />
            <img className='' src={images.giveawayTextBlack} style={{ objectFit: 'contain', height: 'unset', width: 'unset' }} />
          </div>
        </CustomLink>
      </div>
    )
  }

  renderMainNav (mode = 'horizontal') {
    const { isShowAboutUs, isShowConsignment, isShowStore, isShowRightSideHeader, isShowRightSideHeaderAnimation } = this.state
    const { messages } = this.props.locale
    const isHide = this.props.router.asPath === '/monitor' || this.props.router.asPath === '/admin'

    // if (isHomePage) {
    //   return null
    // }

    return (
      <Menu
        // className='main-nav'
        style={isHide ? { opacity: 0, PointerEvent: 'none' } : {}}
        className={'main-nav' + (isShowRightSideHeader ? ' show' : '') + (isShowRightSideHeaderAnimation ? ' animation' : '')}
        mode={mode}
        onClick={() => this.closeDrawer()}
      >
        <Menu.Item key={1}>
          <CustomLink route='/gioithieu'>
            <span className={'main-nav-item' + (isShowRightSideHeader ? ' show' : '')}>Về chúng tôi</span>
          </CustomLink>
        </Menu.Item>
        <Menu.Item key={2} >
          <CustomLink route='/kygui'>
            <span className={'main-nav-item' + (isShowRightSideHeader ? ' show' : '')}>Ký gửi</span>
          </CustomLink>
        </Menu.Item>
        <Menu.Item key={3} >
          <CustomLink route='/muasam'>
            <span className={'main-nav-item' + (isShowRightSideHeader ? ' show' : '')}>Mua sắm</span>
          </CustomLink>
        </Menu.Item>
        {/* <Menu.Item key={4} onClick={this.onOpenUserDetail}>
          <span className={'main-nav-item userInfo' + (isShowRightSideHeader ? ' show' : '')}>Thông tin khách hàng</span>
        </Menu.Item> */}
      </Menu>
    )
  }

  renderFooterNav () {
    // const { messages } = this.props.locale
    return (
      <Menu
        className='footer-nav'
        mode={'vertical'}
        onClick={() => this.closeDrawer()}
      />
    )
  }

  renderDesktop () {
    const { locale, userData } = this.props
    // const { isShowRightSideHeader } = this.state
    // const { messages } = locale
    const isAdminPage = this.props.router.asPath === '/admin'
    const isSigned = checkIsSigned(userData)

    setTimeout(() => {
      this.setState({
        isShowRightSideHeader: true
      })
    }, 1000)

    return (
      <div className='wrapper-custom-header'>
        {this.renderLeftSide()}
        {isSigned && isAdminPage &&
        <div className='flex align-center'>
          <div className='status-on MR3' />
          <h1 className='text text-bold'>
            {userData && userData.name}
          </h1>
        </div>}
        <div className={'right-side'}>
          {this.renderMainNav()}
          <div className='ctn-btn-signin ML5'>
            {/* {isSigned ? (
                        <>
                          <Dropdown overlay={accountNav} trigger={['click']}>
                            <a className='ant-dropdown-link' onClick={e => e.preventDefault()}>
                              <DownOutlined />
                            </a>
                          </Dropdown>
                        </>
            ) : <Button
              // style={{ 'border-radius': '25px' }}
              className='btn-signin'
              onClick={() => this.handleSignIn()}
            >
              {messages.signIn}
            </Button>} */}
          </div>
        </div>
      </div>
    )
  }

  renderMainNavMobile (mode = 'horizontal') {
    const { isShowAboutUs, isShowConsignment, isShowStore, isShowRightSideHeader, isShowRightSideHeaderAnimation, isOpen } = this.state
    const { messages } = this.props.locale
    const isHide = this.props.router.asPath === '/monitor'

    // if (isHomePage) {
    //   return null
    // }

    return (
      <Menu
        style={isHide ? { opacity: 0, PointerEvent: 'none' } : {}}
        className={'main-nav-mobile' + (isShowRightSideHeader ? ' show' : '') + (isShowRightSideHeaderAnimation ? ' animation' : '')}
        mode={mode}
        onClick={() => this.closeDrawer()}
      >
        <Menu.Item key={1}>
          <CustomLink route='/gioithieu'>
            <span className={'main-nav-item' + (isShowRightSideHeader ? ' show' : '')}>Về chúng tôi</span>
          </CustomLink>
        </Menu.Item>
        <Menu.Item key={2} >
          <CustomLink route='/kygui'>
            <span className={'main-nav-item' + (isShowRightSideHeader ? ' show' : '')}>Ký gửi</span>
          </CustomLink>
        </Menu.Item>
        <Menu.Item key={3} >
          <CustomLink route='/muasam'>
            <span className={'main-nav-item' + (isShowRightSideHeader ? ' show' : '')}>Mua sắm</span>
          </CustomLink>
        </Menu.Item>
      </Menu>
    )
  }

  renderMobile () {
    const { locale, userData } = this.props
    const { messages } = locale
    const isSigned = true
    const isHide = this.props.router.asPath === '/' || this.props.router.asPath === '/monitor' || this.props.router.asPath === '/admin'

    return (
      <div className='wrapper'>
        <Drawer
          title=''
          width={'100%'}
          placement='right'
          onClose={this.closeDrawer}
          // closeicon={<CloseOutlined />}
          maskClosable
          closable
          visible={this.state.isOpen}
          // drawerStyle={{ background: '#000' }}
        >
          <div className='mobile-menu'>
            <div className='top-box'>
              {/* <img className='MT30 MB30' width={100} src={images.logo} /> */}
              <h1 className='logo'>
                <img width={90} src={images.logoHeaderWhite} style={{ objectFit: 'contain', marginBottom: '10px' }} />
              </h1>
              {/* <Menu.Item key={4} onClick={this.onOpenUserDetail}>
                <span className={'main-nav-item userInfo'}>Thông tin khách hàng</span>
              </Menu.Item> */}
              {this.renderMainNavMobile('vertical')}

              {/* {!isSigned && <div className='ctn-btn-signin MT20'>
                <Button
                  block
                  className='btn-signin'
                  onClick={() => this.handleSignIn()}
                >
                  {messages.signIn}
                </Button>
              </div>} */}
            </div>
            {/* {this.renderFooterNav()} */}
          </div>
        </Drawer>
        {this.renderLeftSide()}
        {
          !isHide && <div className='right-side'>
            <a className='menu-bugger ML15' onClick={this.showDrawer}>
              <img src={images.threeDots} />
            </a>
          </div>
        }
      </div>
    )
  }
  render () {
    const isHideHeader = this.props.router.asPath === '/monitor' || this.props.router.asPath === '/admin'
    if (isHideHeader) {
      return null
    } else {
      return (
        <div className='header-container'>
          <Media
            query='(min-width: 500px)'
            render={() => this.renderDesktop()}
          />
          <Media
            query='(max-width: 499px)'
            render={() => this.renderMobile()}
          />
          <MyModal ref={this.myModal} />
        </div>
      )
    }
  }
}
const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData,
  addressInfoArrayRedux: state.addressInfoArrayRedux
})
export default withRouter(connect(mapStateToProps, null)(Header))
