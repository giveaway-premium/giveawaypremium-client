import React from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Input, Button, Spin, Tabs, Tag, DatePicker, Row, Descriptions, Select } from 'antd'
import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'
import { showNotification } from 'common/function'
import { Router } from 'common/routes'
import { isMobile } from 'react-device-detect'
import './style.scss'
import GapService from 'controller/Api/Services/Gap'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import moment from 'moment'
import rightArrowJson from 'static/Assets/Image/Lottie/rightArrow.json'
import Lottie from 'react-lottie'
import { bindActionCreators } from 'redux'
import StorageActions from 'controller/Redux/actions/storageActions'
import { BOOKING_OPTION_EACH_DAY, BOOKING_OPTION_EACH_DAY_DATA_DEFAULT, TIME_BOOKING } from 'common/constants'
const { Option } = Select
class TableAppointment extends React.Component {
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
          timeName: '11:00',
          timeCode: '1100'
        },
        {
          timeName: '13:30',
          timeCode: '1330'
        },
        {
          timeName: '14:30',
          timeCode: '1430'
        },
        {
          timeName: '15:30',
          timeCode: '1530'
        },
        {
          timeName: '16:30',
          timeCode: '1630'
        },
        {
          timeName: '17:30',
          timeCode: '1730'
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
      bookingDataCode: [],
      isLoadingBooking: false,
      isShowEightSlot: true,
      inputValue: '',
      searchInfo: '',
      isLast7Day: false,
      bookingOptionValue: 8,
      bookingOptionEachDay: {}
    }
    this.myModal = React.createRef()
  }

  async componentDidMount () {
    const { settingRedux } = this.props
    let dayBookingCount = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    let dayBookingTemp = []
    let bookingOptionEachDay = settingRedux.BOOKING_OPTION_EACH_DAY || BOOKING_OPTION_EACH_DAY_DATA_DEFAULT

    dayBookingCount.map((item, index) => {
      dayBookingTemp.push({
        dayName: moment().add(index, 'day').format('dddd'),
        date: moment().add(index, 'day').format('DD-MM-YYYY'),
        dayCode: moment().add(index, 'day').format('DD-MM-YYYY').replaceAll('-', '')
      })
    })

    const choosenDayCode = dayBookingTemp && dayBookingTemp[0] ? dayBookingTemp[0].dayCode : ''
    const { option, timeBooking } = this.checkDayCodeToBookingOption(dayBookingTemp[0], bookingOptionEachDay)
    console.log('timeBooking')
    console.log(timeBooking)
    console.log(option)

    // const bookingOptionList = { ...bookingOptionEachDay }
    // bookingOptionList[`OPTION_${8}`] = bookingOptionList[`OPTION_${8}`] + `--24052022----25052022----25052022----26052022----27052022----28052022----29052022----30052022----31052022----01062022---02062022---03062022---04062022---05062022---06062022---07062022--`
    // console.log('bookingOptionList')
    // console.log(bookingOptionList)

    // let res = await GapService.updateSettingWithKeyAndValue(BOOKING_OPTION_EACH_DAY, bookingOptionList)
    // console.log(res)

    this.setState({
      bookingOptionValue: option,
      timeBooking: timeBooking,
      bookingOptionEachDay: bookingOptionEachDay,
      choosenDayCode: choosenDayCode,
      dayBooking: dayBookingTemp
    }, async () => {
      await this.fetchAppointment()
    })
  }

  checkDayCodeToBookingOption = (choosenDayCode, bookingOptionData = BOOKING_OPTION_EACH_DAY_DATA_DEFAULT) => {
    if (choosenDayCode && choosenDayCode.dayCode && bookingOptionData && bookingOptionData.length > 0) {
      if (bookingOptionData.OPTION_1.includes(choosenDayCode.dayCode)) return { option: 1, timeBooking: TIME_BOOKING.OPTION_1 }
      else if (bookingOptionData.OPTION_2.includes(choosenDayCode.dayCode)) return { option: 2, timeBooking: TIME_BOOKING.OPTION_2 }
      else if (bookingOptionData.OPTION_3.includes(choosenDayCode.dayCode)) return { option: 3, timeBooking: TIME_BOOKING.OPTION_3 }
      else if (bookingOptionData.OPTION_4.includes(choosenDayCode.dayCode)) return { option: 4, timeBooking: TIME_BOOKING.OPTION_4 }
      else if (bookingOptionData.OPTION_5.includes(choosenDayCode.dayCode)) return { option: 5, timeBooking: TIME_BOOKING.OPTION_5 }
      else if (bookingOptionData.OPTION_6.includes(choosenDayCode.dayCode)) return { option: 6, timeBooking: TIME_BOOKING.OPTION_6 }
      else if (bookingOptionData.OPTION_7.includes(choosenDayCode.dayCode)) return { option: 7, timeBooking: TIME_BOOKING.OPTION_7 }
      else if (bookingOptionData.OPTION_8.includes(choosenDayCode.dayCode)) return { option: 8, timeBooking: TIME_BOOKING.OPTION_8 }
      else return { option: 8, timeBooking: TIME_BOOKING.OPTION_8 }
    } else {
      return { option: 8, timeBooking: TIME_BOOKING.OPTION_8 }
    }
  }

  fetchAppointment = async () => {
    const { dayBooking } = this.state

    this.setState({
      isLoadingBooking: true
    }, async () => {
      const arrayDate = []
      let bookingDataCode = ''
      dayBooking.map((itemDate, indexdate) => {
        arrayDate.push(`"${itemDate.date}"`)
      })

      const res = await GapService.getAppointmentWithDate(arrayDate)

      console.log('res')
      console.log(res)
      console.log(res)

      if (res && res.results) {
        res.results.map((itemData, indexItem) => {
          if (itemData && itemData.slot) {
            bookingDataCode += '-' + itemData.slot + '-'
          }
        })

        console.log('res')
        console.log(res)
        console.log(bookingDataCode)

        this.setState({
          bookingUserInfo: res.results,
          bookingDataCode: bookingDataCode,
          isLoadingBooking: false
        })
      } else {
        this.setState({
          isLoadingBooking: false
        })

        showNotification('Không thể tải dữ liệu!')
      }
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

  onChooseDay = (choosenDay, isLast7Day = false) => {
    const { bookingOptionEachDay } = this.state
    const { option, timeBooking } = this.checkDayCodeToBookingOption(choosenDay, bookingOptionEachDay)

    this.setState({
      bookingOptionValue: option,
      timeBooking: timeBooking,
      isLast7Day: isLast7Day,
      choosenTimeCode: null,
      choosenDayCode: choosenDay ? choosenDay.dayCode : ''
    })
  }

  onChooseTime = (choosenTime) => {
    console.log(choosenTime)
    this.setState({
      step: 1,
      choosenTimeCode: choosenTime ? choosenTime.timeCode : ''
    }, () => {
      this.myModal.current.openModal(this.renderInfoAppointment(), { closable: true })
    })
  }

  onChangeBookingOption = async (value = 1) => {
    const { choosenDayCode } = this.state
    const { settingRedux, setSetting } = this.props
    let bookingOptionEachDay = settingRedux.BOOKING_OPTION_EACH_DAY

    const bookingOptionList = { ...bookingOptionEachDay }
    bookingOptionList[`OPTION_${value}`] = bookingOptionList[`OPTION_${value}`] + `--${choosenDayCode}--`
    let res = await GapService.updateSettingWithKeyAndValue(BOOKING_OPTION_EACH_DAY, bookingOptionList)

    console.log(value)
    console.log(bookingOptionList)
    console.log(res)
    if (res.code === 101 || res.error) {
      showNotification('Thay đổi không thành công')
    } else {
      this.setState({
        timeBooking: TIME_BOOKING[`OPTION_${value}`],
        bookingOptionValue: value,
        bookingOptionEachDay: bookingOptionList
      })
      const settingReduxTemp = { ...settingRedux }
      settingReduxTemp.BOOKING_OPTION_EACH_DAY = bookingOptionList
      console.log(settingReduxTemp)
      setSetting(settingReduxTemp)
      showNotification('Thay đổi thành công')
    }
  }

  renderInfoAppointment = () => {
    const { bookingUserInfo, choosenTimeCode, choosenDayCode, bookingDataCode } = this.state
    let findUser = bookingUserInfo.filter(user => {
      return user.slot === (choosenTimeCode + choosenDayCode)
    })
    console.log('renderInfoAppointment')
    console.log(findUser[0])
    console.log(choosenTimeCode)
    console.log(bookingUserInfo)
    if (findUser && findUser[0] && findUser[0].objectId) {
      const deleteAppointment = async () => {
        const res = await GapService.deleteAppointmentWithSlotId(findUser[0].objectId)

        console.log('res')
        console.log(res)

        if (res.code === 101 || res.error) {
          showNotification('Xoá không thành công')
          this.closeModal()
        } else {
          showNotification('Xoá thành công')
          this.closeModal()
          const bookingDataCodeTemp = bookingDataCode.replace(choosenTimeCode + choosenDayCode, '')
          this.setState({
            choosenTimeCode: null,
            bookingDataCode: bookingDataCodeTemp
          })
        }
      }

      return (
        <div>
          <span className='text text-title'>Thông tin lịch hẹn</span>
          <Descriptions className='MT10'>
            <Descriptions.Item span={24} label='Tên Khách Hàng'>{findUser[0].customerName}</Descriptions.Item>
            <Descriptions.Item span={24} label='Số lượng Hàng Hoá'>{findUser[0].numberOfProduct}</Descriptions.Item>
            <Descriptions.Item span={24} label='Số điện thoại'>{findUser[0].phoneNumber}</Descriptions.Item>
            <Descriptions.Item span={24} label='Đã đặt lúc'>{moment(findUser[0].createdAt).format('HH:MM DD/MM/YYYY')}</Descriptions.Item>
          </Descriptions>

          <Button onClick={this.closeModal}>
            Quay lại
          </Button>

          <Button className='ML10' onClick={deleteAppointment}>
            Xoá
          </Button>
        </div>
      )
    } else {
      showNotification('Không tìm thấy thông tin')
    }
  }

  closeModal = () => {
    this.myModal.current.closeModal()
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

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value })
  };

  handleInputConfirm = async () => {
    const { inputValue } = this.state
    console.log('handleInputConfirm')
    console.log(inputValue)
    const formatedValue = `${inputValue.trim()}`
    const res = await GapService.getAppointmentWithPhone(formatedValue)
    if (res && res.results && res.results[0]) {
      console.log('handleInputConfirm - res')
      console.log(res)
      this.setState({
        searchInfo: `Tên: ${res.results[0].customerName}\nSdt: ${res.results[0].phoneNumber}\nĐặt lịch ngày: ${res.results[0].date}\nThời gian: ${res.results[0].dateTime}`
      })
    } else {
      this.setState({
        searchInfo: `Không có thông tin`
      })
    }
  }

  render () {
    const {
      step, dayBooking, choosenDayCode, timeBooking, bookingDataCode, isErrorMax, isLast7Day, bookingOptionValue,
      choosenTimeCode, formData, isHideUserForm, isConsigning, isHideDayColumn, isLoadingBooking, isShowEightSlot, searchInfo
    } = this.state

    const defaultOptionsRightArrow = {
      loop: true,
      autoplay: true,
      animationData: rightArrowJson
    }

    console.log(bookingOptionValue)
    return (
      <>
        <div className='TableAppointment-home-container'>
          <div className='bookingform'>
            <div style={{ overflowX: 'hidden', overflowY: 'scroll', position: 'relative' }} className={'dayBooking-box show'}>

              {dayBooking.map((dayItem, dayIndex) => {
                const isLast7Day = dayIndex >= 14
                return (
                  <div
                    key={dayIndex}
                    className={'day-box'}
                    onClick={() => this.onChooseDay(dayItem, isLast7Day)}
                    style={(choosenDayCode && choosenDayCode === dayItem.dayCode) ? isLast7Day ? { borderColor: 'green', opacity: 1 } : { borderColor: 'black', opacity: 1 } : (choosenDayCode && choosenDayCode !== dayItem.dayCode) ? { opacity: 0.4 } : {}}
                  >
                    <span className='text day-name' style={isLast7Day ? { color: 'green' } : {}}>{dayIndex === 0 ? 'Hôm nay' : this.translationDate(dayItem.dayName)}</span>
                    <span className='text day-txt' style={isLast7Day ? { color: 'green' } : {}}>{dayItem.date}</span>
                  </div>
                )
              })}

              <Lottie
                style={{ transform: `rotate(90deg)`, position: 'absolute', bottom: 0, right: '-30px', zoom: 0.8 }}
                options={defaultOptionsRightArrow}
                height={90}
                width={90}
                speed={1}
                isStopped={false}
                isPaused={false}
              />
            </div>

            <div className='timeBooking-box'>
              <div style={isShowEightSlot ? { gridTemplateColumns: 'auto auto' } : {}} className={'timeBooking-grid show'}>
                {
                  isLoadingBooking
                    ? <div className='flex justity-center align-center'>
                      <LoadingOutlined width={60} height={60} />
                    </div>
                    : bookingOptionValue === 7 ? <div className='justity-center align-center'>
                      <div style={{ display: 'flex', flexDirection: 'column', width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                        <img width={70} src={images.logoHeaderWhite} style={{ objectFit: 'contain' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', width: '70%', margin: '30px 5% 0 5%' }}>
                        <p className='text day-txt'>
              Hiện tại tính năng đặt lịch ký gửi trên website đang tạm khoá.
                        </p>
                        <p className='text day-txt'>
              Quý khách vui lòng gọi hotline 0703 334 443 để biết thêm thông tin.
                        </p>
                        <p className='text day-txt'>
              Xin lỗi vì sự bất tiện này.
                        </p>
                      </div>
                    </div> : timeBooking.map((itemTime, indexTime) => {
                      const isReady = !bookingDataCode.includes(choosenTimeCode + choosenDayCode) && itemTime.timeCode === choosenTimeCode
                      const isBusy = bookingDataCode.includes(itemTime.timeCode + choosenDayCode)
                      // console.log(bookingDataCode)
                      // console.log(itemTime.timeCode + choosenDayCode)
                      // console.log(isReady)
                      // console.log(isBusy)

                      return (
                        <div style={!isBusy ? { pointerEvents: 'none', cursor: 'none' } : {}} onClick={() => isBusy ? this.onChooseTime(itemTime) : {}} key={indexTime} className={'time-box' + (isReady ? ' ready' : isBusy ? ' busy' : '')}>
                          <span className='text'>{itemTime.timeName}</span>
                        </div>
                      )
                    })}
              </div>
            </div>
          </div>
          <MyModal ref={this.myModal} />
        </div>
        <div className='search-info-user-booking-box'>
          <span>Tra cứu qua SĐT:</span>
          <Input onChange={this.handleInputChange} maxLength={12} size='small' ref={this.saveInputRef} style={{ margin: '15px 0px', width: '100%', height: 40, maxWidth: '300px' }} placeholder='...' />
          <Button onClick={this.handleInputConfirm} className='MT5'>OK</Button>
          {searchInfo && (
            <span className='MT10' style={{ whiteSpace: 'pre-wrap' }}>{searchInfo}</span>
          )}
        </div>

        <div className='select-booking-option-box'>
          <div className='flex align-center'>
            <div className={`${isLast7Day ? 'status-on' : 'status-off'} MR3 MB4`} />
            <span className='MB3'>{isLast7Day ? 'Khung thời gian hoạt động' : 'Hiện đang hoạt động:'}</span>
          </div>
          <Select disabled={!isLast7Day} onChange={this.onChangeBookingOption} value={bookingOptionValue} defaultValue={bookingOptionValue} size='large' id='bookingOption' key='bookingOption' placeholder='...'>
            <Option value={1}>{'Full ngày - 30 phút'}</Option>
            <Option value={2}>{'Full ngày - 1 tiếng'}</Option>
            <Option value={3}>{'Sáng 30 phút'}</Option>
            <Option value={4}>{'Sáng 1 tiếng'}</Option>
            <Option value={5}>{'Chiều 30 phút'}</Option>
            <Option value={6}>{'Chiều 1 tiếng'}</Option>
            <Option value={7}>{'Off nghỉ!'}</Option>
            <Option value={8}>{'Định dạng cũ'}</Option>
          </Select>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData,
  settingRedux: state.settingRedux
})

const mapDispatchToProps = (dispatch) => {
  return {
    setSetting: bindActionCreators(StorageActions.setSetting, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableAppointment))
