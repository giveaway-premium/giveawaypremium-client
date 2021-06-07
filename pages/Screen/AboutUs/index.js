import React from 'react'
import { Router } from 'common/routes'
import ReduxServices from 'common/redux'
import { connect } from 'react-redux'
import { Form, Button, Timeline } from 'antd'
import { withRouter } from 'next/router'
import { images } from 'config/images'
import { isMobile } from 'react-device-detect'
import MyModal from 'pages/Components/MyModal'
import Typist from 'react-typist'
import ImageGallery from 'react-image-gallery'
import Lottie from 'react-lottie'
import phoneJson from 'static/Assets/Image/Lottie/phone.json'
import locationJson from 'static/Assets/Image/Lottie/location.json'
import './style.scss'
import { LoadingOutlined, PhoneOutlined } from '@ant-design/icons'

const imagesPhoto = [
  {
    original: images.aLogoBlack,
    thumbnail: images.aLogoBlack
  },
  {
    original: images.store1,
    thumbnail: images.store1
  },
  {
    original: images.store2,
    thumbnail: images.store2
  },
  {
    original: images.store3,
    thumbnail: images.store3
  },
  {
    original: images.store4,
    thumbnail: images.store5
  },
  {
    original: images.store6,
    thumbnail: images.store6
  },
  {
    original: images.store7,
    thumbnail: images.store7
  },
  // {
  //   original: images.store8,
  //   thumbnail: images.store8
  // },
  {
    original: images.store8,
    thumbnail: images.store8
  },
  {
    original: images.store9,
    thumbnail: images.store9
  },
  // {
  //   original: images.store10,
  //   thumbnail: images.store10
  // },
  // {
  //   original: images.store11,
  //   thumbnail: images.store11
  // },
  {
    original: images.store12,
    thumbnail: images.store12
  },
  {
    original: images.store13,
    thumbnail: images.store13
  },
  {
    original: images.store14,
    thumbnail: images.store14
  },
  {
    original: images.store15,
    thumbnail: images.store15
  },
  {
    original: images.store16,
    thumbnail: images.store16
  },
  {
    original: images.store17,
    thumbnail: images.store17
  },
  {
    original: images.store18,
    thumbnail: images.store18
  },
  {
    original: images.store19,
    thumbnail: images.store19
  },
  {
    original: images.store20,
    thumbnail: images.store20
  },
  {
    original: images.store21,
    thumbnail: images.store21
  },
  {
    original: images.store22,
    thumbnail: images.store22
  },
  {
    original: images.store23,
    thumbnail: images.store23
  },
  {
    original: images.store24,
    thumbnail: images.store24
  },
  {
    original: images.store25,
    thumbnail: images.store15
  },
  {
    original: images.store26,
    thumbnail: images.store26
  },
  {
    original: images.store27,
    thumbnail: images.store27
  },
  {
    original: images.store28,
    thumbnail: images.store28
  },
  {
    original: images.store29,
    thumbnail: images.store29
  }
]

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

    const defaultOptions1 = {
      loop: false,
      autoplay: false,
      animationData: phoneJson
    }

    const defaultOptions2 = {
      loop: false,
      autoplay: false,
      animationData: locationJson
    }

    return (
      <div className='aboutUs-page-container'>
        <div className='home-page-wrapper'>
          <div className='main-content radius-bottom'>
            <div className='wrapper'>
              <div className={'box-content-introduce' + (isShowSectionOne ? ' show' : '')}>
                <h2 className='text text-center text-color-0 txt-big-intro MB30'>Give Away</h2>
                <h2 className='text text-left text-color-10 txt-small-intro MB15'>{`Thời trang bền vững là một khái niệm vĩ mô trong những lần đầu bạn nghe đến, thế nhưng trong vai trò một khách hàng thông minh, chúng ta có rất nhiều cách đơn giản nhằm hưởng ứng tinh thần từ chủ nghĩa tái sử dụng. Thời trang bền vững - thương hiệu sẽ tập trung vào việc mang đến các sản phẩm sử dụng chất liệu xanh, chất liệu hữu cơ hay tái chế, hoặc cắt giảm những chất thải phát sinh trong quá trình sản xuất và vận chuyển. Việc tái sử dụng thì khác - tập trung kéo dài tuổi thọ của vật chất, sản phẩm. Nhằm loại bỏ mọi tác động tiêu cực đến môi trường.`}</h2>
                <h2 className='text text-left text-color-10 txt-small-intro MB15'>{`Đến thời điểm hiện tại, chuỗi Give Away đã có mặt tại Quận 1, Quận 3, Quận 10, Quận 7, Bình Thạnh, Gò Vấp, Tân Phú, Thủ Đức và các tỉnh thành khác như Biên Hoà, Bình Dương, Đà Nẵng.\n
                  Give Away có ba phân khúc chính:\n
                  - Give Away dành cho Học Sinh Sinh Viên\n
                  - Give Away Kid dành cho Mẹ và Bé\n
                  - Give Away Premium chuyên thanh lý sản phẩm cao cấp, chính hãng`}</h2>
                <h2 className='text text-left text-color-10 txt-small-intro MB15'>Là cộng đồng tái sử dụng đầu tiên và lớn nhất Việt Nam với hơn một triệu người dùng - Give Away giúp các sản phẩm thanh lý nhanh chóng tìm được chủ mới phù hợp. Chính sách ký gửi rõ ràng và uy tín, đã đến lúc giải phóng tủ đồ của bạn. Tạo dòng tiền quay trở lại từ việc mua sắm bằng cách tham gia Give Away ngay hôm nay.</h2>
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

          <div className='bg-white PT40'>
            <div className='main-content full-height'>
              <div className='wrapper flex align-center direction-column justify-between'>
                <Timeline className='' mode='alternate'>
                  <Timeline.Item style={{ minHeight: '100px' }}>
                    <span className='text text-center text-color-0 text-year'>2013</span>
                    <br />
                    <span className='text text-center text-color-0 text-timeline'>Hoạt động mô hình ký gửi sản phẩm thời trang cũ dưới danh nghĩa cá nhân. Với mong muốn tái sử dụng thời trang cùng các bạn nữ trẻ, truyền tải xu hướng sống và tiết kiệm</span>
                  </Timeline.Item>
                  <Timeline.Item style={{ minHeight: '100px' }}>
                    <span className='text text-center text-color-0 text-year'>2014</span>
                    <br />
                    <span className='text text-center text-color-0 text-timeline '>Cửa hàng Give Away đầu tiên ra đời</span>
                  </Timeline.Item>
                  <Timeline.Item style={{ minHeight: '100px' }}>
                    <span className='text text-center text-color-0 text-year'>2015</span>
                    <br />
                    <span className='text text-center text-color-0 text-timeline '>Give Away mở rộng chuỗi cửa hàng. Phân khúc chính học sinh sinh viên</span>
                  </Timeline.Item>
                  <Timeline.Item style={{ minHeight: '100px' }}>
                    <span className='text text-center text-color-0 text-year'>2016</span>
                    <br />
                    <span className='text text-center text-color-0 text-timeline '>Give Away mở rộng phân khúc tái sử dụng thời trang cao cấp, ngoài nhận ký gửi từ cá nhân, chuỗi còn giải quyết tồn kho/ hàng lỗi từ các trung tâm thương mại, nhà sản xuất, nhà thiết kế thời trang...</span>
                  </Timeline.Item>
                  <Timeline.Item style={{ minHeight: '100px' }}>
                    <span className='text text-center text-color-0 text-year'>2017</span>
                    <br />
                    <span className='text text-center text-color-0 text-timeline '>Give Away mở rộng phân khúc tái sử dụng thời trang trẻ em</span>
                  </Timeline.Item>
                  <Timeline.Item style={{ minHeight: '100px' }}>
                    <span className='text text-center text-color-0 text-year'>2018</span>
                    <br />
                    <span className='text text-center text-color-0 text-timeline '>Cập nhật công nghệ chiếu tia UV tiệt trùng cho các áo quần đã qua sử dụng</span>
                  </Timeline.Item>
                  <Timeline.Item style={{ minHeight: '100px' }}>
                    <span className='text text-center text-color-0 text-year'>2019</span>
                    <br />
                    <span className='text text-center text-color-0 text-timeline '>Mở rộng phân khúc Luxury - hàng hiệu cao cấp. Cập nhật công nghệ Entrupy - ứng dụng trí tuệ nhân tạo phân biệt hàng giả. Đồng thời cập nhật dịch vụ vệ sinh túi xách</span>
                  </Timeline.Item>
                </Timeline>
                {/* <img src={images.timeLine} className='time-line' /> */}
              </div>
            </div>
          </div>

          <div className={'bg-black' + (isShowSectionTwo ? ' show' : '')}>
            <div className='main-content full-height'>
              <div className='wrapper flex align-center direction-column justify-between'>
                <ImageGallery autoPlay style={{ maxWidth: '96vw' }} items={imagesPhoto} />
              </div>
            </div>
          </div>

          <div className='footer-aboutus'>
            <div className='flex MB20'>
              <img src={images.phoneIcon} className='icon-footer MR10' />
              <span>0703334443</span>
            </div>

            <div className='flex MB10'>
              <img src={images.markerIcon} className='icon-footer MR10' />
              <span>
                {`1 Phó Đức Chính, Phường Nguyễn Thái Bình, Quận 1, Hồ Chí Minh.`}
              </span>
            </div>

            <div className='line-footer' />
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
