import React from 'react'
import { Router } from 'common/routes'
import ReduxServices from 'common/redux'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { images } from 'config/images'
import { isMobile } from 'react-device-detect'
import MyModal from 'pages/Components/MyModal'
import moment from 'moment'
import GapService from 'controller/Api/Services/Gap'
import { Form, Row, Col, Input, Button, Descriptions, Divider, DatePicker, Select } from 'antd'
import Lottie from 'react-lottie'

import './style.scss'
import { showNotification } from 'common/function'

class ConsignmentScreen extends React.PureComponent {
  static async getInitialProps ({ query }) {
    return { query }
  }
  constructor (props) {
    super(props)
    this.state = {
      dayBooking: [],
      formData: {
        customerName: '',
        phoneNumber: '',
        numberOfProduct: 1
      },
      timeBooking: [
        {
          timeName: '10:00',
          timeCode: '1000'
        },
        {
          timeName: '10:30',
          timeCode: '1030'
        },
        {
          timeName: '11:00',
          timeCode: '1100'
        },
        {
          timeName: '11:30',
          timeCode: '1130'
        },
        {
          timeName: '12:00',
          timeCode: '1200'
        },
        {
          timeName: '12:30',
          timeCode: '1230'
        },
        {
          timeName: '13:00',
          timeCode: '1300'
        },
        {
          timeName: '13:30',
          timeCode: '1330'
        },
        {
          timeName: '14:00',
          timeCode: '1400'
        },
        {
          timeName: '14:30',
          timeCode: '1430'
        },
        {
          timeName: '15:00',
          timeCode: '1500'
        },
        {
          timeName: '15:30',
          timeCode: '1530'
        },
        {
          timeName: '16:00',
          timeCode: '1600'
        },
        {
          timeName: '16:30',
          timeCode: '1630'
        },
        {
          timeName: '17:00',
          timeCode: '1700'
        },
        {
          timeName: '17:30',
          timeCode: '1730'
        },
        {
          timeName: '18:00',
          timeCode: '1800'
        },
        {
          timeName: '18:30',
          timeCode: '1830'
        }
      ],
      step: 0,
      isHideUserForm: true,
      isHideDayColumn: false,
      choosenDayCode: null,
      choosenTimeCode: null,
      bookingDataCode: []
    }
    this.myModal = React.createRef()
  }

  async componentDidMount () {
    let dayBookingCount = ['', '', '', '', '', '', '']
    let dayBookingTemp = []

    console.log('componentDidMount')

    console.log(moment(Date().now))

    dayBookingCount.map((item, index) => {
      dayBookingTemp.push({
        dayName: moment().add(index, 'day').format('dddd'),
        date: moment().add(index, 'day').format('DD-MM-YYYY'),
        dayCode: moment().add(index, 'day').format('DD-MM-YYYY').replaceAll('-', '')
      })
    })

    this.setState({
      dayBooking: dayBookingTemp
    }, async () => {
      await this.fetchAppointment()
    })
  }

  componentDidUpdate () {
  }

  componentWillUnmount () {
  }

  fetchAppointment = async () => {
    const { dayBooking } = this.state

    const arrayDate = []
    let bookingDataCode = ''
    dayBooking.map((itemDate, indexdate) => {
      arrayDate.push(`"${itemDate.date}"`)
    })

    const res = await GapService.getAppointmentWithDate(arrayDate)

    if (res && res.results) {
      res.results.map((itemData, indexItem) => {
        if (itemData && itemData.slot) {
          bookingDataCode += '-' + itemData.slot + '-'
        }
      })
    }

    console.log('res')
    console.log(res)
    console.log(bookingDataCode)

    this.setState({
      bookingDataCode: bookingDataCode
    })
  }

  translationDate = (key) => {
    switch (key) {
    case 'Sunday':
      return 'Chủ Nhật'
    case 'Monday':
      return 'Thứ hai'
    case 'Tuesday':
      return 'Thứ ba'
    case 'Wednesday':
      return 'Thứ tư'
    case 'Thursday':
      return 'Thứ năm'
    case 'Friday':
      return 'Thứ sáu'
    case 'Saturday':
      return 'Thứ bảy'
    default:
      return key
    }
  }

