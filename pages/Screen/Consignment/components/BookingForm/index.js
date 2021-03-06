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
import successJson from 'static/Assets/Image/Lottie/success.json'
import rightArrowJson from 'static/Assets/Image/Lottie/rightArrow.json'

import './style.scss'
import { showNotification } from 'common/function'
import { BOOKING_OPTION_EACH_DAY_DATA_DEFAULT, TIME_BOOKING } from 'common/constants'

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
      timeBooking: [],
      // timeBooking: [
      //   {
      //     timeName: '10:00',
      //     timeCode: '1000'
      //   },
      //   {
      //     timeName: '11:00',
      //     timeCode: '1100'
      //   },
      //   {
      //     timeName: '13:30',
      //     timeCode: '1330'
      //   },
      //   {
      //     timeName: '14:30',
      //     timeCode: '1430'
      //   },
      //   {
      //     timeName: '15:30',
      //     timeCode: '1530'
      //   },
      //   {
      //     timeName: '16:30',
      //     timeCode: '1630'
      //   },
      //   {
      //     timeName: '17:30',
      //     timeCode: '1730'
      //   },
      //   {
      //     timeName: '18:30',
      //     timeCode: '1830'
      //   }
      // ],
      step: 0,
      isHideUserForm: true,
      isHideDayColumn: false,
      choosenDayCode: null,
      choosenTimeCode: null,
      bookingDataCode: [],
      isErrorMax: false,
      isShowEightSlot: true,
      bookingOptionValue: 8,
      bookingOptionEachDay: {}
    }
    this.myModal = React.createRef()
  }

  async componentDidMount () {
    const newSettingRedux = await ReduxServices.getSetting()
    const { settingRedux } = this.props
    let dayBookingCount = ['', '', '', '', '', '', '', '', '', '', '', '', '', '']
    let dayBookingTemp = []
    let bookingOptionEachDay = newSettingRedux.BOOKING_OPTION_EACH_DAY || BOOKING_OPTION_EACH_DAY_DATA_DEFAULT

    dayBookingCount.map((item, index) => {
      dayBookingTemp.push({
        dayName: moment().add(index, 'day').format('dddd'),
        date: moment().add(index, 'day').format('DD-MM-YYYY'),
        dayCode: moment().add(index, 'day').format('DD-MM-YYYY').replaceAll('-', '')
      })
    })

    const choosenDayCode = dayBookingTemp && dayBookingTemp[0] ? dayBookingTemp[0].dayCode : ''
    const { option, timeBooking } = this.checkDayCodeToBookingOption(dayBookingTemp[0], bookingOptionEachDay)

    this.setState({
      bookingOptionValue: option,
      timeBooking: timeBooking,
      bookingOptionEachDay: bookingOptionEachDay,
      dayBooking: dayBookingTemp
    }, async () => {
      await this.fetchAppointment()
    })
  }

  componentDidUpdate () {
  }

  componentWillUnmount () {
  }

  checkDayCodeToBookingOption = (choosenDayCode, bookingOptionData = BOOKING_OPTION_EACH_DAY_DATA_DEFAULT) => {
    if (choosenDayCode && choosenDayCode.dayCode && bookingOptionData) {
      if (bookingOptionData.OPTION_1 && bookingOptionData.OPTION_1.includes(choosenDayCode.dayCode)) return { option: 1, timeBooking: TIME_BOOKING.OPTION_1 }
      else if (bookingOptionData.OPTION_2 && bookingOptionData.OPTION_2.includes(choosenDayCode.dayCode)) return { option: 2, timeBooking: TIME_BOOKING.OPTION_2 }
      else if (bookingOptionData.OPTION_3 && bookingOptionData.OPTION_3.includes(choosenDayCode.dayCode)) return { option: 3, timeBooking: TIME_BOOKING.OPTION_3 }
      else if (bookingOptionData.OPTION_4 && bookingOptionData.OPTION_4.includes(choosenDayCode.dayCode)) return { option: 4, timeBooking: TIME_BOOKING.OPTION_4 }
      else if (bookingOptionData.OPTION_5 && bookingOptionData.OPTION_5.includes(choosenDayCode.dayCode)) return { option: 5, timeBooking: TIME_BOOKING.OPTION_5 }
      else if (bookingOptionData.OPTION_6 && bookingOptionData.OPTION_6.includes(choosenDayCode.dayCode)) return { option: 6, timeBooking: TIME_BOOKING.OPTION_6 }
      else if (bookingOptionData.OPTION_7 && bookingOptionData.OPTION_7.includes(choosenDayCode.dayCode)) return { option: 7, timeBooking: TIME_BOOKING.OPTION_7 }
      else if (bookingOptionData.OPTION_8 && bookingOptionData.OPTION_8.includes(choosenDayCode.dayCode)) return { option: 8, timeBooking: TIME_BOOKING.OPTION_8 }
      else return { option: 8, timeBooking: TIME_BOOKING.OPTION_8 }
    } else {
      return { option: 8, timeBooking: TIME_BOOKING.OPTION_8 }
    }
  }

  fetchAppointment = async () => {
    const { dayBooking } = this.state

    const arrayDate = []
    let bookingDataCode = ''
    dayBooking.map((itemDate, indexdate) => {
      arrayDate.push(`"${itemDate.date}"`)
    })

    ReduxServices.getSetting()
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
      return 'Ch??? Nh???t'
    case 'Monday':
      return 'Th??? hai'
    case 'Tuesday':
      return 'Th??? ba'
    case 'Wednesday':
      return 'Th??? t??'
    case 'Thursday':
      return 'Th??? n??m'
    case 'Friday':
      return 'Th??? s??u'
    case 'Saturday':
      return 'Th??? b???y'
    default:
      return key
    }
  }

  onChooseDay = (choosenDay) => {
    console.log(choosenDay)
    const { bookingOptionEachDay } = this.state

    const { option, timeBooking } = this.checkDayCodeToBookingOption(choosenDay, bookingOptionEachDay)

    this.setState({
      bookingOptionValue: option,
      timeBooking: timeBooking,
      step: 1,
      isHideUserForm: true,
      choosenTimeCode: null,
      choosenDayCode: choosenDay ? choosenDay.dayCode : ''
    })
  }

  onChooseTime = (choosenTime) => {
    // console.log('choosenTime')
    // console.log(choosenTime)

    this.setState({
      step: 1,
      choosenTimeCode: choosenTime ? choosenTime.timeCode : ''
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
          showNotification('?????t l???ch th???t b???i!')
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
      }, 200)
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
      }, 200)
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

  changeData = (e) => {
    console.log('value')
    console.log(e.target.value)
    console.log(e.target.name)

    if (e.target.value > 50 && e.target.name === 'numberOfProduct') {
      this.setState({
        isErrorMax: true
      })
    } else if (e.target.value <= 50 && e.target.name === 'numberOfProduct') {
      this.setState({
        isErrorMax: false
      })
    }
  }

  render () {
    const {
      step, dayBooking, choosenDayCode, timeBooking, bookingDataCode, isErrorMax,
      choosenTimeCode, formData, isHideUserForm, isConsigning, isHideDayColumn, bookingOptionValue
    } = this.state
    let isShowBookingForm = ReduxServices.getSettingWithKey('IS_SHOW_BOOKING_FORM', 'true')
    console.log('isShowBookingForm')
    console.log(isShowBookingForm)

    const layout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 15 }
    }

    const defaultOptionsSuccess = {
      loop: false,
      autoplay: true,
      animationData: successJson
    }

    const defaultOptionsRightArrow = {
      loop: true,
      autoplay: true,
      animationData: rightArrowJson
    }

    return (
      <div className='bookingform-home-container'>
        {
          !isShowBookingForm ? (
            <div style={{ display: 'flex', flexDirection: 'column', width: '60%', marginTop: '40px' }}>
              <p className='text day-txt'>
              Hi???n t???i t??nh n??ng ?????t l???ch k?? g???i tr??n website ??ang t???m kho??.
              </p>
              <p className='text day-txt'>
              Qu?? kh??ch vui l??ng g???i hotline 0703 334 443 ????? bi???t th??m th??ng tin.
              </p>
              <p className='text day-txt'>
              Xin l???i v?? s??? b???t ti???n n??y.
              </p>
              <Button style={{ maxWidth: '150px' }} className='MT20' onClick={this.resetAndBackProps} >Quay l???i</Button>
            </div>
          ) : (
            <div className='bookingform'>
              <div style={{ maxHeight: '80vh', overflowX: 'hidden', overflowY: 'scroll' }} className={'dayBooking-box' + (!isHideDayColumn ? ' show' : '')}>

                {dayBooking.map((dayItem, dayIndex) => {
                  return (
                    <div
                      key={dayIndex}
                      className={'day-box'}
                      onClick={() => this.onChooseDay(dayItem)}
                      style={(choosenDayCode && choosenDayCode === dayItem.dayCode) ? { borderColor: 'black', opacity: 1 } : (choosenDayCode && choosenDayCode !== dayItem.dayCode) ? { opacity: 0.4 } : {}}
                    >
                      <span className='text day-name'>{dayIndex === 0 ? 'H??m nay' : this.translationDate(dayItem.dayName)}</span>
                      <span className='text day-txt'>{dayItem.date}</span>
                    </div>
                  )
                })}

                <Lottie
                  style={{ transform: `rotate(90deg)`, position: 'absolute', bottom: 0, right: '-30px', zoom: 0.8 }}
                  options={defaultOptionsRightArrow}
                  height={100}
                  width={100}
                  speed={1}
                  isStopped={false}
                  isPaused={false}
                />
              </div>

              <div className='timeBooking-box'>
                {bookingOptionValue === 7 ? <div className='justity-center align-center'>
                  <div style={{ display: 'flex', flexDirection: 'column', width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                    <img width={70} src={images.logoHeaderWhite} style={{ objectFit: 'contain' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', width: '70%', margin: '30px 5% 0 5%' }}>
                    <p className='text day-txt'>
              Hi???n t???i t??nh n??ng ?????t l???ch k?? g???i tr??n website ??ang t???m kho??.
                    </p>
                    <p className='text day-txt'>
              Qu?? kh??ch vui l??ng g???i hotline 0703 334 443 ????? bi???t th??m th??ng tin.
                    </p>
                    <p className='text day-txt'>
              Xin l???i v?? s??? b???t ti???n n??y.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                      <Button style={{ maxWidth: '150px' }} className='MT20' onClick={this.resetAndBackProps} >Quay l???i</Button>
                    </div>
                  </div>
                </div> : <>
                  <div style={{ gridTemplateColumns: 'auto auto' }} className={'timeBooking-grid' + (step === 1 && isHideUserForm ? ' show' : '')}>
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

                  <div className={'explain-box' + (step === 1 && isHideUserForm ? ' show' : '')}>
                    <div className='explain-box-left'>
                      <div className='box-full' />
                      <span className='box-text'>???? ?????t Ch???</span>
                    </div>
                    <div className='explain-box-right'>
                      <div className='box-empty' />
                      <span className='box-text'>C??n Tr???ng</span>
                    </div>
                  </div>

                  <div className={'timeBooking-footer' + ((step === 1 || step === 0) && isHideUserForm ? ' show' : '')}>
                    <span onClick={this.resetAndBackProps} className='text'>{`< Quay l???i`}</span>
                    {step === 1 && <span onClick={this.onHandleStepTwo} className='text' style={choosenTimeCode ? { color: 'black' } : { opacity: 0.5, pointerEvents: 'none' }}>{`Ti???p t???c >`}</span>}
                  </div>
                    </>}

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
                    <Form.Item name='dayTime' label='Th???i gian'>
                      <Col sm={24} md={22}>
                        <Input size='small' value={this.convertCodeToTime()} placeholder='...' />
                      </Col>
                    </Form.Item>
                    <Form.Item name='customerName' rules={[{ required: true, message: 'Vui l??ng nh???p t??n qu?? kh??ch' }]} label='H??? v?? T??n'>
                      <Col sm={24} md={22}>
                        <Input value={formData.customerName} size='small' allowClear id='customerName' key='customerName' onChange={this.changeData} placeholder='...' />
                      </Col>
                    </Form.Item>

                    <Form.Item name='phoneNumber' rules={[{ required: true, message: 'Vui l??ng nh???p s??? ??i???n tho???i' }]} label='S??? ??i???n tho???i'>
                      <Col sm={24} md={22}>
                        <Input value={formData.phoneNumber} size='small' type={'number'} id='phoneNumber' key='phoneNumber' onChange={this.changeData} allowClear placeholder='...' />
                      </Col>
                    </Form.Item>

                    <Form.Item
                      name='numberOfProduct'
                      rules={[{ required: true, message: 'Vui l??ng nh???p s??? l?????ng h??ng' }]}
                      label='S??? l?????ng H??ng Ho??'
                      {...formData.numberOfProduct < 1 ? { validateStatus: 'error', help: 'S??? l?????ng t???i thi???u l?? 1' } : {}}
                      {...isErrorMax ? { validateStatus: 'error', help: 'V???i s??? l?????ng h??ng ho?? tr??n 50, Xin vui l??ng li??n h??? s??? Zalo 0703334443' } : {}}
                    >
                      <Col sm={24} md={6}>
                        <Input value={formData.numberOfProduct} size='small' defaultValue={1} name='numberOfProduct' type={'number'} id='numberOfProduct' key='numberOfProduct' onChange={this.changeData} placeholder='...' />
                      </Col>
                    </Form.Item>
                    <div className='flex justify-around align-center' style={{ width: '100%' }}>
                      <Button onClick={this.backStepOne} type='secondary'>Quay l???i</Button>
                      <Button disabled={isErrorMax || formData.numberOfProduct < 1 || formData.numberOfProduct > 50} loading={isConsigning} type='secondary' htmlType='submit'>X??c nh???n</Button>
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
                        <Descriptions.Item span={24} label='Th???i gian k?? g???i'>{this.convertCodeToTime()}</Descriptions.Item>
                        <Descriptions.Item span={24} label='T??n Kh??ch H??ng'>{formData.customerName}</Descriptions.Item>
                        <Descriptions.Item span={24} label='S??? ??i???n tho???i'>{formData.phoneNumber}</Descriptions.Item>
                        <Descriptions.Item span={24} label='S??? l?????ng h??ng ho??'>{formData.numberOfProduct}</Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                  <Button className='MT20' onClick={this.resetAndBackProps} >Quay l???i</Button>
                </div>
              </div>
            </div>
          )
        }
        <MyModal ref={this.myModal} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  settingRedux: state.settingRedux,
  userData: state.userData
})

export default withRouter(connect(mapStateToProps)(ConsignmentScreen))
