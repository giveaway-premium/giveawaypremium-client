import React from 'react'
import Media from 'react-media'
import './style.scss'
import MyModal from 'pages/Components/MyModal/index.js'
import { images } from 'config/images'
import { copyToClipboard, getCurrentUrl, getDataLocal, numberWithCommas, randomString, saveDataLocal, showNotification } from 'common/function'
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
import { BorderStyle } from '@material-ui/icons'
import { Button } from 'antd'
import { Router } from 'common/routes'
class Product extends React.PureComponent {
  // static async getInitialProps ({ query, req }) {
  //   return { query, fullUrl: getCurrentUrl(req, ''), req }
  // }

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
      orderRequest: null,
      isBookingAlready: false,
      theLastValidBooking: {}
    }
    this.myModal = React.createRef()
    this.refbanner = React.createRef()
    
  }

  async componentDidMount () {
    const { router, productData } = this.props
    console.log('query', this.props)
    window.addEventListener('touchstart', this.touchStart)
    window.addEventListener('touchmove', this.preventTouch, { passive: false })
    // console.log('22-05-2023 18:32:30 UNIX', moment().unix() - 1684755976509)
    // console.log('22-05-2023 18:32:30 UNIX', moment().unix())

    // console.log('22-05-2023 18:32:30', moment(1684755976509).date())
    // console.log('22-05-2023 18:32:30', moment(1684755976509).month())
    // console.log('22-05-2023 18:32:30', moment(1684755976509).year())
    this.setState({
      isLoadingDetail: true
    }, async () => {
      // call api to load infomation about this item hereinafter
      const queryId = router.query.id
      console.log('queryId', queryId)
      let resData = productData
      let productId = resData.results[0].objectId
      let resOrderRequest
      const photoAlbumRes = []
      let isBookingAlready = false
      let theLastValidBooking = {}
      if (router?.query?.id) {
        // resData = await Gap.getProductWithObjectKey(queryId)

        console.log('resData', resData)
        if (resData && resData.count > 0 && resData?.results?.length > 0 && resData?.results[0].status === 'ACTIVE') {
          resOrderRequest = await Gap.getOrderRequestWithID(1, productId)
          
          console.log('resOrderRequest', resOrderRequest)
          if (resOrderRequest?.results?.length > 0 && resOrderRequest?.results?.[0] && resOrderRequest.count > 0) {
            resOrderRequest = resOrderRequest.results
            console.log('resOrderRequest', resOrderRequest)
            const orderRequest = getDataLocal('orderRequest')
            const newOrderRequest = orderRequest ? [...orderRequest] : []
            if (orderRequest?.length > 0) {
              let stringRequestCurrent = ''
              resOrderRequest.map(item => {
                stringRequestCurrent += '-' + item.objectId + '-'
              })
              orderRequest.map((requestId, requestIdIndex) => {    
                const isSameDay = moment().date() === moment(requestId.unix).date()
                const isSameMonth = moment().month() === moment(requestId.unix).month()
                const isSameYear = moment().year() === moment(requestId.unix).year()
                if (stringRequestCurrent.includes(requestId.orderRequestId) && isSameDay && isSameMonth && isSameYear) {
                  isBookingAlready = true
                  theLastValidBooking = requestId
                } else if (!isSameDay || !isSameMonth || !isSameYear) {
                  const index = newOrderRequest.indexOf(requestId);
                  if (index >= 0) {
                    newOrderRequest.splice(index, 1)
                  }
                }
              })

              saveDataLocal('', newOrderRequest)
            }
          } else {
            resOrderRequest = null
          }

          resData = resData.results[0]

          resData?.medias && resData?.medias.length > 0 && resData?.medias.map((albumItem, albumIndex) => {
            photoAlbumRes.push(`${albumItem.data.url}`)
          })

          console.log('isBookingAlready', isBookingAlready)
          console.log('theLastValidBooking', theLastValidBooking)

          this.setState({
            isLoadingDetail: false,
            detailInfo: resData || null,
            orderRequest: resOrderRequest || null,
            photoAlbumRes: photoAlbumRes,
            isBookingAlready: isBookingAlready,
            theLastValidBooking: theLastValidBooking
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

  renderClientInfoPopup (orderRequest, waitingCode) {
    const { detailInfo } = this.state
    console.log('orderRequest', orderRequest)

    return (
      <div>
        <p className='text text-title MB10'>Thông tin mã chờ</p>
        <span className='yourOrderIdBox MB5'>Mã chờ của bạn là: {waitingCode}</span>
        <p>Số thứ tự của bạn là: {detailInfo.soldNumberProduct + 1}</p>
        <span className='buyTxt'>Quý khách vui lòng copy mã chờ và nhắn đến trang Facebook GiveawayPremium để chúng tôi tư vấn và đặt hàng.</span>
        <Button style={{ marginTop: '20px' }} onClick={() => this.onRouteFacebook(waitingCode)}>
          Sao chép mã chờ và đến Messenger
        </Button>
        {/* <p style={{ color: 'blue', marginTop: '1em' }} onClick={() => this.onRouteFacebook(waitingCode)}>Nhấn vào đây để chuyển đến phòng chat và gửi thông tin mã chờ trên: https://www.facebook.com/messages/t/104637727623228</p> */}
      </div>
    )
  }

  onRouteFacebook = (code) => {
    const { detailInfo } = this.state

    // chuyển cái noti này thành popup và them nút tiếp tục. bỏ settimeout
    // showNotification('Bạn đang được chuyển đến trang Messenger Facebook, Vui lòng dán và gửi mã chờ để được nhân viên tư vấn.')
    copyToClipboard(`^_^ Mã chờ của tôi là ${code} - Sản phẩm ${detailInfo.name} ^_^`)
    setTimeout(() => {
      window.open('https://www.facebook.com/messages/t/104637727623228', '_blank')
    })
  }


  onRegisterOrderRequest = async () => {
    console.log('this.state', this.state)
    const { detailInfo } = this.state
    console.log('detailInfo', detailInfo)

    console.log('user data', getDataLocal('CUSTOMER_DATA'))
    const userData = getDataLocal('CUSTOMER_DATA')

    if (!userData || !userData.clientInfo || !userData.shippingInfo) {
      showNotification('Vui lòng nhập thông tin khách hàng trước khi đặt hàng')
      return
    }

    const resData = await Gap.setOrderGuest(detailInfo.objectId, 1, userData)

    console.log('resData1', resData)
    if (resData && resData?.result?.objectId) {
      const waitingCode = randomString()
      console.log('waitingCode', waitingCode)
      const updateClientRes = await Gap.updateClientInfoOrderRequest(resData?.result?.objectId, userData, waitingCode)
      // const updateClientRes = await Gap.updateProductCodeOrderRequest(resData?.result?.objectId, resData.result.product, waitingCode)

      const orderRequest = getDataLocal('orderRequest') || []

      orderRequest.push({
        orderRequestId: resData.result.objectId,
        productId: detailInfo.objectId,
        timeRegister: moment().format('DD-MM-YYYY HH:mm:ss'),
        unix: resData.result.unix,
        count: resData.result.count,
        product: resData.result.product,
        userData: userData,
        waitingCode: waitingCode
      })
  
      saveDataLocal('orderRequest', orderRequest)
      this.myModal.current.openModal(this.renderClientInfoPopup(resData?.result, waitingCode), { closable: true })
      this.setState({
        isBookingAlready: true,
        theLastValidBooking: {
          orderRequestId: resData.result.objectId,
          productId: detailInfo.objectId,
          timeRegister: moment().format('DD-MM-YYYY HH:mm:ss'),
          unix: resData.result.unix,
          count: resData.result.count,
          product: resData.result.product,
          userData: userData,
          waitingCode: waitingCode
        }
      })
    } else {
      showNotification('Xin lỗi quý khách vì sự bất tiện này, hiện tại đang hết ghế chờ, quý khách vui lòng quay lại sau hoặc chọn sản phẩm khác.')
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
      // imgArr.push(
      //   <img className='cursor-pointer item-detail-img' src={images.aLogoBlack} style={{ objectFit: 'contain', width: 'auto' }} />
      // )
      // imgArr.push(
      //   <img className='cursor-pointer item-detail-img' src={images.aLogoBlack} style={{ objectFit: 'contain', width: 'auto' }} />
      // )
      // imgArr.push(
      //   <img className='cursor-pointer item-detail-img' src={images.aLogoBlack} style={{ objectFit: 'contain', width: 'auto' }} />
      // )
      // imgArr.push(
      //   <img className='cursor-pointer item-detail-img' src={images.aLogoBlack} style={{ objectFit: 'contain', width: 'auto' }} />
      // )
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
    const { isLoadingDetail, detailInfo, isBookingAlready, theLastValidBooking, orderRequest } = this.state
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

    const ChairBox = () => {
      let a = []
      for (let i = 0; i <= detailInfo.count; i++) {
        const isHidden = detailInfo.soldNumberProduct - 1 >= i
        a.push(
          <div key={i} className='chairImgBox'>
            <img src={images.chairIcon} className={`chairImg ${isHidden ? 'hiddenChair' : ''}`} />
          </div>
        )
      }

      if (a) {
        return a
      } else {
        return null
      }
    }

    return (
      <div className='containerProduct'>
      <div className='bannerContainerDesktopAll'>
                {
          isLoadingDetail ? null
            : <>
              <div className='leftBox'>
                <div className='bannerWrapperDesktopTag'>
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

                  <Button style={{ width: 300, position: 'fixed', marginBottom: '30px' }} onClick={() => Router.pushRoute('/muasam')}>
                    Quay về Mua Sắm
                  </Button>

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
                    detailInfo.remainNumberProduct !== 0 ? (
                      <>

                      <div className='chairBoxContainer'>
                        <span className='chairBoxTitle'>Ghế chờ:</span>
                        <ChairBox />
                        {/* <div className='chairImgBox'>
                          <img src={images.chairIcon} className='chairImg' />
                        </div> */}
                      </div>  

                        {/* <div className='customerBoxContainer'>
                          <span className='customerBoxTitle'>Khách đang mua:</span>
                          <div className='customerImgBox'>
                            <img src={images.customerIcon} className='customerImg' />
                          </div>
                        </div>   */}
                      </>
                    ) : !isBookingAlready ?  (
                      <span>Sản phẩm hiện tại đã hết hàng.</span>
                    ) : null
                  }

                  {
                    isBookingAlready ? (
                      <div className='buyButton' style={{ padding: 20 }}>
                        <span>Chúc mừng Quý Khách đã tham gia hàng chờ tư vấn cho sản phẩm này!</span>
                        <span className='yourOrderIdBox' onClick={() =>  {
                          showNotification('Sao chép mã chờ thành công!')
                          copyToClipboard(theLastValidBooking.waitingCode)
                        }}>Mã chờ của bạn là {theLastValidBooking.waitingCode}</span>

                        <span className='buyTxt'>Hãy đảm bảo quý khách đã gửi mã chờ đến Facebook của chúng tôi</span>
                        <span className='linkTxt' onClick={() => this.onRouteFacebook(theLastValidBooking.orderRequestId)}>Hoặc sao chép và gửi lại</span>

                        {/* <Button styte={{ marginBottom: '10px' }} onClick={() => this.onRouteFacebook(theLastValidBooking.waitingCode)}>
                          <span>Sao chép mã chờ và đến Messenger</span>
                        </Button> */}
                        {/* <span className='buyTxt'>Quý khách vui lòng copy mã chờ và nhắn đến Facebook GiveawayPremium để chúng tôi tư vấn và đặt hàng.</span> */}
                        {/* <p style={{ color: 'blue', marginTop: '1em' }} onClick={() => this.onRouteFacebook(theLastValidBooking.orderRequestId)}>Nhấn vào đây để chuyển đến phòng chat và gửi thông tin mã chờ trên: https://www.facebook.com/messages/t/104637727623228</p> */}
                      </div>
                    ) : (
                      <div className='buyButton' onClick={this.onRegisterOrderRequest}>
                        <span className='buyTxt'>MUA NGAY</span>
                      </div>
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
    const { isLoadingDetail, detailInfo, isBookingAlready, theLastValidBooking } = this.state
    const { messages, lang } = this.props.locale
    console.log('renderMobile')

    const ChairBox = () => {
      let a = []
      for (let i = 0; i <= detailInfo.count; i++) {
        const isHidden = detailInfo.soldNumberProduct - 1 >= i
        a.push(
          <div key={i} className='chairImgBox'>
            <img src={images.chairIcon} className={`chairImg ${isHidden ? 'hiddenChair' : ''}`} />
          </div>
        )
      }

      if (a) {
        return a
      } else {
        return null
      }
    }

    return (
      <div className='containerProduct'>
      <div className='bannerContainerAllMobile'>
               {
          isLoadingDetail ? null
            : <>
              <div className='leftBox'>
                <div className='bannerWrapperMobile'>
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

                  <Button style={{ width: '100%', marginBottom: '20px', marginTop: '20px' }} onClick={() => Router.pushRoute('/muasam')}>
                    Quay về Mua Sắm
                  </Button>

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
                          <ChairBox />

                          {/* <div className='chairImgBox'>
                            <img src={images.chairIcon} className='chairImg' />
                          </div> */}
                        </div>  

                        {/* <div className='customerBoxContainer'>
                          <span className='customerBoxTitle'>Khách đang mua:</span>
                          <div className='customerImgBox'>
                            <img src={images.customerIcon} className='customerImg' />
                          </div>
                        </div>   */}

                        {
                          isBookingAlready ? (
                            <div className='buyButton' style={{ padding: 20 }}>
                              <span>Chúc mừng Quý Khách đã tham gia hàng chờ tư vấn cho sản phẩm này!</span>
                              <span className='yourOrderIdBox' onClick={() =>  {
                                showNotification('Sao chép mã chờ thành công!')
                                copyToClipboard(theLastValidBooking.waitingCode)
                              }}>Mã chờ của bạn là {theLastValidBooking.waitingCode}</span>
      
                              <span className='buyTxt'>Hãy đảm bảo quý khách đã gửi mã chờ đến Facebook của chúng tôi</span>
                              <span className='linkTxt' onClick={() => this.onRouteFacebook(theLastValidBooking.orderRequestId)}>Hoặc sao chép và gửi lại</span>
      
                              {/* <Button styte={{ marginBottom: '10px' }} onClick={() => this.onRouteFacebook(theLastValidBooking.waitingCode)}>
                                <span>Sao chép mã chờ và đến Messenger</span>
                              </Button> */}
                              {/* <span className='buyTxt'>Quý khách vui lòng copy mã chờ và nhắn đến Facebook GiveawayPremium để chúng tôi tư vấn và đặt hàng.</span> */}
                              {/* <p style={{ color: 'blue', marginTop: '1em' }} onClick={() => this.onRouteFacebook(theLastValidBooking.orderRequestId)}>Nhấn vào đây để chuyển đến phòng chat và gửi thông tin mã chờ trên: https://www.facebook.com/messages/t/104637727623228</p> */}
                            </div>
                          ) : (
                            <div className='buyButton' onClick={this.onRegisterOrderRequest}>
                              <span className='buyTxt'>MUA NGAY</span>
                            </div>
                          )
                        }
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

export async function getServerSideProps ({ params, query, res }) {
  console.log('params', params)

  console.log('query', query)

  const productId = query?.id || '' 
  let resData = await Gap.getProductWithObjectKey(productId)
  let productData
  if (resData && resData.count > 0 && resData?.results?.length > 0 && resData?.results[0].status === 'ACTIVE') {
    productData = resData
  } else {
    productData = null
  }

  return {
    props: {
      productData: productData
    }
  }
}


export default withRouter(connect(mapStateToProps)(Product))
