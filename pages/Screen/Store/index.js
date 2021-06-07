import React from 'react'
import { Router } from 'common/routes'
import ReduxServices from 'common/redux'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import { withRouter } from 'next/router'
import MyModal from 'pages/Components/MyModal'
import comingSoonJson from 'static/Assets/Image/Lottie/comingSoon.json'
import Lottie from 'react-lottie'

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
    setTimeout(() => {
      this.setState({
        isPaused: false,
        isStopped: false
      })
    }, 1000)
  }

  componentDidUpdate () {
  }

  componentWillUnmount () {
  }

  render () {
    const { isPaused, isStopped } = this.state
    const defaultOptions = {
      loop: false,
      autoplay: false,
      animationData: comingSoonJson
    }
    return (
      <div className='store-container'>
        <Row type='flex' justify='center'>
          <Col span={20} align='center'>
            {/* <p className='text text-description MB30'>Chúng tôi dường như không tìm thấy trang bạn đang tìm kiếm</p> */}
            <Lottie
              options={defaultOptions}
              height='100%'
              width='50%'
              speed={0.5}
              isStopped={isStopped}
              isPaused={isPaused}
            />
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
