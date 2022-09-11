/* eslint-disable react/display-name */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Form, Row, Col, Layout, Input, Button, Badge, Spin, Descriptions, Tabs, Table, Radio, Popconfirm, DatePicker } from 'antd'
import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'
import { showNotification, numberWithCommas, convertObjectToArray } from 'common/function'
import { DeleteFilled, LoadingOutlined, SearchOutlined } from '@ant-design/icons'
import { Router } from 'common/routes'
import { isMobile } from 'react-device-detect'
import './style.scss'
import Lottie from 'react-lottie'
import GapService from 'controller/Api/Services/Gap'
import { filter, isEqual } from 'lodash'
import Highlighter from 'react-highlight-words'
import { EMAIL_TITLE, EMAIL_TYPE } from 'common/constants'
import moment from 'moment'
const { RangePicker } = DatePicker
const { TabPane } = Tabs

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

const EditableContext = React.createContext(null)

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef(null)
  const form = useContext(EditableContext)
  useEffect(() => {
    if (editing) {
      inputRef.current.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()
      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className='editable-cell-value-wrap'
        style={{
          paddingRight: 24
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}

class TableOrderScreen extends React.PureComponent {
  constructor (props) {
    super(props)
    this.columns = [
      {
        title: 'Mã đơn hàng',
        dataIndex: 'objectId',
        key: '0',
        width: 180,
        // editable: true,
        ...this.getColumnSearchKeyProps('objectId')
      },
      {
        title: 'Tên khách hàng',
        dataIndex: 'fullName',
        key: '1'
        // width: 250,
        // ...this.getColumnSearchKeyProps('fullName')
        // ...this.getColumnSearchProps('consignerName')
        // ...this.getColumnSearchPropsConsignmentName('consignerName')
      },
      {
        title: 'Số điện thoại',
        width: 150,
        dataIndex: 'phoneNumber',
        key: '2',
        ...this.getColumnSearchKeyProps('phoneNumber')
      },
      {
        title: 'Số lượng',
        width: 100,
        dataIndex: 'totalNumberOfProductForSale',
        key: '3'
        // editable: true
      },
      {
        title: 'Tổng tiền',
        dataIndex: 'totalMoneyForSale',
        key: '4',
        // editable: true,
        render: (value) => <span>{value ? numberWithCommas(value * 1000) : '0'} đ</span>
      },
      {
        title: 'Thanh toán',
        dataIndex: 'isTransferMoneyWithBank',
        key: '5',
        ...this.getColumnSearchTransferOrNot('isTransferMoneyWithBank')
      },
      {
        title: 'Hình thức',
        dataIndex: 'isOnlineSale',
        key: '6',
        ...this.getColumnSearchOnlineOrNot('isOnlineSale')
      },
      {
        title: 'Thời gian tạo đơn',
        dataIndex: 'createdAt',
        key: '7'
      },
      {
        title: '',
        key: '8',
        width: 120,
        // fixed: 'right',
        render: (value) => (<Button style={{ width: '100%' }} onClick={() => this.onDeleteButton(value)}>Xoá</Button>)
      },
      {
        title: 'Nhận tiền',
        key: '9',
        width: 90,
        fixed: 'right',
        // ...this.getColumnSearchIsGetMoney('isGetMoney'),
        render: (value) =>
          this.state.orderData.length >= 1 ? (
            <Popconfirm title='Xác nhận' onConfirm={() => this.onChangeRadioIsGetMoney(value)}>
              <Radio.Button className={value.isGetMoney ? 'radio-true-isGetMoney' : 'radio-false-isGetMoney'} value={value.isGetMoney}>{value.isGetMoney ? 'Rồi' : 'Chưa'}</Radio.Button>
            </Popconfirm>
          ) : null
      }
    ]
    this.state = {
      orderData: [],
      total: 0,
      page: 1,
      selectedKeys: {},
      searchText: '',
      searchedColumn: '',
      tabKey: '1',
      isLoadingTags: false,
      tags: [],
      allInfoTag: [],
      currentTag: '',
      currentPagination: 1,
      fromDateMoment: null,
      toDateMoment: null
    }
    this.myModal = React.createRef()
  }

  componentDidMount () {
    this.fetchAllTags()
  }

  componentDidUpdate () {

  }

  convertDataIndexToName = (dataIndex) => {
    console.log('dataIndex')
    console.log(dataIndex)
    switch (dataIndex) {
    case 'consignerName':
      return 'Tìm tên khách hàng'
    case 'phoneNumber':
      return 'Tìm số điện thoại'
    }
  }

  setSelectedKeys = (value, keyColumn) => {
    console.log(value)
    console.log(keyColumn)
    this.setState({
      selectedKeys: {
        ...this.state.selectedKeys,
        [keyColumn]: value
      } || {}
    })
  }

  handleSearch = (confirm) => {
    const { selectedKeys } = this.state
    console.log('handleSearch')
    console.log(selectedKeys)
    this.fetchTableData(1)
    confirm()
  };

  handleReset = (clearFilters, keyColumn) => {
    const { selectedKeys } = this.state
    const selectedKeysTemp = { ...selectedKeys }
    if (selectedKeysTemp && selectedKeysTemp[keyColumn]) {
      delete selectedKeysTemp[keyColumn]
      console.log('selectedKeysTemp')
      console.log(selectedKeysTemp)
      this.setState({ selectedKeys: selectedKeysTemp }, () => {
        this.fetchTableData(1)
        clearFilters()
      })
    }
  };

  onChangeRadioSearch = (value, clearFilters) => {
    console.log('onChangeRadioSearch')
    console.log(value.target.value)
    // e.target.value
    if (value.target.value === 'true') {
      this.setState({
        selectedKeys: {
          ...this.state.selectedKeys,
          isTransferMoneyWithBank: 'true'
        } || {}
      }, () => {
        this.fetchTableData(1)
        clearFilters()
      })
    } else if (value.target.value === 'false') {
      this.setState({
        selectedKeys: {
          ...this.state.selectedKeys,
          isTransferMoneyWithBank: 'false'
        } || {}
      }, () => {
        this.fetchTableData(1)
        clearFilters()
      })
    } else {
      const { selectedKeys } = this.state
      const selectedKeysTemp = { ...selectedKeys }
      if (selectedKeysTemp && selectedKeysTemp.isTransferMoneyWithBank) {
        delete selectedKeysTemp.isTransferMoneyWithBank
        console.log('selectedKeysTemp')
        console.log(selectedKeysTemp)
        this.setState({ selectedKeys: selectedKeysTemp }, () => {
          this.fetchTableData(1)
          clearFilters()
        })
      }
    }
  }

  onChangeRadioSearchIsOnline = (value, clearFilters) => {
    console.log('onChangeRadioSearch')
    console.log(value.target.value)
    // e.target.value
    if (value.target.value === 'true') {
      this.setState({
        selectedKeys: {
          ...this.state.selectedKeys,
          isOnlineSale: 'true'
        } || {}
      }, () => {
        this.fetchTableData(1)
        clearFilters()
      })
    } else if (value.target.value === 'false') {
      this.setState({
        selectedKeys: {
          ...this.state.selectedKeys,
          isOnlineSale: 'false'
        } || {}
      }, () => {
        this.fetchTableData(1)
        clearFilters()
      })
    } else {
      const { selectedKeys } = this.state
      const selectedKeysTemp = { ...selectedKeys }
      if (selectedKeysTemp && selectedKeysTemp.isOnlineSale) {
        delete selectedKeysTemp.isOnlineSale
        console.log('selectedKeysTemp')
        console.log(selectedKeysTemp)
        this.setState({ selectedKeys: selectedKeysTemp }, () => {
          this.fetchTableData(1)
          clearFilters()
        })
      }
    }
  }

  getColumnSearchOnlineOrNot = keyColumn => ({
    filterDropdown: ({ confirm, clearFilters }) => (
      <div style={{ padding: 10 }}>
        {/* <Space> */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Radio.Group onChange={value => this.onChangeRadioSearchIsOnline(value, clearFilters)} defaultValue=''>
            <Radio.Button onClick={value => this.onChangeRadioSearchIsOnline(value, clearFilters)} value={'false'}>Offline</Radio.Button>
            <Radio.Button onClick={value => this.onChangeRadioSearchIsOnline(value, clearFilters)} value={'true'}>Online</Radio.Button>
            <Radio.Button onClick={value => this.onChangeRadioSearchIsOnline(value, clearFilters)} value={'all'}>Tất cả</Radio.Button>
          </Radio.Group>
        </div>
      </div>
    ),
    filterIcon: filter => <SearchOutlined
      style={{ color:
        (this.state.selectedKeys?.isOnlineSale?.length > 0 && keyColumn === 'isOnlineSale')
          ? '#1890ff' : undefined }}
    />
  });

  getColumnSearchTransferOrNot = keyColumn => ({
    filterDropdown: ({ confirm, clearFilters }) => (
      <div style={{ padding: 10 }}>
        {/* <Space> */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Radio.Group onChange={value => this.onChangeRadioSearch(value, clearFilters)} defaultValue=''>
            <Radio.Button onClick={value => this.onChangeRadioSearch(value, clearFilters)} value={'false'}>Trực tiếp</Radio.Button>
            <Radio.Button onClick={value => this.onChangeRadioSearch(value, clearFilters)} value={'true'}>Chuyển khoản</Radio.Button>
            <Radio.Button onClick={value => this.onChangeRadioSearch(value, clearFilters)} value={'all'}>Tất cả</Radio.Button>
          </Radio.Group>
        </div>
      </div>
    ),
    filterIcon: filter => <SearchOutlined
      style={{ color:
        (this.state.selectedKeys?.isTransferMoneyWithBank?.length > 0 && keyColumn === 'isTransferMoneyWithBank')
          ? '#1890ff' : undefined }}
    />
  });

  getColumnSearchKeyProps = keyColumn => ({
    filterDropdown: ({ confirm, clearFilters }) => (
      <div style={{ padding: 10 }}>
        <Input
          autoFocus
          ref={node => {
            this.searchInput = node
          }}
          placeholder={this.convertDataIndexToName}
          value={this.state.selectedKeys[keyColumn]}
          onChange={e => this.setSelectedKeys(e.target.value ? e.target.value : [], keyColumn)}
          onPressEnter={() => this.handleSearch(confirm)}
          style={{ width: '100%', marginBottom: 8, display: 'block' }}
        />
        {/* <Space> */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Button
            type='primary'
            onClick={() => this.handleSearch(confirm)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: '100%', marginBottom: '10px', marginTop: '10px' }}
          >
            Tìm kiếm
          </Button>
          <Button
            type='primary'
            onClick={() => this.handleReset(clearFilters, keyColumn)}
            icon={<DeleteFilled />}
            size='small'
            style={{ width: '100%' }}
          >
          Xoá
          </Button>
        </div>
        {/* <Button
          type='link'
          size='small'
          onClick={() => {
            confirm({ closeDropdown: false })
            this.setState({
              searchText: selectedKeys[0],
              searchedColumn: dataIndex
            })
          }}
        >
            Filter
        </Button> */}
        {/* </Space> */}
      </div>
    ),
    filterIcon: filter => <SearchOutlined
      style={{ color:
        (this.state.selectedKeys?.phoneNumber?.length > 0 && keyColumn === 'phoneNumber') ||
        (this.state.selectedKeys?.fullName?.length > 0 && keyColumn === 'fullName') ||
        (this.state.selectedKeys?.objectId?.length > 0 && keyColumn === 'objectId') ||
        (this.state.selectedKeys?.totalNumberOfProductForSale?.length > 0 && keyColumn === 'totalNumberOfProductForSale')
          ? '#1890ff' : undefined }}
    />,
    // onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100)
      }
    }
    // render: text =>
    //   this.state.searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //       searchWords={[this.state.searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   )
  });

  expandedRowRender = (recordData) => {
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell
      }
    }

    const columns = [
      {
        title: 'Mã SP',
        dataIndex: 'code',
        key: 'code'
        // editable: true,
        // width: 180
      },
      {
        title: 'Tên SP',
        dataIndex: 'name',
        key: 'name'
        // editable: true,
        // width: 250
      },
      {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        // editable: true,
        render: (value) => <span>{value ? numberWithCommas(value * 1000) : '0'} đ</span>
      },
      {
        title: 'Số lượng',
        dataIndex: 'count',
        key: 'count'
        // editable: true,
        // width: 100
      },
      {
        title: 'Tổng tiền',
        dataIndex: 'totalMoney',
        key: 'moneyBackProduct',
        render: (value) => <span>{value ? numberWithCommas(value * 1000) : '0'} đ</span>
      }
    ]

    const data = []

    console.log('item')
    console.log(recordData)

    recordData && recordData.productList && recordData.productList.map((item, index) => {
      data.push({
        key: index,
        name: item.name,
        note: item.note,
        categoryId: item.categoryId,
        code: item.code || '',
        price: Number(item.price) || 0,
        count: Number(item.count) || 0,
        priceAfterFee: Number(item.priceAfterFee) || 0,
        soldNumberProduct: Number(item.soldNumberProduct) || 0,
        remainNumberProduct: Number(item.count) - Number(item.soldNumberProduct || 0),
        moneyBackProduct: Number(item.soldNumberProduct || 0) * Number(item.priceAfterFee),
        totalMoney: (Number(item.count) || 0) * Number(item.price) || 0
      })
    })

    const formatedColumns = columns.map((col) => {
      if (!col.editable) {
        return col
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: (row) => this.handleSaveNestTable(row, recordData)
        })
      }
    })

    return <Table
      scroll={{ x: 800, y: '55vh' }}
      components={components}
      columns={formatedColumns}
      dataSource={data}
      pagination={false}
    />
  };

  convertPriceAfterFee = (productPrice = 0) => {
    let moneyBackForFullSold = productPrice

    if (productPrice > 0) {
      if (productPrice < 1000) {
        moneyBackForFullSold = productPrice * 74 / 100
      } else if (productPrice >= 1000 && productPrice <= 10000) {
        moneyBackForFullSold = productPrice * 77 / 100
      } else if (productPrice > 10000) {
        moneyBackForFullSold = productPrice * 80 / 100
      }

      return moneyBackForFullSold
    } else {
      return 0
    }
  }

  handleSaveNestTable = (row, record) => {
    console.log('row - handleSaveNestTable')
    console.log(row)
    // console.log(record)

    const newData = [...this.state.orderData]
    const index = newData.findIndex((item) => record.key === item.key)
    let item = newData[index]

    item.productList[row.key] = {
      ...row,
      note: row.node || '---',
      code: row.code,
      name: row.name,
      price: Number(row.price),
      priceAfterFee: this.convertPriceAfterFee(Number(row.price)) || 0,
      count: Number(row.count),
      soldNumberProduct: Number(row.soldNumberProduct) || 0,
      remainNumberProduct: Number(row.count) - Number(row.soldNumberProduct || 0),
      moneyBackProduct: (Number(row.soldNumberProduct || 0) * Number(row.priceAfterFee))
    }

    let newRemainNumConsignment = 0
    let newmoneyBack = 0
    let newNumSoldConsignment = 0
    let newNumberOfProducts = 0

    item.productList.map((productItem, productItemIndex) => {
      item.productList[productItemIndex].note = item.productList[productItemIndex].note || '---'
      newNumberOfProducts += Number(productItem.count) || 0
      newRemainNumConsignment += Number(productItem.remainNumberProduct) || 0
      newmoneyBack += Number(productItem.soldNumberProduct) * Number(productItem.priceAfterFee) * 1000 || 0
      newNumSoldConsignment += Number(productItem.soldNumberProduct) || 0
    })

    const newItem = {
      ...item,
      numberOfProducts: newNumberOfProducts,
      remainNumConsignment: newRemainNumConsignment,
      moneyBack: Math.round(newmoneyBack),
      numSoldConsignment: newNumSoldConsignment
    }

    console.log('handleSaveNestTable')
    console.log(newItem)
    console.log(newData)

    // if (!isEqual(newItem, item)) {
    newData.splice(index, 1, newItem)
    console.log('row')
    this.setState({
      orderData: newData
    }, async () => {
      console.log(newItem)
      const res = await GapService.updateConsignment(newItem)
      console.log(res)
      if (res) {
        showNotification(`Cập nhật thành công ${item.phoneNumber}`)
      } else {
        showNotification(`Cập nhật chưa được`)
      }
    })
    // }
  };

  onDeleteButton = async (row) => {
    const newData = [...this.state.orderData]
    const index = newData.findIndex((item) => row.objectId === item.objectId)
    const item = newData[index]
    console.log(item)

    const res = await GapService.deleteConsignment(row.objectId)
    console.log(res)
    if (res) {
      newData.splice(index, 1)
      this.setState({
        orderData: newData
      })
      showNotification(`Xoá thành công`)
      // showNotification(`Xoá thành công ${item.consignment}`)
    } else {
      showNotification(`Xoá chưa được`)
    }
  }

  fetchAllTags = async () => {
    const thisMonth = moment().get('month') + 1
    const thisYear = moment().get('year')
    this.setState({
      fromDateMoment: moment(`$${thisYear}-${thisMonth}-01`),
      toDateMoment: moment(`$${thisYear}-${thisMonth}-01`).add(1, 'month'),
      isLoadingTags: false
    }, () => this.fetchTableData())
  }

  fetchTableData = async (page = 1) => {
    const { selectedKeys, fromDateMoment, toDateMoment } = this.state
    this.setState({
      isLoadingData: true
    }, async () => {
      let res

      if (selectedKeys && selectedKeys.objectId) {
        res = await GapService.getOrder(page, selectedKeys, null, fromDateMoment, toDateMoment)
        console.log('getOrder', res)
        res.results = [res]
      } else if (selectedKeys && (
        selectedKeys.phoneNumber ||
        selectedKeys.fullName ||
        selectedKeys.isTransferMoneyWithBank ||
        selectedKeys.totalNumberOfProductForSale ||
        selectedKeys.isOnlineSale)) {
        res = await GapService.getOrder(page, selectedKeys, null, fromDateMoment, toDateMoment)
      } else {
        res = await GapService.getOrder(page, null, null, fromDateMoment, toDateMoment)
      }

      console.log('res')
      console.log(res)
      let orderData = []
      if (res && res.results) {
        res.results.map((item, indexItem) => {
          // console.log('indexItem')
          // console.log(item)
          orderData.push({
            key: indexItem,
            objectId: item.objectId,
            fullName: item?.fullName,
            consignmentId: item.consignmentId,
            consignerIdCard: item.consignerIdCard,
            consigneeName: item.consigneeName,
            phoneNumber: item?.phoneNumber,
            totalNumberOfProductForSale: `${Number(item.totalNumberOfProductForSale)}`,
            isTransferMoneyWithBank: item.isTransferMoneyWithBank ? 'Chuyển khoản' : 'Trực tiếp',
            totalMoneyForSale: item.totalMoneyForSale ? `${item.totalMoneyForSale}` : 0,
            createdAt: moment(item.createdAt).format('DD-MM-YYYY'),
            note: item.note || '---',
            isOnlineSale: item.isOnlineSale ? 'Online' : 'Offline',

            numSoldConsignment: `${Number(item.numSoldConsignment || 0)}`,
            remainNumConsignment: `${Number(item.numberOfProducts) - Number(item.numSoldConsignment || 0)}`,
            bankName: item.banks && item.banks[0] ? item.banks[0].type : '',
            bankId: item.banks && item.banks[0] ? item.banks[0].accNumber : '',
            moneyBackForFullSold: item.moneyBackForFullSold ? `${item.moneyBackForFullSold}` : 0,
            totalMoney: item.totalMoney ? `${item.totalMoney}` : 0,
            timeConfirmGetMoney: item.timeConfirmGetMoney || 'Chưa',
            email: item.mail,
            birthday: item.birthday,
            productList: item.productList,
            isGetMoney: item.isGetMoney
          })
        })
        this.setState({
          total: res.count,
          orderData: orderData,
          isLoadingData: false
        })
      } else {
        this.setState({
          isLoadingData: false
        })
      }
    })
  }

  handleSave = (row) => {
    const newData = [...this.state.orderData]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]
    // const newRemainNumConsignment = `${Number(row.numberOfProducts) - Number(row.numSoldConsignment || 0)}`
    const newItem = { ...item, ...row }

    if (!isEqual(newItem, item)) {
      newData.splice(index, 1, newItem)
      // console.log('row')
      this.setState({
        orderData: newData
      }, async () => {
        // console.log(newItem)
        const res = await GapService.updateConsignment(newItem)
        // console.log(res)
        if (res) {
          showNotification(`Cập nhật thành công ${item.phoneNumber}`)
        } else {
          showNotification(`Cập nhật chưa được`)
        }
      })
    }
  };

  paginationChange = (page) => {
    this.setState({
      currentPagination: page || 1
    }, () => {
      this.fetchTableData(page)
    })
  }

  onChangeTab = (tabKey) => {
    const { allInfoTag } = this.state
    this.setState({
      // selectedKeys: {},
      currentPagination: 1,
      currentTag: allInfoTag[tabKey].objectId
    }, () => {
      this.fetchTableData(1)
    })
  }

  onHandleDatePicker = (date, dateString) => {
    this.setState({
      fromDateMoment: date[0],
      toDateMoment: date[1],
      isLoadingTags: false
    }, () => this.fetchTableData())
  }

  render () {
    const { userData } = this.props
    const { isLoadingData, orderData, total, isLoadingTags, currentPagination, fromDateMoment, toDateMoment } = this.state

    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell
      }
    }

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      }
    })

    return (
      <div className='tableConsignemntScreen-container'>
        {/* {
          isLoadingTags ? <LoadingOutlined />
            : <Tabs defaultActiveKey='0' onChange={this.onChangeTab} >
              {allInfoTag.map((tag, indexTag) => <TabPane tab={tag.code} key={`${indexTag}`} />)}
            </Tabs>
        } */}
        <RangePicker value={[fromDateMoment, toDateMoment]} onChange={this.onHandleDatePicker} />
        {/* <RangePicker value={[moment(), moment().add(1, 'month')]} defaultPickerValue={[moment(), moment().add(1, 'month')]} picker='month' onChange={this.onHandleDatePicker} /> */}
        <Table
          components={components}
          size='small'
          loading={isLoadingData || isLoadingTags}
          columns={columns}
          dataSource={orderData}
          bordered
          expandable={{ expandedRowRender: record => this.expandedRowRender(record) }}
          pagination={{
            current: currentPagination,
            total: total,
            pageSize: 100,
            onChange: this.paginationChange
          }}
          scroll={{ x: 1400, y: '70vh' }}
        />
        <MyModal ref={this.myModal} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData
})

export default withRouter(connect(mapStateToProps, null)(TableOrderScreen))