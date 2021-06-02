import React from 'react'
import { Router } from 'common/routes'
import ReduxServices from 'common/redux'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { images } from 'config/images'
import { isMobile } from 'react-device-detect'
import MyModal from 'pages/Components/MyModal'
import { Form, Row, Col, Layout, Input, Button, Spin, Descriptions, Tabs, Table, Radio, Popconfirm, List } from 'antd'
import GapService from 'controller/Api/Services/Gap'

import './style.scss'
import { numberWithCommas } from 'common/function'
import { isEmpty } from 'lodash'

class SearchForm extends React.PureComponent {
  static async getInitialProps ({ query }) {
    return { query }
  }
  constructor (props) {
    super(props)
    this.columns = [
      {
        title: 'Tên khách hàng',
        width: 12,
        dataIndex: 'consignerName',
        key: 'consignerName'
      },
      {
        title: 'Mã ký gửi',
        dataIndex: 'consignmentId',
        key: 'consignmentId',
        width: 10
      },
      {
        title: 'SL ký gửi',
        dataIndex: 'numberOfProducts',
        key: '3',
        width: 5
      },
      {
        title: 'Đã bán',
        dataIndex: 'numSoldConsignment',
        key: '4',
        width: 5
      },
      {
        title: 'Còn lại',
        dataIndex: 'remainNumConsignment',
        key: '5',
        width: 5
      },
      {
        title: 'Số tiền trả khách',
        dataIndex: 'moneyBack',
        key: '6',
        width: 10,
        render: (value) => <span>{value ? numberWithCommas(value) : '0'} đ</span>
      },
      {
        title: 'Thời gian trả tiền',
        dataIndex: 'timeGetMoney',
        key: '7',
        width: 10
      },
      {
        title: 'Chuyển tiền',
        key: '8',
        fixed: 'right',
        width: 6,
        render: (value) =>
          this.state.consignmentData.length >= 1 ? (
            <Radio.Button className={value.isGetMoney ? 'radio-true-isGetMoney' : 'radio-false-isGetMoney'} value={value.isGetMoney}>{value.isGetMoney ? 'Rồi' : 'Chưa'}</Radio.Button>
          ) : null
      }
    ]
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
    }

