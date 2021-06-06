/* eslint-disable react/display-name */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Form, Row, Col, Layout, Input, Button, Spin, Descriptions, Tabs, Table, Radio, Popconfirm } from 'antd'
import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'
import { showNotification, numberWithCommas } from 'common/function'
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons'
import { Router } from 'common/routes'
import { isMobile } from 'react-device-detect'
import './style.scss'
import Lottie from 'react-lottie'
import GapService from 'controller/Api/Services/Gap'
import { isEqual } from 'lodash'
import Highlighter from 'react-highlight-words'
import { EMAIL_TITLE, EMAIL_TYPE } from 'common/constants'
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
        width: 15,
        dataIndex: 'consignerName',
        key: 'name'
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber',
        key: '1',
        width: 10,
        ...this.getColumnSearchProps('phoneNumber')
      },
      {
        title: 'Mã ký gửi',
        dataIndex: 'consignmentId',
        key: '2',
        width: 10,
        editable: true
      },
      {
        title: 'SL ký gửi',
        dataIndex: 'numberOfProducts',
        key: '3',
        width: 5,
        editable: true
      },
      {
        title: 'Đã bán',
        dataIndex: 'numSoldConsignment',
        key: '4',
        width: 5,
        editable: true
      },
      {
        title: 'Còn lại',
        dataIndex: 'remainNumConsignment',
        key: '5',
        width: 5
      },
      {
        title: 'Số tiền trả khách',
        dataIndex: 'moneyBack',
        key: '6',
        width: 10,
        editable: true,
        render: (value) => <span>{value ? numberWithCommas(value) : '0'} đ</span>
      },
      {
        title: 'Tên ngân hàng',
        dataIndex: 'bankName',
        key: '7',
        width: 10
      },
      {
        title: 'ID ngân hàng',
        dataIndex: 'bankId',
        key: '8',
        width: 10
      },
      // {
      //   title: 'Thời gian trả tiền',
      //   dataIndex: 'timeGetMoney',
      //   key: '7',
      //   width: 10,
      //   editable: true
      // },
      {
        title: 'Nhận tiền',
        key: '9',
        fixed: 'right',
        width: 5,
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
      currentTag: ''
    }
    this.myModal = React.createRef()
  }

  componentDidMount () {
    this.fetchAllTags()
  }

  componentDidUpdate () {

  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node
          }}
          placeholder={`Tìm số điện thoại`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        {/* <Space> */}
        <Button
          type='primary'
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size='small'
          style={{ width: '100%' }}
        >
            Tìm kiếm
        </Button>
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

  onChangeRadioIsGetMoney = async (row) => {
    console.log('onChangeRadioIsGetMoney')
    console.log(row)

    const newData = [...this.state.consignmentData]
    const index = newData.findIndex((item) => row.objectId === item.objectId)
    const item = newData[index]
    const newItem = { ...item, ...row, isGetMoney: !item.isGetMoney }

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
          bankId: row.bankId
        }
        // <p>Họ tên khách hàng: {{customerName}}</p>
        // <p>Số điện thoại: {{phoneNumber}}</p>
        // <p>CMND: {{identityId}}</p>
        // <p>Mã ký gửi: {{consignmentId}}</p>
        // <p>Số lượng: {{numberOfProduct}}</p>
        // <p>Ngân hàng đăng ký: {{bankName}}</p>
        // <p>ID Ngân hàng: {{bankId}}</p>
        // <p>Số tiền chuyển khoản: {{moneyBack}}</p>
        if (newItem && newItem.isGetMoney) {
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

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    console.log('handleSearch')
    console.log(selectedKeys)

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
    this.setState({ searchText: '' })
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
        console.log('fetchTableData 13213123123123')
        console.log(currentTag)

        res = await GapService.getConsignment(page, null, null, currentTag)
      } else {
        res = await GapService.getConsignment(page, searchText, null, currentTag)
      }

      console.log('res')
      console.log(res)
      let consignmentData = []
      if (res && res.results) {
        res.results.map((item, indexItem) => {
          console.log('indexItem')
          console.log(item)
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
            bankName: res.results[0].banks[0] ? res.results[0].banks[0].type : '',
            bankId: res.results[0].banks[0] ? res.results[0].banks[0].accNumber : '',
            moneyBack: item.moneyBack,
            email: item.mail,
            birthday: item.birthday,
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
    const newRemainNumConsignment = `${Number(row.numberOfProducts) - Number(row.numSoldConsignment || 0)}`
    const newItem = { ...item, ...row, remainNumConsignment: newRemainNumConsignment }

    if (!isEqual(newItem, item)) {
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
    }
  };

  paginationChange = (page) => {
    console.log(page)
    this.fetchTableData(page)
  }

  onChangeTab = (tabKey) => {
    const { allInfoTag } = this.state
    this.setState({
      currentTag: allInfoTag[tabKey].objectId
    }, () => {
      this.fetchTableData()
    })
  }

  render () {
    const { userData } = this.props
    const { isLoadingData, consignmentData, total, isLoadingTags, tags, allInfoTag } = this.state

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
          pagination={{
            total: total,
            pageSize: 20,
            onChange: this.paginationChange
          }}
          scroll={{ x: 1500, y: '55vh' }}
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
