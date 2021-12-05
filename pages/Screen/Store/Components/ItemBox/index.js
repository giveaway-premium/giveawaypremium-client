/* eslint-disable react/display-name */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Form, Row, Col, Layout, Input, Button, Spin, Descriptions, Tabs, Table, Image } from 'antd'
import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'
import { showNotification } from 'common/function'
import { LoadingOutlined } from '@ant-design/icons'
import { Router } from 'common/routes'
import { isMobile } from 'react-device-detect'
import './style.scss'
import Lottie from 'react-lottie'
import GapService from 'controller/Api/Services/Gap'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { OBJECTID_CATEGORY } from 'common/constants'

const ItemBox = (props) => {
  const { itemData } = props
  useEffect(() => {
    console.log('itembox - data props - didmount')
    console.log(itemData)
    console.log(itemData.medias)
  }, [])

  return (
    <div className='item-container'>
      <div className='big-avatar-img-box'>
        <Image fallback={images.aLogoBlack} src={itemData.medias[0].data.url} className='big-avatar-img' priority />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData
})

export default withRouter(connect(mapStateToProps, null)(ItemBox))
