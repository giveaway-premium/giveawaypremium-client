import React from 'react'
import { images } from 'config/images'
import './style.scss'

export default class VideoPlayer extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isPlay: false,
      currentTime: 0
    }
    this.videoRef = React.createRef()
  }
  handlePausePlayClick = () => {
    if (this.state.isPlay) {
      this.videoRef.current.pause()
    } else {
      this.videoRef.current.play()
    }
    this.setState({
      isPlay: !this.state.isPlay
    })
  }
  handleTimeUpdate = () => {
    this.setState({
      currentTime: this.videoRef.current.currentTime
    })
  }
  handleEndedAudio = () => {
    this.setState({
      isPlay: !this.state.isPlay,
      currentTime: 0
    })
  }
  render () {
    const { url = '', posterImage = '' } = this.props
    const { isPlay } = this.state
    const videoAttr = {
      ref: this.videoRef,
      src: url,
      playsInline: true,
      onTimeUpdate: () => this.handleTimeUpdate(),
      onEnded: () => this.handleEndedAudio()
    }
    if (posterImage && posterImage.length > 0) {
      videoAttr['poster'] = posterImage
    }
    return (
      <div className={'video-player-container ' + (isPlay ? 'video-playing' : 'video-pause')}>
        <div className='video-wrapper'>
          {posterImage && <img className='video-poster' src={posterImage} />}
          <video {...videoAttr} height={213} />
        </div>
        <div className='control-button-group'>
          <div className='play-button' onClick={this.handlePausePlayClick}>
            {this.state.isPlay ? <img src={images.icPause} /> : <img src={images.icPlay} />}
          </div>
        </div>
      </div>
    )
  }
}
