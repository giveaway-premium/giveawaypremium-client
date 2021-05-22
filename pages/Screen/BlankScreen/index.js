import React from 'react'
import { Router } from 'common/routes'
import ReduxServices from 'common/redux'
import { connect } from 'react-redux'
import { Form, Button } from 'antd'
import { withRouter } from 'next/router'
import { images } from 'config/images'
import { isMobile } from 'react-device-detect'
import MyModal from 'pages/Components/MyModal'
import './style.scss'

class HomeScreen extends React.PureComponent {
  static async getInitialProps ({ query }) {
    return { query }
  }
  constructor (props) {
    super(props)
    this.state = {
      isShow: false,
      data: null
    }
    this.myModal = React.createRef()
  }

  componentDidMount () {

  }

  componentDidUpdate () {
  }

  componentWillUnmount () {
    Router.events.off('routeChangeComplete', this.handleRouteChange)
  }

  // closeModal = () => {
  //   this.myModal.current.closeModal()
  // }

  render () {
    return (
      <div className='container'>
        <MyModal ref={this.myModal} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale
})

export default withRouter(connect(mapStateToProps)(HomeScreen))
