import React from 'react'
import { Router } from 'common/routes'
import ReduxServices from 'common/redux'
import { connect } from 'react-redux'
import { Form, Button } from 'antd'
import { withRouter } from 'next/router'
import { images } from 'config/images'
import { isMobile } from 'react-device-detect'
import MyModal from 'pages/Components/MyModal'
import BookingForm from './components/BookingForm'
import SearchForm from './components/SearchForm'
import InstrumentForm from './components/InstrumentForm'
import './style.scss'

class ConsignmentScreen extends React.PureComponent {
  static async getInitialProps ({ query }) {
    return { query }
  }
  constructor (props) {
    super(props)
    this.state = {
      isShowText1: false,
      isShowText2: false,
      isShowText3: false,
      isShowText: false,
      isShowBookingForm: false,
      isShowSearchForm: false,
      isShowInstrumentForm: false,
      isShowForm: false,
      isShowBookingOnline: true,
      bookingOnlineAlert: null
    }
    this.myModal = React.createRef()
  }

  componentDidMount () {
    let isShowBookingOnline = ReduxServices.getSettingWithKey('IS_SHOW_BOOKING_ONLINE_FORM', 'true')
    let bookingOnlineAlert = ReduxServices.getSettingWithKey('BOOKING_ONLINE_ALERT', '')
    if (isShowBookingOnline === 'true' || isShowBookingOnline === true) {
      isShowBookingOnline = true
    } else {
      isShowBookingOnline = false
    }

    if (this.props?.router?.query?.tab === 'phuongthuc') {
      this.onHandleOpenContent('instrument')
      return
    } else if (this.props?.router?.query?.tab === 'datlich') {
      this.onHandleOpenContent('consignment')
      return
    } else if (this.props?.router?.query?.tab === 'xemtongket') {
      this.onHandleOpenContent('search')
      return
    }

    setTimeout(() => {
      this.setState({
        isShowText: true,
        isShowText1: true,
        isShowText2: true,
        isShowText3: true,
        isShowBookingOnline: isShowBookingOnline,
        bookingOnlineAlert: bookingOnlineAlert
      })
    }, 200)
  }
  componentDidUpdate (prevState, preProps) {
    console.log('prevState', prevState)
    console.log('preProps', preProps)
  }

  componentWillUnmount () {
  }

  onHandleOpenContent = (formName) => {
    this.setState({
      isShowText1: false,
      isShowText2: false,
      isShowText3: false,
      isShowText: false
    }, () => {
      switch (formName) {
      case 'consignment':
        ReduxServices.getSetting()
        setTimeout(() => {
          this.setState({
            isShowForm: true,
            isShowSearchForm: false,
            isShowInstrumentForm: false,
            isShowBookingForm: true
          })
        }, 500)
        break
      case 'search':
        setTimeout(() => {
          this.setState({
            isShowForm: true,
            isShowSearchForm: true,
            isShowInstrumentForm: false,
            isShowBookingForm: false
          })
        }, 500)
        break
      case 'instrument':
        setTimeout(() => {
          this.setState({
            isShowForm: true,
            isShowBookingForm: false,
            isShowSearchForm: false,
            isShowInstrumentForm: true
          })
        }, 500)
        break
      }
    })
  }

  onBackConsignment = () => {
    this.setState({
      isShowForm: false,
      isShowText1: true,
      isShowText2: true,
      isShowText3: true,
      isShowText: true
    })
  }

