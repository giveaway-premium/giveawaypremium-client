/* eslint-disable react/display-name */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Form, Row, Col, Layout, Input, Button, Spin, Descriptions, Tabs, Table } from 'antd'
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

const FashionBox = (props) => {
  const [isLoadingPage, setIsLoadingPage] = useState(false)
  const [productList, setProductList] = useState([])
  useEffect(() => {
    loadingProduct()
  }, [])

  const loadingProduct = () => {
    setIsLoadingPage(true)
    // setProductList()
    // setIsLoadingPage(false)
  }

  return (
    <div className='fashionBox-container'>
      {
        isLoadingPage ? (
          <span>123</span>
        ) : (
          <div>123</div>
        )
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData
})

export default withRouter(connect(mapStateToProps, null)(FashionBox))
