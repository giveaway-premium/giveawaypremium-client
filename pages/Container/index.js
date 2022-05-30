import React, { PureComponent } from 'react'
import ReduxServices from 'common/redux'
import { connect } from 'react-redux'
import { Detector } from 'common/components/InternetDetect'
import { Layout, Row, Col } from 'antd'
import { isMobile } from 'react-device-detect'
import Header from './Header'
import innerHeight from 'ios-inner-height'
import './style.scss'
const { Content } = Layout

class BaseContainer extends PureComponent {
  componentDidMount () {
    (function () {
      // Add event listener
      document.addEventListener('mousemove', parallax)
      const elem = document.querySelector('#parallax')
      // Magic happens here
      function parallax (e) {
        let _w = window.innerWidth / 2
        let _h = window.innerHeight / 2
        let _mouseX = e.clientX
        let _mouseY = e.clientY
        let _depth1 = `${50 - (_mouseX - _w) * 0.003}% ${50 - (_mouseY - _h) * 0.003}%`
        let _depth2 = `${50 - (_mouseX - _w) * 0.003}% ${50 - (_mouseY - _h) * 0.003}%`
        let _depth3 = `${25 - (_mouseX - _w) * 0.004}% ${70 - (_mouseY - _h) * 0.002}%`
        let x = `${_depth3}, ${_depth2}, ${_depth1}`
        // console.log(x)
        elem.style.backgroundPosition = x
      }
    })()

    setTimeout(() => {
      const elem = document.querySelector('#parallax')
      if (elem) {
        elem.style.transition = 'all 1s'
        elem.style.opacity = 1
      }
    }, 1000)
  }
  render () {
    return (
      <div className='main-base-container'>
        <div id='parallax' />
        <Header />
        <div className='contentLayout' style={{ minHeight: isMobile && innerHeight }}>
          {this.props.children}
        </div>
        {/* <Row type='flex' justify='center'>
              <Col span={24}>
                <div className='base-container'>{this.props.children}</div>
              </Col>
            </Row> */}
        {/* <Footer /> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale
})

export default connect(mapStateToProps)(BaseContainer)
