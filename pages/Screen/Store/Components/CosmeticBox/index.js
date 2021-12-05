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
import { OBJECTID_CATEGORY } from 'common/constants'

const FashionBox = (props) => {
  const [isLoadingPage, setIsLoadingPage] = useState(false)
  const [productList, setProductList] = useState([])
  useEffect(() => {
    loadingProduct()
  }, [])

  const loadingProduct = async () => {
    setIsLoadingPage(true)
    let isLoadingDone = false
    let isAutoOffLoading = true
    const productList = await GapService.getProductStore(1, null, 5, OBJECTID_CATEGORY.FASHION)
    setTimeout(() => {
      if (isLoadingDone) {
        setIsLoadingPage(false)
      } else {
        isAutoOffLoading = false
      }
    }, 1000)
    if (productList && productList.results && productList.results.length > 0) {
      console.log('productList')
      console.log(productList)
      if (isAutoOffLoading) {
        isLoadingDone = true
      } else {
        setIsLoadingPage(false)
      }
      setProductList(productList.results)
      // setIsLoadingPage(false)
    } else {
      if (isAutoOffLoading) {
        isLoadingDone = true
      } else {
        setIsLoadingPage(false)
      }
      // setIsLoadingPage(false)
    }
  }
  return (
    <div className='fashionBox-container'>
      {
        isLoadingPage ? (
          <Skeleton style={{ width: '100vw', height: '100vh' }} enableAnimation />
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
