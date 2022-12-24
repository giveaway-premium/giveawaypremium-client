import React from 'react'
import styles from './styles.scss'
import {
  CloseOutlined, CheckOutlined
} from '@ant-design/icons'
import { images } from 'config/images'
import { validateNumber } from 'common/function'

class TextInput extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value || '',
      count: 0,
      errMsg: '',
      forceRender: false
    }
  }

  componentWillReceiveProps (nextProps) {
    const { value, errMsg } = nextProps
    if (value !== null && value !== undefined) {
      const countNew = this.numberOfCharater(value)

      this.setState({ value, count: countNew })
    }
    if (errMsg !== null && errMsg !== undefined) {
      this.setState({ errMsg })
    }
  }

  cleanInput = () => {
    const { handleInput, validateInput, cleanInput, name } = this.props
    this.setState({
      value: '',
      count: 0,
      errMsg: ''
    })

    if (name && name.length > 0 && handleInput) {
      handleInput('', name)
    } else if (handleInput) {
      handleInput('')
    }
    validateInput && validateInput('')
    cleanInput && cleanInput()
  }

  handleInput = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const currentValue = this.state.value
    const currentCount = this.state.count
    const { handleInput, max, isNumber = false, validateInput, name } = this.props
    let valueNew = e.target.value || ''
    let countNew = this.numberOfCharater(valueNew)

    // let countNew = valueNew.length

    if (isNumber && valueNew.length > 0) {
      if (!validateNumber(valueNew)) {
        valueNew = currentValue
        countNew = currentCount
      }
    }
    if (max && countNew > max) {
      valueNew = currentValue
      countNew = max
    }
    const errMsg = validateInput ? validateInput(valueNew) : ''

    this.setState({
      value: valueNew,
      count: countNew,
      errMsg
    })
    if (name && name.length > 0 && handleInput) {
      handleInput(valueNew, name)
    } else if (handleInput) {
      handleInput(valueNew)
    }
  }

  numberOfCharater = (value) => {
    let iCount = 0
    if (value && value.length > 0) {
      [...value].forEach(character => {
        if (this.isBase64(character)) {
          iCount += 2
        } else {
          iCount += 1
        }
      })

      return iCount
    } else {
      return 0
    }
  }

  setValue = (value) => {
    const countNew = this.numberOfCharater(value)

    this.setState({
      value,
      count: countNew,
      forceRender: !this.state.forceRender
    })
  }

  getValue = () => {
    return this.state.value
  }

  getTitle = () => {
    return this.props.title ? this.props.title : ''
  }

  handleSubmitInput = (e) => {
    e.preventDefault()
    const { handleSubmitInput } = this.props
    handleSubmitInput && handleSubmitInput(this.state.value)
  }

  isLatinWord = (str) => {
    if (!/[^a-zA-Z]/.test(str)) {
      return true
    } else {
      return false
    }
  }

  isBase64 = (str) => {
    if (str === '' || str.trim() === '') { return false }
    try {
      if (this.isLatinWord(str)) {
        return false
      } else if (window.btoa(decodeURI(encodeURI(str)))) {
        return false
      } else {
        return true
      }
    } catch (err) {
      return true
    }
  }

  render () {
    const { value, count } = this.state
    const errMsg = this.props.errMsg || this.state.errMsg
    const {
      isTextArea = false,
      type = 'text',
      clearIcon = true,
      searchIcon = false,
      clear1Icon = false,
      check2Icon = false,
      moreInfoNode = null,
      placeHolder = '',
      placeholderStyle = '',
      rightView,
      containerClass = '',
      inputStyle = '',
      max,
      isDisabled,
      name = '',
      title,
      titleCss,
      titleBoxCss,
      titleNode
    } = this.props
    return (
      <>
        {
          title && !titleNode ? (
            <div className={`titleBoxCss  ${titleBoxCss}`}>
              <span className={`titleTxt  ${titleCss}`}>{title}</span>

              {moreInfoNode && moreInfoNode}
            </div>
          ) : null
        }
        {
          titleNode ? (
            <>
              {titleNode}
            </>
          ) : null
        }
        <div className={`containerTextInput ${containerClass}`}>
          {
            isTextArea ? (
              <textarea
                name={name}
                className={`formControl textInput ${inputStyle}`}
                value={this.state.value}
                onChange={this.handleInput}
                placeholder={placeHolder} />
            ) : (
              <input
                name={name}
                className={`formControl textInput ${inputStyle}`}
                autoComplete='off'
                value={this.state.value}
                onChange={this.handleInput}
                type={type}
                disabled={isDisabled}
                placeholder={placeHolder} />
            )
          }
          <div className='rowInputError'>
            {
              errMsg && errMsg.length > 0 && (
                <div className={`textLeft txtInputError`}>
                  {errMsg}
                </div>
              )
            }
            {
              max && (
                <div className='txtCount'>
                  {count}/{max}
                </div>
              )
            }
          </div>

          <div className={`containerRight`}>
            <div className={`crSubAction`}>
              {clearIcon && value !== '' && !isDisabled &&
              <CloseOutlined width={17} src={images.icClose} onClick={this.cleanInput} className={`iconClose`} />
              // <img width={17} src={images.icClose} onClick={this.cleanInput} className={`${styles.iconClose}`} />
              }
              {
                searchIcon && value === '' &&
                <img width={17} src={images.icClose} onClick={this.handleInput} className='iconClose' />
              }
              {check2Icon && value !== '' && (
                <div className={`cursor pointer`} onClick={this.handleSubmitInput}>
                  <CheckOutlined />
                </div>
              )}
              {clear1Icon && (
                <div className={`cursor pointer ML10`} onClick={this.cleanInput}>
                  <CloseOutlined />
                </div>
              )}
              {rightView && rightView}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default TextInput