  onChooseDay = (choosenDay) => {
    console.log(choosenDay)
    this.setState({
      step: 1,
      isHideUserForm: true,
      choosenTimeCode: null,
      choosenDayCode: choosenDay ? choosenDay.dayCode : ''
    })
  }

  onChooseTime = (choosenTime) => {
    console.log(choosenTime)
    this.setState({
      step: 1,
      choosenTimeCode: choosenTime ? choosenTime.timeCode : ''
    })
  }

  onHandleOpenContent = () => {
  }

  onConsign = async () => {
    const { formData, choosenDayCode, choosenTimeCode, bookingDataCode } = this.state
    if (choosenTimeCode && choosenDayCode) {
      this.setState({
        isConsigning: true
      }, async () => {
        console.log('onConsign')
        const formatedTime = choosenTimeCode.substring(0, 2) + ':' + choosenTimeCode.substring(2, 4)
        const formatedDay = choosenDayCode.substring(0, 2) + '-' + choosenDayCode.substring(2, 4) + '-' + choosenDayCode.substring(4, 8)
        const slotID = choosenTimeCode + choosenDayCode
        const bookingDataCode = this.state.bookingDataCode + '-' + slotID + '-'

        const res = await GapService.setAppointment(formData, slotID, formatedTime, formatedDay)
        console.log('res')
        console.log(res)
        if (res && res.objectId) {
          this.setState({
            bookingDataCode: bookingDataCode,
            isHideUserForm: true,
            isConsigning: false
          }, () => {
            this.setState({
              step: 3,
              isHideDayColumn: true
            })
          })
        } else {
          this.setState({
            isConsigning: false
          }, () => this.fetchAppointment())
          showNotification('Đặt lịch thất bại!')
        }
      })
    }
  }

  // closeModal = () => {
  //   this.myModal.current.closeModal()
  // }

  onHandleStepTwo = () => {
    this.setState({
      isHideUserForm: false
    }, () => {
      setTimeout(() => {
        this.setState({
          step: 2
        })
      }, 500)
    })
  }

  backStepOne = () => {
    this.setState({
      isHideUserForm: true
    }, () => {
      this.fetchAppointment()
      setTimeout(() => {
        this.setState({
          step: 1
        })
      }, 500)
    })
  }

  resetAndBackProps = () => {
    this.setState({
      formData: {
        customerName: '',
        phoneNumber: '',
        numberOfProduct: 1
      },
      step: 0,
      isHideDayColumn: false,
      choosenDayCode: null,
      choosenTimeCode: null
    }, () => {
      this.fetchAppointment()
      this.props.backConsignment()
    })
  }

  convertCodeToTime = () => {
    const { choosenTimeCode, choosenDayCode } = this.state

    if (choosenTimeCode && choosenDayCode) {
      const formatedTime = choosenTimeCode.substring(0, 2) + ':' + choosenTimeCode.substring(2, 4)
      const formatedDay = choosenDayCode.substring(0, 2) + '-' + choosenDayCode.substring(2, 4) + '-' + choosenDayCode.substring(4, 8)
      return formatedDay + ' ' + formatedTime
    }

    return '---'
  }

