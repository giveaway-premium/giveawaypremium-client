import React from 'react'
import ReduxServices from 'common/redux'
import GapService from 'controller/Api/Services/Gap'
import { connect } from 'react-redux'
import { Router } from 'common/routes'
import { withRouter } from 'next/router'
import { Layout, Button, Drawer, Menu, Dropdown } from 'antd'
import CustomLink from 'pages/Components/CustomLink/index.js'
import Media from 'react-media'
import { CloseOutlined, DownOutlined } from '@ant-design/icons'
import Observer from 'common/observer'
import { images } from 'config/images'
import './style.scss'
import { checkIsSigned } from 'common/function'

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
      isShowRightSideHeaderAnimation: false
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        isShowRightSideHeader: true
      })
    }, 200)
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

  handleVisibleChange = visible => {
    this.setState({ visible })
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
    const isHomePage = this.props.router.asPath === '/'

    // if (isHomePage) {
    //   return null
    // }

    return (
      <Menu
        // className='main-nav'
        style={isHomePage ? { opacity: 0, PointerEvent: 'none' } : {}}
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
      </Menu>
    )
  }

  renderFooterNav () {
    const { messages } = this.props.locale
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
    const { isShowRightSideHeader } = this.state
    const { messages } = locale
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
    const isHomePage = this.props.router.asPath === '/'

    // if (isHomePage) {
    //   return null
    // }

    return (
      <Menu
        style={isHomePage ? { opacity: 0, PointerEvent: 'none' } : {}}
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
    const isHomePage = this.props.router.asPath === '/'

    return (
      <div className='wrapper'>
        <Drawer
          title=''
          width={'100%'}
          placement='right'
          onClose={this.closeDrawer}
          // closeicon={<CloseOutlined />}
          maskClosable
          closable={false}
          visible={this.state.isOpen}
          // drawerStyle={{ background: '#000' }}
        >
          <div className='mobile-menu'>
            <div className='top-box'>
              {/* <img className='MT30 MB30' width={100} src={images.logo} /> */}
              <h1 className='logo'>
                <img width={90} src={images.logoHeaderWhite} style={{ objectFit: 'contain', marginBottom: '10px' }} />
              </h1>
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
          !isHomePage && <div className='right-side'>
            <a className='menu-bugger ML15' onClick={this.showDrawer}>
              <img src={images.threeDots} />
            </a>
          </div>
        }
      </div>
    )
  }
  render () {
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
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData
})
export default withRouter(connect(mapStateToProps, null)(Header))
