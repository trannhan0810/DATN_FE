/* eslint-disable jsx-a11y/media-has-caption */
import PropTypes from 'prop-types'
import React from 'react'
import VideoItem from './style'

const MyVideoItem = React.forwardRef((props, ref) => {
  const { isScreenShared } = props
  return (
    <VideoItem>
      <video
        muted
        controls="hidden"
        playsInline
        autoPlay
        ref={ref}
        style={{
          transform: isScreenShared ? 'rotateY(0deg)' : 'rotateY(180deg)',
        }}
      />
    </VideoItem>
  )
})

MyVideoItem.propTypes = {
  isScreenShared: PropTypes.bool,
}

export default MyVideoItem
