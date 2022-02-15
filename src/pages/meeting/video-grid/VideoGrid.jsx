/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import VideoGridWrapper from './style'
import useWindowDimensions from 'shared/hooks/useWindowDimensions'

const VideoGrid = ({ children, numOfItem }) => {
  const { width } = useWindowDimensions()
  const maxVideoDisplay = width > 800 ? 12 : 8
  const peers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  const numOfVideo = 9
  const numOfVideoDisplay = Math.min(numOfVideo, maxVideoDisplay)
  const [numOfColumn, setNumOfColumn] = useState(1)
  const [numOfRow, setNumOfRow] = useState(numOfVideoDisplay)
  const displayPeers = peers.slice(0, numOfVideoDisplay)
  const videoGridRef = useRef(null)

  // This function calculates width and height of the list
  const getBestSize = n => {
    const gridWidth = videoGridRef.current.clientWidth
    const gridHeight = videoGridRef.current.clientHeight
    let bestRatio = 99999999
    let bestSize = [1, n]
    for (let colNum = 1; true; colNum += 1) {
      const rowNum = Math.ceil(n / colNum)
      const newRatio = gridWidth / colNum / (gridHeight / rowNum)
      if (newRatio >= 1 && newRatio <= 16 / 9) {
        return [colNum, rowNum]
      }

      if (Math.abs(newRatio - 4 / 3) < Math.abs(bestRatio - 4 / 3)) {
        bestRatio = newRatio
        bestSize = [colNum, rowNum]
      } else {
        return bestSize
      }
    }
  }

  // Get 'width' and 'height' after the initial render and every time the list changes
  useEffect(() => {
    const [col, row] = getBestSize(numOfItem)
    if (col !== numOfColumn) {
      setNumOfColumn(col)
      setNumOfRow(row)
    }
  })

  return (
    <VideoGridWrapper ref={videoGridRef} style={{ flex: numOfColumn }}>
      {children.map((child, i) => (
        <div
          key={displayPeers[i]}
          className="grid-item"
          style={{ flexBasis: `${Math.floor(100 / numOfColumn)}%`, height: `${Math.floor(100 / numOfRow)}%` }}
        >
          {child}
        </div>
      ))}
    </VideoGridWrapper>
  )
}

VideoGrid.propTypes = {
  numOfItem: PropTypes.number,
  children: PropTypes.node,
}

export default VideoGrid
