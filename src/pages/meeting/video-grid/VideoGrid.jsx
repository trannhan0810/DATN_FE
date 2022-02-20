/* eslint-disable jsx-a11y/media-has-caption */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import VideoGridWrapper from './style'

// This function calculates width and height of the list
const recalculateLayout = (n, gridWidth, gridHeight) => {
  let bestRatio = 99999999
  let bestSize = [1, n]
  // eslint-disable-next-line no-constant-condition
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

function useVideoGridLayout() {
  const [numOfItems, setNumOfItems] = useState(0)
  const [numOfCols, setNumOfCols] = useState(1)
  const [numOfRows, setNumOfRows] = useState(1)
  const videoGridRef = useRef(null)

  const updateLayout = useCallback(
    ele => {
      if (ele != null) {
        videoGridRef.current = ele
      }
      if (numOfItems > 0 && videoGridRef.current) {
        const gridWidth = videoGridRef.current.clientWidth
        const gridHeight = videoGridRef.current.clientHeight
        const [newNumOfCols, newNumOfRows] = recalculateLayout(numOfItems, gridWidth, gridHeight)
        setNumOfCols(newNumOfCols)
        setNumOfRows(newNumOfRows)
      }
    },
    [numOfItems],
  )

  useEffect(() => {
    updateLayout()
    const listener = () => updateLayout()
    window.addEventListener('resize', listener)
    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [updateLayout])

  return [numOfCols, numOfRows, setNumOfItems, updateLayout]
}

const VideoGrid = ({ children, updateLayoutRef, containerClassName = '', itemClassName = '' }) => {
  const [numOfCols, numOfRows, setNumOfItems, updateLayout] = useVideoGridLayout()

  useEffect(() => {
    setNumOfItems(React.Children.count(children))
  }, [children])

  useEffect(() => {
    if (updateLayoutRef) {
      // eslint-disable-next-line no-param-reassign
      updateLayoutRef.current = () => updateLayout()
    }
    return () => {
      if (updateLayoutRef) {
        // eslint-disable-next-line no-param-reassign
        updateLayoutRef.current = undefined
      }
    }
  }, [updateLayout, updateLayoutRef])

  return (
    <VideoGridWrapper
      ref={updateLayout}
      className={containerClassName}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexFlow: 'row wrap',
        flex: numOfCols,
      }}
    >
      {React.Children.map(children, child => (
        <div
          className={`grid-item ${itemClassName}`}
          style={{
            flex: '0 0 1',
            flexBasis: `${Math.floor(100 / numOfCols)}%`,
            height: `${Math.floor(100 / numOfRows)}%`,
          }}
        >
          {child}
        </div>
      ))}
    </VideoGridWrapper>
  )
}

VideoGrid.propTypes = {
  children: PropTypes.node,
  containerClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  updateLayoutRef: PropTypes.shape({ current: PropTypes.func }),
}

export default VideoGrid