  renderBookingAlert = () => {
    const { bookingOnlineAlert } = this.state
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', margin: '30px 0 0 0' }}>
          {/* <p className='text day-txt'>
              Hiện tại tính năng đặt lịch ký gửi trên website đang tạm khoá.
          </p>
          {bookingOnlineAlert?.length > 0 && (
            <textarea disabled value={bookingOnlineAlert} className='textarea-container'>{bookingOnlineAlert}</textarea>
          )}
          <p className='text day-txt'>
              Quý khách vui lòng gọi hotline 0703 334 443 để biết thêm thông tin.
          </p>
          <p className='text day-txt'>
              Xin lỗi vì sự bất tiện này.
          </p> */}
          {bookingOnlineAlert?.length > 0 && (
            <textarea contentEditable disabled value={bookingOnlineAlert} className='textarea-container text day-txt'>{bookingOnlineAlert}</textarea>
          )}
        </div>
      </div>
    )
  }

  renderStringCodeBox = () => {
    const { isShowBookingOnline } = this.state
    const onContinue = () => {
      if (isShowBookingOnline) {
        window.open('https://zalo.me/1278273211257849348', '_blank')
      } else {
        this.myModal.current.openModal(this.renderBookingAlert(), { closable: true })
      }
    }

    return (
      <div>
        <p className='text text-title MB10'>Hướng dẫn ký gửi</p>
        <p className='text'>Sau khi truy cập Zalo, vui lòng nhấn Quan tâm/Follow để GAP có thể ghi nhận thông tin ký gửi từ anh/chị nhé!</p>
        <img className='MR10 cursor-pointer MB10 MT10' src={images.kyguiZalo} style={{ objectFit: 'contain', height: '100%', width: '100%' }} />

        <Button className='MT10' onClick={onContinue}>Tiếp tục</Button>

        {/* <p className='text text-title MB10 MT20'>Thông báo tạm ngưng dịch vụ ký gửi online</p>
        <p className='text'>Xin chào Quý Khách, GAP rất tiếc xin thông báo rằng số lượng đơn ký gửi online đang trong tình trạng quá tải, GAP xin phép tạm ngưng dịch vụ ký gửi online từ ngày 21/10/2022 đến ngày 24/10/2022</p>
        <p className='text'>Chân thành xin lỗi Quý Khách vì sự bất tiện này.</p> */}

        {/* <img className='MR10 cursor-pointer MB10 MT10' src={images.kyguiZalo} style={{ objectFit: 'contain', height: '100%', width: '100%' }} />

        <Button className='MT10' onClick={onContinue}>Tiếp tục</Button> */}
      </div>
    )
  }

  onIntrucmentConsignZalo = () => {
    this.myModal.current.openModal(this.renderStringCodeBox(), { closable: true })
  }

  // closeModal = () => {
  //   this.myModal.current.closeModal()
  // }

  render () {
    const { isShowText1, isShowText2, isShowText3, isShowForm, isShowText, isShowSearchForm, isShowBookingForm, isShowInstrumentForm } = this.state
    return (
      <div className='consignment-home-container'>
        <div className='body-box' style={!isShowText && isShowForm ? { position: 'absolute', width: 0, height: 0 } : {}}>
          <span onClick={() => this.onHandleOpenContent('consignment')} className={'text consignment-txt' + (isShowText1 ? ' show' : '')} >Đặt Lịch</span>
          <a onClick={this.onIntrucmentConsignZalo} className={'text info-search-txt' + (isShowText2 ? ' show' : '')}>Ký Gửi Online</a>
          <span onClick={() => this.onHandleOpenContent('search')} className={'text info-search-txt' + (isShowText2 ? ' show' : '')}>Xem Tổng Kết</span>
          <span onClick={() => this.onHandleOpenContent('instrument')} className={'text instrument-txt' + (isShowText3 ? ' show' : '')}>Phương Thức Ký Gửi</span>
        </div>
        {/* <div className='content-box' style={!isShowForm ? { position: 'absolute', width: 0 } : {}}> */}
        <div className={'content-box' + (isShowForm && isShowBookingForm ? ' show' : '')}>
          <BookingForm backConsignment={this.onBackConsignment} />
        </div>

        <div className={'content-box' + (isShowForm && isShowSearchForm ? ' show' : '')}>
          <SearchForm backConsignment={this.onBackConsignment} />
        </div>

        <div className={'content-box' + (isShowForm && isShowInstrumentForm ? ' show' : '')}>
          <InstrumentForm backConsignment={this.onBackConsignment} />
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
