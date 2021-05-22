import React from 'react'
import { Router } from 'common/routes'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'antd'
import { images } from 'config/images'
import './style.scss'

class Error404Screen extends React.PureComponent {
  backToHome = () => {
    Router.pushRoute('/')
  }
  render () {
    const { messages } = this.props.locale
    return (
      <div className='error-page-container'>
        <div className='wrapper PT50 PB50 text text-center'>
          <Row type='flex' justify='center'>
            <Col span={24}>
              <h2 className='text text-title MB30'>{messages.errors.pageNotFound}</h2>
            </Col>
          </Row>
          <Row type='flex' justify='center'>
            <Col span={20} align='center'>
              <p className='text text-description MB30'>{messages.errors.weCanNotSeem}</p>
              <img className='img text-center MB70' src={images.pageNotFound} alt='404 Page Not Found' />
            </Col>
          </Row>
          <Row type='flex' justify='center'>
            <Button type='primary' className='ant-big-btn' onClick={this.backToHome}>{messages.common.backToHome}</Button>
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
