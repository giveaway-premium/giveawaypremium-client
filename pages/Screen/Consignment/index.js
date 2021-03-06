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
      isShowForm: false
    }
    this.myModal = React.createRef()
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        isShowText: true,
        isShowText1: true,
        isShowText2: true,
        isShowText3: true
      })
    }, 200)
  }
  componentDidUpdate () {
  }

  componentWillUnmount () {
  }

  onHandleOpenContent = (formName) => {
    ReduxServices.getSetting()
    this.setState({
      isShowText1: false,
      isShowText2: false,
      isShowText3: false,
      isShowText: false
    }, () => {
      switch (formName) {
      case 'consignment':
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

  renderStringCodeBox = () => {
    const onContinue = () => {
      window.open('https://zalo.me/1278273211257849348', '_blank')
    }

    return (
      <div>
        <p className='text text-title MB10'>H?????ng d???n k?? g???i</p>
        <p className='text'>Sau khi truy c???p Zalo, vui l??ng nh???n Quan t??m/Follow ????? GAP c?? th??? ghi nh???n th??ng tin k?? g???i t??? anh/ch??? nh??!</p>
        <img className='MR10 cursor-pointer MB10 MT10' src={images.kyguiZalo} style={{ objectFit: 'contain', height: '100%', width: '100%' }} />

        <Button className='MT10' onClick={onContinue}>Ti???p t???c</Button>
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
        <div className='body-box' style={!isShowText && isShowForm ? { position: 'absolute', width: 0 } : {}}>
          <span onClick={() => this.onHandleOpenContent('consignment')} className={'text consignment-txt' + (isShowText1 ? ' show' : '')} >?????t L???ch</span>
          <a onClick={this.onIntrucmentConsignZalo} className={'text info-search-txt' + (isShowText2 ? ' show' : '')}>K?? G???i Online</a>
          <span onClick={() => this.onHandleOpenContent('search')} className={'text info-search-txt' + (isShowText2 ? ' show' : '')}>Xem T???ng K???t</span>
          <span onClick={() => this.onHandleOpenContent('instrument')} className={'text instrument-txt' + (isShowText3 ? ' show' : '')}>Ph????ng Th???c K?? G???i</span>
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
