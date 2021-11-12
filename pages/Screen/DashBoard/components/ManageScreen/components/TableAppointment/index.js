import React from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Input, Button, Spin, Tabs, Tag, DatePicker, Row, Descriptions } from 'antd'
import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'
import { showNotification } from 'common/function'
import { Router } from 'common/routes'
import { isMobile } from 'react-device-detect'
import './style.scss'
import GapService from 'controller/Api/Services/Gap'
import TweenOneGroup from 'rc-tween-one'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import moment from 'moment'
import './style.scss'

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
      bookingDataCode: [],
      isLoadingBooking: false
    }
    this.myModal = React.createRef()
  }

  componentDidMount () {
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
      choosenDayCode: dayBookingTemp && dayBookingTemp[0] ? dayBookingTemp[0].dayCode : '',
      dayBooking: dayBookingTemp
    }, async () => {
      await this.fetchAppointment()
    })
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

  onChooseDay = (choosenDay) => {
    console.log(choosenDay)
    this.setState({
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

  render () {
    const {
      step, dayBooking, choosenDayCode, timeBooking, bookingDataCode, isErrorMax,
      choosenTimeCode, formData, isHideUserForm, isConsigning, isHideDayColumn, isLoadingBooking
    } = this.state
    return (
      <div className='TableAppointment-home-container'>
        <div className='bookingform'>
          <div className={'dayBooking-box show'}>

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
            <div className={'timeBooking-grid show'}>
              {
                isLoadingBooking
                  ? <div className='flex justity-center align-center'>
                    <LoadingOutlined width={60} height={60} />
                  </div>
                  : timeBooking.map((itemTime, indexTime) => {
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
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData
})

export default withRouter(connect(mapStateToProps, null)(TableAppointment))
