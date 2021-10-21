/* eslint-disable react/display-name */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Form, Row, Col, Layout, Input, Button, Badge, Spin, Descriptions, Tabs, Table, Radio, Popconfirm, Upload } from 'antd'
import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'
import { showNotification, numberWithCommas } from 'common/function'
import { LoadingOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons'
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
        key: 'name',
        width: 150
      },
      {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        // editable: true,
        render: (value) => <span>{value ? numberWithCommas(value * 1000) : '0'} đ</span>
      },
      {
        title: 'Giá sau phí',
        dataIndex: 'priceAfterFee',
        key: 'priceAfterFee',
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
        width: 80,
        dataIndex: 'soldNumberProduct',
        key: 'soldNumberProduct'
        // editable: true
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
      },
      {
        title: 'Tình trạng',
        dataIndex: 'status',
        key: 'status',
        render: (value) => <span>{this.convertStatusNumberToText(value || 0)}</span>
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
    case 0: {
      return 'Chờ xử lý'
    }
    case 1: {
      return 'Sẵn sàng'
    }
    case 2: {
      return 'Bán Online'
    }
    case 3: {
      return 'Bán Offline'
    }
    }
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    console.log('onSortEnd')
    console.log(oldIndex)
    console.log(newIndex)
  };

  removePhoto = (indexPhoto) => {
    const { mediaImage } = this.state
    const mediaImageTemp = mediaImage.slice()

    console.log(indexPhoto)
    try {
      mediaImageTemp.splice(indexPhoto, 1)
      this.setState({
        mediaImage: mediaImageTemp
      })
    } catch (e) {
      console.log(e)
    }
  }

  previewImageBase54 (img, callback) {
    // eslint-disable-next-line no-undef
    const reader = new FileReader()
    try {
      reader.onload = () => {
        let imgUrl = URL.createObjectURL(img)
        callback(imgUrl)
      }
      reader.readAsArrayBuffer(img)
    } catch (error) {
      console.log('error upload', error)
    }
  }

  beforeUploadMedia = async (file, fileList, showError = true) => {
    console.log('beforeUploadMedia running')
    console.log(fileList)


    this.setState({
      isUploading: true
    }, async () => {
      const listImageTypes = 'SVG, JPEG, JPG, PNG, GIF'
      let fileType = file.type.split('/')[1]
        ? file.type.split('/')[1].toUpperCase()
        : 'NOT_EXIST_FILE_TYPE'
      isJPG = listImageTypes.includes(fileType)

      if (!isJPG) {
        // showError && message.error(this.props.locale.messages.form.notSupport)
        this.setState({
          isUploading: false
        })
      }
      isLt2M = file.size / 1024 / 1024 < 2
      if (isJPG && !isLt2M) {
        // showError && message.error(this.props.locale.messages.form.smallerThan2MB)
        this.setState({
          isUploading: false
        })
      }
      if (isJPG && isLt2M) {
        this.previewImageBase54(file, async (mediaImageItem) => {
          const mediaTemp = this.state.mediaImage.slice()
          if (mediaTemp && mediaTemp.length < 50) {
            mediaTemp.push({
              image: mediaImageItem,
              file: file
            })

            this.setState({
              mediaImage: mediaTemp,
              isUploading: false
            }, () => {
              console.log('mediaImage')
              console.log(this.state)
            })
          }
        })
      }
      return false
    })
  }

  handleUpload = async (info) => {
    const status = info.file.status;
    if (status !== "uploading") {
      console.log("handleUpload uploading")
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      console.log(`handleUpload ${info.file.name} file uploaded successfully.`);
      const res = await GapService.uploadSingleFileWithFormData(info.file.originFileObj);
    } else if (status === "error") {
      console.error(`handleUpload ${info.file.name} file upload failed.`);
    }
  }

  data = async (file) => {
    console.log("data file", file);
    // const res = GapService.uploadSingleFileWithFormData(file);
    return file;
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
          onClick={() => this.removePhoto(indexItem)}
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
            pressDelay={1000}
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
          console.log('value')
          console.log(value)

          return (
            <div>
              <div className='upload-Dragger-container'>
                <SortableList
                  items={value}
                  onSortEnd={this.onSortEnd}
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
                      beforeUpload={this.beforeUploadMedia}
                      onChange={this.handleUpload}
                      data={this.data}
                      // customRequest={this.customRequest}
                      multiple
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
        key: 'note'
      }
    ]

    const data = []

    console.log('item')
    console.log(recordData)

    data.push({
      key: recordData.objectId,
      medias: recordData.medias && recordData.medias.length > 0 ? recordData.medias : null,
      size: recordData.sizeInfo,
      item: recordData.rateNew,
      detailInfo: recordData.detailInfo,
      note: recordData.note
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
    // console.log(record)

    const newData = [...this.state.consignmentData]
    const index = newData.findIndex((item) => record.key === item.key)
    let item = newData[index]

    item.productList[row.key] = {
      ...row,

      soldNumberProduct: Number(row.soldNumberProduct) || 0,
      remainNumberProduct: Number(row.count) - Number(row.soldNumberProduct || 0),
      moneyBackProduct: Math.round((Number(row.soldNumberProduct || 0) * Number(row.priceAfterFee)))
    }

    let newRemainNumConsignment = 0
    let newmoneyBack = 0
    let newNumSoldConsignment = 0

    item.productList.map(productItem => {
      newRemainNumConsignment += Number(productItem.remainNumberProduct) || 0
      newmoneyBack += Number(productItem.moneyBackProduct) * 1000 || 0
      newNumSoldConsignment += Number(productItem.soldNumberProduct) || 0
    })

    const newItem = { ...item, remainNumConsignment: newRemainNumConsignment, moneyBack: Math.round(newmoneyBack), numSoldConsignment: newNumSoldConsignment }

    console.log('handleSaveNestTable')
    console.log(newItem)

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

        res = await GapService.getProduct(page, null, null, currentTag)
      } else {
        res = await GapService.getProduct(page, searchText, null, currentTag)
      }

      console.log('res')
      console.log(res)
      let consignmentData = []
      if (res && res.results) {
        res.results.map((item, indexItem) => {
          console.log('indexItem')
          console.log(item)
          consignmentData.push({
            ...item,
            key: indexItem,
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
