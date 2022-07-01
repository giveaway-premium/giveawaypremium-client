/* eslint-disable react/display-name */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Form, Row, Col, Layout, Input, Button, Badge, Spin, Descriptions, Tabs, Table, Radio, Popconfirm } from 'antd'
import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'
import { showNotification, numberWithCommas } from 'common/function'
import { DeleteFilled, LoadingOutlined, SearchOutlined } from '@ant-design/icons'
import { Router } from 'common/routes'
import { isMobile } from 'react-device-detect'
import './style.scss'
import Lottie from 'react-lottie'
import GapService from 'controller/Api/Services/Gap'
import { isEqual } from 'lodash'
import Highlighter from 'react-highlight-words'
import { EMAIL_TITLE, EMAIL_TYPE } from 'common/constants'
import moment from 'moment'

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

class TableConsignemntScreen extends React.PureComponent {
  constructor (props) {
    super(props)
    this.columns = [
      {
        title: 'Tên khách hàng',
        dataIndex: 'consignerName',
        key: '0',
        width: 250,
        ...this.getColumnSearchPropsConsignmentName('consignerName')
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber',
        key: '1',
        ...this.getColumnSearchProps('phoneNumber')
      },
      {
        title: 'Mã ký gửi',
        dataIndex: 'consignmentId',
        key: '2',
        width: 120,
        editable: true
      },
      {
        title: 'SL ký gửi',
        width: 80,
        dataIndex: 'numberOfProducts',
        key: '3'
        // editable: true
      },
      {
        title: 'Đã bán',
        width: 80,
        dataIndex: 'numSoldConsignment',
        key: '4'
        // editable: true
      },
      {
        title: 'Còn lại',
        width: 120,
        dataIndex: 'remainNumConsignment',
        key: '5',
        ...this.getColumnSearchProps('remainNumConsignment')
      },
      {
        title: 'Số tiền trả khách',
        dataIndex: 'moneyBack',
        key: '6',
        // editable: true,
        render: (value) => <span>{value ? numberWithCommas(value) : '0'} đ</span>
      },
      {
        title: 'Tên ngân hàng',
        dataIndex: 'bankName',
        key: '7'
      },
      {
        title: 'ID ngân hàng',
        dataIndex: 'bankId',
        key: '8'
      },
      {
        title: 'Nhận tiền',
        dataIndex: 'isTransferMoneyWithBank',
        key: '9',
        ...this.getColumnSearchProps('isTransferMoneyWithBank')
      },
      {
        title: 'Thời gian nhận tiền',
        dataIndex: 'timeConfirmGetMoney',
        key: '10'
      },
      {
        title: '',
        key: '11',
        width: 120,
        // fixed: 'right',
        render: (value) => (<Button style={{ width: '100%' }} onClick={() => this.onDeleteButton(value)}>Xoá</Button>)
      },
      {
        title: 'Nhận tiền',
        key: '12',
        width: 90,
        fixed: 'right',
        render: (value) =>
          this.state.consignmentData.length >= 1 ? (
            <Popconfirm title='Xác nhận' onConfirm={() => this.onChangeRadioIsGetMoney(value)}>
              <Radio.Button className={value.isGetMoney ? 'radio-true-isGetMoney' : 'radio-false-isGetMoney'} value={value.isGetMoney}>{value.isGetMoney ? 'Rồi' : 'Chưa'}</Radio.Button>
            </Popconfirm>
          ) : null
      }
    ]
    this.state = {
      consignmentData: [],
      total: 0,
      page: 1,
      searchText: '',
      searchedColumn: '',
      tabKey: '1',
      isLoadingTags: false,
      tags: [],
      allInfoTag: [],
      currentTag: '',
      currentPagination: 1
    }
    this.myModal = React.createRef()
  }

  componentDidMount () {
    this.fetchAllTags()
  }

