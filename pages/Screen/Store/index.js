import React from 'react'
import { Router } from 'common/routes'
import ReduxServices from 'common/redux'
import { connect } from 'react-redux'
import { Form, Button } from 'antd'
import { withRouter } from 'next/router'
import MyModal from 'pages/Components/MyModal'

import './style.scss'

class StoreScreen extends React.PureComponent {
  static async getInitialProps ({ query }) {
    return { query }
  }
  constructor (props) {
    super(props)
    this.state = {}
    this.myModal = React.createRef()
  }

  componentDidMount () {

  }
  componentDidUpdate () {
  }

  componentWillUnmount () {
  }

  render () {
    return (
      <div className='store-container'>
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
