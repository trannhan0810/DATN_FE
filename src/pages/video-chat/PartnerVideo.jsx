/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Peer from 'simple-peer'

const PartnerVideo = ({ peer }) => {
  const videoRef = useRef()

  useEffect(() => {
    // on receiving remote user's stream attach it to this video element using ref
    peer.on('stream', stream => {
      videoRef.current.srcObject = stream
    })
  }, [])

  return <video controls playsInline autoPlay ref={videoRef} />
}

PartnerVideo.propTypes = {
  peer: PropTypes.instanceOf(Peer),
}

export default PartnerVideo
