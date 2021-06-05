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
import { numberWithCommas, showNotification } from 'common/function'

import './style.scss'
import { TramRounded } from '@material-ui/icons'

class ConsignmentScreen extends React.PureComponent {
  static async getInitialProps ({ query }) {
    return { query }
  }
  constructor (props) {
    super(props)
    this.state = {
      isShowSectionOne: false,
      isShowSectionTwo: false
    }
    this.myModal = React.createRef()
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        isShowSectionOne: true,
        isShowSectionTwo: true,
        isErrorMin: false,
        moneyBack: '',
        moneySold: ''
      })
    }, 100)
  }

  componentDidUpdate () {
  }

  componentWillUnmount () {
  }

  changeData = (e) => {
    let moneyBack = 0
    this.setState({
      moneySold: e.target.value
    })
    if (e.target.value > 0) {
      if (e.target.value < 1000000) {
        moneyBack = e.target.value * 74 / 100
      } else if (e.target.value >= 1000000 && e.target.value <= 10000000) {
        moneyBack = e.target.value * 77 / 100
      } else if (e.target.value > 10000000) {
        moneyBack = e.target.value * 80 / 100
      }
      this.setState({
        moneyBack: moneyBack
      })
    } else {
      this.setState({
        moneyBack: ''
      })
    }
  }

  render () {
    const { isShowSectionOne, moneyBack, moneySold } = this.state

    return (
      <div className='instrument-container'>
        <div className='home-page-wrapper'>
          <div className='main-content radius-bottom'>
            <div className='wrapper'>
              <div className={'box-content-introduce' + (isShowSectionOne ? ' show' : '')}>
                <h2 className='text text-center text-color-0 txt-big-intro MB30'>PHƯƠNG THỨC KÝ GỬI</h2>

                <div className='info-fee-box MB30'>
                  <div className='info-fee-box-left'>
                    <h2 style={{ opacity: 0, pointerEvents: 'none' }} className='text text-left text-color-10 txt-small-intro MB15'>{'Danh mục'}</h2>
                    <h2 className='text text-left text-color-10 txt-small-intro MB15'>{'Dưới 1 triệu'}</h2>
                    <h2 className='text text-left text-color-10 txt-small-intro MB15'>{'Từ 1 đến 10 triệu'}</h2>
                    <h2 className='text text-left text-color-10 txt-small-intro MB15'>{'Trên 10 triệu'}</h2>
                    <h2 className='text text-left text-color-10 txt-small-intro'>{'Luxury / chủ Brand'}</h2>
                  </div>

                  <div className='info-fee-box-right'>
                    <h2 className='text text-left text-color-10 txt-small-intro MB15'>{'Phí Ký gửi:'}</h2>
                    <h2 className='text text-left text-color-10 txt-small-intro MB15'>{'26%'}</h2>
                    <h2 className='text text-left text-color-10 txt-small-intro MB15'>{'23%'}</h2>
                    <h2 className='text text-left text-color-10 txt-small-intro MB15'>{'20%'}</h2>
                    <h2 className='text text-left text-color-10 txt-small-intro '>{'Thoả thuận'}</h2>
                  </div>
                </div>
                <Col sm={24} md={10}>
                  <Input suffix='vnđ' value={moneySold} type='number' size='small' allowClear name='moneySold' id='moneySold' key='moneySold' onChange={this.changeData} placeholder='Nhập số tiền bán được' />
                </Col>
                <p className='MT10'>Số tiền sau khi đã trừ phí là: {moneyBack ? numberWithCommas(moneyBack) : ''}</p>

                <Divider />
                <h2 className='text text-left text-color-10 txt-small-intro MB15'>{'Thời gian ký gửi từ 50 ngày đến 70 ngày (tuỳ đợt)'}</h2>

                <h2 className='text text-left text-color-10 txt-small-intro MB15'>{`- Give Away chỉ nhận hàng thương hiệu (local/global)
                  - Authentic / No Fake
                  - Độ mới 80% trở lên(riêng Luxury Vintage từ 50% trở lên)
                  - Mỹ phẩm còn date (Give Away sẽ giúp bạn check date)
                  `}</h2>
                <h2 className='text text-left text-color-10 txt-small-intro MB15'>{`Sau khi nhận được double check auth bởi CTV là chuyên viên đang làm việc tại Việt Nam và quốc tế.
                Nếu phát hiện fake, Give Away sẽ lưu kho và hoàn trả lại khi đến hẹn được ghi trên biên nhận ký gửi.
                `}</h2>
              </div>
              <div style={{ margin: 'auto' }}>
                <Button onClick={() => this.props.backConsignment()} type='secondary'>Quay lại</Button>
              </div>
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
