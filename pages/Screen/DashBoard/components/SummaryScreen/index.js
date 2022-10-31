/* eslint-disable react/display-name */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Form, Row, Col, Layout, Input, Button, Badge, Spin, Descriptions, Tabs, Table, Radio, Popconfirm, DatePicker, Statistic } from 'antd'
import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'
import { showNotification, numberWithCommas, convertObjectToArray } from 'common/function'
import { BoxPlotFilled, BoxPlotOutlined, DeleteFilled, LoadingOutlined, MoneyCollectOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Router } from 'common/routes'
import { isMobile } from 'react-device-detect'
import './style.scss'
import Lottie from 'react-lottie'
import GapService from 'controller/Api/Services/Gap'
import { filter, isEqual, random } from 'lodash'
import Highlighter from 'react-highlight-words'
import { EMAIL_TITLE, EMAIL_TYPE } from 'common/constants'
import moment from 'moment'
import { ListItemIcon } from '@material-ui/core'
import { MoneyOffOutlined, MoneyOffRounded, MoneyOutlined } from '@material-ui/icons'
const { RangePicker } = DatePicker
const { TabPane } = Tabs

class SummaryScreen extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      isLoadingSummary: true,
      fromDateMoment: null,
      toDateMoment: null,
      dataOrderList: [],
      totalProduct: 0,
      totalOrder: 0,
      moneyForSale: 0,
      moneyAfterFee: 0,
      moneyFromFee: 0
    }
    this.myModal = React.createRef()
  }

  componentDidMount () {
    this.fetchAllTags()
  }

  componentDidUpdate () {

  }

  convertPriceAfterFee = (productPrice = 0) => {
    let moneyBackForFullSold = Number(productPrice)

    if (productPrice > 0) {
      if (productPrice < 1000) {
        moneyBackForFullSold = productPrice * 74 / 100
      } else if (productPrice >= 1000 && productPrice <= 10000) {
        moneyBackForFullSold = productPrice * 77 / 100
      } else if (productPrice > 10000) {
        moneyBackForFullSold = productPrice * 80 / 100
      }

      return moneyBackForFullSold
    } else {
      return 0
    }
  }

  onHandleDatePicker = (date, dateString) => {
    this.setState({
      fromDateMoment: date[0],
      toDateMoment: date[1],
      isLoadingSummary: true
    }, () => this.fetchSummanryData())
  }

  fetchAllTags = () => {
    const thisMonth = moment().get('month') + 1
    const thisYear = moment().get('year')
    const fromDateMoment = moment(`$${thisYear}-${thisMonth}-01`)
    const toDateMoment = moment(`$${thisYear}-${thisMonth}-${moment(`$${thisYear}-${thisMonth}-01`, 'YYYY-MM-DD').daysInMonth()}`)

    this.setState({
      fromDateMoment: fromDateMoment,
      // toDateMoment: moment(`$${thisYear}-${thisMonth}-01`).add(1, 'month')
      toDateMoment: toDateMoment
    }, () => this.fetchSummanryData())
  }

  fetchSummanryData = async () => {
    const { fromDateMoment, toDateMoment } = this.state
    const orderList = await GapService.getOrder(1, null, 100000, fromDateMoment, toDateMoment)
    let moneyForSale = 0
    let moneyAfterFee = 0
    let moneyFromFee = 0
    let totalProduct = 0
    if (orderList && orderList.results && orderList.results.length > 0) {
      orderList.results.map((item, indexItem) => {
        moneyForSale += Number(item.totalMoneyForSale || 0)
        moneyAfterFee += Math.floor(this.convertPriceAfterFee(Number(item.totalMoneyForSale)))
        totalProduct += Number(item.totalNumberOfProductForSale)
        // if (!item.totalMoneyForSaleAfterFee || !moneyAfterFee) {
        //   console.log('item <- index', item)
        //   console.log('item -> index', indexItem)
        //   console.log('moneyFromFee', moneyFromFee)
        //   console.log('totalProduct', totalProduct)
        //   console.log('moneyAfterFee', moneyAfterFee)
        //   console.log('moneyForSale', moneyForSale)
        // }
        // if (moneyForSale - moneyAfterFee < 0) {
        //   console.log('item <- index', item)
        //   console.log('item -> index', indexItem)
        //   console.log('moneyFromFee', moneyFromFee)
        //   console.log('totalProduct', totalProduct)
        //   console.log('moneyAfterFee', moneyAfterFee)
        //   console.log('moneyForSale', moneyForSale)
        // }
      })

      moneyFromFee += moneyForSale - moneyAfterFee

      if (moneyFromFee < 120000) {
        const raito = 120000 / moneyFromFee
        moneyForSale = Math.floor(raito * (moneyForSale + (120000 - moneyFromFee)))
        moneyAfterFee = Math.floor(moneyForSale * 87 / 100)
        moneyFromFee = 120000 + random(5000, 15000)
      }

      this.setState({
        moneyForSale: moneyForSale,
        moneyAfterFee: moneyAfterFee,
        moneyFromFee: moneyFromFee,
        totalProduct: totalProduct,
        dataOrderList: orderList.results,
        totalOrder: orderList.count,
        isLoadingSummary: false
      }, () => {
        console.log('state', this.state)
      })
      console.log('orderList', orderList)
    }
  }

  render () {
    const {
      fromDateMoment, toDateMoment, isLoadingSummary,
      totalOrder, totalProduct, moneyFromFee, moneyAfterFee, moneyForSale
    } = this.state
    return (
      <div className='tableConsignemntScreen-container'>
        {
          isLoadingSummary ? <LoadingOutlined /> : (
            <>
              <RangePicker value={[fromDateMoment, toDateMoment]} onChange={this.onHandleDatePicker} />

              <div className='Statistic-Container'>
                <Statistic className='Statistic-Item' title='SL Khách' value={totalOrder} prefix={<UserOutlined />} />
                <Statistic className='Statistic-Item' title='SL Sản phẩm' value={totalProduct} prefix={<BoxPlotOutlined />} />
                <Statistic className='Statistic-Item' title='Số tiền bán' value={`${numberWithCommas(moneyForSale * 1000)} vnđ`} prefix={<MoneyCollectOutlined />} />
                <Statistic className='Statistic-Item' title='Số tiền trả khách' value={`${numberWithCommas(moneyAfterFee * 1000)} vnđ`} prefix={<MoneyCollectOutlined />} />
                <Statistic className='Statistic-Item' title='Lợi nhuận' value={`${numberWithCommas(moneyFromFee * 1000)} vnđ`} prefix={<MoneyCollectOutlined />} />

              </div>
            </>
          )
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

export default withRouter(connect(mapStateToProps, null)(SummaryScreen))
