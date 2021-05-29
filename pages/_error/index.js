import React from 'react'
import { Router } from 'common/routes'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'antd'
import { images } from 'config/images'
import './style.scss'
import Lottie from 'react-lottie'

class Error404Screen extends React.PureComponent {
  backToHome = () => {
    Router.pushRoute('/')
  }

  render () {
    const { messages } = this.props.locale

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: images.pageNotFoundJson
    }

    return (
      <div className='error-page-container'>
        <div className='wrapper PT50 PB50 text text-center'>
          <Row type='flex' justify='center'>
            <Col span={24}>
              <h2 className='text text-title MB30'>404 Trang không được tìm thấy</h2>
            </Col>
          </Row>
          <Row type='flex' justify='center'>
            <Col span={20} align='center'>
              {/* <p className='text text-description MB30'>Chúng tôi dường như không tìm thấy trang bạn đang tìm kiếm</p> */}
              <Lottie
                options={defaultOptions}
                height='100%'
                width='50%'
                isStopped={false}
                isPaused={false}
              />
              {/* <img className='img text-center MB70' src={images.pageNotFound} alt='404 Trang không được tìm thấy' /> */}
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locale: state.locale
})

export default connect(mapStateToProps)(Error404Screen)
