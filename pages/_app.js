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
        { key: KEY_STORE.SET_TRANSFER_DATA, action: storageActions.setTransferData, init: init.transferData },
        { key: KEY_STORE.SET_SETTING, action: storageActions.setSetting, init: init.setting }
      ]

      const promiseArr = storageRedux.map((item) => {
        checkLocalStoreToRedux(store, item.key, item.action, item.init)
      })
      await Promise.all(promiseArr)

      // in the case reload page: need to wait for detect connection method already in use before showing page
    } finally {
      setTimeout(() => {
        this.setState({
          // seoData,
          isLoading: false
        })
      }, 2500)
    }
  }

  componentWillUnmount () {
    clearInterval(this.currentInterval)
  }

  render () {
    const { Component, pageProps } = this.props
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: images.homeLoadingJson
    }
    return (
      <Provider store={store}>
        <Head>
          <title>GiveAwayPremium</title>
          <meta charSet='utf-8' />
          <link rel='shortcut icon' href={'https://i.ibb.co/pr24d1c/favicon.png'} />
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css' />
          <meta httpEquiv='Cache-Control' content='no-cache, no-store, must-revalidate' />
          <meta httpEquiv='Pragma' content='no-cache' />
          <meta httpEquiv='Expires' content='0' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no' />
          <meta name='theme-color' content='#000000' />
          <meta name='description' content='GiveAway Premium' />
          <meta name='google-site-verification' content='D1F12tMnugBHZLza2KcmBK5gWmnC32N6e3U5pKw8DFk' />
          <meta property='og:image' content='https://i.ibb.co/pr24d1c/favicon.png' />
          <meta property='og:image:secure_url' content='https://i.ibb.co/pr24d1c/favicon.png' />
          <meta property='og:image:type' content='image/png' />
          <meta property='og:image:width' content='828' />
          <meta property='og:image:height' content='434' />
          <meta property='og:image:alt' content='GiveAway Premium' />
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
                duration={2000}
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
