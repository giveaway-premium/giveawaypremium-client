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
                <h2 className='text text-left text-color-10 txt-small-intro MB15'>{`Th???i trang b???n v???ng l?? m???t kh??i ni???m v?? m?? trong nh???ng l???n ?????u b???n nghe ?????n, th??? nh??ng trong vai tr?? m???t kh??ch h??ng th??ng minh, ch??ng ta c?? r???t nhi???u c??ch ????n gi???n nh???m h?????ng ???ng tinh th???n t??? ch??? ngh??a t??i s??? d???ng. Th???i trang b???n v???ng - th????ng hi???u s??? t???p trung v??o vi???c mang ?????n c??c s???n ph???m s??? d???ng ch???t li???u xanh, ch???t li???u h???u c?? hay t??i ch???, ho???c c???t gi???m nh???ng ch???t th???i ph??t sinh trong qu?? tr??nh s???n xu???t v?? v???n chuy???n. Vi???c t??i s??? d???ng th?? kh??c - t???p trung k??o d??i tu???i th??? c???a v???t ch???t, s???n ph???m. Nh???m lo???i b??? m???i t??c ?????ng ti??u c???c ?????n m??i tr?????ng.`}</h2>
                <h2 className='text text-left text-color-10 txt-small-intro MB15'>{`?????n th???i ??i???m hi???n t???i, chu???i Give Away ???? c?? m???t t???i Qu???n 1, Qu???n 3, Qu???n 10, Qu???n 7, B??nh Th???nh, G?? V???p, T??n Ph??, Th??? ?????c v?? c??c t???nh th??nh kh??c nh?? Bi??n Ho??, B??nh D????ng, ???? N???ng.\n
                  Give Away c?? ba ph??n kh??c ch??nh:\n
                  - Give Away d??nh cho H???c Sinh Sinh Vi??n\n
                  - Give Away Kid d??nh cho M??? v?? B??\n
                  - Give Away Premium chuy??n thanh l?? s???n ph???m cao c???p, ch??nh h??ng`}</h2>
                <h2 className='text text-left text-color-10 txt-small-intro MB15'>L?? c???ng ?????ng t??i s??? d???ng ?????u ti??n v?? l???n nh???t Vi???t Nam v???i h??n m???t tri???u ng?????i d??ng - Give Away gi??p c??c s???n ph???m thanh l?? nhanh ch??ng t??m ???????c ch??? m???i ph?? h???p. Ch??nh s??ch k?? g???i r?? r??ng v?? uy t??n, ???? ?????n l??c gi???i ph??ng t??? ????? c???a b???n. T???o d??ng ti???n quay tr??? l???i t??? vi???c mua s???m b???ng c??ch tham gia Give Away ngay h??m nay.</h2>
              </div>
            </div>
          </div>

          <div className={'bg-black' + (isShowSectionTwo ? ' show' : '')}>
            <div className='main-content full-height'>
              <div className='wrapper flex align-center direction-column justify-between'>
                <div className={'box-content-introduce' + (isShowSectionOne ? ' show' : '')}>
                  <h2 className='text txt-small-intro text-color-5 text-center'>{`\nFounder Give Away L?? Di???p H???ng Loan \n ???? lan to??? ?? t?????ng t??? n??m 2013`}</h2>
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
                    <span className='text text-center text-color-0 text-timeline'>Ho???t ?????ng m?? h??nh k?? g???i s???n ph???m th???i trang c?? d?????i danh ngh??a c?? nh??n. V???i mong mu???n t??i s??? d???ng th???i trang c??ng c??c b???n n??? tr???, truy???n t???i xu h?????ng s???ng v?? ti???t ki???m</span>
                  </Timeline.Item>
                  <Timeline.Item style={{ minHeight: '100px' }}>
                    <span className='text text-center text-color-0 text-year'>2014</span>
                    <br />
                    <span className='text text-center text-color-0 text-timeline '>C???a h??ng Give Away ?????u ti??n ra ?????i</span>
                  </Timeline.Item>
                  <Timeline.Item style={{ minHeight: '100px' }}>
                    <span className='text text-center text-color-0 text-year'>2015</span>
                    <br />
                    <span className='text text-center text-color-0 text-timeline '>Give Away m??? r???ng chu???i c???a h??ng. Ph??n kh??c ch??nh h???c sinh sinh vi??n</span>
                  </Timeline.Item>
                  <Timeline.Item style={{ minHeight: '100px' }}>
                    <span className='text text-center text-color-0 text-year'>2016</span>
                    <br />
                    <span className='text text-center text-color-0 text-timeline '>Give Away m??? r???ng ph??n kh??c t??i s??? d???ng th???i trang cao c???p, ngo??i nh???n k?? g???i t??? c?? nh??n, chu???i c??n gi???i quy???t t???n kho/ h??ng l???i t??? c??c trung t??m th????ng m???i, nh?? s???n xu???t, nh?? thi???t k??? th???i trang...</span>
                  </Timeline.Item>
                  <Timeline.Item style={{ minHeight: '100px' }}>
                    <span className='text text-center text-color-0 text-year'>2017</span>
                    <br />
                    <span className='text text-center text-color-0 text-timeline '>Give Away m??? r???ng ph??n kh??c t??i s??? d???ng th???i trang tr??? em</span>
                  </Timeline.Item>
                  <Timeline.Item style={{ minHeight: '100px' }}>
                    <span className='text text-center text-color-0 text-year'>2018</span>
                    <br />
                    <span className='text text-center text-color-0 text-timeline '>C???p nh???t c??ng ngh??? chi???u tia UV ti???t tr??ng cho c??c ??o qu???n ???? qua s??? d???ng</span>
                  </Timeline.Item>
                  <Timeline.Item style={{ minHeight: '100px' }}>
                    <span className='text text-center text-color-0 text-year'>2019</span>
                    <br />
                    <span className='text text-center text-color-0 text-timeline '>M??? r???ng ph??n kh??c Luxury - h??ng hi???u cao c???p. C???p nh???t c??ng ngh??? Entrupy - ???ng d???ng tr?? tu??? nh??n t???o ph??n bi???t h??ng gi???. ?????ng th???i c???p nh???t d???ch v??? v??? sinh t??i x??ch</span>
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
              <img src={images.markerIcon} className='icon-footer MR10' />
              <span>
                {`1 Ph?? ?????c Ch??nh, Ph?????ng Nguy???n Th??i B??nh, Qu???n 1, H??? Ch?? Minh. \n( Ngo??i ra ch??ng t??i c??n c?? chi nh??nh ??? Ph?? Nhu???n )`}
              </span>
            </div>

            <div className='flex MB10'>
              <img src={images.phoneIcon} className='icon-footer MR10' />
              {/* <span>0703334443</span> */}
              <a href='tel:0703334443'>0703334443</a>
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
