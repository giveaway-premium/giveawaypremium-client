import React from 'react'
import { Router } from 'common/routes'
import ReduxServices from 'common/redux'
import { connect } from 'react-redux'
import { Form, Button, Layout, Input, Checkbox, Menu, Row, Col } from 'antd'
import { withRouter } from 'next/router'
import { images } from 'config/images'
import { isMobile } from 'react-device-detect'
import MyModal from 'pages/Components/MyModal'
import './style.scss'
import { checkIsSigned, showNotification } from 'common/function'
import GapService from 'controller/Api/Services/Gap'
import Media from 'react-media'
import { bindActionCreators } from 'redux'
import StorageActions from 'controller/Redux/actions/storageActions'
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  WalletOutlined,
  SettingOutlined
} from '@ant-design/icons'

import Consignment from './components/Consignment'
import ManageScreen from './components/ManageScreen'
import SettingScreen from './components/SettingScreen'

class DashBoard extends React.PureComponent {
  static async getInitialProps ({ query }) {
    return { query }
  }
  constructor (props) {
    super(props)
    this.state = {
      isLogin: false,
      isLoadingLogin: false,
      numberPage: 0,
      formData: {
        nameConsigner: '',
        nameConsignee: '',
        numConsignment: 1,
        bankNumber: '',
        bankName: ''
      }
    }
    this.myModal = React.createRef()
  }

  async componentDidMount () {
    this.checkIsSigned()
  }

  componentDidUpdate (prevProps, prevState) {
    this.checkIsSigned()
  }

  checkIsSigned = () => {
    const { userData } = this.props
    const isSigned = checkIsSigned(userData)
    if (!isSigned) {
      this.myModal.current.openModal(this.renderLoginPopup(), { closable: false })
    } else {
      console.log('isSigned = true')
    }
  }

  onFinish = async (values) => {
    this.setState({
      isLoadingLogin: true
    }, async () => {
      const username = values.username
      const password = values.password

      const result = await GapService.logInAdmin(username, password)
      console.log(result)
      if (result && result.sessionToken) {
        console.log(result)
        ReduxServices.setUserToken(result)
        showNotification('Đăng nhập thành công')
        this.setState({
          isLogin: true,
          isLoadingLogin: false
        })
        this.closeModal()
      } else {
        showNotification('Đăng nhập thất bại')
        this.setState({
          isLoadingLogin: false
        })
      }
    })
  };

  handleSignOut = () => {
    ReduxServices.deleteUserToken()
  }

  onFinishFailed = (errorInfo) => {
    showNotification('Đăng nhập thất bại')
    console.log('Failed:', errorInfo)
  };

  renderLoginPopup = () => {
    const { isLoadingLogin } = this.state
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    }
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 }
    }
    return (
      <div className='login-popup-container'>
        <span className='text text-title MB15'>Đăng nhập</span>
        <Form
          {...layout}
          name='basic'
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label='Tài khoản'
            name='username'
            rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Mật khẩu'
            name='password'
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password />
          </Form.Item>

          {/* <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
            <Checkbox className='text'>Ghi nhớ</Checkbox>
          </Form.Item> */}

          <Form.Item {...tailLayout}>
            <Button loading={isLoadingLogin} type='primary' htmlType='submit'>
              OK
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  closeModal = () => {
    this.myModal.current.closeModal()
  }

  detectRenderConent = () => {
    const { numberPage } = this.state
    switch (numberPage) {
    case 1:
      return this.renderSummarize()
    case 2:
      return this.renderSummarize()
    case 3:
      return this.renderManageScreen()
    case 4:
      return this.renderConsignment()
    case 5:
      return this.renderSetting()
    }
  }

  handleChoosePage = (page) => {
    if (page && page.key) {
      this.setState({
        numberPage: Number(page.key)
      })
    }
  }

  renderSummarize = () => {
    return (
      <div />
    )
  }

  renderConsignment = () => {
    return (
      <Consignment />
    )
  }

  renderManageScreen = () => {
    return (
      <ManageScreen />
    )
  }

  renderSetting = () => {
    return (
      <SettingScreen />
    )
  }

  render () {
    const { numberPage } = this.state
    return (
      <div className='dashboard-container'>
        <div className='dashboard-container-wrapper'>
          <div className='sider-container'>
            <Media query='(max-width: 567px)' render={() => (
              <Menu
                defaultSelectedKeys={['1']}
                theme='dark'
                inlineCollapsed={this.state.collapsed}
                selectedKeys={numberPage.toString()}
              >
                <Menu.Item key='1' onClick={this.handleChoosePage} ><PieChartOutlined width={40} height={40} /></Menu.Item>
                <Menu.Item key='2' onClick={this.handleChoosePage} ><DesktopOutlined /></Menu.Item>
                <Menu.Item key='3' onClick={this.handleChoosePage} ><ContainerOutlined /></Menu.Item>
                <Menu.Item key='4' onClick={this.handleChoosePage} ><MailOutlined /></Menu.Item>
                <Menu.Item key='5' onClick={this.handleChoosePage} ><SettingOutlined /></Menu.Item>
                <Menu.Item key='6' onClick={this.handleSignOut} ><WalletOutlined /></Menu.Item>
              </Menu>
            )} />
            <Media query='(min-width: 568px)' render={() =>
              <Menu
                defaultSelectedKeys={['1']}
                mode='inline'
                theme='dark'
                inlineCollapsed={this.state.collapsed}
                selectedKeys={numberPage.toString()}
              >
                <Menu.Item key='1' onClick={this.handleChoosePage} ><PieChartOutlined />Thống Kê</Menu.Item>
                <Menu.Item key='2' onClick={this.handleChoosePage} ><DesktopOutlined />Ghi Chú</Menu.Item>
                <Menu.Item key='3' onClick={this.handleChoosePage} ><ContainerOutlined />Quản lý</Menu.Item>
                <Menu.Item key='4' onClick={this.handleChoosePage} ><MailOutlined />Ký gửi</Menu.Item>
                <Menu.Item key='5' onClick={this.handleChoosePage} ><SettingOutlined />Cài đặt</Menu.Item>
                <Menu.Item key='6' onClick={this.handleSignOut} ><WalletOutlined />Đăng xuất</Menu.Item>
              </Menu>
            } />
          </div>
          <div className='dashboard-content'>
            {this.detectRenderConent()}
          </div>
        </div>
        <MyModal ref={this.myModal} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData
})

export default withRouter(connect(mapStateToProps)(DashBoard))
