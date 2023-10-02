import React from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Form, Row, Col, Layout, Input, Button, Spin, Descriptions, Tabs } from 'antd'
import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'
import { showNotification } from 'common/function'
import { LoadingOutlined } from '@ant-design/icons'
import { Router } from 'common/routes'
import { isMobile } from 'react-device-detect'
import './style.scss'
import Lottie from 'react-lottie'
import GapService from 'controller/Api/Services/Gap'
import TableConsignemntScreen from './components/TableConsignemntScreen'
import TableCustomer from './components/TableCustomer'
import TableAppointment from './components/TableAppointment'
import TableProductScreen from './components/TableProduct'
import TableOrder from './components/TableOrder'
import TableRequestOrder from './components/TableRequestOrder'
const { TabPane } = Tabs

class ManageScreen extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      tabKey: '1'
    }
    this.formRef = React.createRef()
    this.myModal = React.createRef()
  }

  componentDidMount () {

  }

  componentDidUpdate () {

  }

  onChangeTab = (tabKey) => {
    this.setState({
      tabKey: tabKey
    })
  }

  detectRenderTabContent = () => {
    const { tabKey } = this.state
    switch (tabKey) {
    case '1':
      return <TableConsignemntScreen />
    case '2':
      return <div>123</div>
    case '3':
      return <div>123</div>
    case '4':
      return <div>123</div>
    }
  }

  render () {
    const { userData } = this.props

    return (
      <div className='managescreen-container'>
        <Tabs defaultActiveKey='1' onChange={this.onChangeTab} >
          <TabPane tab='Ký gửi' key='1'>
            <TableConsignemntScreen />
          </TabPane>
          <TabPane tab='Sản phẩm' key='2'>
            <TableProductScreen />
          </TabPane>
          <TabPane tab='Chiến dịch' key='3' />
          <TabPane tab='Đơn hàng' key='4'>
            <TableOrder />
          </TabPane>

          <TabPane tab='Khách hàng' key='5'>
            <TableCustomer />
            {/* Content of Tab Pane 2 */}
          </TabPane>
          <TabPane tab='Lịch hẹn' key='6'>
            <TableAppointment />
            {/* Content of Tab Pane 3 */}
          </TabPane>

          <TabPane tab='Hàng Chờ' key='7'>
            <TableRequestOrder />
            {/* Content of Tab Pane 3 */}
          </TabPane>

        </Tabs>
        {/* {this.detectRenderTabContent()} */}
        <MyModal ref={this.myModal} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData
})

export default withRouter(connect(mapStateToProps, null)(ManageScreen))
