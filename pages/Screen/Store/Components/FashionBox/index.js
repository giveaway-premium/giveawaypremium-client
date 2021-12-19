/* eslint-disable react/display-name */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'
import { showNotification } from 'common/function'
import { LoadingOutlined } from '@ant-design/icons'
import { Router } from 'common/routes'
import { isMobile } from 'react-device-detect'
import './style.scss'
import Lottie from 'react-lottie'
import GapService from 'controller/Api/Services/Gap'
import ItemBox from '../ItemBox'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { OBJECTID_CATEGORY } from 'common/constants'

const FashionBox = (props) => {
  const [isLoadingPage, setIsLoadingPage] = useState(false)
  const [productList, setProductList] = useState([])
  const [productCount, setProductCount] = useState(0)

  useEffect(() => {
    loadingProduct()
  }, [])

  const loadingProduct = async () => {
    setIsLoadingPage(true)
    let isLoadingDone = false
    let isAutoOffLoading = true
    const productList = await GapService.getProductStore(1, null, 100, OBJECTID_CATEGORY.FASHION)
    setTimeout(() => {
      if (isLoadingDone) {
        setIsLoadingPage(false)
      } else {
        isAutoOffLoading = false
      }
    }, 500)
    if (productList && productList.results && productList.results.length > 0) {
      console.log('productList')
      console.log(productList)
      if (isAutoOffLoading) {
        isLoadingDone = true
      } else {
        setIsLoadingPage(false)
      }
      setProductList(productList.results)
      productList.count >= 0 && setProductCount(productList.count)
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
          <div className='fashionBox-container-inner'>
            <div className='top-box'>
              <div className='top-box-left'>
                <div>
                  <span>
                  Thời trang
                  </span>
                </div>

                <div>
                  <span>
                    {productCount} sản phẩm
                  </span>
                </div>
              </div>
              <div className='top-box-right'>
                <ItemBox itemData={productList[0]} isTheLastestItem />
                <ItemBox itemData={productList[0]} isTheHotestItem />
                <ItemBox itemData={productList[0]} isTheLastestItem />
              </div>

            </div>
            <div className='bottom-box'>
              {/* {
                productList.map((item, index) => <ItemBox key={index} itemData={item} />)
              } */}
              <ItemBox itemData={productList[0]} />
              <ItemBox itemData={productList[0]} />
              <ItemBox itemData={productList[0]} />
              <ItemBox itemData={productList[0]} />
              <ItemBox itemData={productList[0]} />
              <ItemBox itemData={productList[0]} />
              <ItemBox itemData={productList[0]} />
              <ItemBox itemData={productList[0]} />
              <ItemBox itemData={productList[0]} />
              <ItemBox itemData={productList[0]} />
            </div>

          </div>
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
