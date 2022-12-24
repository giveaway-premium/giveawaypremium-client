/* eslint-disable react/display-name */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Form, Row, Col, Layout, Input, Button, Spin, Descriptions, Tabs, Table, Switch, Badge } from 'antd'

import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'
import { showNotification } from 'common/function'
import { LoadingOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { Router } from 'common/routes'
import { isMobile } from 'react-device-detect'
import './style.scss'
import Lottie from 'react-lottie'
import GapService from 'controller/Api/Services/Gap'
import ReduxServices from 'common/redux'
import { bindActionCreators } from 'redux'
import StorageActions from 'controller/Redux/actions/storageActions'
import TextInput from 'pages/Components/TextInput'

const BookingSetting = (props) => {
  const { setSetting } = props
  const [show, setShow] = useState(true)
  const [isShowBooking, setIsShowBooking] = useState(true)
  const [isShowBookingOnline, setIsShowBookingOnline] = useState(true)
  const [inputState, setInputState] = useState({
    bookingOnlineAlert: ''
  })

  useEffect(() => {
    let isShowEightSlot = ReduxServices.getSettingWithKey('IS_SHOW_BOOKINGFORM_EIGHT_SLOT', 'true')
    let isShowBooking = ReduxServices.getSettingWithKey('IS_SHOW_BOOKING_FORM', 'true')
    let isShowBookingOnline = ReduxServices.getSettingWithKey('IS_SHOW_BOOKING_ONLINE_FORM', 'true')
    let bookingOnlineAlert = ReduxServices.getSettingWithKey('BOOKING_ONLINE_ALERT', '')

    setShow(isShowEightSlot)
    setIsShowBooking(isShowBooking)
    setIsShowBookingOnline(isShowBookingOnline)
    setInputState({
      bookingOnlineAlert: bookingOnlineAlert
    })
  }, [])

  const onChangeBookingFormat = async () => {
    setShow(!show)

    const settingAPI = await ReduxServices.getSetting()
    const newSettingAPI = {
      ...settingAPI,
      'IS_SHOW_BOOKINGFORM_EIGHT_SLOT': `${!show}`
    }
    if (settingAPI) {
      const res = await GapService.updateSetting(newSettingAPI)
      console.log('res')
      console.log(res)

      if (res && res.updatedAt) {
        showNotification(`Thay đổi thành công`)
        setSetting(newSettingAPI)
      } else {
        showNotification(`Thay đổi thất bại`)
      }
    } else {
      showNotification(`Thay đổi thất bại`)
    }
  }

  const onChangeShowBooking = async () => {
    setIsShowBooking(!isShowBooking)

    const settingAPI = await ReduxServices.getSetting()
    const newSettingAPI = {
      ...settingAPI,
      'IS_SHOW_BOOKING_FORM': `${!isShowBooking}`
    }
    if (settingAPI) {
      const res = await GapService.updateSetting(newSettingAPI)
      console.log('res')
      console.log(res)

      if (res && res.updatedAt) {
        showNotification(`Thay đổi thành công`)
        setSetting(newSettingAPI)
      } else {
        showNotification(`Thay đổi thất bại`)
      }
    } else {
      showNotification(`Thay đổi thất bại`)
    }
  }

  const onChangeShowBookingOnline = async () => {
    setIsShowBookingOnline(!isShowBookingOnline)

    const settingAPI = await ReduxServices.getSetting()
    const newSettingAPI = {
      ...settingAPI,
      'IS_SHOW_BOOKING_ONLINE_FORM': `${!isShowBookingOnline}`
    }
    if (settingAPI) {
      const res = await GapService.updateSetting(newSettingAPI)
      console.log('res')
      console.log(res)

      if (res && res.updatedAt) {
        showNotification(`Thay đổi thành công`)
        setSetting(newSettingAPI)
      } else {
        showNotification(`Thay đổi thất bại`)
      }
    } else {
      showNotification(`Thay đổi thất bại`)
    }
  }

  const onChangeShowBookingOnlineAlert = async () => {
    const settingAPI = await ReduxServices.getSetting()
    const newSettingAPI = {
      ...settingAPI,
      'BOOKING_ONLINE_ALERT': `${inputState.bookingOnlineAlert}`
    }
    if (settingAPI) {
      const res = await GapService.updateSetting(newSettingAPI)
      console.log('res')
      console.log(res)

      if (res && res.updatedAt) {
        showNotification(`Thay đổi thành công`)
        setSetting(newSettingAPI)
      } else {
        showNotification(`Thay đổi thất bại`)
      }
    } else {
      showNotification(`Thay đổi thất bại`)
    }
  }

  const handleInputBookingOnline = (value, name) => {
    const inputStateTemp = { ...inputState }
    console.log(name, value)
    inputStateTemp[name] = value || ''
    setInputState(inputStateTemp)
  }

  return (
    <div className='bookingSetting-container'>
      {/* <div>
        <span>18 chổ</span>
        <Switch className='switch-container' checked={show} onChange={onChangeBookingFormat} />
        <span>8 chổ</span>
      </div> */}
      <div className='MT10'>
        <span>Ẩn đặt lịch</span>
        <Switch className='switch-container' checked={isShowBooking} onChange={onChangeShowBooking} />
        <span>Hiện đặt lịch</span>
      </div>

      <div className='MT10'>
        <span>Đóng ký gửi online </span>
        <Switch className='switch-container' checked={isShowBookingOnline} onChange={onChangeShowBookingOnline} />
        <span>Mở ký gửi online</span>
      </div>

      <div className='MT10'>
        <TextInput
          title='>Thông báo đóng ký gửi online'
          name='bookingOnlineAlert'
          handleInput={handleInputBookingOnline}
          isTextArea
          value={inputState.bookingOnlineAlert}
          inputStyle='online-booking-input-box'
        />
        <Button onClick={onChangeShowBookingOnlineAlert}>OK</Button>
      </div>

    </div>
  )
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData
})

const mapDispatchToProps = (dispatch) => {
  return {
    setSetting: bindActionCreators(StorageActions.setSetting, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookingSetting))
