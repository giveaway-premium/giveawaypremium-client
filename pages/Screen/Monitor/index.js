import React from 'react'
import { Router } from 'common/routes'
import ReduxServices from 'common/redux'
import { connect } from 'react-redux'
import { Form, Row, Col, Input, Button, Descriptions, Divider, DatePicker, Select, Checkbox } from 'antd'
import { withRouter } from 'next/router'
import { images } from 'config/images'
import { isMobile } from 'react-device-detect'
import MyModal from 'pages/Components/MyModal'
import { CheckCircleFilled, CloseOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import GapService from 'controller/Api/Services/Gap'
import { generateIdMix, numberWithCommas, showNotification } from 'common/function'
import * as Parse from 'parse'
import moment from 'moment'

import './style.scss'
const { TextArea } = Input
const { Option } = Select
const dateFormat = 'DD-MM-YYYY'

class Monitor extends React.PureComponent {
  static async getInitialProps ({ query }) {
    return { query }
  }
  constructor (props) {
    super(props)
    this.state = {
      isLoadingMonitor: false,
      monitorList: [],
      choosenMonitor: {},
      subscription: null,
      monitorData: {
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
    }
    this.formRef = React.createRef()
    this.myModal = React.createRef()
  }

  componentDidMount () {
    this.fetchAllMonitor()
  }

  componentDidUpdate () {
  }

  componentWillUnmount () {
    Router.events.off('routeChangeComplete', this.handleRouteChange)
  }

  onSetMonitor = (data) => {
    const { choosenMonitor, subscription } = this.state

    console.log(data)
    if (data && data.objectId) {
      const isChecked = choosenMonitor.objectId === data.objectId
      if (isChecked) {
        subscription && subscription.unsubscribe()

        this.setState({
          choosenMonitor: {},
          subscription: null
        })
      } else {
        subscription && subscription.unsubscribe()

        this.setState({
          choosenMonitor: data
        }, () => {
          this.onSubscribeMonitor()
        })
      }
      showNotification(`L???ng nghe th??nh c??ng`)
    } else {
      showNotification(`L???ng nghe th???t b???i`)
    }
  }

  onSubscribeMonitor = async () => {
    const { choosenMonitor, subscription } = this.state
    console.log('Parse initialize')
    if (subscription) {
      subscription.unsubscribe()
    }

    if (choosenMonitor && choosenMonitor.objectId) {
      Parse.initialize('EJKfA5jFxiC98aMbvir0vSAuDHO4NQ7x', 'npx9ZOI6fokHfvaJQjDjidPnogS8PCH0')
      // @ts-ignore
      Parse.serverURL = process.env.API_APP
      const query = new Parse.Query('Channel')

      query.equalTo('objectId', choosenMonitor.objectId).subscribe().then((subscriptionNew) => {
        console.log('------------')
        console.log(subscriptionNew)
        if (subscriptionNew) {
          subscriptionNew.on('open', () => {
            console.log('subscription opened')
          })

          subscriptionNew.on('update', (object) => {
            console.log('object updated', object)
            this.setState({
              monitorData: object.attributes.data || {}
            })
          })

          this.setState({
            subscription: subscriptionNew
          })
        }
      }).catch(err => console.error(err))
    } else {
      //
    }
  }

  fetchAllMonitor = async () => {
    const monitorList = []
    this.setState({
      isLoadingMonitor: true
    }, async () => {
      const res = await GapService.getChannel()
      if (res && res.results && res.results.length > 0) {
        res.results.map(itemChannel => {
          monitorList.push({
            objectId: itemChannel.objectId || itemChannel._objectId,
            name: itemChannel.name,
            data: itemChannel.data,
            channel: itemChannel.channel
          })
        })
        this.setState({
          monitorList: monitorList,
          isLoadingMonitor: false
        })
      } else {
        this.setState({
          isLoadingMonitor: false
        })
      }
    })
  }

  // closeModal = () => {
  //   this.myModal.current.closeModal()
  // }

  render () {
    const { isLoadingMonitor, monitorList, choosenMonitor, monitorData } = this.state
    const MonitorBox = ({ data }) => {
      const isChecked = choosenMonitor.objectId === data.objectId
      return (
        <div onClick={() => this.onSetMonitor(data)} className='monitorBox' style={isChecked ? { backgroundColor: '#d2e8c9' } : {}}>
          {data && data.name}
        </div>
      )
    }
    const layout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 15 }
    }

    const options = [
      { label: 'Chuy???n kho???n', value: 'true' },
      { label: 'Tr???c ti???p', value: 'false' }
    ]

    let indexProductActive = 0

    const RowInfo = ({ title, value }) => {
      return (
        <div className='rowInfo'>
          <span className='rowTitle'>{title || ''}</span>
          <span className='rowValue'>{value || ''}</span>
        </div>
      )
    }

    return (
      <div className='monitorPage-container'>
        {isLoadingMonitor ? <LoadingOutlined /> : !choosenMonitor.objectId ? (
          <div className='monitorConfigBox'>
            {
              monitorList.map((itemMonitor, itemMonitorIndex) => <MonitorBox data={itemMonitor} key={itemMonitorIndex} />)
            }
          </div>
        ) : null}
        {
          choosenMonitor && choosenMonitor.objectId && (
          <>
            <div className='monitorBodyContentBox'>
              <h2 className='text text-center text-color-0 txt-big-intro MT10'>Chi ti???t ????n k?? g???i</h2>
              <Form
                ref={this.formRef}
                {...layout}
                name='consignment'
                initialValues={monitorData.formData}
              >
                <Row className='flex sell-card-form PT20 PB25' justify='center'>
                  <div className='rowInfoBox'>
                    <RowInfo title={`S??? ??i???n Tho???i: `} value={monitorData.formData.phoneNumber} />
                    <RowInfo title={`T??n Kh??ch H??ng: `} value={monitorData.formData.consignerName} />
                  </div>

                  <div className='rowInfoBox'>
                    <RowInfo title={`CMND: `} value={monitorData.formData.consignerIdCard} />
                    <RowInfo title={`Email: `} value={monitorData.formData.mail} />
                  </div>

                  <div className='rowInfoBox'>
                    <RowInfo title={`Ng??n h??ng: `} value={monitorData.formData.bankName} />
                    <RowInfo title={`ID Ng??n h??ng: `} value={monitorData.formData.bankId} />
                  </div>

                  <div className='rowInfoBox'>
                    <RowInfo title={`Sinh nh???t: `} value={monitorData.formData.birthday} />
                    {/* <RowInfo title={`S??? ??i???n tho???i: `} value={monitorData.formData.phoneNumber} /> */}
                  </div>

                  {/* <Form.Item name='phoneNumber' rules={[{ required: true, message: 'Vui l??ng nh???p s??? ??i???n tho???i' }]} label='S??? ??i???n tho???i'>
                    <Col sm={24} md={24}>
                      <Input value={monitorData.formData.phoneNumber} minLength={10} maxLength={12} style={{ minWidth: 100 }} placeholder='...' suffix={monitorData.isFoundUser ? <CheckCircleFilled style={{ color: 'green ' }} /> : null} />
                    </Col>
                  </Form.Item> */}
                  {/* <Form.Item name='phoneNumber' rules={[{ required: true, message: 'Vui l??ng nh???p s??? ??i???n tho???i' }]} label='S??? ??i???n tho???i'>
                    <Col sm={24} md={24}>
                      <Input value={monitorData.formData.phoneNumber} minLength={10} maxLength={12} style={{ minWidth: 100 }} placeholder='...' suffix={monitorData.isFoundUser ? <CheckCircleFilled style={{ color: 'green ' }} /> : null} />
                    </Col>
                  </Form.Item>
                  <Form.Item name='consignerName' rules={[{ required: !monitorData.isFoundUser, message: 'Vui l??ng nh???p t??n kh??ch h??ng' }]} label='T??n Kh??ch H??ng'>
                    <Col sm={24} md={24}>
                      <Input value={monitorData.formData.consignerName} id='consignerName' key='consignerName' onChange={this.changeData} placeholder='...' />
                    </Col>
                  </Form.Item>
                  <Form.Item name='consignerIdCard' rules={[{ required: !monitorData.isFoundUser, message: 'Vui l??ng nh???p ch???ng minh th??' }]} label='CMND'>
                    <Col sm={24} md={24}>
                      <Input value={monitorData.formData.consignerIdCard} id='consignerIdCard' key='consignerIdCard' onChange={this.changeData} placeholder='...' />
                    </Col>
                  </Form.Item>
                  <Form.Item name='mail' rules={[{ type: 'email', message: 'Email kh??ng h???p l???' }]} label='Email'>
                    <Col sm={24} md={24}>
                      <Input value={monitorData.formData.mail} id='mail' key='mail' onChange={this.changeData} placeholder='...' />
                    </Col>
                  </Form.Item>
                  <Form.Item name='bankName' rules={[{ required: !monitorData.isFoundUser && monitorData.isTransferMoneyWithBank === 'true', message: 'Vui l??ng nh???p t??n ng??n h??ng' }]} label='Ng??n h??ng'>
                    <Col sm={24} md={24}>
                      <Input value={monitorData.formData.bankName} id='bankName' key='bankName' onChange={this.changeData} placeholder='...' />
                    </Col>
                  </Form.Item>
                  <Form.Item name='bankId' rules={[{ required: !monitorData.isFoundUser && monitorData.isTransferMoneyWithBank === 'true', message: 'Vui l??ng nh???p id ng??n h??ng' }]} label='ID Ng??n h??ng'>
                    <Col sm={24} md={24}>
                      <Input value={monitorData.formData.bankId} id='bankId' key='bankId' onChange={this.changeData} type={'number'} placeholder='...' />
                    </Col>
                  </Form.Item>
                  <Form.Item name='birthday' label='Sinh nh???t'>
                    <Col sm={24} md={24}>
                      <Input id='birthday' key='birthday' value={monitorData.formData.birthday} onChange={this.onChangeBirthday} placeholder={dateFormat} style={{ width: '100%' }} />
                    </Col>
                  </Form.Item> */}

                  <Divider />

                  <Row className='productListBox'>
                    {monitorData.productList.map((item, indexItem) => {
                      if (!item.isDeleted) {
                        indexProductActive += 1
                        return (
                          <div key={indexItem} className='product-box MB20'>
                            <div className='product-item-value'>
                              <div className='close-box MB5'>
                                <span>{indexProductActive}</span>
                              </div>
                              <Input style={{ marginRight: '10px' }} prefix={<span>{`T??n: `}</span>} value={item.name} type={'text'} id='nameProduct' key='nameProduct' onChange={(value) => this.changeDataProduct(value, indexItem)} placeholder='T??n s???n ph???m' />
                              <Input value={item.count} prefix={<span>{`S??? l?????ng: `}</span>} defaultValue={1} type={'number'} id='numberOfProducts' key='numberOfProducts' onChange={(value) => this.changeDataProduct(value, indexItem)} placeholder='S??? l?????ng' />
                            </div>

                            <div className='product-item-value'>
                              <Input style={{ marginRight: '10px' }} suffix={<span>{`vn??`}</span>} prefix={<span>{`Gi??: `}</span>} value={numberWithCommas(`${Number(item.price * 1000)}`)} type={'string'} placeholder='Gi?? ti???n' />
                              <Input suffix={<span>{`vn??`}</span>} prefix={<span>{`Ph??: `}</span>} value={numberWithCommas(`${Number((item.price - item.priceAfterFee) * 1000)}`)} type={'string'} placeholder='Gi?? ti???n' />
                            </div>

                            <div className='product-item-note'>
                              <TextArea placeholder='Ghi Ch??' value={'T??nh tr???ng: ' + item.note || 'T??nh tr???ng: ---'} type={'number'} id='note' key='note' onChange={(value) => this.changeDataProduct(value, indexItem)} />
                            </div>
                          </div>
                        )
                      } else {
                        return null
                      }
                    })}
                  </Row>

                  <Divider />

                  <div className='rowInfoBox'>
                    <RowInfo title={`T???ng ti???n th???c nh???n: `} value={`${numberWithCommas(Math.round(monitorData.moneyBackForFullSold))} vnd`} />
                    <RowInfo title={`M?? k?? g???i: `} value={monitorData.formData.consignmentId} />
                  </div>

                  <div className='rowInfoBox'>
                    <RowInfo title={`H??nh th???c nh???n ti???n: `} value={monitorData.isTransferMoneyWithBank === 'true' ? 'Chuy???n kho???n' : 'Tr???c ti???p'} />
                    <RowInfo title={`Ng??y tr??? ti???n: `} value={monitorData.formData.timeGetMoney} />
                  </div>

                  <div className='rowInfoBox'>
                    <RowInfo title={`S??? l?????ng H??ng Ho??: `} value={monitorData.formData.numberOfProducts} />
                    <RowInfo title={`T??n Nh??n Vi??n: `} value={monitorData.formData.consigneeName} />
                  </div>

                  {/* <Form.Item label='T???ng ti???n th???c nh???n'>
                    <Col sm={24} md={12}>
                      <Input suffix='vn??' id='moneyBackForFullSold' key='moneyBackForFullSold' value={numberWithCommas(Math.round(monitorData.moneyBackForFullSold))} placeholder={'...000 vnd'} />
                    </Col>
                  </Form.Item> */}

                  {/* <Form.Item label='T???ng ti???n tr?????c thu ph??'>
                    <Col sm={24} md={12}>
                      <Input suffix='vn??' id='totalMoney' key='totalMoney' value={numberWithCommas(Math.round(monitorData.totalMoney))} placeholder={'...000 vnd'} />
                    </Col>
                  </Form.Item> */}

                  {/* <Form.Item name='consignmentId' rules={[{ required: true, message: 'Vui l??ng nh???p m?? k?? g???i' }]} label='M?? k?? g???i'>
                    <Col sm={24} md={12}>
                      <Input value={monitorData.formData.consignmentId} id='consignmentId' key='consignmentId' placeholder='...' />
                    </Col>
                  </Form.Item>
                  <Form.Item name='numberOfProducts' label='S??? l?????ng H??ng Ho??'>
                    <Col sm={24} md={12}>
                      <Input defaultValue={1} value={monitorData.formData.numberOfProducts} type={'number'} id='numberOfProducts' key='numberOfProducts' placeholder='...' />
                    </Col>
                  </Form.Item>

                  <Form.Item label='H??nh th???c nh???n ti???n'>
                    <Col sm={24} md={24}>
                      <Checkbox.Group options={options} value={monitorData.isTransferMoneyWithBank} defaultValue={['false']} />
                    </Col>
                  </Form.Item>

                  <Form.Item label='Ng??y tr??? ti???n'>
                    <Input.Group compact>
                      <Input style={{ width: '50%' }} value={monitorData.formData.timeGetMoney} defaultValue={moment().format('DD-MM-YYYY')} />
                    </Input.Group>
                  </Form.Item>

                  <Form.Item name='consigneeName' label='T??n Nh??n Vi??n'>
                    <Col sm={24} md={12}>
                      <Input defaultValue={monitorData.formData.consigneeName} id='consigneeName' key='consigneeName' value={monitorData.formData.consigneeName} />
                    </Col>
                  </Form.Item> */}
                </Row>
              </Form>
            </div>
          </>
          )
        }
        <MyModal ref={this.myModal} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale
})

export default withRouter(connect(mapStateToProps)(Monitor))