  render () {
    const {
      step, dayBooking, choosenDayCode, timeBooking, bookingDataCode,
      choosenTimeCode, formData, isHideUserForm, isConsigning, isHideDayColumn
    } = this.state
    const layout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 15 }
    }

    const defaultOptionsSuccess = {
      loop: false,
      autoplay: true,
      animationData: images.successJson
    }

    return (
      <div className='bookingform-home-container'>
        <div className='bookingform'>
          <div className={'dayBooking-box' + (!isHideDayColumn ? ' show' : '')}>

            {dayBooking.map((dayItem, dayIndex) => {
              return (
                <div
                  key={dayIndex}
                  className={'day-box'}
                  onClick={() => this.onChooseDay(dayItem)}
                  style={(choosenDayCode && choosenDayCode === dayItem.dayCode) ? { borderColor: 'black', opacity: 1 } : (choosenDayCode && choosenDayCode !== dayItem.dayCode) ? { opacity: 0.4 } : {}}
                >
                  <span className='text day-name'>{dayIndex === 0 ? 'Hôm nay' : this.translationDate(dayItem.dayName)}</span>
                  <span className='text day-txt'>{dayItem.date}</span>
                </div>
              )
            })}
          </div>

          <div className='timeBooking-box'>
            <div className={'timeBooking-grid' + (step === 1 && isHideUserForm ? ' show' : '')}>
              {timeBooking.map((itemTime, indexTime) => {
                const isReady = !bookingDataCode.includes(choosenTimeCode + choosenDayCode) && itemTime.timeCode === choosenTimeCode
                const isBusy = bookingDataCode.includes(itemTime.timeCode + choosenDayCode)
                // console.log(bookingDataCode)
                // console.log(itemTime.timeCode + choosenDayCode)
                // console.log(isReady)
                // console.log(isBusy)

                return (
                  <div style={isBusy ? { pointerEvents: 'none', cursor: 'none' } : {}} onClick={() => isBusy ? {} : this.onChooseTime(itemTime)} key={indexTime} className={'time-box' + (isReady ? ' ready' : isBusy ? ' busy' : '')}>
                    <span className='text'>{itemTime.timeName}</span>
                  </div>
                )
              })}
            </div>

            <div className={'timeBooking-footer' + (step === 1 && isHideUserForm ? ' show' : '')}>
              <span onClick={this.resetAndBackProps} className='text'>{`< Quay lại`}</span>
              <span onClick={this.onHandleStepTwo} className='text' style={choosenTimeCode ? { color: 'black' } : { opacity: 0.5, pointerEvents: 'none' }}>{`Tiếp tục >`}</span>
            </div>

            <Form
              className={'timeBooking-form' + (!isHideUserForm && step === 2 ? ' show' : '')}
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
                <Form.Item name='dayTime' label='Thời gian'>
                  <Col sm={24} md={22}>
                    <Input size='small' value={this.convertCodeToTime()} placeholder='...' />
                  </Col>
                </Form.Item>
                <Form.Item name='customerName' rules={[{ required: true, message: 'Vui lòng nhập tên quý khách' }]} label='Họ và Tên'>
                  <Col sm={24} md={22}>
                    <Input value={formData.customerName} size='small' allowClear id='customerName' key='customerName' onChange={this.changeData} placeholder='...' />
                  </Col>
                </Form.Item>

                <Form.Item name='phoneNumber' rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]} label='Số điện thoại'>
                  <Col sm={24} md={22}>
                    <Input value={formData.phoneNumber} size='small' type={'number'} id='phoneNumber' key='phoneNumber' onChange={this.changeData} allowClear placeholder='...' />
                  </Col>
                </Form.Item>

                <Form.Item name='numberOfProduct' rules={[{ required: true, message: 'Vui lòng nhập số lượng hàng' }]} label='Số lượng Hàng Hoá'>
                  <Col sm={24} md={6}>
                    <Input value={formData.numberOfProduct} size='small' defaultValue={1} type={'number'} id='numberOfProduct' key='numberOfProduct' onChange={this.changeData} allowClear placeholder='...' />
                  </Col>
                </Form.Item>

                <div className='flex justify-around align-center' style={{ width: '100%' }}>
                  <Button onClick={this.backStepOne} type='secondary'>Quay lại</Button>
                  <Button loading={isConsigning} type='secondary' htmlType='submit'>Xác nhận</Button>
                </div>
              </Row>
            </Form>

            <div className={'timeBooking-confirm' + (isHideUserForm && step === 3 ? ' show' : '')}>
              <Lottie
                options={defaultOptionsSuccess}
                delay={2000}
                height={150}
                width={150}
                isStopped={false}
                isPaused={false}
              />
              <Row justify='center'>
                <Col span={20}>
                  <Descriptions>
                    <Descriptions.Item span={24} label='Thời gian ký gửi'>{this.convertCodeToTime()}</Descriptions.Item>
                    <Descriptions.Item span={24} label='Tên Khách Hàng'>{formData.customerName}</Descriptions.Item>
                    <Descriptions.Item span={24} label='Số điện thoại'>{formData.phoneNumber}</Descriptions.Item>
                    <Descriptions.Item span={24} label='Số lượng hàng hoá'>{formData.numberOfProduct}</Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
              <Button className='MT20' onClick={this.resetAndBackProps} >Quay lại</Button>
            </div>
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

export default withRouter(connect(mapStateToProps)(ConsignmentScreen))
