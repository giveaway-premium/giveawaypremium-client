import React from "react";
import { connect } from "react-redux";
import AliceCarousel from "react-alice-carousel";
import Media from "react-media";
import { images } from "config/images";
import "./alice-carousel.scss";
import "./HomeCarousel.scss";
import { Router } from "common/routes";
import Lottie from "react-lottie";
import rightArrowJson from "static/Assets/Image/Lottie/rightArrow.json";

class HomeCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowGiveAway: false,
      isShowPremium: false,
      isShowFooter: false,
      isHideText: false,
    };
  }
  // this.Carousel.slidePrev()
  // this.Carousel.slideNext()

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isShowGiveAway: true,
        isShowPremium: true,
        isShowFooter: true,
      });
    }, 200);
  }

  onHanldeRouteAnimation = (pageNameRoute) => {
    if (pageNameRoute) {
      let activeIndex = 0;
      switch (pageNameRoute) {
        case "/gioithieu":
          activeIndex = 0;
          break;
        case "/kygui":
          activeIndex = 1;
          break;
        case "/muasam":
          activeIndex = 2;
          break;
      }

      this.setState(
        {
          isShowGiveAway: false,
          isShowPremium: false,
          isShowFooter: false,
          activeIndex: activeIndex,
          isHideText: true,
        },
        () => {
          setTimeout(() => {
            Router.pushRoute(pageNameRoute, undefined, { shallow: true });
          }, 1000);
        }
      );
    }
  };

  renderBanner1 = () => {
    const { locale } = this.props;
    const { isHideText } = this.state;
    const { messages } = locale;

    const defaultOptionsRightArrow = {
      loop: true,
      autoplay: true,
      animationData: rightArrowJson,
    };

    return (
      <div
        justify="center"
        align="middle"
        className="banner-container "
        style={{
          width: "100%",
          height: "calc(100vh - 125.5px)",
          display: "flex",
          alignItems: "center",
          paddingLeft: "10%",
        }}
      >
        <span
          onClick={() => this.onHanldeRouteAnimation("/gioithieu")}
          className={
            "text text-size-title-banner text-bold-500 cursor-pointer text-banner" +
            (isHideText ? " hide" : "")
          }
        >
          VỀ CHÚNG TÔI dv
        </span>
      </div>
    );
  };
  renderBanner2 = () => {
    const { locale } = this.props;
    const { isHideText } = this.state;
    const { messages } = locale;

    const defaultOptionsRightArrow = {
      loop: true,
      autoplay: true,
      animationData: rightArrowJson,
    };

    return (
      <div
        justify="center"
        align="middle"
        className="banner-container "
        style={{
          width: "100%",
          height: "calc(100vh - 125.5px)",
          display: "flex",
          alignItems: "center",
          paddingLeft: "10%",
        }}
      >
        <span
          onClick={() => this.onHanldeRouteAnimation("/kygui")}
          className={
            "text text-size-title-banner text-bold-500 cursor-pointer text-banner" +
            (isHideText ? " hide" : "")
          }
        >
          KÝ GỬI
        </span>
      </div>
    );
  };

  renderBanner3 = () => {
    const { locale } = this.props;
    const { isHideText } = this.state;
    const { messages } = locale;
    return (
      <div
        justify="center"
        align="middle"
        className="banner-container "
        style={{
          width: "100%",
          height: "calc(100vh - 125.5px)",
          display: "flex",
          alignItems: "center",
          paddingLeft: "10%",
        }}
      >
        <span
          onClick={() => this.onHanldeRouteAnimation("/muasam")}
          className={
            "text text-size-title-banner text-bold-500 cursor-pointer text-banner" +
            (isHideText ? " hide" : "")
          }
        >
          MUA SẮM
        </span>
      </div>
    );
  };

  renderBannerMain = () => {
    const { activeIndex } = this.state;
    const galleryItems = [
      this.renderBanner1,
      this.renderBanner2,
      this.renderBanner3,
    ].map((action, index) => {
      return action(index);
    });

    return (
      <AliceCarousel
        ref={(el) => (this.Carousel = el)}
        className="home-banner"
        items={galleryItems}
        activeIndex={activeIndex}
        // autoPlayInterval={5000}
        // autoPlayDirection='ltr'
        // autoPlay
        buttonsDisabled
        // playButtonEnabled
        disableDotsControls
        autoHeight
        infinite
        disableButtonsControls
        // controlsStrategy
        keysControlDisabled
        fadeOutAnimationEnabled
        touchTracking
        mouseTracking
        touchTrackingEnabled
        mouseTrackingEnabled
        // preventEventOnTouchMove
        disableAutoPlayOnAction={false}
        stopAutoPlayOnHover
      />
    );
  };

  onNextBanner = () => {
    console.log("onNextBanner");
    this.Carousel.slideNext();
  };

  renderBannerMobile = () => {
    const { locale } = this.props;
    const { activeIndex } = this.state;
    const { messages } = locale;
    const imagesBanner = [
      {
        title: "Về chúng tôi",
        classSize: "font15",
        btnColor: "color-bn1",
        route: "/gioithieu",
      },
      {
        title: "Ký gửi",
        classSize: "font17",
        btnColor: "color-bn2",
        route: "/kygui",
      },
      {
        title: "Mua sắm",
        classSize: "font15",
        btnColor: "color-bn1",
        route: "/muasam",
      },
    ];

    const galleryItems = imagesBanner.map((item, index) => {
      return (
        <div
          key={index}
          justify="center"
          align="middle"
          className="cursor-pointer banner-container "
          style={{
            width: "100%",
            height: "calc(95vh - 125.5px)",
            display: "flex",
            alignItems: "center",
            paddingLeft: "10%",
          }}
        >
          <span
            onClick={() => this.onHanldeRouteAnimation(item.route)}
            className="text title-mobile text-bold-500 cursor-pointer"
          >
            {item.title}
          </span>
        </div>
      );
    });

    return (
      <AliceCarousel
        ref={(el) => (this.Carousel = el)}
        className="home-banner"
        items={galleryItems}
        activeIndex={activeIndex}
        // autoPlayInterval={5000}
        // autoPlayDirection='ltr'
        // autoPlay
        buttonsDisabled
        // playButtonEnabled
        disableDotsControls
        autoHeight
        infinite
        disableButtonsControls
        // controlsStrategy
        keysControlDisabled
        fadeOutAnimationEnabled
        touchTracking
        mouseTracking
        touchTrackingEnabled
        mouseTrackingEnabled
        // preventEventOnTouchMove
        disableAutoPlayOnAction={false}
        // stopAutoPlayOnHover
      />
    );
  };
  showDesktopScreen = () => {
    const { isShowGiveAway, isShowPremium, isShowFooter, activeIndex } =
      this.state;
    const defaultOptionsRightArrow = {
      loop: true,
      autoplay: true,
      animationData: rightArrowJson,
    };

    return (
      <div className="banner-flex">
        {/* <div className='arrow-banner-box' onClick={() => this.Carousel.slidePrev()} style={{ justifyContent: 'flex-end' }}> */}
        <div
          className={
            "arrow-banner-box left-side" + (isShowGiveAway ? " show" : "")
          }
        >
          GIVEAWAY
          {/* <img
            src={images.home.arrowLeft}
            className='arrow-banner'
          /> */}
        </div>
        <div onClick={this.onNextBanner} className="banner-wrapper-desktop">
          <Lottie
            style={{ position: "absolute", right: 0, zoom: 0.8 }}
            options={defaultOptionsRightArrow}
            height={100}
            width={100}
            speed={0.5}
            isStopped={false}
            isPaused={false}
          />
          {this.renderBannerMain()}
        </div>
        {/* <div className='arrow-banner-box' onClick={() => this.Carousel.slideNext()} style={{ justifyContent: 'flex-start' }}> */}
        <div
          className={
            "arrow-banner-box right-side" + (isShowPremium ? " show" : "")
          }
        >
          {/* <img
            src={images.home.arrowRight}
            className='arrow-banner'
          /> */}
          PREMIUM
        </div>

        <div className={"bottom-homescreen" + (isShowFooter ? " show" : "")}>
          <div className="left-bottom-box" />
          <div className="line-bottom" />
          <div className="right-bottom-box">
            <span className="text MR10">Follow us</span>
            <a
              href="https://www.instagram.com/giveawaypremium_quan1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="MR10 cursor-pointer"
                src={images.instagramIcon}
                style={{ objectFit: "contain", height: "100%", width: "auto" }}
              />
            </a>
            <a
              href="https://www.facebook.com/giveawaypremiumquan1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="cursor-pointer"
                src={images.facebookIcon}
                style={{ objectFit: "contain", height: "100%", width: "auto" }}
              />
            </a>
          </div>
        </div>
      </div>
    );
  };
  showMobileScreen = () => {
    const { isShowGiveAway, isShowPremium, isShowFooter } = this.state;

    const defaultOptionsRightArrow = {
      loop: true,
      autoplay: true,
      animationData: rightArrowJson,
    };

    return (
      <div className="banner-flex-mobile">
        {/* <div className='arrow-banner-box' onClick={() => this.Carousel.slidePrev()} style={{ justifyContent: 'flex-end' }}> */}
        <div
          className={
            "arrow-banner-box left-side" + (isShowGiveAway ? " show" : "")
          }
        >
          GIVEAWAY
          {/* <img
          src={images.home.arrowLeft}
          className='arrow-banner'
        /> */}
        </div>
        <div onClick={this.onNextBanner} className="banner-wrapper-mobile">
          <Lottie
            style={{ position: "absolute", right: 0, zoom: 0.5 }}
            options={defaultOptionsRightArrow}
            height={100}
            width={100}
            speed={0.5}
            isStopped={false}
            isPaused={false}
          />
          {this.renderBannerMobile()}
        </div>
        {/* <div className='arrow-banner-box' onClick={() => this.Carousel.slideNext()} style={{ justifyContent: 'flex-start' }}> */}
        <div
          className={
            "arrow-banner-box right-side" + (isShowPremium ? " show" : "")
          }
        >
          {/* <img
          src={images.home.arrowRight}
          className='arrow-banner'
        /> */}
          PREMIUM
        </div>

        <div className={"bottom-homescreen" + (isShowFooter ? " show" : "")}>
          <div className="line-bottom" />
          <div className="right-bottom-box">
            <span className="text MR10">Follow us</span>
            <a
              href="https://www.instagram.com/giveawaypremium_quan1/"
              className="MR10 ML10"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="MR10 cursor-pointer"
                src={images.instagramIcon}
                style={{ objectFit: "contain", height: "100%", width: "auto" }}
              />
            </a>
            <a
              href="https://www.facebook.com/giveawaypremiumquan1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="cursor-pointer"
                src={images.facebookIcon}
                style={{ objectFit: "contain", height: "100%", width: "auto" }}
              />
            </a>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <React.Fragment>
        <Media
          query="(max-width: 700px)"
          render={() => this.showMobileScreen()}
        />
        <Media
          query="(min-width: 701px)"
          render={() => this.showDesktopScreen()}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
});

export default connect(mapStateToProps)(HomeCarousel);
