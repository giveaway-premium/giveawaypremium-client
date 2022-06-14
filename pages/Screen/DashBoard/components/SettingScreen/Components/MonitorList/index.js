import React from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Input, Button, Tag } from 'antd'
import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'
import { showNotification } from 'common/function'
import { Router } from 'common/routes'
import { isMobile } from 'react-device-detect'
import './style.scss'
import GapService from 'controller/Api/Services/Gap'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { bindActionCreators } from 'redux'
import StorageActions from 'controller/Redux/actions/storageActions'

class MonitorList extends React.Component {
  static async getInitialProps ({ query }) {
    return { query }
  }
  constructor (props) {
    super(props)
    this.state = {
      isLoadingMonitor: false,
      monitorList: [],
      inputVisible: false,
      inputValue: ''
    }
    this.myModal = React.createRef()
  }

  componentDidMount () {
    this.fetchAllMonitor()
  }

  fetchAllMonitor = async () => {
    const monitorList = []
    this.setState({
      isLoadingMonitor: true
    }, async () => {
      const res = await GapService.getChannel()
      if (res && res.results && res.results.length > 0) {
        res.results.map(itemChannel => {
          monitorList.push({
            objectId: itemChannel.objectId || itemChannel._objectId,
            name: itemChannel.name,
            data: itemChannel.data
          })
        })
        this.setState({
          monitorList: monitorList,
          isLoadingMonitor: false
        })
      } else {
        this.setState({
          isLoadingMonitor: false
        })
      }
    })
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  };

  onSetMonitor = (data) => {
    const { setChannelMonitor, channelMonitorRedux } = this.props

    console.log(data)
    if (data && data.objectId) {
      const isChecked = channelMonitorRedux.objectId === data.objectId
      if (isChecked) {
        setChannelMonitor({})
      } else {
        setChannelMonitor(data)
      }
      showNotification(`Thay đổi thành công`)
    } else {
      showNotification(`Thay đổi thất bại`)
    }
  }

  handleInputConfirm = async () => {
    const { inputValue } = this.state

    let hash = 'giveaway'
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < 50; i++) { hash += possible.charAt(Math.floor(Math.random() * possible.length)) }

    const body = {
      name: inputValue.trim(),
      // channel: inputValue.trim(),
      data: {},
      type: 'Consignment'
    }
    const res = await GapService.setChannel(body)

    if (res && res.objectId) {
      const newMonitor = {
        objectId: res.objectId,
        name: inputValue.trim(),
        data: {},
        type: 'Consignment'
      }
      showNotification(`Thêm thành công`)
      this.setState({
        monitorList: [...this.state.monitorList, newMonitor],
        inputValue: '',
        inputVisible: false
      })
    } else {
      showNotification(`Thêm thất bại`)
    }
  }

  saveInputRef = input => {
    this.input = input
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value })
  };

  render () {
    const { isLoadingMonitor, monitorList, inputVisible, inputValue } = this.state
    const { channelMonitorRedux } = this.props
    const MonitorBox = ({ data }) => {
      const isChecked = channelMonitorRedux.objectId === data.objectId
      return (
        <div onClick={() => this.onSetMonitor(data)} className='monitorBox' style={isChecked ? { backgroundColor: '#d2e8c9' } : {}}>
          {data && data.name}
        </div>
      )
    }
    return (
      <div className='monitorConfig-container'>
        {isLoadingMonitor ? <LoadingOutlined /> : (
          <div className='monitorConfigBox'>
            {
              monitorList.map((itemMonitor, itemMonitorIndex) => <MonitorBox data={itemMonitor} key={itemMonitorIndex} />)
            }
          </div>
        )}

        {inputVisible && !isLoadingMonitor && (
        <>
          <p className='MT20'>Tên monitor: </p>
          <Input.Group compact>
            <Input onChange={this.handleInputChange} size='small' ref={this.saveInputRef} style={{ width: 150, height: 40, maxWidth: '50%' }} placeholder='...' />
          </Input.Group>
          <Button disabled={!inputValue} onClick={this.handleInputConfirm} className='MT20'>Thêm</Button>
        </>
        )}

        {!inputVisible && (
          <Tag onClick={this.showInput} className='site-tag-plus'>
            <PlusOutlined /> Thêm monitor mới
          </Tag>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData,
  channelMonitorRedux: state.channelMonitorRedux
})

const mapDispatchToProps = (dispatch) => {
  return {
    setChannelMonitor: bindActionCreators(StorageActions.setChannelMonitor, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MonitorList))