  componentDidUpdate () {

  }

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
        key: 'code',
        editable: true,
        width: 100
      },
      {
        title: 'Tên SP',
        dataIndex: 'name',
        key: 'name',
        editable: true,
        width: 150
      },
      {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        editable: true,
        render: (value) => <span>{value ? numberWithCommas(value * 1000) : '0'} đ</span>
      },
      {
        title: 'Số lượng',
        dataIndex: 'count',
        key: 'count',
        editable: true,
        width: 100
      },
      {
        title: 'Giá sau phí',
        dataIndex: 'priceAfterFee',
        key: 'priceAfterFee',
        editable: true,
        render: (value) => <span>{value ? numberWithCommas(value * 1000) : '0'} đ</span>
      },
      {
        title: 'Đã bán',
        width: 80,
        dataIndex: 'soldNumberProduct',
        key: 'soldNumberProduct',
        editable: true
      },
      {
        title: 'Còn lại',
        width: 80,
        dataIndex: 'remainNumberProduct',
        key: 'remainNumberProduct'
      },
      {
        title: 'Tổng tiền sau phí',
        dataIndex: 'moneyBackProduct',
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
        moneyBackProduct: Number(item.soldNumberProduct || 0) * Number(item.priceAfterFee)
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
      scroll={{ x: 1000, y: '55vh' }}
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

    const newData = [...this.state.consignmentData]
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
      consignmentData: newData
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

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 10 }}>
        <Input
          ref={node => {
            this.searchInput = node
          }}
          placeholder={this.convertDataIndexToName}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: '100%', marginBottom: 8, display: 'block' }}
        />
        {/* <Space> */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Button
            type='primary'
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: '100%', marginBottom: '10px', marginTop: '10px' }}
          >
            Tìm kiếm
          </Button>
          <Button
            type='primary'
            onClick={() => this.handleReset(clearFilters)}
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
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    // onFilter: (value, record) =>
    //   record[dataIndex]
    //     ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
    //     : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100)
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  });

  getColumnSearchPropsConsignmentName = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 10 }}>
        <Input
          ref={node => {
            this.searchInput = node
          }}
          placeholder={this.convertDataIndexToName}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearchName(selectedKeys, confirm, dataIndex)}
          style={{ width: '100%', marginBottom: 8, display: 'block' }}
        />
        {/* <Space> */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Button
            type='primary'
            onClick={() => this.handleSearchName(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: '100%', marginBottom: '10px', marginTop: '10px' }}
          >
            Tìm kiếm
          </Button>
          <Button
            type='primary'
            onClick={() => this.handleResetName(clearFilters)}
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
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    // onFilter: (value, record) =>
    //   record[dataIndex]
    //     ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
    //     : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100)
      }
    },
    render: text =>
      this.state.searchedColumnName === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchTextName]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  });

  onDeleteButton = async (row) => {
    const newData = [...this.state.consignmentData]
    const index = newData.findIndex((item) => row.objectId === item.objectId)
    const item = newData[index]
    console.log(item)

    const res = await GapService.deleteConsignment(row.objectId)
    console.log(res)
    if (res) {
      newData.splice(index, 1)
      this.setState({
        consignmentData: newData
      })
      showNotification(`Xoá thành công`)
      // showNotification(`Xoá thành công ${item.consignment}`)
    } else {
      showNotification(`Xoá chưa được`)
    }
  }

  onChangeRadioIsGetMoney = async (row) => {
    console.log('onChangeRadioIsGetMoney')
    console.log(row)

    const newData = [...this.state.consignmentData]
    const index = newData.findIndex((item) => row.objectId === item.objectId)
    const item = newData[index]
    let newItem = { ...item, ...row, isGetMoney: !item.isGetMoney }

    if (newItem && newItem.isGetMoney === true) {
      newItem = { ...item, ...row, isGetMoney: !item.isGetMoney, timeConfirmGetMoney: moment().format('DD-MM-YYYY HH:mm') }
    }

    if (!isEqual(newItem, item)) {
      newData.splice(index, 1, newItem)
      console.log('row')
      this.setState({
        consignmentData: newData
      }, async () => {
        console.log(newItem)
        const customerFormData = {
          consignerName: row.consignerName,
          phoneNumber: row.phoneNumber,
          numberOfProducts: row.numberOfProducts,
          consignerIdCard: row.consignerIdCard,
          mail: row.email,
          bankName: row.bankName,
          bankId: row.bankId,
          timeConfirmGetMoney: row.timeConfirmGetMoney
        }

        if (newItem && newItem.isGetMoney && newItem.email && newItem.email.length > 0) {
          GapService.sendMail(customerFormData, row, EMAIL_TYPE.PAYMENT, EMAIL_TITLE.PAYMENT)
        }

        const res = await GapService.updateConsignment(newItem)
        console.log(res)
        if (res) {
          showNotification(`Cập nhật thành công ${item.phoneNumber}`)
        } else {
          showNotification(`Cập nhật chưa được`)
        }
      })
    }
  }

  handleSearchName = (selectedKeys, confirm, dataIndex) => {
    console.log('handleSearch')
    console.log(selectedKeys)
    console.log(dataIndex)

    // confirm()
    // this.fetchTableData(1, selectedKeys[0])
    this.setState({
      searchTextName: selectedKeys[0],
      searchedColumnName: dataIndex
    }, () => {
      confirm()
    })
  }

  handleResetName = clearFilters => {
    clearFilters()
    this.setState({ searchTextName: '', searchedColumnName: null })
  };

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    console.log('handleSearch')
    console.log(selectedKeys)
    console.log(dataIndex)

    // confirm()
    // this.fetchTableData(1, selectedKeys[0])
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    }, () => {
      confirm()
    })
  };

  handleReset = clearFilters => {
    clearFilters()
    this.setState({ searchText: '', searchedColumn: null })
  };

  fetchAllTags = async () => {
    this.setState({
      searchText: '',
      isLoadingTags: true
    }, async () => {
      const res = await GapService.getConsignmentID()
      if (res && res.results && res.results.length > 0) {
        const tempArray = res.results.reverse()
        this.setState({
          currentTag: tempArray[0].objectId,
          allInfoTag: tempArray,
          isLoadingTags: false
        }, () => this.fetchTableData())
      } else {
        this.setState({
          isLoadingTags: false
        })
      }
    })
  }

  fetchTableData = async (page = 1, keyword) => {
    const { searchText, currentTag } = this.state
    this.setState({
      isLoadingData: true
    }, async () => {
      let res

      if (!searchText) {
        // console.log('fetchTableData 13213123123123')
        // console.log(currentTag)

        res = await GapService.getConsignment(page, null, null, currentTag)
      } else {
        res = await GapService.getConsignment(page, searchText, null, currentTag)
      }

      // console.log('res')
      // console.log(res)
      let consignmentData = []
      if (res && res.results) {
        res.results.map((item, indexItem) => {
          // console.log('indexItem')
          // console.log(item)
          consignmentData.push({
            key: indexItem,
            objectId: item.objectId,
            consignerName: item.consignerName,
            consignmentId: item.consignmentId,
            consignerIdCard: item.consignerIdCard,
            consigneeName: item.consigneeName,
            phoneNumber: item.phoneNumber,
            numberOfProducts: `${Number(item.numberOfProducts)}`,
            numSoldConsignment: `${Number(item.numSoldConsignment || 0)}`,
            remainNumConsignment: `${Number(item.numberOfProducts) - Number(item.numSoldConsignment || 0)}`,
            bankName: item.banks && item.banks[0] ? item.banks[0].type : '',
            bankId: item.banks && item.banks[0] ? item.banks[0].accNumber : '',
            moneyBackForFullSold: item.moneyBackForFullSold ? `${item.moneyBackForFullSold}` : 0,
            moneyBack: item.moneyBack ? `${item.moneyBack}` : 0,
            totalMoney: item.totalMoney ? `${item.totalMoney}` : 0,
            timeConfirmGetMoney: item.timeConfirmGetMoney || 'Chưa',
            isTransferMoneyWithBank: item.isTransferMoneyWithBank ? 'Chuyển khoản' : 'Trực tiếp',
            email: item.mail,
            birthday: item.birthday,
            productList: item.productList,
            isGetMoney: item.isGetMoney
          })
        })
        this.setState({
          total: res.count,
          consignmentData: consignmentData,
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
    const newData = [...this.state.consignmentData]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]
    // const newRemainNumConsignment = `${Number(row.numberOfProducts) - Number(row.numSoldConsignment || 0)}`
    const newItem = { ...item, ...row }

    if (!isEqual(newItem, item)) {
      newData.splice(index, 1, newItem)
      // console.log('row')
      this.setState({
        consignmentData: newData
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
      currentPagination: 1,
      currentTag: allInfoTag[tabKey].objectId
    }, () => {
      this.fetchTableData(1)
    })
  }

  render () {
    const { userData } = this.props
    const { isLoadingData, consignmentData, total, isLoadingTags, tags, allInfoTag, currentPagination } = this.state

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
        {
          isLoadingTags ? <LoadingOutlined />
            : <Tabs defaultActiveKey='0' onChange={this.onChangeTab} >
              {allInfoTag.map((tag, indexTag) => <TabPane tab={tag.code} key={`${indexTag}`} />)}
            </Tabs>
        }
        <Table
          components={components}
          size='small'
          loading={isLoadingData || isLoadingTags}
          columns={columns}
          dataSource={consignmentData}
          bordered
          expandable={{ expandedRowRender: record => this.expandedRowRender(record) }}
          pagination={{
            current: currentPagination,
            total: total,
            pageSize: 100,
            onChange: this.paginationChange
          }}
          scroll={{ x: 1900, y: '55vh' }}
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

export default withRouter(connect(mapStateToProps, null)(TableConsignemntScreen))
