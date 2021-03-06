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

  backPageProps = () => {
    this.props.backConsignment()
  }

  render () {
    const { isShowSectionOne, moneyBack, moneySold } = this.state

    return (
      <div className='instrument-container'>
        <div className='home-page-wrapper'>
          <div className='main-content radius-bottom'>
            <div className='wrapper'>
              <div className={'box-content-introduce' + (isShowSectionOne ? ' show' : '')}>
                <h2 className='text text-center text-color-0 txt-big-intro MB60'>PH????NG TH???C K?? G???I</h2>

                <div className='info-fee-box MB30'>
                  <div className='info-fee-box-left'>
                    <h2 style={{ opacity: 0, pointerEvents: 'none' }} className='text text-left text-color-10 txt-small-intro MB15'>{'Danh m???c'}</h2>
                    <h2 className='text text-left text-color-10 txt-small-intro MB15'>{'D?????i 1 tri???u'}</h2>
                    <h2 className='text text-left text-color-10 txt-small-intro MB15'>{'T??? 1 ?????n 10 tri???u'}</h2>
                    <h2 className='text text-left text-color-10 txt-small-intro MB15'>{'Tr??n 10 tri???u'}</h2>
                    <h2 className='text text-left text-color-10 txt-small-intro'>{'Luxury / ch??? Brand'}</h2>
                  </div>

                  <div className='info-fee-box-right'>
                    <h2 className='text text-left text-color-10 txt-small-intro MB15'>{'Ph?? K?? g???i:'}</h2>
                    <h2 className='text text-left text-color-10 txt-small-intro MB15'>{'26%'}</h2>
                    <h2 className='text text-left text-color-10 txt-small-intro MB15'>{'23%'}</h2>
                    <h2 className='text text-left text-color-10 txt-small-intro MB15'>{'20%'}</h2>
                    <h2 className='text text-left text-color-10 txt-small-intro '>{'Tho??? thu???n'}</h2>
                  </div>
                </div>
                <Col sm={24} md={10}>
                  <Input suffix='vn??' value={moneySold} type='number' size='small' allowClear name='moneySold' id='moneySold' key='moneySold' onChange={this.changeData} placeholder='Nh???p gi?? d??? ?????nh k?? g???i' />
                </Col>
                <p className='MT10'>S??? ti???n sau khi ???? tr??? ph?? l??: {moneyBack ? numberWithCommas(moneyBack) : ''}</p>

                <Divider />
                <h2 className='text text-left text-color-10 txt-small-intro MB15'>{'Th???i gian k?? g???i t??? 50 ng??y ?????n 70 ng??y (tu??? ?????t)'}</h2>

                <h2 className='text text-left text-color-10 txt-small-intro MB15'>{`- Give Away Premium ch??? nh???n h??ng th????ng hi???u (local/global)
                  - Authentic / No Fake
                  - ????? m???i 80% tr??? l??n (ri??ng Luxury Vintage t??? 50% tr??? l??n)
                  - M??? ph???m c??n date (Give Away s??? gi??p b???n check date)
                  `}</h2>
                <h2 className='text text-left text-color-10 txt-small-intro MB15'>{`Sau khi nh???n ???????c double check auth b???i CTV l?? chuy??n vi??n ??ang l??m vi???c t???i Vi???t Nam v?? qu???c t???.
                N???u ph??t hi???n fake, Give Away s??? l??u kho v?? ho??n tr??? l???i khi ?????n h???n ???????c ghi tr??n bi??n nh???n k?? g???i.
                `}</h2>
              </div>
              <div style={{ margin: 'auto' }}>
                <Button onClick={this.backPageProps} type='secondary'>Quay l???i</Button>
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
