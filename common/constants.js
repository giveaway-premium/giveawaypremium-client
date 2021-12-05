export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'

export const KEY_STORE = {
  SET_LOCALE: 'SET_LOCALE',
  SET_USER: 'SET_USER',
  SET_CONNECTION_METHOD: 'SET_CONNECTION_METHOD',
  SET_LOADING: 'SET_LOADING',
  SET_SETTING: 'SET_SETTING',
  SET_TRANSFER_DATA: 'SET_TRANSFER_DATA',
  SET_WALLET_CONNECT: 'SET_WALLET_CONNECT',
  SET_GAS_PRICE: 'SET_GAS_PRICE',
  SET_GAS_CURRENT: 'SET_GAS_CURRENT',
  SET_CATEGORY: 'SET_CATEGORY'
}

export const OBJECTID_CATEGORY = {
  FASHION: '0paqD5jvw3', // thoi trang
  MACHINE: 'B3OQuAChW1', // thiet bi lam dep
  PERFUME: 'YIUniNrIKb', // nuoc hoa
  SHOES: 'PtUHtoonRc', // giay
  BAG: 'dNYERCGnBT', // tui & vi
  COMESTIC: 'OwyMj5kQ2N', // my pham
  ACCESSORIES: 'eMxuZ7VdUy' // dung cu trang diem
}

export const OBJECTID_SUB_CATEGORY = {
  // giay
  GIAY_BET: 'GBDAbyB7fx',
  GIAY_CAO_GOT: 'UWobIyULJA',
  GIAY_THE_THAO: '4FVRp20cE2',
  // thoi trang
  DAM: 'LjGfBcm0iz',
  AO_KHOAC: 'vGY4HOBbTG',
  SUIT: 'qqsjuoE4HM',
  VAY: 'EG2GjmOKvj',
  QUAN: 'AXLJIdkEhI',
  AO: 'Lz9H9NGGaE'
  //
}

export const REQUEST_TYPE = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
}

export const EMAIL_TYPE = {
  CONSIGNMENT: 'CONSIGNMENT',
  PAYMENT: 'PAYMENT'
}

export const EMAIL_TITLE = {
  CONSIGNMENT: 'Xác nhận thông tin ký gửi',
  PAYMENT: 'Xác nhận thông tin chuyển khoản'
}

export const LOCALE_DATA = {
  JA: 'ja',
  CN: 'cn',
  EN: 'en'
}

export const WEB3_RPC = {
  1: 'https://mainnet.infura.io/v3/',
  4: 'https://rinkeby.infura.io/v3/',
  42: 'https://kovan.infura.io/v3/',
  88: 'https://rpc.tomochain.com',
  89: 'https://rpc.testnet.tomochain.com',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  56: 'https://bsc-dataseed.binance.org/',
  128: 'https://http-mainnet.hecochain.com',
  256: 'https://http-testnet.hecochain.com'
}

export const NETWORK = {
  DEVELOPMENT: {
    'ETH': 42,
    'TOMO': 89,
    'BSC': 97,
    'HECO': 256
  },
  PRODUCTION: {
    'ETH': 1,
    'TOMO': 88,
    'BSC': 56,
    'HECO': 128
  }
}

export const OBSERVER_KEY = {
  SIGN_IN: 'SIGN_IN',
  ALREADY_SIGNED: 'ALREADY_SIGNED',
  CHANGED_ACCOUNT: 'CHANGED_ACCOUNT'
}

export const GAS_PRICE_DEFAULT = {
  slow: 3,
  medium: 4,
  fast: 20
}

export const DEEP_LINKING = {
  KEYRING: 'https://keyring.app/wc?uri=',
  PANTOGRAPH: ''
}

export const linkSupport = {
  METAMASK_CHROME: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en',
  METAMASK_FIREFOX: 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/',
  PANTOGRAPH_CHROME: 'https://chrome.google.com/webstore/detail/pantograph/ocfgfhicacgipgpiapepehhpidbhijkl?hl=en',
  PANTOGRAPH_FIREFOX: 'https://addons.mozilla.org/vi/firefox/addon/pantograph/',
  HB_IOS: 'https://itunes.apple.com/vn/app/hb-wallet/id1273639572?mt=8',
  HB_GOOGLE: 'https://play.google.com/store/apps/details?id=co.bacoor.android.hbwallet',
  HB_WALLET_NAGEMON: 'hbwallet://nagemon',
  HB_WALLET_WEBSITE: 'https://www.hb-wallet.com/',
  HB_WALLET_NAGEMON_QRCAN: 'hbwallet://nagemon/scanQR',
  PANTOGRAPH_IOS: 'https://apps.apple.com/vn/app/pantograph-networking-app/id1504033778',
  PANTOGRAPH_GOOGLE: 'https://play.google.com/store/apps/details?id=pantograph.bacoor.crypto.co',
  PANTOGRAPH_DEEP_LINK: 'pantograph://openbrowser',
  PRODUCT_LINK: 'https://pantograph.app/check-url-available',
  DEMO_LINK: 'https://demo.pantograph.app/check-url-available',
  PANTOGRAPH_INSTALL: 'https://pantograph.app/install-app',
  PANTOGRAPH_NFT_SCAN: 'pantograph://nft-card/xxxxxxx',
  KEYRING: 'https://keyring.app/wc?uri='
}
