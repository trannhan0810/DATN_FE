/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import VideoItem from './style'

const VideoGridItem = () => {
  return (
    <VideoItem>
      <video controls playsInline autoPlay>
        <source src="http://www.w3schools.com/html/movie.mp4" type="video/mp4" />
      </video>
    </VideoItem>
  )
}

export default VideoGridItem
