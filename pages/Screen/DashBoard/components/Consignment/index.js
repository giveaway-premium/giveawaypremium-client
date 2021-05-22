import React from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Form, Row, Col, Input, Button, Descriptions, Divider, DatePicker, Select } from 'antd'
import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'
import { showNotification } from 'common/function'
import { LoadingOutlined, CheckCircleFilled } from '@ant-design/icons'
import { Router } from 'common/routes'
import { isMobile } from 'react-device-detect'
import './style.scss'
import Lottie from 'react-lottie'
import GapService from 'controller/Api/Services/Gap'
import moment from 'moment'

const { Option } = Select

const dateFormat = 'DD-MM-YYYY'
class Consignment extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      allInfoTag: [],
      formData: {
        consigneeName: this.props.userData.name || '',
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
      isLoadingTags: false,
      objectIdFoundUser: '',
      birthday: moment(),
      isConsigning: false,
      isShowConfirmForm: false,
      isFoundUser: false,
      isLoadingUser: false
    }
    this.formRef = React.createRef()
    this.myModal = React.createRef()
  }

  componentDidMount () {
    this.fetchAllTags()
  }

  componentDidUpdate () {

  }

  fetchAllTags = async () => {
    this.setState({
      isLoadingTags: true
    }, async () => {
      const res = await GapService.getConsignmentID()
      if (res && res.results && res.results.length > 0) {
        this.setState({
          allInfoTag: res.results,
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
    const { isFoundUser, objectIdFoundUser, formData, timeGroupId } = this.state

    console.log(userData)
    this.setState({
      isConsigning: true
    }, async () => {
      console.log('onConsign')
      console.log(formData)
      console.log(this.state)
      if (isFoundUser && objectIdFoundUser) { // for already user
        console.log('for already user')
        const result = await GapService.setConsignment(formData, userData.objectId, objectIdFoundUser, timeGroupId)
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

            GapService.updateCustomer(customerFormData, objectIdFoundUser)
          })
        } else {
          showNotification('Tạo Đơn Ký gửi thất bại')
        }
      } else { // for new user
        console.log('for new user')

        const customerFormData = {
          consignerName: formData.consignerName,
          phoneNumber: formData.phoneNumber,
          consignerIdCard: formData.consignerIdCard,
          mail: formData.mail,
          email: formData.mail || 'nothing@giveaway.com',
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
          const result = await GapService.setConsignment(formData, userData.objectId, resCus.objectId, timeGroupId)
          console.log(result)

          if (result && result.objectId) {
            this.setState({
              isShowConfirmForm: true,
              isConsigning: false
            })
          }
        } else {
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
          birthday: moment(),
          bankName: '',
          bankId: '',
          consignmentId: ''
        },
        objectIdFoundUser: '',
        birthday: moment(),
        isShowConfirmForm: false,
        isFoundUser: false
      })
      // this.setState({
      //   allInfoTag: [],
      //   formData: {
      //     consigneeName: this.props.userData.name || '',
      //     consignerName: '',
      //     phoneNumber: phoneKey.target.value,
      //     consignerIdCard: '',
      //     mail: '',
      //     birthday: moment(),
      //     bankName: '',
      //     bankId: '',
      //     numberOfProducts: 1,
      //     consignmentId: '',
      //     timeGetMoney: moment().format('MM-YYYY'),
      //     numberOfConsignmentTime: 0,
      //     numberOfConsignment: 0
      //   },
      //   isLoadingTags: false,
      //   objectIdFoundUser: '',
      //   birthday: moment(),
      //   isConsigning: false,
      //   isShowConfirmForm: false,
      //   isFoundUser: false,
      //   isLoadingUser: false
      // })
    } else {
      console.log('fetchUserByPhoneNumber dont run 2')
      this.setState({
        formData: {
          ...this.state.formData,
          consignerName: '',
          phoneNumber: phoneKey.target.value,
          consignerIdCard: '',
          mail: '',
          birthday: moment(),
          bankName: '',
          bankId: '',
          consignmentId: ''
        },
        objectIdFoundUser: '',
        birthday: moment(),
        isShowConfirmForm: false,
        isFoundUser: false
      })
      // this.onRefeshAll()
    }
  }

  onRefeshAll = () => {
    this.setState({
      allInfoTag: [],
      formData: {
        consigneeName: this.props.userData.name || '',
        consignerName: '',
        phoneNumber: '',
        consignerIdCard: '',
        mail: '',
        birthday: moment(),
        bankName: '',
        bankId: '',
        numberOfProducts: 1,
        consignmentId: '',
        timeGetMoney: moment().format('MM-YYYY'),
        numberOfConsignmentTime: 0,
        numberOfConsignment: 0
      },
      isLoadingTags: false,
      objectIdFoundUser: '',
      birthday: moment(),
      isConsigning: false,
      isShowConfirmForm: false,
      isFoundUser: false,
      isLoadingUser: false
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
          timeGetMoney: findTag[0].timeGetMoney
        },
        timeGroupId: findTag[0].code
      }, () => {
        console.log(this.state)
      })
    }
  }

  render () {
    const { userData } = this.props
    const {
      formData, isConsigning, isShowConfirmForm,
      birthday, isLoadingUser, isFoundUser, isLoadingTags, allInfoTag
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
      animationData: images.successJson
    }

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
                    <Descriptions.Item span={24} label='Mã Ký gửi'>{formData.consignmentId}</Descriptions.Item>
                    <Descriptions.Item span={24} label='Số lượng Hàng Hoá'>{formData.numberOfProducts}</Descriptions.Item>
                    <Descriptions.Item span={24} label='Ngày trả tiền'>{formData.timeGetMoney}</Descriptions.Item>
                    <Descriptions.Item span={24} label='Tên Khách Hàng'>{formData.consignerName}</Descriptions.Item>
                    <Descriptions.Item span={24} label='Tên Nhân Viên'>{formData.consigneeName}</Descriptions.Item>
                    <Descriptions.Item span={24} label='Số điện thoại'>{formData.phoneNumber}</Descriptions.Item>
                    <Descriptions.Item span={24} label='Email'>{formData.mail}</Descriptions.Item>
                    <Descriptions.Item span={24} label='Ngân hàng'>{formData.bankName}</Descriptions.Item>
                    <Descriptions.Item span={24} label='ID Ngân hàng'>{formData.bankId}</Descriptions.Item>
                    <Descriptions.Item span={24} label='Chứng minh thư'>{formData.consignerIdCard}</Descriptions.Item>
                    <Descriptions.Item span={24} label='Sinh nhật'>{moment(formData.birthday).format('DD-MM-YYYY')}</Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
              <Button className='MT20' onClick={this.onRefeshAll} >Quay lại</Button>
            </>
            : <>
              {/* <Lottie
                options={defaultOptions}
                height={100}
                width={100}
                isStopped={false}
                isPaused={false}
              /> */}
              <Form
                ref={this.formRef}
                {...layout}
                name='consignment'
                initialValues={formData}
                // onFinish={this.onFinish}
                onFinish={this.onConsign}
                onValuesChange={(changedValues, allValues) => {
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
                  <Form.Item name='phoneNumber' rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]} label='Số điện thoại'>
                    <Col sm={24} md={12}>
                      {/* <Search placeholder="input search loading default" loading /> */}
                      <Input value={formData.phoneNumber} maxLength={12} allowClear onChange={this.fetchUserByPhoneNumber} style={{ minWidth: 100 }} placeholder='...' suffix={isLoadingUser ? <LoadingOutlined /> : isFoundUser ? <CheckCircleFilled /> : null} />
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
                  <Form.Item name='mail' rules={[{ required: !isFoundUser, type: 'email', message: 'Email không hợp lệ' }]} label='Email'>
                    <Col sm={24} md={24}>
                      <Input disabled={!formData.phoneNumber || formData.phoneNumber.length < 10} value={formData.mail} id='mail' key='mail' onChange={this.changeData} allowClear placeholder='...' />
                    </Col>
                  </Form.Item>
                  <Form.Item name='bankName' rules={[{ required: !isFoundUser, message: 'Vui lòng nhập tên ngân hàng' }]} label='Ngân hàng'>
                    <Col sm={24} md={24}>
                      <Input disabled={!formData.phoneNumber || formData.phoneNumber.length < 10} value={formData.bankName} id='bankName' key='bankName' onChange={this.changeData} allowClear placeholder='...' />
                    </Col>
                  </Form.Item>
                  <Form.Item name='bankId' rules={[{ required: !isFoundUser, message: 'Vui lòng nhập id ngân hàng' }]} label='ID Ngân hàng'>
                    <Col sm={24} md={12}>
                      <Input disabled={!formData.phoneNumber || formData.phoneNumber.length < 10} value={formData.bankId} id='bankId' key='bankId' onChange={this.changeData} type={'number'} allowClear placeholder='...' />
                    </Col>
                  </Form.Item>
                  <Form.Item name='birthday' label='Sinh nhật'>
                    <Col sm={24} md={12}>
                      <DatePicker disabled={!formData.phoneNumber || formData.phoneNumber.length < 10} id='birthday' key='birthday' defaultValue={moment()} value={moment(formData.birthday, dateFormat)} onChange={this.onChangeBirthday} format={dateFormat} placeholder={dateFormat} style={{ width: '100%' }} />
                    </Col>
                  </Form.Item>

                  <Divider />

                  <Form.Item name='consignmentId' rules={[{ required: true, message: 'Vui lòng nhập mã ký gửi' }]} label='Mã ký gửi'>
                    <Col sm={24} md={12}>
                      <Input allowClear id='consignmentId' key='consignmentId' onChange={this.changeData} placeholder='...' />
                    </Col>
                  </Form.Item>
                  <Form.Item name='numberOfProducts' rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]} label='Số lượng Hàng Hoá'>
                    <Col sm={24} md={12}>
                      <Input defaultValue={1} type={'number'} id='numberOfProducts' key='numberOfProducts' onChange={this.changeData} allowClear placeholder='...' />
                    </Col>
                  </Form.Item>

                  <Form.Item label='Ngày trả tiền'>
                    <Input.Group compact>
                      <Select onChange={this.onChangeTimeGetMoney} defaultValue={allInfoTag && allInfoTag[0] && allInfoTag[0].name} size='large' loading={isLoadingTags} id='timeGetMoney' key='timeGetMoney' placeholder='...'>
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
                    <Input defaultValue={userData.name} id='consigneeName' key='consigneeName' value={userData.name} disabled placeholder={userData.name} />
                  </Form.Item>

                  <Form.Item className='button-confirm-box MT20 MB40'>
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
  userData: state.userData
})

export default withRouter(connect(mapStateToProps, null)(Consignment))
