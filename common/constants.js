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
  SET_CATEGORY: 'SET_CATEGORY',
  SET_IP_HASH: 'SET_IP_HASH',
  SET_CHANNEL_MONITOR: 'SET_CHANNEL_MONITOR',
  SET_TEMP_CONSIGNMENT: 'SET_TEMP_CONSIGNMENT',
  SET_ADDRESS_INFO_ARRAY: 'SET_ADDRESS_INFO_ARRAY',
  SET_ADDRESS_INFO_ARRAY_AFFTER_SORT: 'SET_ADDRESS_INFO_ARRAY_AFFTER_SORT'
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
  CONSIGNMENT: 'Xác Nhận Thông Tin Ký Gửi',
  PAYMENT: 'Xác Nhận Thông Tin Chuyển Khoản'
}

export const BOOKING_OPTION_EACH_DAY = 'BOOKING_OPTION_EACH_DAY'
export const WORKING_DAY_COUNT = 'WORKING_DAY_COUNT'

export const DEFAULT_BOOKING_OPTION_VALUE = 8

export const BOOKING_OPTION_EACH_DAY_DATA_DEFAULT = {
  OPTION_1: '',
  OPTION_2: '',
  OPTION_3: '',
  OPTION_4: '',
  OPTION_5: '',
  OPTION_6: '',
  OPTION_7: '',
  OPTION_8: ''
}

export const LOCALE_DATA = {
  JA: 'ja',
  CN: 'cn',
  EN: 'en'
}

// 2 -> 1
// 3 -> 1
// 4 -> 3,2,1
// 5 ->
// 6 -> 6
// 7 -> all
// 8 -> 1

