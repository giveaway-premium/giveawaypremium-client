import React from 'react'
import { Router } from 'common/routes'
import ReduxServices from 'common/redux'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import { withRouter } from 'next/router'
import MyModal from 'pages/Components/MyModal'
import comingSoonJson from 'static/Assets/Image/Lottie/comingSoon.json'
import Lottie from 'react-lottie'
import ScrollSpy from 'react-ui-scrollspy'
import 'animate.css'
import { images } from 'config/images'
import useSmoothScroll from 'use-smooth-scroll'
import ScrollToTop from 'react-scroll-to-top'

import FashionBox from './Components/FashionBox'
import BagBox from './Components/BagBox'
import PerfumeBox from './Components/PerfumeBox'
import CosmeticBox from './Components/CosmeticBox'
import AccessoriesBox from './Components/AccessoriesBox'
import MachineBox from './Components/MachineBox'
import ShoesBox from './Components/ShoesBox'

import './style.scss'

class StoreScreen extends React.PureComponent {
  static async getInitialProps ({ query }) {
    return { query }
  }
  constructor (props) {
    super(props)
    this.state = {
      isPaused: true,
      isStopped: true
    }
    this.myModal = React.createRef()
  }

  componentDidMount () {
    // setTimeout(() => {
    //   this.setState({
    //     isPaused: false,
    //     isStopped: false
    //   })
    // }, 1000)
  }

  componentDidUpdate () {
  }

  componentWillUnmount () {
  }

  onPress = (e) => {
    e.preventDefault()
    const target = window.document.getElementById(
      e.currentTarget.href.split('#')[1]
    )
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  };

  render () {
    const { isPaused, isStopped } = this.state
    // const defaultOptions = {
    //   loop: false,
    //   autoplay: false,
    //   animationData: comingSoonJson
    // }

    const Carousel = ({ children }) => {
      return (
        <div className='category-container-box'>
          {children}
        </div>
      )
    }

    const TagBox = ({ categoryId, image, name, index }) => {
      return (
        <a onClick={(e) => this.onPress(e)} href={`#${categoryId}`}>
          <div className={`tag-box animate__animated animate__fadeIn`}>
            <span className='tag-product-content'>{name}</span>

            {/* <img src={images.tagCate} className='tag-img' /> */}
            {/* <div className='tag-product-box-content'>
              <p className='tag-product-content'>{name}</p>
              <img src={image} className='tag-img-product' />
            </div> */}
          </div>
        </a>
      )
    }

    return (
      <div className='store-container'>
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
        <div className='test-component-0' />
        <div id='0paqD5jvw3' className='test-component-1'>
          <FashionBox />
        </div>
        <div id='dNYERCGnBT' className='test-component-2'>
          {/* <BagBox /> */}
          <FashionBox />
        </div>
        <div id='YIUniNrIKb' className='test-component-3'>
          {/* <PerfumeBox /> */}
          <FashionBox />
        </div>
        <div id='PtUHtoonRc' className='test-component-4'>
          {/* <ShoesBox /> */}
          <FashionBox />
        </div>
        <div id='OwyMj5kQ2N' className='test-component-5'>
          {/* <CosmeticBox /> */}
          <FashionBox />
        </div>
        <div id='eMxuZ7VdUy' className='test-component-6'>
          {/* <AccessoriesBox /> */}
          <FashionBox />
        </div>
        <div id='B3OQuAChW1' className='test-component-7'>
          {/* <MachineBox /> */}
          <FashionBox />
        </div>

        <Row type='flex' justify='center'>
          <Col span={20} align='center'>
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
          </Col>
        </Row>
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
