import React from 'react'
import Media from 'react-media'
import './style.scss'
import MyModal from 'pages/components/MyModal'
import { images } from 'config/images'
import { getCurrentUrl, numberWithCommas } from 'common/function'
import ReduxServices from 'common/redux'
import { connect } from 'react-redux'
import Slider from 'react-slick'
import PageReduxAction from 'controller/Redux/actions/pageActions'
import { isMobile } from 'react-device-detect'
import Head from 'next/head'
import { withRouter } from 'next/router'
import Gap from 'controller/Api/Services/Gap'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

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
      console.log('queryId', queryId)
      let resData
      const photoAlbumRes = []

      if (router?.query?.id) {
        resData = await Gap.getProductWithObjectKey(queryId)
        console.log('resData', resData)
        if (resData && resData.count > 0 && resData?.results?.length > 0 && resData?.results[0].status === 'ACTIVE') {
          resData = resData.results[0]

          resData?.medias && resData?.medias.length > 0 && resData?.medias.map((albumItem, albumIndex) => {
            photoAlbumRes.push(`${albumItem.data.url }`)
            photoAlbumRes.push(`${albumItem.data.url }`)
            photoAlbumRes.push(`${albumItem.data.url }`)
            photoAlbumRes.push(`${albumItem.data.url }`)
          })
  

          
          this.setState({
            isLoadingDetail: false,
            detailInfo: resData || null,
            photoAlbumRes: photoAlbumRes
          }, () => {
            //
            console.log('state', this.state)
          })
        } else {
          // show false
        }
      } else {
        // show falseee
      }
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

  renderBannerMainMobile = () => {
    const { photoAlbumRes, visiblePreview } = this.state

    return (
      <>
        a
      </>
    )
  }

  thumbItems = (items, [setThumbIndex, setThumbAnimation]) => {
    return items.map((item, i) => (
        <div className="thumb" onClick={() => (setThumbIndex(i), setThumbAnimation(true))}>
            {item}
        </div>
    ));
  };

  renderBannerMainDesktop = () => {
    const { photoAlbumRes, visiblePreview } = this.state
    // const responsive = {
    //   0: { items: 1 },
    //   568: { items: 2 },
    //   1024: { items: 3 },
    // };

    let imgArr = []

    photoAlbumRes.map((item, itemKey) => {
      imgArr.push(
        <img className='cursor-pointer item-detail-img' key={itemKey} src={item} style={{ objectFit: 'contain', width: 'auto' }} />
      )
    })

    return (
      <>
        <AliceCarousel
            mouseTracking
            // responsive
            autoWidth
            items={imgArr}
            controlsStrategy="alternate"
        />
      </>
    )
  }

  closeModal = () => {
    this.myModal.current.closeModal()
  }

  renderDesktop = () => {
    const { isLoadingDetail, detailInfo } = this.state
    const { messages, lang } = this.props.locale
    console.log('messages', messages)

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

                  {/* <div className={'transferBox'}>
                    <span className={'transferTxt'}>{messages?.nftDetail?.transfering}...</span>
                  </div>

                  <div className={'transferBox'}>
                    <span className={'replaceTxt'}>{messages?.nftDetail?.replaced}</span>
                  </div> */}
              </div>
              <div className='rightBox'>
                <div className='greyBox'>
                  {/* {isLoadingDetail
                    ? <p>{messages.loading}</p>
                    : attributes.map((info, indexInfo) => <DetailInfo key={indexInfo} indexKey={indexInfo} info={info} />)
                  } */}
                </div>

                <div className='greyBox' style={{ marginTop: '15px' }}>
                  {/* <span className={'ownerShipTitle'}>{messages?.nftDetail?.ownerHistory}</span> */}
                  {/* {isLoadingDetail
                    ? <p>{messages.loading}</p>
                    : ownerHistory.map((ownerInfo, indexInfo) => <OwnerInfo key={indexInfo} ownerInfo={ownerInfo} />)
                  } */}
                </div>
              </div>

            </>
        }
        <MyModal ref={this.myModal} />
      </div>

    )
  }

  renderMobile = () => {
    const {} = this.state
    const { messages, lang } = this.props.locale

    return (
      <div className='bannerContainerAll'>
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
