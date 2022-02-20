/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import VideoItem from './style'

const MyVideoItem = React.forwardRef((props, ref) => {
  return (
    <VideoItem>
      <video controls playsInline autoPlay ref={ref} />
    </VideoItem>
  )
})

export default MyVideoItem
