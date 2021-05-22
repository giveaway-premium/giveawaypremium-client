webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./pages/Container/Header/index.js":
/*!*****************************************!*\
  !*** ./pages/Container/Header/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_reflect_construct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/reflect/construct */ "./node_modules/@babel/runtime-corejs2/core-js/reflect/construct.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_reflect_construct__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_reflect_construct__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _common_redux__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../common/redux */ "./common/redux.js");
/* harmony import */ var _controller_Api_Services_Gap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../controller/Api/Services/Gap */ "./controller/Api/Services/Gap.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _common_routes__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../common/routes */ "./common/routes.js");
/* harmony import */ var _common_routes__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_common_routes__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var _Components_CustomLink__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../Components/CustomLink */ "./pages/Components/CustomLink/index.js");
/* harmony import */ var react_media__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react-media */ "./node_modules/react-media/esm/react-media.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");
/* harmony import */ var _common_observer__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../common/observer */ "./common/observer.js");
/* harmony import */ var _config_images__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../config/images */ "./config/images/index.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./style.scss */ "./pages/Container/Header/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_22__);










var __jsx = react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__["default"])(this).constructor; result = _babel_runtime_corejs2_core_js_reflect_construct__WEBPACK_IMPORTED_MODULE_0___default()(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_babel_runtime_corejs2_core_js_reflect_construct__WEBPACK_IMPORTED_MODULE_0___default.a) return false; if (_babel_runtime_corejs2_core_js_reflect_construct__WEBPACK_IMPORTED_MODULE_0___default.a.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_babel_runtime_corejs2_core_js_reflect_construct__WEBPACK_IMPORTED_MODULE_0___default()(Boolean, [], function () {})); return true; } catch (e) { return false; } }















