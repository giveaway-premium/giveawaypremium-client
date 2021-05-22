import React from 'react'
import { Router } from 'common/routes'
import ReduxServices from 'common/redux'
import { connect } from 'react-redux'
import { Form, Button } from 'antd'
import { withRouter } from 'next/router'
import { images } from 'config/images'
import { isMobile } from 'react-device-detect'
import MyModal from 'pages/Components/MyModal'
import Typist from 'react-typist'

import './style.scss'

class AboutUsScreen extends React.PureComponent {
  static async getInitialProps ({ query }) {
    return { query }
  }
  constructor (props) {
    super(props)
    this.state = {
      isShowSectionOne: false,
      isShowSectionTwo: false
    }
    this.myModal = React.createRef()
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        isShowSectionOne: true,
        isShowSectionTwo: true
      })
    }, 100)
  }
  componentDidUpdate () {
  }

  componentWillUnmount () {
  }

  // closeModal = () => {
  //   this.myModal.current.closeModal()
  // }

  render () {
    const { isShowSectionOne, isShowSectionTwo } = this.state

    return (
      <div className='home-page-container'>
        <div className='home-page-wrapper'>
          <div className='main-content radius-bottom'>
            <div className='wrapper'>
              <div className={'box-content-introduce' + (isShowSectionOne ? ' show' : '')}>
                <h2 className='text text-center text-color-0 txt-big-intro MB30'>Give Away</h2>
                <h2 className='text text-left text-color-10 txt-small-intro MB15'>{`Là cộng đồng tái sử dụng đầu tiên và lớn nhất Việt Nam với hơn một triệu người dùng \nGive Away giúp các sản phẩm thanh lý nhanh chóng tìm được chủ mới phù hợp \nChính sách ký gửi rõ ràng và uy tín.`}</h2>
       
                <h2 className='text text-left text-color-10 txt-small-intro MB15'>Chúng tôi luôn hướng tới mục tiêu Thời Trang Bền Vững. Vậy đó là gì ?</h2>
                <h2 className='text text-left text-color-10 txt-small-intro MB15'>{`Thời trang bền vững - thương hiệu sẽ tập trung vào việc mang đến các sản phẩm sử dụng chất liệu xanh, chất liệu hữu cơ hay tái chế, hoặc cắt giảm những chất thải phát sinh trong quá trình sản xuất và vận chuyển. Việc tái sử dụng thì khác - tập trung kéo dài tuổi thọ của vật chất, sản phẩm. Nhằm loại bỏ mọi tác động tiêu cực đến môi trường.`}</h2>
                <h2 className='text text-left text-color-10 txt-small-intro MB15'>Thời trang bền vững là một khái niệm vĩ mô trong những lần đầu bạn nghe đến, thế nhưng trong vai trò một khách hàng thông minh, chúng ta có rất nhiều cách đơn giản nhằm hưởng ứng tinh thần từ chủ nghĩa tái sử dụng.</h2>
              </div>
            </div>
          </div>

          <div className={'bg-black' + (isShowSectionTwo ? ' show' : '')}>
            <div className='main-content full-height'>
              <div className='wrapper flex align-center direction-column justify-between'>
                <div className={'box-content-introduce' + (isShowSectionOne ? ' show' : '')}>
                  <h2 className='text txt-small-intro text-color-5 text-center'>{`\nFounder Give Away Lê Diệp Hồng Loan \n đã lan toả ý tưởng từ năm 2013`}</h2>
                </div>
                <img src={images.founderAvatar} className='founder-avatar' />
              </div>
            </div>
          </div>

          <div className='bg-white'>
            <div className='main-content full-height'>
              <div className='wrapper flex align-center direction-column justify-between'>
                <img src={images.timeLine} className='time-line' />
              </div>
            </div>
          </div>

        </div>
        <MyModal ref={this.myModal} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData
})

export default withRouter(connect(mapStateToProps)(AboutUsScreen))