    this.myModal = React.createRef()
  }

  componentDidMount () {
  }
  componentDidUpdate () {
  }

  componentWillUnmount () {
  }

  fetchTableData = async (page = 1, keyword) => {
    const { formData } = this.state
    this.setState({
      isLoadingData: true
    }, async () => {
      let res

      res = await GapService.getConsignment(page, formData.phoneNumber)

      console.log('res')
      console.log(res)
      let consignmentData = []
      if (res && res.results) {
        res.results.map((item, indexItem) => {
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
          })
        })
        this.setState({
          total: res.count,
          consignmentData: consignmentData,
          isLoadingData: false
        })
      } else {
        this.setState({
          isLoadingData: false
        })
      }
    })
  }

  onConsign = async () => {
    const { page, formData } = this.state
    if (window) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    this.setState({
      isSearching: true
    }, async () => {
      const res = await GapService.getConsignment(page, formData.phoneNumber, 20)
      console.log('res: ', res)

      if (res && res.results) {
        this.setState({
          total: res.results.length,
          consignmentData: res.results,
          isHideUserForm: true,
          isSearching: false
        }, () => {
          setTimeout(() => {
            this.setState({
              step: 1
            })
          }, 1000)
        })
      } else {
        this.setState({
          isSearching: false
        })
      }
    })
  }

  paginationChange = (page) => {
    console.log(page)
    this.fetchTableData(page)
  }

  backPropStepOne = () => {
    this.setState({
      isHideUserForm: false
    }, () => {
      setTimeout(() => {
        this.setState({
          step: 0
        })
      }, 1000)
    })
  }

  backProp = () => {
    this.setState({
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
    })
    this.props.backConsignment()
  }

  renderDrawItem (item, index) {
    const { locale } = this.props
    const { messages, lang } = locale
    console.log('item')
    console.log(item)

    return (
      <List.Item key={index}>
        <div className='note-box' style={item.isGetMoney ? { border: '1px solid #09e486', background: '#d2e8c9' } : {}}>
          <Descriptions>
            <Descriptions.Item span={24} label='Tên Khách Hàng'>{item.consignerName}</Descriptions.Item>
            <Descriptions.Item span={24} label='Số điện thoại'>{item.phoneNumber}</Descriptions.Item>
            <Descriptions.Item span={24} label='Số lượng hàng hoá'>{item.numberOfProducts}</Descriptions.Item>
            <Descriptions.Item span={24} label='Số lượng đã bán'>{item.numSoldConsignment}</Descriptions.Item>
            <Descriptions.Item span={24} label='Số lượng còn lại'>{item.remainNumConsignment}</Descriptions.Item>
            <Descriptions.Item span={24} label='Ngân hàng đăng ký'>{item.banks[0].type}</Descriptions.Item>
            <Descriptions.Item span={24} label='Số lượng còn lại'>{item.banks[0].accNumber}</Descriptions.Item>
            <Descriptions.Item span={24} label='Tổng tiền'>{item.moneyBack}</Descriptions.Item>

            {
              item.remainNumConsignment > 0
                ? <>
                  <Descriptions.Item span={24} label='Đã nhận tiền'>{item.isGetMoney ? 'Rồi' : 'Chưa'}</Descriptions.Item>
                  <Descriptions.Item span={24} label='Thời gian nhận tiền'>{item.timeGetMoney}</Descriptions.Item>
                </>
                : <>
                  <Descriptions.Item span={24} label='Đã chuyển tiền'>{item.isGetMoney ? 'Rồi' : 'Chưa'}</Descriptions.Item>
              </>
            }

          </Descriptions>
        </div>
      </List.Item>
    )
  }

  // closeModal = () => {
  //   this.myModal.current.closeModal()
  // }

  render () {
    const { isHideUserForm, formData, step, isSearching, consignmentData, isLoadingData, total } = this.state
    const layout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 15 }
    }

    return (
      <div className='searchform-home-container'>
        <div className='searching-form'>

          <Form
            className={'searching-box' + (!isHideUserForm && step === 0 ? ' show' : '')}
            ref={this.formRef}
            {...layout}
            name='consignment'
            initialValues={formData}
            // onFinish={this.onFinish}
            onFinish={this.onConsign}
            onValuesChange={(changedValues, allValues) => {
              this.setState({
                formData: {
                  ...formData,
                  ...changedValues
                }
              }, () => console.log(this.state))
            }}
          >
            <Row className='flex sell-card-form' justify='center'>
              <h1 className={'text text-searching-title'}>Tìm thông tin ký gửi qua số điện thoại</h1>

              <Form.Item name='phoneNumber' rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]} label='Số điện thoại'>
                <Col sm={24} md={22}>
                  <Input size='small' type={'number'} id='phoneNumber' key='phoneNumber' onChange={this.changeData} allowClear placeholder='...' />
                </Col>
              </Form.Item>

              <div className='flex justify-around align-center' style={{ width: '100%' }}>
                <Button onClick={this.backProp} type='secondary'>Quay lại</Button>
                <Button loading={isSearching} type='secondary' htmlType='submit'>Tìm kiếm</Button>
              </div>
            </Row>
          </Form>

          <div className={'searching-table' + (isHideUserForm && step === 1 ? ' show' : '')}>
            <Row id='gacha-machine-list' className='flex MT10 MB30' style={{ height: '90vh', padding: '20px 5px' }}>
              <Col span={24}>
                <List
                  grid={{
                    gutter: 10,
                    xs: 1,
                    sm: 1,
                    lg: 3,
                    md: 3
                  }}
                  dataSource={consignmentData}
                  renderItem={(item, index) => this.renderDrawItem(item, index)}
                />
              </Col>
                <div className='flex justify-around align-center back-button' style={isHideUserForm && step === 1 ? { width: '100%' } : { display: 'none' }}>
                  <Button onClick={this.backProp} type='secondary'>Quay lại</Button>
                </div>
            </Row>
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

export default withRouter(connect(mapStateToProps)(SearchForm))
