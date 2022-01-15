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

const BookingSetting = (props) => {
  const { setSetting } = props
  const [show, setShow] = useState(true)

  useEffect(() => {
    let isShowEightSlot = ReduxServices.getSettingWithKey('IS_SHOW_BOOKINGFORM_EIGHT_SLOT', 'true')
    console.log('isShowEightSlot')
    console.log(isShowEightSlot)

    if (isShowEightSlot === 'true' || isShowEightSlot === true) {
      // do nothing
    } else {
      setShow(false)
    }
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

  return (
    <div className='bookingSetting-container'>
      <span>18 chổ</span>
      <Switch className='switch-container' checked={show} onChange={onChangeBookingFormat} />
      <span>8 chổ</span>
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
