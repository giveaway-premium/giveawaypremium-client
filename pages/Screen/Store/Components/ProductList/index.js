/* eslint-disable react/display-name */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Form, Row, Col, Layout, Input, Button, Spin, Descriptions, Tabs, Table } from 'antd'
import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'
import { numberWithCommas, scrollTop, showNotification } from 'common/function'
import { LoadingOutlined } from '@ant-design/icons'
import { Router } from 'common/routes'
import { isMobile } from 'react-device-detect'
import './style.scss'
import Lottie from 'react-lottie'
import GapService from 'controller/Api/Services/Gap'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { OBJECTID_CATEGORY } from 'common/constants'
// import Image from 'next/image'

const ProductList = (props) => {
  const { productList, currentPage, maxPage, isLoadingMore, handleScrollActive, currentCategoryId } = props

  console.log('productList', productList)

  // useEffect(() => {
  //   scrollTop(80)
  //   window.scrollTo({ top: 80, behavior: 'smooth' })
  // }, [currentCategoryId])

  const onOpenProductScreen = (item) => {
    Router.pushRoute(`/sanpham/${item.objectId}`, { itemData: item })
  }

  return (
    <>
      <div className='listItem-box' id='ctn-list-card'>
        {
      productList?.length > 0 ? (
        productList.map((item, key) => {
          return (
            <div key={key} className='item-container' onClick={() => onOpenProductScreen(item)}>
              <div className='big-avatar-img-box'>
                <img
                  defaultValue={images.aLogoBlack}
                  src={item && item.medias && item.medias[0] && item.medias[0].data && item.medias[0].data.url ? item.medias[0].data.url : images.aLogoBlack}
                  className='big-avatar-img'
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null // prevents looping
                    currentTarget.src = images.aLogoBlack
                  }}
                />
                {/* <img defaultValue={images.aLogoWhite} src={item && item.medias && item.medias[0] && item.medias[0].data && item.medias[0].data.url ? item.medias[0].data.url : images.aLogoBlack} className='big-avatar-img' /> */}
                <div className='detail-box'>
                  {item && item.name && <span className='detail-box-name'>{item.name || '--'}</span>}
                  {item && item.price && <span className='detail-box-price'>{numberWithCommas(item.price * 1000)} ₫</span>}
                  {item && <span className='detail-box-rateNew'>{item.rateNew === 100 ? 'Mới' : 'Đã sử dụng' }</span>}
                </div>
              </div>
            </div>
          )
        })
      ) : (
        (
          <div className='noitem-box animate__animated animate__fadeIn'>
            <span>Hiện tại chưa có sản phẩm</span>
          </div>
        )
      )
        }
      </div>
      {
        currentPage < maxPage && (
          <div className='load-more-button' onClick={handleScrollActive}>
            {
              isLoadingMore ? (
                <Skeleton baseColor='#F5FFFA' highlightColor='#ffffff ' style={{ width: '100%', height: '100%', padding: '5px' }} enableAnimation />
              ) : (
                <span>
                Xem thêm
                </span>
              )
            }
          </div>
        )
      }
  </>
  )
}

export default ProductList
