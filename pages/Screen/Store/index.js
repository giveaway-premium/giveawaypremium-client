import React from 'react'
import { Router } from 'common/routes'
import ReduxServices from 'common/redux'
import { connect } from 'react-redux'
import { Row, Col, Spin } from 'antd'
import { withRouter } from 'next/router'
import MyModal from 'pages/Components/MyModal'
import comingSoonJson from 'static/Assets/Image/Lottie/comingSoon.json'
import Lottie from 'react-lottie'
import ScrollSpy from 'react-ui-scrollspy'
import 'animate.css'
import { images } from 'config/images'
import useSmoothScroll from 'use-smooth-scroll'
import ScrollToTop from 'react-scroll-to-top'
import GapService from 'controller/Api/Services/Gap'
import _ from 'lodash'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './style.scss'
import { OBJECTID_CATEGORY } from 'common/constants'
import { numberWithCommas, isBottomElement, scrollTop } from 'common/function'
class StoreScreen extends React.PureComponent {
  static async getInitialProps ({ query }) {
    return { query }
  }
  constructor (props) {
    super(props)
    this.state = {
      isLoadInit: false,
      isPaused: true,
      isStopped: true,
      isLoadingPage: false,
      isLoadingMore: false,
      currentPage: 1,
      maxPage: 1,
      key: null,
      limit: 100,
      productList: [],
      currentCategoryId: OBJECTID_CATEGORY.FASHION
    }
    this.myModal = React.createRef()
    this.container = React.createRef()
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
    this.loadingProduct(OBJECTID_CATEGORY.FASHION)
  }

  componentDidUpdate () {
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  throttleScroll = () => {
    _.throttle(this.handleScrollActive, 500)
  }

  handleScroll = (event) => {
    console.log('handleScroll')
    const wrappedElement = document.getElementById('ctn-list-card')
    console.log(wrappedElement)

    if (isBottomElement(wrappedElement)) {
      if (!this.state.isLoadingMore) {
        this.handleScrollActive()
      }
    }
  }

  handleScrollActive = async () => {
    console.log('handleScrollActive')
    const { key, currentPage, limit, currentCategoryId, productList } = this.state
    if (currentPage < this.state.maxPage) {
      this.setState({ isLoadingMore: true })

      const productListRes = await GapService.getProductStore(currentPage + 1, key, limit, currentCategoryId)

      if (productListRes && productListRes.results && productListRes.results.length > 0) {
        const maxPage = Math.ceil(productListRes.count / limit)
        console.log(maxPage)

        this.setState({
          isLoadingMore: false,
          currentPage: currentPage + 1,
          maxPage: maxPage,
          count: productListRes.count || 0,
          productList: [...productList, ...productListRes.results]
        })
        // setIsLoadingPage(false)
      } else {
        this.setState({
          isLoadingMore: false
        })
        // setIsLoadingPage(false)
      }
    }
  }

  loadingProduct = async (categoryId) => {
    const { limit } = this.state
    this.setState({
      isLoadingPage: true
    }, async () => {
      const productList = await GapService.getProductStore(1, null, 100, categoryId)

      if (productList && productList.results && productList.results.length > 0) {
        console.log('productList')
        console.log(productList)
        const maxPage = Math.ceil(productList.count / limit)
        console.log(maxPage)

        setTimeout(() => {
          this.setState({
            isLoadInit: true,
            maxPage: maxPage,
            isLoadingPage: false,
            currentPage: 1,
            count: productList.count || 0,
            productList: [...productList.results]
          })
        }, 300)
        // setIsLoadingPage(false)
      } else {
        setTimeout(() => {
          this.setState({
            isLoadInit: true,
            isLoadingPage: false
          })
        }, 300)
        // setIsLoadingPage(false)
      }
    })
  }

  onPress = (categoryId) => {
    this.setState({
      currentCategoryId: categoryId,
      productList: [],
      currentPage: 1,
      maxPage: 1,
      key: null
    })
    this.loadingProduct(categoryId)
    // e.preventDefault()
    // const target = window.document.getElementById(
    //   e.currentTarget.href.split('#')[1]
    // )
    // if (target) {
    //   target.scrollIntoView({ behavior: 'smooth' })
    // }
  };

  render () {
    const { productList, count, isLoadingPage, currentPage, maxPage, currentCategoryId, isLoadInit, isLoadingMore } = this.state
    // const defaultOptions = {
    //   loop: false,
    //   autoplay: false,
    //   animationData: comingSoonJson
    // }

    console.log('currentPage')
    console.log(currentPage)
    console.log(maxPage)

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
        <a onClick={(e) => this.onPress(categoryId)}>
          <div style={categoryId === currentCategoryId ? { backgroundColor: 'black' } : {}} className={`tag-box ${!isLoadInit ? 'animate__animated animate__fadeIn' : ''}`}>
            <span style={categoryId === currentCategoryId ? { color: '#F5FFFA' } : {}} className='tag-product-content'>{name}</span>
          </div>
        </a>
      )
    }

