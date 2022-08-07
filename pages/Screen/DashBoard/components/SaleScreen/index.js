/* eslint-disable react/display-name */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import {
  Form, Row, Col, Layout, Input, Button, Spin, Divider, List, Card, InputNumber,
  Descriptions, Tabs, Table, Switch, Steps, Popover, Checkbox, Empty
} from 'antd'
import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'
import { numberWithCommas, showNotification } from 'common/function'
import { CheckCircleFilled, CloseCircleFilled, CloseCircleOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, LoadingOutlined, QrcodeOutlined, SettingOutlined } from '@ant-design/icons'
import { Router } from 'common/routes'
import { isMobile } from 'react-device-detect'
import './style.scss'
import Lottie from 'react-lottie'
import GapService from 'controller/Api/Services/Gap'
import { Scanner, ScannerOutlined } from '@material-ui/icons'
import { colors } from '@material-ui/core'
const { Step } = Steps
const { TextArea } = Input

const { TabPane } = Tabs

const initialPanes = []
let numPaneTemp = 0

const SaleScreen = (props) => {
  const { userData } = props
  const [panes, setPanes] = useState(initialPanes)
  const [currentPaneIndex, setCurrentPaneIndex] = useState(numPaneTemp)
  const [activeKey, setActiveKey] = useState(null)
  let searchInput
  useEffect(() => {
    add()

    return () => {
      numPaneTemp = 0
    }
  }, [])

  useEffect(() => {
    console.log('useEffect - panes - ', panes)
    setCurrentPaneIndex(currentPaneIndex)
  }, [panes])

  /// ////////////////////////////////////////////////// Tabs - TabPane -- START /////////////////////////////////////////////////////
  const onChangeTab = (newActiveKey) => {
    console.log('onChangeTab', newActiveKey)
    let currenIndexName = 0
    let activeKey
    panes.map((item, index) => {
      if (Number(item.key) === Number(newActiveKey)) {
        currenIndexName = index
        activeKey = Number(item.key)
      }
    })
    searchInput && searchInput.focus()
    setCurrentPaneIndex(currenIndexName)
    setActiveKey(activeKey)
    console.log('panes', panes)
  }

  const add = () => {
    console.log('add')
    const newIndex = numPaneTemp
    numPaneTemp += 1
    const newActiveKey = newIndex
    const newPanes = [...panes]
    newPanes.push({
      isOnlineSale: 'false',
      title: `Đơn hàng ${newIndex}`,
      key: newActiveKey,
      clientInfo: {
        objectId: '',
        fullName: '',
        phoneNumber: '',
        birthday: '',
        bankName: '',
        bankId: '',
        consignerIdCard: '',
        mail: ''
      },
      shippingInfo: {
        addressFrom: '',
        optionTransfer: '1'
      },
      isTransferWithBank: 'false',
      productList: [
        // { amount: 1, name: ao da tron, code: ma-322-001}
      ],
      inputText: '',
      currentTag: 1,
      shippingAddress: '',
      isLoadingUser: false,
      isFoundUser: false,
      totalNumberOfProductForSale: 0,
      totalMoneyForSale: 0
    })
    setActiveKey(newActiveKey)
    setPanes(newPanes)
  }

  const resetData = () => {
    const paneTemp = [...panes]
    paneTemp[currentPaneIndex] = {
      ...paneTemp[currentPaneIndex],
      isOnlineSale: 'false',
      clientInfo: {
        objectId: '',
        fullName: '',
        phoneNumber: '',
        birthday: '',
        bankName: '',
        bankId: '',
        consignerIdCard: '',
        mail: ''
      },
      shippingInfo: {
        addressFrom: '',
        optionTransfer: 1
      },
      isTransferWithBank: 'false',
      productList: [
        // { amount: 1, name: ao da tron, code: ma-322-001}
      ],
      inputText: '',
      currentTag: 1,
      shippingAddress: '',
      isLoadingUser: false,
      isFoundUser: false,
      isCreatedSuccessfully: false,
      totalNumberOfProductForSale: 0,
      totalMoneyForSale: 0
    }

    setPanes(paneTemp)
  }

  const remove = (targetKey) => {
    let deleteIndexAt = 0
    let newCurrentIndex = currentPaneIndex

    const newPanes = panes.filter((pane, paneIndex) => {
      if (Number(pane.key) === Number(targetKey)) {
        deleteIndexAt = paneIndex
      }
      return Number(pane.key) !== Number(targetKey)
    })
    setPanes(newPanes)

    setTimeout(() => {
      if (deleteIndexAt < newCurrentIndex) {
        newCurrentIndex = newCurrentIndex === 0 ? 0 : newCurrentIndex - 1
        setCurrentPaneIndex(newCurrentIndex)
      } else if (deleteIndexAt === newCurrentIndex) {
        newCurrentIndex = newCurrentIndex === 0 ? 0 : newCurrentIndex - 1
        setCurrentPaneIndex(newCurrentIndex)
      } else if (deleteIndexAt > newCurrentIndex) {
        setCurrentPaneIndex(newCurrentIndex)
      }
    }, 100)
  }

  // action = 'add' | 'remove'
  const onEdit = (targetKey, action) => {
    console.log('onEdit')
    if (action === 'add') {
      add()
    } else {
      remove(targetKey)
    }
  }

  /// ////////////////////////////////////////////////// Tabs - TabPane -- END /////////////////////////////////////////////////////

  /// ////////////////////////////////////////////////// Steps - Step -- START /////////////////////////////////////////////////////
  const customDot = (dot, { status, index }) => (
    <Popover
      content={
        <span>
        step {index} status: {status}
        </span>
      }
    >
      {dot}
    </Popover>
  )

  const onChangeStep = (stepValue, indexPane) => {
    console.log('stepValue', stepValue)
    console.log(indexPane)
    // set
  }
  /// ////////////////////////////////////////////////// Tabs - TabPane -- END /////////////////////////////////////////////////////

  const barcodeAutoFocus = () => {
    // if ()
    // document.getElementById('SearchbyScanning').focus()
  }

  const optionsTypeOnlineSale = [
    { label: 'Offline', value: 'false' },
    { label: 'Online', value: 'true' }
  ]

  const optionsTransferMoneyWithBank = [
    { label: 'Trực tiếp', value: 'false', disabled: true },
    { label: 'Chuyển khoản', value: 'true' }
  ]

  const optionsTransferMoney = [
    { label: 'Trực tiếp', value: 'false' },
    { label: 'Chuyển khoản', value: 'true' }
  ]

  const optionsTransferOrder = [
    { label: 'Giao hàng tiết kiệm', value: '1' },
    { label: 'Hoả tốc', value: '2' },
    { label: 'Lấy hàng trực tiếp', value: '3' }
  ]

  const onChangeRadioTransferMoney = (value) => {
    const paneTemp = [...panes]
    if (value[0] === 'true') {
      paneTemp[currentPaneIndex].isTransferWithBank = 'true'
      setPanes(paneTemp)
    } else {
      paneTemp[currentPaneIndex].isTransferWithBank = 'false'
      setPanes(paneTemp)
    }
  }

  const onChangeRadioTransferOrder = (value) => {
    const paneTemp = [...panes]
    paneTemp[currentPaneIndex].shippingInfo.optionTransfer = value[0]
    setPanes(paneTemp)
  }

  const onChangeRadioTypeOnlineSale = (value) => {
    const paneTemp = [...panes]
    if (value[0] === 'true') {
      paneTemp[currentPaneIndex].isOnlineSale = 'true'
      paneTemp[currentPaneIndex].isTransferWithBank = 'true'
      setPanes(paneTemp)
    } else {
      paneTemp[currentPaneIndex].isOnlineSale = 'false'
      setPanes(paneTemp)
    }

    searchInput && searchInput.focus()
  }

  const onHanleChangeTextNote = (value) => {
    const paneTemp = [...panes]
    paneTemp[currentPaneIndex].note = value.target.value
    setPanes(paneTemp)
  }

  const onHandleEnterAndCheckIdProduct = async (value) => {
    if (!value || value === '' || !value.target.value) {
      showNotification('Chưa có dữ liệu')
      return
    }

    // const productRes = await GapService.getProductWithObjectKey('hCDoylb0Z4')
    const productResArr = await GapService.getProductWithCode(value.target.value.trim())

    if (productResArr?.results?.[0] && productResArr?.results?.[0].objectId) {
      const paneTemp = [...panes]
      let isExistProduct = false
      paneTemp[currentPaneIndex].productList.map(item => {
        if (item.objectId === productResArr?.results?.[0].objectId) {
          isExistProduct = true
        }
      })
      if (isExistProduct) {
        showNotification('Đã có sản phẩm này rồi')
        paneTemp[currentPaneIndex].inputText = ''
        setPanes(paneTemp)
        return
      }

      let productRes = productResArr?.results?.[0]
      paneTemp[currentPaneIndex].productList = [...paneTemp[currentPaneIndex].productList, productRes]
      paneTemp[currentPaneIndex].inputText = ''
      paneTemp[currentPaneIndex].totalNumberOfProductForSale = (paneTemp[currentPaneIndex].totalNumberOfProductForSale || 0) + 1
      paneTemp[currentPaneIndex].totalMoneyForSale = (paneTemp[currentPaneIndex].totalMoneyForSale || 0) + productRes.price
      setPanes(paneTemp)
    }
  }

  const onChangeTextProductInput = (event) => {
    console.log('onChangeTextProductInput')
    const paneTemp = [...panes]
    paneTemp[currentPaneIndex].inputText = event.target.value
    setPanes(paneTemp)
  }
  const onKeyPressBarcode = (event) => {
    console.log('onKeyPressBarcode')

    if (event.keyCode === 13) {
      console.log('onKeyPressBarcode 13')

      const paneTemp = [...panes]
      paneTemp[currentPaneIndex].inputText = event.target.value
      setPanes(paneTemp)
    }
  }

  const onDeleteProductItem = (itemIndex) => {
    const paneTemp = [...panes]
    paneTemp[currentPaneIndex].productList = paneTemp[currentPaneIndex].productList.filter((item, index) => itemIndex !== index)
    let totalNumberOfProductForSale = 0
    let totalMoneyForSale = 0
    paneTemp[currentPaneIndex].productList.map(item => {
      totalNumberOfProductForSale += item.numberOfProductForSale || 1
      totalMoneyForSale += (item.numberOfProductForSale || 1) * item.price
    })
    paneTemp[currentPaneIndex].totalNumberOfProductForSale = totalNumberOfProductForSale
    paneTemp[currentPaneIndex].totalMoneyForSale = totalMoneyForSale
    setPanes(paneTemp)
  }

  const onChangeProductItem = (value, type, itemIndex) => {
    const paneTemp = [...panes]
    if (type === 'productNumber') {
      if (value > paneTemp[currentPaneIndex].productList[itemIndex].remainNumberProduct) {
        showNotification(`Số lượng tối đa là ${paneTemp[currentPaneIndex].productList[itemIndex].remainNumberProduct}`)
        return
      }
      paneTemp[currentPaneIndex].productList[itemIndex].numberOfProductForSale = value
      let totalNumberOfProductForSale = 0
      let totalMoneyForSale = 0
      paneTemp[currentPaneIndex].productList.map(item => {
        totalNumberOfProductForSale += item.numberOfProductForSale || 1
        totalMoneyForSale += (item.numberOfProductForSale || 1) * item.price
      })
      paneTemp[currentPaneIndex].totalNumberOfProductForSale = totalNumberOfProductForSale
      paneTemp[currentPaneIndex].totalMoneyForSale = totalMoneyForSale
      setPanes(paneTemp)
    }
  }

  const onHandleCreateOrder = async () => {
    let isError = false
    const paneTemp = [...panes]
    if (!paneTemp[currentPaneIndex].clientInfo || !paneTemp[currentPaneIndex].clientInfo.fullName) {
      isError = true
      showNotification(`Chưa nhập tên Khách hàng`)
    } else if (!paneTemp[currentPaneIndex].clientInfo.phoneNumber || paneTemp[currentPaneIndex]?.clientInfo?.phoneNumber.length <= 9) {
      isError = true
      showNotification(`Chưa nhập số điện thoại`)
    } else if (!paneTemp[currentPaneIndex].productList || paneTemp[currentPaneIndex]?.productList?.length === 0) {
      isError = true
      showNotification(`Chưa có sản phẩm nào`)
    }

    if (isError) {
      // do not thing
      return null
    }

    const dataOrder = {
      ...paneTemp[currentPaneIndex]
    }
    const resUSer = await GapService.getCustomer(paneTemp[currentPaneIndex].clientInfo.phoneNumber)
    if (resUSer && resUSer.results && resUSer.results[0]) { // for already user
      const customerFormData = {
        consignerName: paneTemp[currentPaneIndex].clientInfo.fullName,
        phoneNumber: paneTemp[currentPaneIndex].clientInfo.phoneNumber,
        consignerIdCard: paneTemp[currentPaneIndex].clientInfo.consignerIdCard,
        mail: paneTemp[currentPaneIndex].clientInfo.mail,
        birthday: paneTemp[currentPaneIndex].clientInfo.birthday && paneTemp[currentPaneIndex].clientInfo.birthday.length > 0 && paneTemp[currentPaneIndex].clientInfo.birthday !== 'Invalid date' ? paneTemp[currentPaneIndex].clientInfo.birthday : '',
        bankName: paneTemp[currentPaneIndex].clientInfo.bankName,
        bankId: paneTemp[currentPaneIndex].clientInfo.bankId,
        totalMoneyForSale: resUSer.results[0].totalMoneyForSale ? Number(resUSer.results[0].totalMoneyForSale || 0) + Number(dataOrder.totalMoneyForSale || 0) : Number(dataOrder.totalMoneyForSale || 0),
        numberOfSale: resUSer.results[0].numberOfSale ? Number(resUSer.results[0].numberOfSale || 0) + 1 : 1,
        totalProductForSale: resUSer.results[0].totalProductForSale ? Number(resUSer.results[0].totalProductForSale || 0) + Number(dataOrder.totalNumberOfProductForSale || 0) : Number(dataOrder.totalNumberOfProductForSale || 0)
      }
      const resCustomer = await GapService.updateCustomer(customerFormData, resUSer.results[0].objectId)

      if (resCustomer && resCustomer.updatedAt) {
        showNotification('Cập nhật khách hàng thành công')
        const result = await GapService.setOrder(dataOrder, userData.objectId, resUSer.results[0].objectId)

        if (result && result.objectId) {
          showNotification('Tạo Đơn hàng thành công')
          paneTemp[currentPaneIndex].isCreatedSuccessfully = true
          setPanes(paneTemp)
        } else {
          showNotification('Tạo Đơn hàng thất bại')
        }
      } else {
        showNotification('Cập nhật khách hàng thất bại')
      }
    } else {
      const customerFormData = {
        consignerName: paneTemp[currentPaneIndex].clientInfo.fullName,
        phoneNumber: paneTemp[currentPaneIndex].clientInfo.phoneNumber,
        consignerIdCard: paneTemp[currentPaneIndex].clientInfo.consignerIdCard,
        mail: paneTemp[currentPaneIndex].clientInfo.mail,
        birthday: paneTemp[currentPaneIndex].clientInfo.birthday && paneTemp[currentPaneIndex].clientInfo.birthday.length > 0 && paneTemp[currentPaneIndex].clientInfo.birthday !== 'Invalid date' ? paneTemp[currentPaneIndex].clientInfo.birthday : '',
        bankName: paneTemp[currentPaneIndex].clientInfo.bankName,
        bankId: paneTemp[currentPaneIndex].clientInfo.bankId
      }
      const resCus = await GapService.setCustomer(customerFormData)
      if (resCus && resCus.objectId) {
        showNotification('Thêm khách hàng thành công')
        const result = await GapService.setOrder(dataOrder, userData.objectId, resCus.objectId)

        if (result && result.objectId) {
          showNotification('Tạo Đơn hàng thành công')
          paneTemp[currentPaneIndex].isCreatedSuccessfully = true
          setPanes(paneTemp)
        } else {
          showNotification('Tạo Đơn hàng thất bại')
        }
      } else {
        showNotification('Tạo khách hàng thất bại')
      }
      //
    }
  }

  const fetchUserByPhoneNumber = async (phoneKey) => {
    if (phoneKey && phoneKey.target && phoneKey.target.value && phoneKey.target.value.length >= 10) {
      const paneTemp = [...panes]
      // paneTemp[currentPaneIndex].isLoadingUser = true
      // paneTemp[currentPaneIndex].isFoundUser = false
      // setPanes(paneTemp)
      const res = await GapService.getCustomer(phoneKey.target.value)
      if (res && res.results && res.results[0]) {
        console.log('fetchUserByPhoneNumber set form', res.results[0])
        paneTemp[currentPaneIndex].isLoadingUser = false
        paneTemp[currentPaneIndex].isFoundUser = true
        paneTemp[currentPaneIndex].clientInfo = {
          fullName: res.results[0].fullName,
          phoneNumber: res.results[0].phoneNumber,
          bankName: res.results[0].banks[0] ? res.results[0].banks[0].type : '',
          bankId: res.results[0].banks[0] ? res.results[0].banks[0].accNumber : '',
          consignerIdCard: res.results[0].identityNumber,
          birthday: res.results[0].birthday,
          mail: res.results[0].mail,
          objectId: res.results[0].objectId
        }
        console.log('paneTemp', paneTemp)
        setPanes(paneTemp)
      } else {
        paneTemp[currentPaneIndex].isLoadingUser = false
        paneTemp[currentPaneIndex].isFoundUser = false
        setPanes(paneTemp)
      }
    } else if (phoneKey && phoneKey.target && phoneKey.target.value && phoneKey.target.value.length < 10) {
      console.log('fetchUserByPhoneNumber == 0')
      const paneTemp = [...panes]
      paneTemp[currentPaneIndex].isLoadingUser = false
      paneTemp[currentPaneIndex].isFoundUser = false
      paneTemp[currentPaneIndex].clientInfo = {
        objectId: '',
        fullName: '',
        phoneNumber: phoneKey.target.value,
        birthday: '',
        bankName: '',
        bankId: '',
        consignerIdCard: '',
        mail: ''
      }
      setPanes(paneTemp)
    } else {
      console.log('fetchUserByPhoneNumber dont run 2')
      const paneTemp = [...panes]
      paneTemp[currentPaneIndex].isLoadingUser = false
      paneTemp[currentPaneIndex].isFoundUser = false
      paneTemp[currentPaneIndex].clientInfo = {
        objectId: '',
        fullName: '',
        phoneNumber: phoneKey.target.value,
        birthday: '',
        bankName: '',
        bankId: '',
        consignerIdCard: '',
        mail: ''
      }
      setPanes(paneTemp)
    }
  }

  const onChangeDataClient = (event, keyValue) => {
    const paneTemp = [...panes]

    if (keyValue === 'bankName') {
      paneTemp[currentPaneIndex].clientInfo = {
        ...paneTemp[currentPaneIndex].clientInfo,
        bankName: event.target.value ? event.target.value.trim() : ''
      }
      setPanes(paneTemp)
    } else if (keyValue === 'bankId') {
      paneTemp[currentPaneIndex].clientInfo = {
        ...paneTemp[currentPaneIndex].clientInfo,
        bankName: event.target.value ? event.target.value.trim() : ''
      }
      setPanes(paneTemp)
    } else if (keyValue === 'fullName') {
      paneTemp[currentPaneIndex].clientInfo = {
        ...paneTemp[currentPaneIndex].clientInfo,
        fullName: event.target.value ? event.target.value.trim() : ''
      }
      setPanes(paneTemp)
    } else if (keyValue === 'birthday') {
      paneTemp[currentPaneIndex].clientInfo = {
        ...paneTemp[currentPaneIndex].clientInfo,
        birthday: event.target.value ? event.target.value.trim() : ''
      }
      setPanes(paneTemp)
    } else if (keyValue === 'consignerIdCard') {
      paneTemp[currentPaneIndex].clientInfo = {
        ...paneTemp[currentPaneIndex].clientInfo,
        consignerIdCard: event.target.value ? event.target.value.trim() : ''
      }
      setPanes(paneTemp)
    } else if (keyValue === 'mail') {
      paneTemp[currentPaneIndex].clientInfo = {
        ...paneTemp[currentPaneIndex].clientInfo,
        mail: event.target.value ? event.target.value.trim() : ''
      }
      setPanes(paneTemp)
    }
  }

  const onChangeDataShipping = (event, keyValue) => {
    const paneTemp = [...panes]

    if (keyValue === 'bankName') {
      paneTemp[currentPaneIndex].shippingAddress = {
        ...paneTemp[currentPaneIndex].clientInfo,
        bankName: event.target.value ? event.target.value.trim() : ''
      }
      setPanes(paneTemp)
    }
  }

  return (
    <div className='saleScreen-container'>
      <Tabs defaultActiveKey='0' activeKey={currentPaneIndex} type='editable-card' onChange={onChangeTab} onEdit={onEdit}>
        {panes.map((pane, indexPane) => (
          <TabPane
            tab={currentPaneIndex === indexPane ? (
              <div className='choosenTagBox'>
                <span className='choosenTagBoxTitle'>{pane.title}</span>
                <span className='closeTag-icon' onClick={() => remove(pane.key)}>
                  X
                </span>
              </div>
            )
              : (
                <div className='not-choosenTagBox'>
                  <span className='choosenTagBoxTitle'>{pane.title}</span>
                  <span className='closeTag-icon' onClick={() => remove(pane.key)}>
                  X
                  </span>
                </div>
              )
            }
            key={pane.key}
            closable={pane.closable}
            className={{ color: 'red' }} />
        ))}
      </Tabs>

      {panes[currentPaneIndex] && !panes[currentPaneIndex].isCreatedSuccessfully ? <div className='saleScreen-container-inner'>
        <div className='InputBox'>
          <Input id='SearchbyScanning' onKeyDown={onKeyPressBarcode} onBlur={barcodeAutoFocus} suffix={<QrcodeOutlined />} ref={node => { searchInput = node }} onChange={onChangeTextProductInput} value={panes[currentPaneIndex].inputText} onPressEnter={onHandleEnterAndCheckIdProduct} autoFocus className='inputID' placeholder='Nhập ID Sản Phẩm' />
          <Checkbox.Group options={optionsTypeOnlineSale} value={panes[currentPaneIndex].isOnlineSale} defaultValue={['false']} onChange={onChangeRadioTypeOnlineSale} />
          <Button onClick={onHandleCreateOrder} className='buttonCreateBox'>
            <span>Tạo Đơn Hàng</span>
          </Button>
        </div>
        {/* <Divider style={{ margin: '10px 0' }} orientation='left'>Danh sách sản phẩm{`${panes[currentPaneIndex].isOnlineSale} + ${currentPaneIndex} + ${panes[currentPaneIndex].title}`}</Divider> */}

        <div className='ContentBox'>
          <div className='productBox'>
            <Divider style={{ margin: '15px 0' }} orientation='left'>Danh sách sản phẩm{panes[currentPaneIndex].totalNumberOfProductForSale ? `:  ${panes[currentPaneIndex].totalNumberOfProductForSale} món` : '' }</Divider>
            {
              panes[currentPaneIndex].productList.length > 0
                ? <List
                  style={{ maxHeight: '50vh' }}
                  itemLayout='horizontal'
                  dataSource={panes[currentPaneIndex].productList}
                  header={
                    <List.Item className='itemBox' style={{ backgroundColor: 'whitesmoke', margin: '0' }}>
                      <div className='item-stt'>
                        #
                      </div>
                      <div className='item-name'>
                        <span>Mã sản phẩm</span>
                        <span>Tên sản phẩm</span>
                      </div>
                      <div className='item-sl'>
                        SL
                      </div>
                      <div className='item-price'>
                        Giá
                      </div>
                      <div className='item-totalPrice'>
                        Tổng giá
                      </div>
                    </List.Item>
                  }
                  renderItem={(item, itemIndex) => (
                    <List.Item className='itemBox'>
                      <div className='item-stt'>
                        {itemIndex + 1}
                        <div className='deleteIcon' onClick={() => onDeleteProductItem(itemIndex)}>
                          <DeleteOutlined style={{ color: colors.red[300] }} />
                        </div>
                      </div>
                      <div className='item-name'>
                        <span className='item-name-code'>{item.code}</span>
                        <span>{item.name}</span>
                      </div>
                      <div className='item-sl'>
                        <InputNumber min={1} max={item.remainNumberProduct || 1} defaultValue={1} value={item.numberOfProductForSale || 1} onChange={(value) => onChangeProductItem(value, 'productNumber', itemIndex)} />
                        <span className='item-sl-max'>Max: {item.remainNumberProduct}</span>
                      </div>
                      <div className='item-price'>
                        {numberWithCommas(item.price * 1000)} vnđ
                      </div>
                      <div className='item-totalPrice'>
                        {numberWithCommas(item.price * 1000 * (item.numberOfProductForSale || 1))} vnđ
                      </div>
                    </List.Item>
                  )}
                />
                : <Empty description={false} />
            }
          </div>

          <div className='informationBox'>
            <Divider style={{ margin: '15px 0' }} orientation='left'>Thông tin đơn hàng</Divider>
            <div className='saleInfoBox'>
              <div className='totalPriceBox'>
                <span className='totalPriceTxt'>Tổng tiền: </span>
                <span className='totalPriceValue'>{numberWithCommas((panes[currentPaneIndex].totalMoneyForSale || 0) * 1000)} vnđ</span>
              </div>

              <div className='typeTranferBox'>
                <span className='typeTranferTxt'>Hình thức trả tiền: </span>
                <Checkbox.Group options={panes[currentPaneIndex].isOnlineSale === 'true' ? optionsTransferMoneyWithBank : optionsTransferMoney} value={panes[currentPaneIndex].isTransferWithBank || 'false'} defaultValue={['false']} onChange={onChangeRadioTransferMoney} />
              </div>

              <div className='typeTranferBox'>
                <span className='typeTranferTxt'>Lưu ý: </span>
                <TextArea placeholder='Ghi Chú' value={panes[currentPaneIndex].note || '---'} type={'number'} id='note' key='note' onChange={onHanleChangeTextNote} />
              </div>
            </div>

            <Divider style={{ margin: '15px 0' }} orientation='left'>Thông tin khách hàng</Divider>

            <div className='customerInfoBox'>
              <div className='phoneBox'>
                <span className='phoneTxt'>Số điện thoại: </span>
                <Input value={panes[currentPaneIndex]?.clientInfo?.phoneNumber} minLength={10} maxLength={11} allowClear onChange={fetchUserByPhoneNumber} placeholder='...' suffix={panes[currentPaneIndex].isLoadingUser ? <LoadingOutlined /> : panes[currentPaneIndex].isFoundUser ? <CheckCircleFilled style={{ color: 'green ' }} /> : null} />
              </div>

              <div className='phoneBox'>
                <span className='phoneTxt'>Tên khách hàng: </span>
                <Input value={panes[currentPaneIndex]?.clientInfo?.fullName} minLength={10} maxLength={11} allowClear onChange={(value) => onChangeDataClient(value, 'fullName')} placeholder='...' />
              </div>

              <div className='phoneBox'>
                <span className='phoneTxt'>Chứng minh nhân dân: </span>
                <Input value={panes[currentPaneIndex]?.clientInfo?.consignerIdCard} minLength={10} maxLength={11} allowClear onChange={(value) => onChangeDataClient(value, 'consignerIdCard')} placeholder='...' />
              </div>

              <div className='phoneBox'>
                <span className='phoneTxt'>Email: </span>
                <Input value={panes[currentPaneIndex]?.clientInfo?.mail} minLength={10} maxLength={11} allowClear onChange={(value) => onChangeDataClient(value, 'mail')} placeholder='...' />
              </div>

              <div className='phoneBox'>
                <span className='phoneTxt'>Tên ngân hàng: </span>
                <Input value={panes[currentPaneIndex]?.clientInfo?.bankName} allowClear onChange={(value) => onChangeDataClient(value, 'bankName')} placeholder='...' />
              </div>

              <div className='phoneBox'>
                <span className='phoneTxt'>ID ngân hàng: </span>
                <Input value={panes[currentPaneIndex]?.clientInfo?.bankId} allowClear onChange={(value) => onChangeDataClient(value, 'bankId')} placeholder='...' />
              </div>

              <div className='phoneBox'>
                <span className='phoneTxt'>Sinh nhật: </span>
                <Input value={panes[currentPaneIndex]?.clientInfo?.birthday} allowClear onChange={(value) => onChangeDataClient(value, 'birthday')} placeholder='...' />
              </div>
            </div>

            {
              panes[currentPaneIndex].isOnlineSale === 'true'
                ? <>
                  <Divider style={{ margin: '15px 0' }} orientation='left'>Thông tin vận chuyển</Divider>
                  <div className='customerInfoBox'>
                    <div className='phoneBox'>
                      <span className='phoneTxt'>Thành phố: </span>
                      <Input value={panes[currentPaneIndex]?.shippingInfo?.addressFromInfo?.pick_province} minLength={10} maxLength={11} allowClear onChange={(value) => onChangeDataShipping(value, 'pick_province')} placeholder='...'  />
                    </div>

                    <div className='typeTranferBox'>
                      <span className='typeTranferTxt'>Hình thức trả tiền: </span>
                      <Checkbox.Group options={optionsTransferOrder} value={panes[currentPaneIndex]?.shippingInfo?.optionTransfer || '1'} defaultValue={'1'} onChange={onChangeRadioTransferOrder} />
                    </div>
                  </div>
                 </> : null

            }
          </div>
        </div>

      </div> : panes[currentPaneIndex] && panes[currentPaneIndex].isCreatedSuccessfully ? (
        <div className='successBox'>
          {
            panes[currentPaneIndex] && panes[currentPaneIndex].isOnlineSale === 'true' ? <>
              <Steps style={{ padding: '10px 5%', marginBottom: '10%' }} current={0} onChange={onChangeStep}>
                <Step status='finish' title='Đơn Hàng' description='Bước 1' />
                <Step status='finish' title='Khách Hàng' description='Bước 2' />
                <Step status='finish' title='Vận chuyển' description='Bước 3' />
                <Step status='finish' title='Hoàn Thành' description='' />
              </Steps>
                </> : <>
                  <Steps style={{ padding: '10px 5%', marginBottom: '10%' }} current={0} onChange={onChangeStep}>
                    <Step status='finish' title='Đơn Hàng' description='Bước 1' />
                    <Step status='finish' title='Khách Hàng' description='Bước 2' />
                    <Step status='finish' title='Hoàn Thành' description='' />
                  </Steps>
                </>
          }
          <Button className='createNewButton' onClick={resetData}>Tạo mới</Button>
        </div>
      ) : null}
    </div>
  )
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData
})

export default withRouter(connect(mapStateToProps, null)(SaleScreen))
