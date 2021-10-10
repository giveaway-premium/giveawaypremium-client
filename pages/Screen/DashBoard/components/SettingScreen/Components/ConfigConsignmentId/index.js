import React from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Input, Button, Spin, Tabs, Tag, DatePicker, Row } from 'antd'
import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'
import { showNotification } from 'common/function'
import { Router } from 'common/routes'
import { isMobile } from 'react-device-detect'
import './style.scss'
import GapService from 'controller/Api/Services/Gap'
import TweenOneGroup from 'rc-tween-one'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import moment from 'moment'

class ConfigConsignmentId extends React.Component {
  static async getInitialProps ({ query }) {
    return { query }
  }
  constructor (props) {
    super(props)
    this.state = {
      tags: [],
      allInfoTag: [],
      timeGetMoney: moment(),
      isLoadingTags: false,
      inputVisible: false,
      inputValue: ''
    }
    this.myModal = React.createRef()
  }

  componentDidMount () {
    this.fetchAllTags()
  }

  fetchAllTags = async () => {
    const { tags } = this.state
    const tempTags = tags
    this.setState({
      isLoadingTags: true
    }, async () => {
      const res = await GapService.getConsignmentID()
      if (res && res.results && res.results.length > 0) {
        res.results.map(tag => {
          tempTags.push(`${tag.code}`)
        })

        this.setState({
          allInfoTag: res.results,
          tags: tempTags,
          isLoadingTags: false
        })
      } else {
        this.setState({
          isLoadingTags: false
        })
      }
    })
  }

  handleClose = async removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag)
    const allInfoTag = this.state.allInfoTag.filter(tag => tag.code !== removedTag)
    const foundTagItem = this.state.allInfoTag.filter(tag => tag.code === removedTag)

    if (foundTagItem && foundTagItem[0] && foundTagItem[0].objectId) {
      this.setState({ tags, allInfoTag })

      const res = await GapService.deleteConsignmentID(foundTagItem[0].objectId)

      if (res) {
        showNotification(`Xoá thành công ${foundTagItem[0].code}`)
      } else {
        showNotification('Xoá thất bại')
      }
    }
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value })
  };

  handleInputConfirm = () => {
    const { inputValue, timeGetMoney } = this.state
    let { tags, allInfoTag } = this.state

    if (inputValue && tags.indexOf(inputValue) === -1) {
      const newTag = { code: inputValue, timeGetMoney: timeGetMoney }

      tags = [...tags, inputValue]
      this.setState({
        tags,
        inputVisible: false,
        inputValue: ''
      }, async () => {
        const res = await GapService.setConsignmentID(newTag)
        if (res && res.objectId) {
          this.setState({
            allInfoTag: [...allInfoTag, { code: inputValue, timeGetMoney: timeGetMoney, objectId: res.objectId }]
          }, () => showNotification('Thêm thành công'))
        } else {
          showNotification('Thêm thất bại')
        }
      })
    } else {
      showNotification('Mã đã tồn tại')
    }
  };

  saveInputRef = input => {
    this.input = input
  };

  forMap = tag => {
    const tagElem = (
      <Tag
        // closable
        onClose={e => {
          e.preventDefault()
          // this.handleClose(tag)
        }}
      >
        {tag}
      </Tag>
    )
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    )
  };

  onChangeTimeGetMoney = (value) => {
    try {
      const formatTime = moment(value).format()

      this.setState({
        timeGetMoney: formatTime
      }, () => {
        console.log(this.state)
      })
    } catch (e) {
      console.log(e)
      showNotification('Lỗi')
    }
  }

  render () {
    const { tags, inputVisible, inputValue, isLoadingTags, timeGetMoney } = this.state
    const tagChild = tags.map(this.forMap)
    return (
      <div className='ConfigConsignmentId-container'>
        <div style={{ marginBottom: 16 }}>
          {
            isLoadingTags ? <LoadingOutlined />
              : <TweenOneGroup
                enter={{
                  scale: 0.8,
                  opacity: 0,
                  type: 'from',
                  duration: 100,
                  onComplete: e => {
                    e.target.style = ''
                  }
                }}
                leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                appear={false}
              >
                {tagChild}
              </TweenOneGroup>
          }
        </div>
        {inputVisible && (
        <>
          <Input.Group compact>
            <Input onChange={this.handleInputChange} size='small' ref={this.saveInputRef} style={{ width: 150, height: 40, maxWidth: '50%' }} placeholder='...' />
            <br />
            <p className='MT10'>Từ ngày: </p>
            <br />
            <DatePicker onChange={this.onChangeTimeGetMoney} placeholder='DD-MM-YYYY' format='DD-MM-YYYY' defaultValue={moment()} style={{ width: 200, height: 40, maxWidth: '50%' }} />
            <br />
            <p className='MT10'>Đến: </p>
            <br />
            <DatePicker disabled placeholder='DD-MM-YYYY' format='DD-MM-YYYY' value={moment(timeGetMoney, 'DD-MM-YYYY').add(10, 'days')} defaultValue={moment()} style={{ width: 200, height: 40, maxWidth: '50%' }} />
          </Input.Group>
          <Button onClick={this.handleInputConfirm} className='MT20'>Thêm</Button>
        </>
        )}
        {!inputVisible && (
          <Tag onClick={this.showInput} className='site-tag-plus'>
            <PlusOutlined /> Thêm mã mới
          </Tag>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData
})

export default withRouter(connect(mapStateToProps, null)(ConfigConsignmentId))
//   <Input
//     ref={this.saveInputRef}
//     type='text'
//     size='small'
//     style={{ width: 78 }}
//     value={inputValue}
//     onChange={this.handleInputChange}
//     onBlur={this.handleInputConfirm}
//     onPressEnter={this.handleInputConfirm}
//   />
