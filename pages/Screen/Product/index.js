import React from 'react'
import Media from 'react-media'
import './style.scss'
import MyModal from 'pages/components/MyModal'
import { images } from 'config/images'
import { getCurrentUrl, getDataLocal, numberWithCommas, saveDataLocal, showNotification } from 'common/function'
import ReduxServices from 'common/redux'
import { connect } from 'react-redux'
import Slider from 'react-slick'
import PageReduxAction from 'controller/Redux/actions/pageActions'
import { isMobile } from 'react-device-detect'
import Head from 'next/head'
import { withRouter } from 'next/router'
import Gap from 'controller/Api/Services/Gap'
import ReactImageZoom from 'react-image-zoom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import moment from 'moment'

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
      visiblePreview: false,
      activeIndex: 0,
      orderRequest: null

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
      let resOrderRequest
      const photoAlbumRes = []

      if (router?.query?.id) {
        resData = await Gap.getProductWithObjectKey(queryId)

        console.log('resData', resData)
        if (resData && resData.count > 0 && resData?.results?.length > 0 && resData?.results[0].status === 'ACTIVE') {
          resOrderRequest = await Gap.getOrderRequestWithID(1, resData.results[0].objectId)
          
          console.log('resOrderRequest', resOrderRequest)
          if (resOrderRequest?.results?.length > 0 && resOrderRequest?.results?.[0] && resOrderRequest.count > 0) {
            resOrderRequest = resOrderRequest.results[0]
          } else {
            resOrderRequest = null
          }

          resData = resData.results[0]

          resData?.medias && resData?.medias.length > 0 && resData?.medias.map((albumItem, albumIndex) => {
            photoAlbumRes.push(`${albumItem.data.url}`)
          })

          const orderRequest = getDataLocal('orderRequest')

          console.log('orderRequest', orderRequest)

          
          this.setState({
            isLoadingDetail: false,
            detailInfo: resData || null,
            orderRequest: resOrderRequest || null,
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

  onRegisterOrderRequest = async () => {
    console.log('this.state', this.state)
    const { detailInfo } = this.state
    console.log('detailInfo', detailInfo)
    const resData = await Gap.setOrderGuest(detailInfo.objectId, 1)

    console.log('resData1', resData)
    if (resData && resData?.result?.objectId) {
      const orderRequest = getDataLocal('orderRequest') || []

      orderRequest.push({
        orderRequestId: resData.result.objectId,
        productId: detailInfo.objectId,
        timeRegister: moment().format('DD-MM-YYYY HH:mm:ss'),
      })
  
      saveDataLocal('orderRequest', orderRequest)
    } else {
      showNotification('Xin lỗi quý khách vì sự bất tiện này, hiện tại đang có nhiều khách chọn mua, quý khách vui lòng chờ hoặc lựa sản phẩm khác.')
    }
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
    const { photoAlbumRes, visiblePreview, activeIndex } = this.state
    // const responsive = {
    //   0: { items: 1 },
    //   568: { items: 2 },
    //   1024: { items: 3 },
    // };

    let imgArr = []

    if (photoAlbumRes?.length > 0) {
      photoAlbumRes.map((item, itemKey) => {
        imgArr.push(
          <img className='cursor-pointer item-detail-img' key={itemKey} src={item} style={{ objectFit: 'contain', width: 'auto' }} />
        )
        // const props = {
        //   // width: 400,
        //   // height: 250,
        //   zoomWidth: 500,
        //   img: item,
        //   zoomStyle: 'background-color: whitesmoke;width: 100% !important;align-self: center;height: 50vw;max-height: calc((100vh - 120px - 10px));object-fit: contain;border-bottom: 3px solid rgb(204, 204, 204);'
        // };
        // imgArr.push(
        //   <ReactImageZoom {...props} />
        // )
      })
    } else {
      imgArr.push(
        <img className='cursor-pointer item-detail-img' src={images.aLogoBlack} style={{ objectFit: 'contain', width: 'auto' }} />
      )
      imgArr.push(
        <img className='cursor-pointer item-detail-img' src={images.aLogoBlack} style={{ objectFit: 'contain', width: 'auto' }} />
      )
      imgArr.push(
        <img className='cursor-pointer item-detail-img' src={images.aLogoBlack} style={{ objectFit: 'contain', width: 'auto' }} />
      )
      imgArr.push(
        <img className='cursor-pointer item-detail-img' src={images.aLogoBlack} style={{ objectFit: 'contain', width: 'auto' }} />
      )
      imgArr.push(
        <img className='cursor-pointer item-detail-img' src={images.aLogoBlack} style={{ objectFit: 'contain', width: 'auto' }} />
      )
    }


    return (
      <>
        {imgArr}
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
      <div className='containerProduct'>
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
                <div className='infoProductBox'>
                  {/* {isLoadingDetail
                    ? <p>{messages.loading}</p>
                    : attributes.map((info, indexInfo) => <DetailInfo key={indexInfo} indexKey={indexInfo} info={info} />)
                  } */}

                  <div className='typeBox'>
                    <span className='typeTxt'>{`${detailInfo?.category?.name} ___ ${detailInfo?.subCategory?.name}`}</span>
                  </div>

                  <span className='nameProduct'>{detailInfo.name}</span>

                  <div className='priceBox'>
                    <span className='priceTxt'>{`${numberWithCommas(detailInfo.price * 1000)} vnđ`}</span>
                  </div>

                  <div className='detailBox'>
                    <span className='titleTxt'>{`Tình trạng:`}</span>
                    <span className='valueTxt'>{detailInfo.rateNew === 100 ? 'Mới' : 'Đã sử dụng'}</span>
                  </div>

                  <div className='detailBox'>
                  <span className='titleTxt'>{`Số lượng:`}</span>
                  <span className='valueTxt'>{detailInfo.remainNumberProduct}</span>
                  </div>

                  <div className='detailBox'>
                  <span className='titleTxt'>{`Size:`}</span>
                  <span className='valueTxt'>{detailInfo.sizeInfo || '---'}</span>
                  </div>


                  <div className='detailBox'>
                  <span className='titleTxt'>{`Ghi chú:`}</span>
                  <span className='valueTxt'>{detailInfo.detailInfo || '---'}</span>
                  </div>
                </div>

                  {
                    detailInfo.remainNumberProduct !== 0 && (
                      <>
                        <div className='chairBoxContainer'>
                          <span className='chairBoxTitle'>Ghế chờ:</span>
                          <div className='chairImgBox'>
                            <img src={images.chairIcon} className='chairImg' />
                          </div>
                        </div>  

                        <div className='customerBoxContainer'>
                          <span className='customerBoxTitle'>Khách đang mua:</span>
                          <div className='customerImgBox'>
                            <img src={images.customerIcon} className='customerImg' />
                          </div>
                        </div>  
                        
                        <div className='buyButton' onClick={this.onRegisterOrderRequest}>
                          <span className='buyTxt'>MUA NGAY</span>
                        </div>
                      </>
                    )
                  }
              </div>

            </>
        }
        <MyModal ref={this.myModal} />
      </div>
      </div>
    )
  }

  renderMobile = () => {
    const {} = this.state
    const { messages, lang } = this.props.locale

    return (
      <div className='bannerContainerAllMobile'>
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
