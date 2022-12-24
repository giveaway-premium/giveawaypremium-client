import React from 'react'
import Media from 'react-media'
import './style.scss'
import 'react-slideshow-image/dist/styles.css'
import MyModal from 'pages/components/MyModal'
import { images } from 'config/images'
import { getCurrentUrl, numberWithCommas } from 'common/function'
import ReduxServices from 'common/redux'
import { connect } from 'react-redux'
import MagicSliderDots from 'react-magic-slider-dots'
import Slider from 'react-slick'
import 'react-magic-slider-dots/dist/magic-dots.css'
import PageReduxAction from 'controller/Redux/actions/pageActions'
import { isMobile } from 'react-device-detect'
import Head from 'next/head'
import { withRouter } from 'next/router'

class Product extends React.PureComponent {
  static async getInitialProps ({ query, req }) {
    return { query, fullUrl: getCurrentUrl(req, ''), req }
  }

  constructor (props) {
    super(props)
    this.state = {
      isLoadingDetail: false,
      photoAlbumRes: [],
      detailInfo: {},
      attributes: [],
      ownerHistory: [],
      isTransfering: false,
      isReplaced: false,
      isDiscarded: false,
      video: '',
      isPlayingVideo: false,
      isOwner: false,
      isTransactionProcessing: false,
      visiblePreview: false

    }
    this.myModal = React.createRef()
    this.refbanner = React.createRef()
  }

  async componentDidMount () {
    const { router } = this.props
    console.log('query', this.props)
    window.addEventListener('touchstart', this.touchStart)
    window.addEventListener('touchmove', this.preventTouch, { passive: false })

    this.setState({
      isLoadingDetail: true
    }, async () => {
      // call api to load infomation about this item hereinafter
      const queryId = router.query.id

      if (router?.query?.id) {

      } else {

      }
      // const resData = await wrapTagService.getDetailNFT(queryId, settingRedux['address_tag_nft'])
    })
  }

  componentWillUnmount () {
    window.removeEventListener('touchstart', this.touchStart)
    window.removeEventListener('touchmove', this.preventTouch, { passive: false })
  }

  touchStart (e) {
    this.firstClientX = e.touches[0].clientX
    this.firstClientY = e.touches[0].clientY
  }

  preventTouch (e) {
    const minValue = 5 // threshold

    this.clientX = e.touches[0].clientX - this.firstClientX
    this.clientY = e.touches[0].clientY - this.firstClientY

    // Vertical scrolling does not work when you start swiping horizontally.
    if (Math.abs(this.clientX) > minValue) {
      e.preventDefault()
      e.returnValue = false
      return false
    }
  }

  preventDefault = (e) => {
    if (this.state.swiping) {
      e.preventDefault()
      e.returnValue = false
      return false
    }
  }

  openPreview = (info) => {
    this.setState({
      visiblePreview: true
    })
  }

  renderBannerMain = () => {
    const { photoAlbumRes, visiblePreview } = this.state

    const settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      activeDotClassName: 'activeDotClassName',
      prevNextDotClassName: 'prevNextDotClassName',
      dotContainerClassName: 'dotContainerClassName',
      appendDots: dots => {
        return <MagicSliderDots dots={dots} numDotsToShow={5} dotWidth={30} />
      }
    }