var Header = /*#__PURE__*/function (_React$PureComponent) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__["default"])(Header, _React$PureComponent);

  var _super = _createSuper(Header);

  function Header(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Header);

    _this = _super.call(this, props);

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this), "backHome", function () {
      _common_routes__WEBPACK_IMPORTED_MODULE_14__["Router"].pushRoute('/');
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this), "goToAccountPage", function () {
      _common_routes__WEBPACK_IMPORTED_MODULE_14__["Router"].pushRoute('/account');
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this), "showDrawer", function () {
      _this.setState({
        isOpen: true
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this), "closeDrawer", function () {
      _this.setState({
        isOpen: false
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this), "handleSignIn", /*#__PURE__*/Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
      return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.closeDrawer(); // const result = await GapService.logInAdmin()
              // console.log('handleSignIn --- run')
              // console.log(result)
              // Observer.emit(OBSERVER_KEY.SIGN_IN)


            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this), "closePopover", function () {
      _this.setState({
        visible: false
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this), "handleVisibleChange", function (visible) {
      _this.setState({
        visible: visible
      });
    });

    _this.state = {
      isOpen: false,
      visible: false,
      isShowAboutUs: false,
      isShowConsignment: false,
      isShowStore: false,
      isShowRightSideHeader: false,
      isShowRightSideHeaderAnimation: false
    };
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(Header, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.setState({
          isShowRightSideHeader: true
        });
      }, 200);
    }
  }, {
    key: "renderLeftSide",
    value: function renderLeftSide() {
      return __jsx("div", {
        className: "left-side"
      }, __jsx("h1", {
        className: "logo",
        onClick: this.backHome
      }, __jsx("img", {
        src: _config_images__WEBPACK_IMPORTED_MODULE_21__["images"].logoHeaderWhite,
        style: {
          objectFit: 'contain',
          height: '100%',
          width: 'auto'
        }
      }), __jsx("img", {
        src: _config_images__WEBPACK_IMPORTED_MODULE_21__["images"].giveawayTextBlack,
        style: {
          objectFit: 'contain',
          height: 'unset',
          width: 'unset'
        }
      })));
    }
  }, {
    key: "renderMainNav",
    value: function renderMainNav() {
      var _this3 = this;

      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'horizontal';
      var _this$state = this.state,
          isShowAboutUs = _this$state.isShowAboutUs,
          isShowConsignment = _this$state.isShowConsignment,
          isShowStore = _this$state.isShowStore,
          isShowRightSideHeader = _this$state.isShowRightSideHeader,
          isShowRightSideHeaderAnimation = _this$state.isShowRightSideHeaderAnimation;
      var messages = this.props.locale.messages;
      var isHomePage = this.props.router.asPath === '/'; // if (isHomePage) {
      //   return null
      // }

      return __jsx(antd__WEBPACK_IMPORTED_MODULE_16__["Menu"] // className='main-nav'
      , {
        style: isHomePage ? {
          opacity: 0,
          PointerEvent: 'none'
        } : {},
        className: 'main-nav' + (isShowRightSideHeader ? ' show' : '') + (isShowRightSideHeaderAnimation ? ' animation' : ''),
        mode: mode,
        onClick: function onClick() {
          return _this3.closeDrawer();
        }
      }, __jsx(antd__WEBPACK_IMPORTED_MODULE_16__["Menu"].Item, {
        key: 1
      }, __jsx(_Components_CustomLink__WEBPACK_IMPORTED_MODULE_17__["default"], {
        route: "/gioithieu"
      }, __jsx("span", {
        className: 'main-nav-item' + (isShowRightSideHeader ? ' show' : '')
      }, "V\u1EC1 ch\xFAng t\xF4i"))), __jsx(antd__WEBPACK_IMPORTED_MODULE_16__["Menu"].Item, {
        key: 2
      }, __jsx(_Components_CustomLink__WEBPACK_IMPORTED_MODULE_17__["default"], {
        route: "/kygui"
      }, __jsx("span", {
        className: 'main-nav-item' + (isShowRightSideHeader ? ' show' : '')
      }, "K\xFD g\u1EEDi"))), __jsx(antd__WEBPACK_IMPORTED_MODULE_16__["Menu"].Item, {
        key: 3
      }, __jsx(_Components_CustomLink__WEBPACK_IMPORTED_MODULE_17__["default"], {
        route: "/muasam"
      }, __jsx("span", {
        className: 'main-nav-item' + (isShowRightSideHeader ? ' show' : '')
      }, "Mua s\u1EAFm"))));
    }
  }, {
    key: "renderFooterNav",
    value: function renderFooterNav() {
      var _this4 = this;

      var messages = this.props.locale.messages;
      return __jsx(antd__WEBPACK_IMPORTED_MODULE_16__["Menu"], {
        className: "footer-nav",
        mode: 'vertical',
        onClick: function onClick() {
          return _this4.closeDrawer();
        }
      });
    }
  }, {
    key: "renderDesktop",
    value: function renderDesktop() {
      var _this5 = this;

      var _this$props = this.props,
          locale = _this$props.locale,
          userData = _this$props.userData;
      var isShowRightSideHeader = this.state.isShowRightSideHeader;
      var messages = locale.messages;
      var isSigned = false;
      setTimeout(function () {
        _this5.setState({
          isShowRightSideHeader: true
        });
      }, 1000);
      return __jsx("div", {
        className: "wrapper-custom-header"
      }, this.renderLeftSide(), __jsx("div", {
        className: 'right-side'
      }, this.renderMainNav(), __jsx("div", {
        className: "ctn-btn-signin ML5"
      })));
    }
  }, {
    key: "renderMainNavMobile",
    value: function renderMainNavMobile() {
      var _this6 = this;

      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'horizontal';
      var _this$state2 = this.state,
          isShowAboutUs = _this$state2.isShowAboutUs,
          isShowConsignment = _this$state2.isShowConsignment,
          isShowStore = _this$state2.isShowStore,
          isShowRightSideHeader = _this$state2.isShowRightSideHeader,
          isShowRightSideHeaderAnimation = _this$state2.isShowRightSideHeaderAnimation,
          isOpen = _this$state2.isOpen;
      var messages = this.props.locale.messages;
      var isHomePage = this.props.router.asPath === '/'; // if (isHomePage) {
      //   return null
      // }

      return __jsx(antd__WEBPACK_IMPORTED_MODULE_16__["Menu"], {
        style: isHomePage ? {
          opacity: 0,
          PointerEvent: 'none'
        } : {},
        className: 'main-nav-mobile' + (isShowRightSideHeader ? ' show' : '') + (isShowRightSideHeaderAnimation ? ' animation' : ''),
        mode: mode,
        onClick: function onClick() {
          return _this6.closeDrawer();
        }
      }, __jsx(antd__WEBPACK_IMPORTED_MODULE_16__["Menu"].Item, {
        key: 1
      }, __jsx(_Components_CustomLink__WEBPACK_IMPORTED_MODULE_17__["default"], {
        route: "/gioithieu"
      }, __jsx("span", {
        className: 'main-nav-item' + (isShowRightSideHeader ? ' show' : '')
      }, "V\u1EC1 ch\xFAng t\xF4i"))), __jsx(antd__WEBPACK_IMPORTED_MODULE_16__["Menu"].Item, {
        key: 2
      }, __jsx(_Components_CustomLink__WEBPACK_IMPORTED_MODULE_17__["default"], {
        route: "/kygui"
      }, __jsx("span", {
        className: 'main-nav-item' + (isShowRightSideHeader ? ' show' : '')
      }, "K\xFD g\u1EEDi"))), __jsx(antd__WEBPACK_IMPORTED_MODULE_16__["Menu"].Item, {
        key: 3
      }, __jsx(_Components_CustomLink__WEBPACK_IMPORTED_MODULE_17__["default"], {
        route: "/muasam"
      }, __jsx("span", {
        className: 'main-nav-item' + (isShowRightSideHeader ? ' show' : '')
      }, "Mua s\u1EAFm"))));
    }
  }, {
    key: "renderMobile",
    value: function renderMobile() {
      var _this$props2 = this.props,
          locale = _this$props2.locale,
          userData = _this$props2.userData;
      var messages = locale.messages;
      var isSigned = true;
      var isHomePage = this.props.router.asPath === '/';
      return __jsx("div", {
        className: "wrapper"
      }, __jsx(antd__WEBPACK_IMPORTED_MODULE_16__["Drawer"], {
        title: "",
        width: '100%',
        placement: "right",
        onClose: this.closeDrawer,
        closeIcon: __jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_19__["CloseOutlined"], null),
        visible: this.state.isOpen // drawerStyle={{ background: '#000' }}

      }, __jsx("div", {
        className: "mobile-menu flex direction-column justify-center"
      }, __jsx("div", {
        className: "top-box"
      }, __jsx("h1", {
        className: "logo"
      }, __jsx("img", {
        width: 90,
        src: _config_images__WEBPACK_IMPORTED_MODULE_21__["images"].logoHeaderBlack,
        style: {
          objectFit: 'contain'
        }
      })), this.renderMainNavMobile('vertical')))), this.renderLeftSide(), !isHomePage && __jsx("div", {
        className: "right-side"
      }, __jsx("a", {
        className: "menu-bugger ML15",
        onClick: this.showDrawer
      }, __jsx("img", {
        src: _config_images__WEBPACK_IMPORTED_MODULE_21__["images"].threeDots
      }))));
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      return __jsx(antd__WEBPACK_IMPORTED_MODULE_16__["Layout"].Header, {
        className: "header-container"
      }, __jsx(react_media__WEBPACK_IMPORTED_MODULE_18__["default"], {
        query: "(min-width: 500px)",
        render: function render() {
          return _this7.renderDesktop();
        }
      }), __jsx(react_media__WEBPACK_IMPORTED_MODULE_18__["default"], {
        query: "(max-width: 501px)",
        render: function render() {
          return _this7.renderMobile();
        }
      }));
    }
  }]);

  return Header;
}(react__WEBPACK_IMPORTED_MODULE_10___default.a.PureComponent);

var mapStateToProps = function mapStateToProps(state) {
  return {
    locale: state.locale,
    userData: state.userData
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(next_router__WEBPACK_IMPORTED_MODULE_15__["withRouter"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_13__["connect"])(mapStateToProps, null)(Header)));

/***/ })

})
//# sourceMappingURL=_app.js.348a3c5cfc807bc4fdcf.hot-update.js.map