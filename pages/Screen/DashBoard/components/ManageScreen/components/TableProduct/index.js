/* eslint-disable react/display-name */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Form, Row, Col, Layout, Input, Button, Badge, Spin, Descriptions, Tabs, Table, Radio, Popconfirm, Upload, Switch } from 'antd'
import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'
import { showNotification, numberWithCommas } from 'common/function'
import { LeftCircleTwoTone, LoadingOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons'
import { Router } from 'common/routes'
import { isMobile } from 'react-device-detect'
import './style.scss'
import Lottie from 'react-lottie'
import GapService from 'controller/Api/Services/Gap'
import { isEqual } from 'lodash'
import Highlighter from 'react-highlight-words'
import { EMAIL_TITLE, EMAIL_TYPE } from 'common/constants'
import moment from 'moment'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
// import * as arrayMove from 'array-move'
const { Dragger } = Upload

const { TabPane } = Tabs
let isJPG = false
let isLt2M = false
let isLt10M = false

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

class TableProductScreen extends React.PureComponent {
  constructor (props) {
    super(props)
    this.columns = [
      {
        title: 'Code SP',
        dataIndex: 'code',
        key: 'code',
        width: 150
      },
      {
        title: 'Tên SP',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        width: 150,
        // editable: true,
        render: (value) => <span>{value ? numberWithCommas(value * 1000) : '0'} đ</span>
      },
      {
        title: 'Giá sau phí',
        dataIndex: 'priceAfterFee',
        key: 'priceAfterFee',
        width: 150,
        // editable: true,
        render: (value) => <span>{value ? numberWithCommas(value * 1000) : '0'} đ</span>
      },
      {
        title: 'Số lượng',
        dataIndex: 'count',
        key: 'count',
        width: 100
      },
      {
        title: 'Đã bán',
        width: 100,
        dataIndex: 'soldNumberProduct',
        key: 'soldNumberProduct'
        // editable: true
      },
      {
        title: 'Còn lại',
        width: 100,
        dataIndex: 'remainNumberProduct',
        key: 'remainNumberProduct'
      },
      {
        title: 'Tổng tiền sau phí',
        dataIndex: 'moneyBackProduct',
        width: 150,
        key: 'moneyBackProduct',
        render: (value) => <span>{value ? numberWithCommas(value * 1000) : '0'} đ</span>
      },
      {
        title: 'Tình trạng',
        dataIndex: 'status',
        width: 95,
        fixed: 'right',
        key: 'status',
        render: (value, item) => <Switch onClick={() => this.onChangeStatusItem(item)} checkedChildren='ONLINE' unCheckedChildren='OFFLINE' checked={value === 'ACTIVE'} />
      }
    ]
    this.state = {
      productData: [],
      total: 0,
      page: 1,
      searchText: '',
      searchedColumn: '',
      tabKey: '1',
      isLoadingTags: false,
      tags: [],
      allInfoTag: [],
      currentTag: '',
      mediaImage: [],
      imageUrl: false,
      isUploading: false
    }
    this.myModal = React.createRef()
  }

  componentDidMount () {
    this.fetchAllTags()
  }

  componentDidUpdate () {

  }

  convertStatusNumberToText = (statusNumber) => {
    switch (statusNumber) {
    case 'NEW': {
      return 'OFFLINE'
    }
    case 'ACTIVE': {
      return 'ONLINE'
    }
    }
  }

  onChangeStatusItem = (record) => {
    console.log('onChangeStatusItem')
    console.log(record)

    let newStatus
    if (record.status === 'NEW') {
      newStatus = 'ACTIVE'
    } else if (record.status === 'ACTIVE') {
      newStatus = 'NEW'
    }

    const newData = [...this.state.productData]
    console.log('productData')
    console.log(this.state.productData)
    const index = newData.findIndex((item) => record.key === item.key)
    let item = newData[index]

    item = {
      ...record,
      status: newStatus
    }

    const newItem = { ...item, status: newStatus }

    console.log('handleSaveNestTable')
    console.log(newItem)

    // if (!isEqual(newItem, item)) {
    newData.splice(index, 1, newItem)
    console.log(newData)
    console.log('newData')

    this.setState({
      productData: newData
    }, async () => {
      console.log(newItem)
      const res = await GapService.updateProduct(newItem)
      console.log(res)
      if (res) {
        showNotification(`Cập nhật thành công ${item.key}`)
      } else {
        showNotification(`Cập nhật chưa được`)
      }
    })
  }

  onSortEnd = async ({ information, recordData }) => {
    const { productData } = this.state
    const newData = [...productData]
    console.log(newData)

    this.setState({
      isUploading: true
    }, async () => {
      const index = newData.findIndex((foundItem) => recordData.key === foundItem.key)
      let newItem = newData[index]
      let newItemForUploading
      let originItem = { ...newItem }

      console.log('onSortEnd')
      console.log(information.oldIndex)
      console.log(information.newIndex)

      console.log(recordData)
      console.log(newItem)

      if (information.oldIndex !== information.newIndex) {
        let newImageList = [...newItem.medias]
        let imageTempOld = newImageList[information.oldIndex]
        newImageList.splice(information.oldIndex, 1)
        newImageList.splice(information.newIndex, 0, imageTempOld)

        newItemForUploading = {
          ...newItem,
          medias: newImageList
        }
        newItem.medias = newImageList
      } else {
        this.setState({
          isUploading: false
        })
        return
      }

      newData[index] = newItem
      this.setState({
        productData: newData
      })

      const resPro = await GapService.updateProduct(newItemForUploading)
      if (resPro) {
        this.setState({
          isUploading: false
        })
        showNotification(`Thay đổi thành công ${newItem.objectId}`)
      } else {
        newData[index] = originItem
        this.setState({
          productData: newData,
          isUploading: false
        })
        showNotification(`Thay đổi chưa thành công ${newItem.objectId}`)
      }
    })
  };

  removePhoto = async (item, recordData, indexPhoto) => {
    const { productData } = this.state

    console.log('removePhoto run')
    console.log(recordData)
    this.setState({
      isUploading: true
    }, async () => {
      const newData = [...productData]
      console.log(newData)

      const index = newData.findIndex((foundItem) => recordData.key === foundItem.key)
      let newItem = newData[index]
      console.log(index)

      let newItemForUploading

      console.log(newData)
      console.log(newItem)

      if (newItem.medias && newItem.medias.length > 1) {
        let newImageList = [...newItem.medias]
        newImageList = newImageList.filter((newItemRemain) => {
          return newItemRemain.objectId !== item.objectId
        })

        newItemForUploading = {
          ...newItem,
          medias: newImageList
        }
        newItem.medias = newImageList
      } else {
        newItemForUploading = {
          ...newItem,
          medias: []
        }
        newItem.medias = []
      }

      const resPro = await GapService.updateProduct(newItemForUploading)
      if (resPro) {
        newData[index] = newItem
        this.setState({
          productData: newData,
          isUploading: false
        })
        showNotification(`Xoá thành công ${newItem.objectId}`)
      } else {
        this.setState({
          isUploading: false
        })
        showNotification(`Xoá chưa thành công ${newItem.objectId}`)
      }
    })
  }

  handleUpload = async (info, recordData) => {
    const { productData, isUploading } = this.state
    const status = info.file.status

    if (status !== 'uploading') {
      // console.log('handleUpload uploading')
      // console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      this.setState({
        isUploading: true
      }, async () => {
        console.log('handleUpload run')

        console.log(info)
        console.log(recordData)
        console.log('handleUpload run 1111 ----')

        const newData = [...productData]
        const index = newData.findIndex((item) => recordData.key === item.key)
        let newItem = newData[index]
        let newItemForUploading

        console.log(newData)
        console.log(newItem)
        console.log('handleUpload run 2222 ----')

        const res = await GapService.uploadSingleFileWithFormData(info.file.originFileObj)
        console.log('handleUpload 3333 res')
        console.log(res)
        const newImage = { '__type': 'Pointer', 'className': 'Media', 'objectId': res.objectId }

        if (newItem.medias && newItem.medias.length > 0) {
          newItemForUploading = {
            ...newItem,
            medias: [
              ...newItem.medias,
              newImage
            ]
          }
          newItem.medias = [
            ...newItem.medias,
            { ...newImage, data: res.data }
          ]
        } else {
          newItemForUploading = {
            ...newItem,
            medias: [
              newImage
            ]
          }
          newItem.medias = [
            { ...newImage, data: res.data }
          ]
        }

        const resPro = await GapService.updateProduct(newItemForUploading)
        if (resPro) {
          newData[index] = newItem
          this.setState({
            productData: newData,
            isUploading: false
          })
          showNotification(`Cập nhật thành công ${newItem.objectId}`)
        } else {
          this.setState({
            isUploading: false
          })
          showNotification(`Cập nhật chưa thành công ${newItem.objectId}`)
        }
      })
    } else if (status === 'error') {
      this.setState({
        isUploading: false
      })
      showNotification(`Cập nhật chưa thành công`)
    }
  }

  // [{"__type":"Pointer","className":"Media","objectId":"vu0vN7mImh"},

  data = async (file) => {
    console.log('data file', file)
    return file
  }

  expandedRowRender = (recordData) => {
    const { isUploading } = this.state
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell
      }
    }

    const SortableItem = SortableElement(({ item, indexItem }) => (
      <div className='inner-item' key={indexItem}>
        <div
          className='photo-remove-icon'
          onClick={() => this.removePhoto(item, recordData, indexItem)}
        >
          <img src={images.icClose} alt='remove' />
        </div>
        <img
          src={item.data.secure_url}
          style={{ maxWidth: '70px', height: '70px', objectFit: 'contain' }}
        />
      </div>
    ))

    const SortableList = SortableContainer(({ items }) => (
      <div className='SortableList-container'>
        {items && items.length > 0 && items.map((item, index) => (
          <SortableItem
            pressDelay={0}
            key={`${index}`}
            indexItem={index}
            index={index}
            item={item}
          />
        ))}
      </div>
    ))

    const columns = [
      {
        title: 'Ảnh',
        dataIndex: 'medias',
        key: 'medias',
        // editable: true,
        width: 300,
        render: (value) => {
          return (
            <div>
              <div className='upload-Dragger-container'>
                <SortableList
                  items={value}
                  onSortEnd={(information) => this.onSortEnd({ information, recordData })}
                  pressDelay={250}
                  axis='xy'
                  helperClass='SortableHelper'
                />

                {
                  value && value.length >= 5 ? null
                    : <Dragger
                      name='uploadFile'
                      listType='picture-card'
                      showUploadList={false}
                      onChange={(info) => this.handleUpload(info, recordData)}
                      multiple
                      maxCount={5}
                      maxLength={5}
                      accept='.png,.jpg,.jpeg,.gif'
                      className='upload-Dragger'
                      style={value && value.length === 0 && { border: 'none', background: 'transparent' }}
                    >
                      {
                        value && value.length === 0
                          ? <Button>
                            <UploadOutlined /> Thêm ảnh
                          </Button> : <div>
                            <p className='ant-upload-text'>
                              {isUploading ? (
                                <LoadingOutlined />
                              ) : (
                                <img src={images.increase} />
                              )}
                            </p>
                          </div>
                      }
                    </Dragger>
                }
              </div>
              <div className='nft-message-length'>
                {value ? value.length : 0}/5
              </div>
            </div>
          )
        }
      },
      {
        title: 'Size',
        dataIndex: 'sizeInfo',
        key: 'sizeInfo',
        width: 80,
        editable: true,
        render: (value) => <span>{value}</span>
      },
      {
        title: 'Độ mới',
        dataIndex: 'rateNew',
        key: 'rateNew',
        editable: true,
        width: 80,
        render: (value) => <span>100%</span>
      },
      {
        title: 'Chi tiết sản phẩm',
        width: 150,
        dataIndex: 'detailInfo',
        key: 'detailInfo',
        editable: true
      },
      {
        title: 'Ghi chú',
        width: 150,
        dataIndex: 'note',
        key: 'note',
        editable: true
      }
    ]

    const data = []

    console.log('item')
    console.log(recordData)

    data.push({
      key: recordData.objectId,
      medias: recordData.medias && recordData.medias.length > 0 ? recordData.medias : null,
      sizeInfo: recordData.sizeInfo || '-',
      rateNew: Number(recordData.rateNew) || 0,
      detailInfo: recordData.detailInfo || '-',
      note: recordData.note || '-'
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
      scroll={{ x: 1500, y: '55vh' }}
      components={components}
      columns={formatedColumns}
      dataSource={data}
      pagination={false}
    />
  };

  handleSaveNestTable = (row, record) => {
    console.log('row - handleSaveNestTable')
    console.log(row)
    console.log(record)

    const newData = [...this.state.productData]
    console.log('productData')
    console.log(this.state.productData)
    const index = newData.findIndex((item) => record.key === item.key)
    let item = newData[index]

    item = {
      ...record,
      ...row,
      sizeInfo: row.sizeInfo || '--',
      note: row.note || '--',
      rateNew: row.rateNew || 0,
      detailInfo: row.detailInfo || '--'
    }

    const newItem = { ...item, objectId: record.objectId }

    console.log('handleSaveNestTable')
    console.log(newItem)

    // if (!isEqual(newItem, item)) {
    newData.splice(index, 1, newItem)
    console.log(newData)
    console.log('newData')

    this.setState({
      productData: newData
    }, async () => {
      console.log(newItem)
      const res = await GapService.updateProduct(newItem)
      console.log(res)
      if (res) {
        showNotification(`Cập nhật thành công ${item.key}`)
      } else {
        showNotification(`Cập nhật chưa được`)
      }
    })
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
        res = await GapService.getProduct(page, null, null, currentTag)
      } else {
        res = await GapService.getProduct(page, searchText, null, currentTag)
      }

      console.log('res')
      console.log(res)
      let productData = []
      if (res && res.results) {
        res.results.map((item, indexItem) => {
          productData.push({
            ...item,
            key: item.objectId,
            categoryId: item.category.objectId,
            price: Number(item.price) || 0,
            count: Number(item.count) || 0,
            priceAfterFee: Number(item.priceAfterFee) || 0,
            soldNumberProduct: Number(item.soldNumberProduct) || 0,
            remainNumberProduct: Number(item.count) - Number(item.soldNumberProduct || 0),
            moneyBackProduct: Math.round(Number(item.soldNumberProduct || 0) * item.priceAfterFee || 0)
          })
        })
        this.setState({
          total: res.count,
          productData: productData,
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
    const newData = [...this.state.productData]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]
    // const newRemainNumConsignment = `${Number(row.numberOfProducts) - Number(row.numSoldConsignment || 0)}`
    const newItem = { ...item, ...row }

    if (!isEqual(newItem, item)) {
      newData.splice(index, 1, newItem)
      console.log('row')
      this.setState({
        productData: newData
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
    const { isLoadingData, productData, total, isLoadingTags, tags, allInfoTag } = this.state

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
          dataSource={productData}
          bordered
          expandable={{ expandedRowRender: (record) => this.expandedRowRender(record) }}
          pagination={{
            total: total,
            pageSize: 100,
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

export default withRouter(connect(mapStateToProps, null)(TableProductScreen))