export const TIME_BOOKING = {
  OPTION_1: [
    {
      timeName: '10:00',
      timeCode: '1000'
    },
    {
      timeName: '10:30',
      timeCode: '1030'
    },
    {
      timeName: '11:00',
      timeCode: '1100'
    },
    {
      timeName: '11:30',
      timeCode: '1130'
    },
    {
      timeName: '13:00',
      timeCode: '1300'
    },
    {
      timeName: '13:30',
      timeCode: '1330'
    },
    {
      timeName: '14:00',
      timeCode: '1400'
    },
    {
      timeName: '14:30',
      timeCode: '1430'
    },
    {
      timeName: '15:00',
      timeCode: '1500'
    },
    {
      timeName: '15:30',
      timeCode: '1530'
    },
    {
      timeName: '16:00',
      timeCode: '1600'
    },
    {
      timeName: '16:30',
      timeCode: '1630'
    },
    {
      timeName: '17:00',
      timeCode: '1700'
    },
    {
      timeName: '17:30',
      timeCode: '1730'
    },
    {
      timeName: '18:00',
      timeCode: '1800'
    },
    {
      timeName: '18:30',
      timeCode: '1830'
    }
  ],
  OPTION_2: [
    {
      timeName: '10:00',
      timeCode: '1000'
    },
    {
      timeName: '11:00',
      timeCode: '1100'
    },
    {
      timeName: '13:00',
      timeCode: '1300'
    },
    {
      timeName: '14:00',
      timeCode: '1400'
    },
    {
      timeName: '15:00',
      timeCode: '1500'
    },
    {
      timeName: '16:00',
      timeCode: '1600'
    },
    {
      timeName: '17:00',
      timeCode: '1700'
    },
    {
      timeName: '18:00',
      timeCode: '1800'
    }
  ],
  OPTION_3: [
    {
      timeName: '10:00',
      timeCode: '1000'
    },
    {
      timeName: '10:30',
      timeCode: '1030'
    },
    {
      timeName: '11:00',
      timeCode: '1100'
    },
    {
      timeName: '11:30',
      timeCode: '1130'
    },
    {
      timeName: '13:00',
      timeCode: '1300'
    },
    {
      timeName: '13:30',
      timeCode: '1330'
    },
    {
      timeName: '14:00',
      timeCode: '1400'
    },
    {
      timeName: '14:30',
      timeCode: '1430'
    },
    {
      timeName: '15:00',
      timeCode: '1500'
    }
  ],
  OPTION_4: [
    {
      timeName: '10:00',
      timeCode: '1000'
    },
    {
      timeName: '11:00',
      timeCode: '1100'
    },
    {
      timeName: '13:00',
      timeCode: '1300'
    },
    {
      timeName: '14:00',
      timeCode: '1400'
    },
    {
      timeName: '15:00',
      timeCode: '1500'
    }
  ],
  OPTION_5: [
    {
      timeName: '15:00',
      timeCode: '1500'
    },
    {
      timeName: '15:30',
      timeCode: '1530'
    },
    {
      timeName: '16:00',
      timeCode: '1600'
    },
    {
      timeName: '16:30',
      timeCode: '1630'
    },
    {
      timeName: '17:00',
      timeCode: '1700'
    },
    {
      timeName: '17:30',
      timeCode: '1730'
    },
    {
      timeName: '18:00',
      timeCode: '1800'
    },
    {
      timeName: '18:30',
      timeCode: '1830'
    },
    {
      timeName: '19:00',
      timeCode: '1900'
    },
    {
      timeName: '19:30',
      timeCode: '1930'
    }
  ],
  OPTION_6: [
    {
      timeName: '15:00',
      timeCode: '1500'
    },
    {
      timeName: '16:00',
      timeCode: '1600'
    },
    {
      timeName: '17:00',
      timeCode: '1700'
    },
    {
      timeName: '18:00',
      timeCode: '1800'
    },
    {
      timeName: '19:00',
      timeCode: '1900'
    }
  ],
  OPTION_7: [],
  OPTION_8: [
    {
      timeName: '10:00',
      timeCode: '1000'
    },
    {
      timeName: '11:00',
      timeCode: '1100'
    },
    {
      timeName: '13:30',
      timeCode: '1330'
    },
    {
      timeName: '14:30',
      timeCode: '1430'
    },
    {
      timeName: '15:30',
      timeCode: '1530'
    },
    {
      timeName: '16:30',
      timeCode: '1630'
    },
    {
      timeName: '17:30',
      timeCode: '1730'
    },
    {
      timeName: '18:30',
      timeCode: '1830'
    }
  ],
  OPTION_9: [
    {
      timeName: '10:00',
      timeCode: '1000'
    },
    {
      timeName: '10:15',
      timeCode: '1015'
    },
    {
      timeName: '10:30',
      timeCode: '1030'
    },
    {
      timeName: '10:45',
      timeCode: '1045'
    },
    {
      timeName: '11:00',
      timeCode: '1100'
    },
    {
      timeName: '11:15',
      timeCode: '1115'
    },
    {
      timeName: '11:30',
      timeCode: '1130'
    },
    {
      timeName: '11:45',
      timeCode: '1145'
    },
    {
      timeName: '13:00',
      timeCode: '1300'
    },
    {
      timeName: '13:15',
      timeCode: '1315'
    },
    {
      timeName: '13:30',
      timeCode: '1330'
    },
    {
      timeName: '13:45',
      timeCode: '1345'
    },
    {
      timeName: '14:00',
      timeCode: '1400'
    },
    {
      timeName: '14:15',
      timeCode: '1415'
    },
    {
      timeName: '14:30',
      timeCode: '1430'
    },
    {
      timeName: '14:45',
      timeCode: '1445'
    },
    {
      timeName: '15:00',
      timeCode: '1500'
    },
    {
      timeName: '15:15',
      timeCode: '1515'
    },
    {
      timeName: '15:30',
      timeCode: '1530'
    },
    {
      timeName: '15:45',
      timeCode: '1545'
    },
    {
      timeName: '16:00',
      timeCode: '1600'
    },
    {
      timeName: '16:15',
      timeCode: '1615'
    },
    {
      timeName: '16:30',
      timeCode: '1630'
    },
    {
      timeName: '16:45',
      timeCode: '1645'
    },
    {
      timeName: '17:00',
      timeCode: '1700'
    },
    {
      timeName: '17:15',
      timeCode: '1715'
    },
    {
      timeName: '17:30',
      timeCode: '1730'
    },
    {
      timeName: '17:45',
      timeCode: '1745'
    },
    {
      timeName: '18:00',
      timeCode: '1800'
    },
    {
      timeName: '18:30',
      timeCode: '1830'
    }
  ]
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

export const ADDRESS_GET_ORDER_ARRAY = ['Hồ Chí Minh', '1', 'Nguyễn Thái Bình']

export const ADDRESS_STREET_GET_ORDER = '1 Phó Đức Chính'
