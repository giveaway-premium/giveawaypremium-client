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

const TagBoxList = (props) => {
  const { currentCategoryId = '0paqD5jvw3', isLoadInit, onPresstTag } = props
  const tagIDArr = [
    {
      id: '0paqD5jvw3',
      title: 'Thời Trang'
    },
    {
      id: 'dNYERCGnBT',
      title: 'Túi'
    },
    {
      id: 'YIUniNrIKb',
      title: 'Nước Hoa'
    },
    {
      id: 'PtUHtoonRc',
      title: 'Giày Dép'
    },
    {
      id: 'OwyMj5kQ2N',
      title: 'Mỹ Phẩm'
    },
    {
      id: 'eMxuZ7VdUy',
      title: 'Phụ Kiện Trang Điểm'
    },
    {
      id: 'B3OQuAChW1',
      title: 'Thiết Bị Làm Đẹp'
    }
  ]

  let currentTagBoxIndex = 0
  const currentTagBox = tagIDArr.filter((item, itemIndex) => {
    if (item.id === currentCategoryId) {
      currentTagBoxIndex = itemIndex
      return true
    } else {
      return false
    }
  })[0]
  console.log('currentTagBox', currentTagBox)
  console.log('currentTagBoxIndex', currentTagBoxIndex)

  tagIDArr.splice(currentTagBoxIndex, 1)
  console.log('tagIDArr', tagIDArr)

  tagIDArr.unshift(currentTagBox)

  console.log('tagIDArr', tagIDArr)

  const Carousel = ({ children }) => {
    return (
      <div className='category-container-box'>
        {children}
      </div>
    )
  }

  const TagBox = ({ categoryId, image, name, index }) => {
    return (
      // <a onClick={(e) => this.onPress(categoryId)} href={`#${categoryId}`}>
      <a onClick={(e) => onPresstTag(categoryId, e)}>
        <div style={categoryId === currentCategoryId ? { backgroundColor: 'black' } : {}} className={`tag-box ${!isLoadInit ? 'animate__animated animate__fadeIn' : ''}`}>
          <span style={categoryId === currentCategoryId ? { color: '#F5FFFA' } : {}} className='tag-product-content'>{name}</span>
        </div>
      </a>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <Carousel>
        {
          tagIDArr.map((boxItem, boxIndex) => {
            return (
              <TagBox key={boxIndex} index={boxIndex} categoryId={boxItem.id} name={boxItem.title} />
            )
          })
        }
        {/* <TagBox index={0} categoryId='0paqD5jvw3' name='Thời Trang' image={images.chanelBag} />
        <TagBox index={1} categoryId='dNYERCGnBT' name='Túi' image={images.chanelBag} />
        <TagBox index={2} categoryId='YIUniNrIKb' name='Nước Hoa' image={images.chanelBag} />
        <TagBox index={3} categoryId='PtUHtoonRc' name='Giày Dép' image={images.chanelBag} />
        <TagBox index={4} categoryId='OwyMj5kQ2N' name='Mỹ Phẩm' image={images.chanelBag} />
        <TagBox index={5} categoryId='eMxuZ7VdUy' name='Phụ Kiện Trang Điểm' image={images.chanelBag} />
        <TagBox index={6} categoryId='B3OQuAChW1' name='Thiết Bị Làm Đẹp' image={images.chanelBag} /> */}
      </Carousel>
    </div>
  )
}

export default TagBoxList
