import React from 'react'
import DEFAULT_SEO from 'config/seo'
import { NextSeo } from 'next-seo'
import ReduxServices from 'common/redux'
import App from 'next/app'
import { Provider } from 'react-redux'
import Head from 'next/head'
import ReduxConnectIntl from 'config/lang'
import { addLocaleData } from 'react-intl'
import intlEN from 'react-intl/locale-data/en'
import intlJA from 'react-intl/locale-data/ja'
import intlCN from 'react-intl/locale-data/zh'
import store from 'controller/Redux/store/configureStore'
import storageActions from 'controller/Redux/actions/storageActions'
import init from 'controller/Redux/lib/initState'
import { checkLocalStoreToRedux } from 'controller/Redux/lib/reducerConfig'
import BaseContainer from 'pages/Container'
import Observer from 'common/observer'
import { KEY_STORE, OBSERVER_KEY } from 'common/constants'
import { getDataLocal } from 'common/function'
import { Spin } from 'antd'
import './Style/override.less'
import './Style/global.scss'
import '../static/jank-empty.css'
import Lottie from 'react-lottie'
import { images } from 'config/images'
import { Router } from 'common/routes'
// import NProgress from 'nprogress'
import homeLoadingJson from 'static/Assets/Image/Lottie/homeLoadingBar.json'
import GapService from 'controller/Api/Services/Gap'

addLocaleData([...intlEN, ...intlJA, ...intlCN])
class GiveAway extends App {
  static async getInitialProps (ctx) {
    if (ctx.ctx.req) {
      // const { dataItem } = ctx.ctx.req
    }
    return { seoData: { ...DEFAULT_SEO } }
  }
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      seoData: props.seoData
    }
    this.currentInterval = null
  }

  async componentDidMount () {
    try {
      if (process.env.MAINTENANCE_MODE === 'true') {
        this.setState({
          isLoading: false
        })
        return
      }
      const storageRedux = [
        { key: KEY_STORE.SET_LOCALE, action: storageActions.setLocale, init: init.lang },
        { key: KEY_STORE.SET_CONNECTION_METHOD, action: storageActions.setConnectionMethod, init: init.connectionMethod },
        { key: KEY_STORE.SET_USER, action: storageActions.setUserData, init: init.userData },
        { key: KEY_STORE.SET_IP_HASH, action: storageActions.setIPHASH, init: init.userData },
        { key: KEY_STORE.SET_CHANNEL_MONITOR, action: storageActions.setChannelMonitor, init: init.object },
        { key: KEY_STORE.SET_TRANSFER_DATA, action: storageActions.setTransferData, init: init.transferData },
        { key: KEY_STORE.SET_SETTING, action: storageActions.setSetting, init: init.setting },
        { key: KEY_STORE.SET_CATEGORY, action: storageActions.setCategory, init: init.category },
        { key: KEY_STORE.SET_TEMP_CONSIGNMENT, action: storageActions.setTempConsignment, init: init.object }
      ]

      const promiseArr = storageRedux.map((item) => {
        checkLocalStoreToRedux(store, item.key, item.action, item.init)
      })
      await Promise.all(promiseArr)

      const initDataPromiseArr = [
        ReduxServices.getCategory(),
        ReduxServices.getSetting(),
        ReduxServices.checkIpHash(),
        ReduxServices.getUnitAddress()
      ]

      const IPhash = getDataLocal(KEY_STORE.SET_IP_HASH)
      const usesr = getDataLocal(KEY_STORE.SET_USER)

      console.log('usesr')
      console.log(usesr)
      console.log(IPhash)

      // GapService.deleteSettingWithKey('alo')

      if (getDataLocal(KEY_STORE.SET_CATEGORY)) {
        // data is already in local store, don't need to wait for get init data
        Promise.all(initDataPromiseArr)
      } else {
        // if user access the fisrt time and don't have data in local store
        await Promise.all(initDataPromiseArr)
      }

      // in the case reload page: need to wait for detect connection method already in use before showing page
    } finally {
      setTimeout(() => {
        this.setState({
          // seoData,
          isLoading: false
        })
      }, 2000)
    }
  }

  componentWillUnmount () {
    // clearInterval(this.currentInterval)
  }

  render () {
    const { Component, pageProps } = this.props
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: homeLoadingJson
    }
    return (
      <Provider store={store}>
        <Head>
          <title>GiveAwayPremium</title>
          <meta charSet='utf-8' />
          <link rel='shortcut icon' href={'https://i.ibb.co/pr24d1c/favicon.png'} />
          {/* <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css' /> */}
          <meta httpEquiv='Cache-Control' content='no-cache, no-store, must-revalidate' />
          <meta httpEquiv='Pragma' content='no-cache' />
          <meta httpEquiv='Expires' content='0' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no' />
          <meta name='theme-color' content='#000000' />
          <meta name='description' content='GiveAway Premium' />
          <meta name='google-site-verification' content='D1F12tMnugBHZLza2KcmBK5gWmnC32N6e3U5pKw8DFk' />
          <meta property='og:image' content='https://i.ibb.co/NSz5YLK/Frame-1.png' />
          <meta property='og:image:secure_url' content='https://i.ibb.co/NSz5YLK/Frame-1.png' />
          <meta property='og:image:type' content='image/png' />
          <meta property='og:image:width' content='828' />
          <meta property='og:image:height' content='434' />
          <meta property='og:image:alt' content='GiveAway Premium' />
          {/* <link rel='stylesheet' type='text/css' href='/nprogress.css' /> */}
        </Head>
        <NextSeo {...this.state.seoData} />
        {
          this.state.isLoading ? (
            <div className='loading-container'>
              {/* <Spin size='large' /> */}
              <Lottie
                options={defaultOptions}
                height='100%'
                width='80%'
                style={{ maxWidth: '300px' }}
                speed={1.2}
                isStopped={false}
                isPaused={false}
              />
            </div>
          ) : (
            <ReduxConnectIntl>
              <BaseContainer {...pageProps}>
                <Component {...pageProps} />
              </BaseContainer>
            </ReduxConnectIntl>
          )
        }
      </Provider>
    )
  }
}

export default GiveAway