    return (
      <>
        <Slider className={`slideContainer`} {...settings}>
          {photoAlbumRes.map((photoUrl, index) => (
            <div key={index} className='eachSlide' onClick={this.openPreview}>
              <img className='slidePhoto' src={photoUrl} />
            </div>
          ))}
        </Slider>
        <div className='maskPreviewContainer'>
          {photoAlbumRes.map((photoUrl, index) => (
            <img style={visiblePreview ? { opacity: 0 } : {}} ref={this.refbanner} key={index} className='slidePhoto' src={photoUrl} />
          ))}
        </div>
      </>
    )
  }

  renderBannerMainDesktop = () => {
    const { photoAlbumRes, visiblePreview } = this.state

    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      activeDotClassName: 'activeDotClassName',
      prevNextDotClassName: 'prevNextDotClassName',
      dotContainerClassName: 'dotContainerClassName',
      appendDots: dots => {
        return <MagicSliderDots dots={dots} numDotsToShow={5} dotWidth={30} />
      }
    }

    return (
      <>
        <Slider className='slideContainer' {...settings}>
          {photoAlbumRes.map((photoUrl, index) => (
            <div key={index} className='eachSlide' onClick={this.openPreview}>
              <img className='slidePhoto' src={photoUrl} />
            </div>
          ))}
        </Slider>
        <div className='maskPreviewContainer'>
          {photoAlbumRes.map((photoUrl, index) => (
            <img style={visiblePreview ? { opacity: 0 } : {}} ref={this.refbanner} key={index} className={styles.slidePhoto} src={photoUrl} />
          ))}
        </div>
      </>
    )
  }

  closeModal = () => {
    this.myModal.current.closeModal()
  }

  renderDesktop = () => {
    const {
      isLoadingDetail, detailInfo, ownerHistory, isTransfering, attributes,
      video, photoAlbumRes, isPlayingVideo, isDiscarded, isOwner, isReplaced, isTransactionProcessing
    } = this.state
    const { messages, lang } = this.props.locale

    const DetailInfo = ({ indexKey, info }) => {
      return (
        <div className='detailInfoBox' style={indexKey === 0 ? { marginTop: 0 } : {}}>
          <span className='detailInfoTitle'>{info['title']}</span>
          <span>{info.content || '---'}</span>
        </div>
      )
    }

    return (
      <div className='bannerContainerDesktopAll'>
        {
          isLoadingDetail ? null
            : <>
              <div className='leftBox'>
                <div className='bannerWrapperDesktop'>
                  {this.renderBannerMainDesktop()}
                </div>

                {isTransfering ? <div className='transferBox'>
                  <span className='transferTxt'>{messages.nftDetail.transfering}...</span>
                </div> : null}

                {isReplaced ? <div className='transferBox'>
                  <span className='replaceTxt'>{messages.nftDetail.replaced}</span>
                </div> : null}
              </div>
              <div className='rightBox'>
                <div className='greyBox'>
                  {isLoadingDetail
                    ? <p>{messages.loading}</p>
                    : attributes.map((info, indexInfo) => <DetailInfo key={indexInfo} indexKey={indexInfo} info={info} />)
                  }
                </div>
              </div>

            </>
        }
        <MyModal ref={this.myModal} />
      </div>

    )
  }

  renderMobile = () => {
    const {
      isLoadingDetail, detailInfo, ownerHistory, isTransfering,
      attributes, video, photoAlbumRes, isPlayingVideo,
      isDiscarded, isOwner, isReplaced, isTransactionProcessing
    } = this.state
    const { messages, lang } = this.props.locale

    return (
      <div className='bannerContainerAll'>
        <div className='bannerWrapperMobile'>
          {this.renderBannerMain()}
        </div>

        {isTransfering ? <div className='transferBox'>
          <span className='transferTxt'>{messages.nftDetail.transfering}...</span>
        </div> : null}

        {isReplaced ? <div className='transferBox'>
          <span className='replaceTxt'>{messages.nftDetail.replaced}</span>
        </div> : null}

        <MyModal ref={this.myModal} />
      </div>

    )
  }

  render () {
    const { messages } = this.props.locale
    return (
      <>
        <Head>
          <title>{'NFT Detail'}</title>
          <meta name='title' content={'NFT Detail'} key='title' />
          <meta property='og:title' content={'NFT Detail'} key='fbTitle' />
          <meta name='twitter:title' content={'NFT Detail'} key='twTitle' />
        </Head>
        <Media
          query='(min-width: 769px)'
          render={this.renderDesktop}
        />
        <Media
          query='(max-width: 768px)'
          render={this.renderMobile}
        />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData
})

export default withRouter(connect(mapStateToProps)(Product))
