/* eslint-disable react/display-name */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Form, Row, Col, Layout, Input, Button, Spin, Descriptions, Tabs, Table, Switch } from 'antd'
import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'
import { showNotification } from 'common/function'
import { LoadingOutlined } from '@ant-design/icons'
import { Router } from 'common/routes'
import { isMobile } from 'react-device-detect'
import './style.scss'
import Lottie from 'react-lottie'
import GapService from 'controller/Api/Services/Gap'
import ConfigConsignmentId from './Components/ConfigConsignmentId'
import BookingSetting from './Components/BookingSetting'

const SettingScreen = (props) => {
  return (
    <div className='settingScreen-container'>
      <span className='title-setting'>Mã ký gửi</span>
      <ConfigConsignmentId />
      <span className='title-setting'>Đặt Lịch</span>
      <BookingSetting />
    </div>
  )
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData
})

export default withRouter(connect(mapStateToProps, null)(SettingScreen))
