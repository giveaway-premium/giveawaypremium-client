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
            isShowBookingForm: true
          })
        }, 500)
        break
      case 'search':
        setTimeout(() => {
          this.setState({
            isShowForm: true,
            isShowSearchForm: true,
            isShowBookingForm: false
          })
        }, 500)
        break
      case 'instrument':
        setTimeout(() => {
          this.setState({
            isShowForm: true,
            isShowBookingForm: false,
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

  // closeModal = () => {
  //   this.myModal.current.closeModal()
  // }

  render () {
    const { isShowText1, isShowText2, isShowText3, isShowForm, isShowText, isShowSearchForm, isShowBookingForm } = this.state
    return (
      <div className='consignment-home-container'>
        <div className='body-box' style={!isShowText && isShowForm ? { position: 'absolute', width: 0 } : {}}>
          <span onClick={() => this.onHandleOpenContent('consignment')} className={'text consignment-txt' + (isShowText1 ? ' show' : '')} >Đặt Lịch</span>
          <span onClick={() => this.onHandleOpenContent('search')} className={'text info-search-txt' + (isShowText2 ? ' show' : '')}>Tìm Kiếm Thông Tin</span>
          <span onClick={() => this.onHandleOpenContent('instrument')} className={'text instrument-txt' + (isShowText3 ? ' show' : '')}>Hướng Dẫn</span>
        </div>
        {/* <div className='content-box' style={!isShowForm ? { position: 'absolute', width: 0 } : {}}> */}
        <div className={'content-box' + (isShowForm && isShowBookingForm ? ' show' : '')}>
          <BookingForm backConsignment={this.onBackConsignment} />
        </div>

        <div className={'content-box' + (isShowForm && isShowSearchForm ? ' show' : '')}>
          <SearchForm backConsignment={this.onBackConsignment} />
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