    return (
      <div className='store-container' ref={this.container}>
        <div className='category-container'>
          <Carousel>
            <TagBox index={0} categoryId='0paqD5jvw3' name='Thời Trang' image={images.chanelBag} />
            <TagBox index={1} categoryId='dNYERCGnBT' name='Túi' image={images.chanelBag} />
            <TagBox index={2} categoryId='YIUniNrIKb' name='Nước Hoa' image={images.chanelBag} />
            <TagBox index={3} categoryId='PtUHtoonRc' name='Giày Dép' image={images.chanelBag} />
            <TagBox index={4} categoryId='OwyMj5kQ2N' name='Mỹ Phẩm' image={images.chanelBag} />
            <TagBox index={5} categoryId='eMxuZ7VdUy' name='Phụ Kiện Trang Điểm' image={images.chanelBag} />
            <TagBox index={6} categoryId='B3OQuAChW1' name='Thiết Bị Làm Đẹp' image={images.chanelBag} />
          </Carousel>
        </div>

        <div className='body-box' id='ctn-list-card'>
          {
            isLoadingPage ? (
              <Skeleton baseColor='#FFFFFF' highlightColor='#F5FFFA' style={{ width: '100vw', height: '100vh' }} enableAnimation />
            ) : (
              <>
                <div className='listItem-box' id='ctn-list-card'>
                  {
                  productList?.length > 0 ? (
                    productList.map((item, key) => {
                      return (
                        <div key={key} className='item-container'>
                          <div className='big-avatar-img-box'>
                            <img src={item && item.medias && item.medias[0] && item.medias[0].data && item.medias[0].data.url ? item.medias[0].data.url : images.aLogoBlack} className='big-avatar-img' />
                            <div className='detail-box'>
                              {item && item.name && <span className='detail-box-name'>{item.name || '--'}</span>}
                              {item && item.price && <span className='detail-box-price'>{numberWithCommas(item.price * 100)} VND</span>}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    (
                      <div className='noitem-box'>
                        <span>Hiện tại chưa có sản phẩm nào</span>
                      </div>
                    )
                  )
                  }
                </div>
                {
                  currentPage < maxPage && (
                    <div className='load-more-button' onClick={this.handleScrollActive}>
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
        </div>

        {/* <div className='test-component-0' /> */}
        {/* <div id='0paqD5jvw3' className='test-component-1'>
          <FashionBox />
        </div>
        <div id='dNYERCGnBT' className='test-component-2'>
          <FashionBox />
        </div>
        <div id='YIUniNrIKb' className='test-component-3'>
          <FashionBox />
        </div>
        <div id='PtUHtoonRc' className='test-component-4'>
          <FashionBox />
        </div>
        <div id='OwyMj5kQ2N' className='test-component-5'>
          <FashionBox />
        </div>
        <div id='eMxuZ7VdUy' className='test-component-6'>
          <FashionBox />
        </div>
        <div id='B3OQuAChW1' className='test-component-7'>
          <FashionBox />
        </div> */}
        {/*
        <Row type='flex' justify='center'>
          <Col span={20} align='center'> */}
        {/* <p className='text text-description MB30'>Chúng tôi dường như không tìm thấy trang bạn đang tìm kiếm</p> */}
        {/* <Lottie
              options={defaultOptions}
              height='100%'
              width='50%'
              speed={0.5}
              isStopped={isStopped}
              isPaused={isPaused}
            /> */}
        {/* <img className='img text-center MB70' src={images.pageNotFound} alt='404 Trang không được tìm thấy' /> */}
        {/* </Col>
        </Row> */}
        <MyModal ref={this.myModal} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData
})

export default withRouter(connect(mapStateToProps)(StoreScreen))
