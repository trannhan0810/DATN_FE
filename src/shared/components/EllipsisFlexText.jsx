import React from 'react'
import PropTypes from 'prop-types'

const EllipsisFlexText = ({ children }) => {
  return (
    <div style={{ display: 'table', tableLayout: 'fixed', width: '100%' }}>
      <div
        style={{
          display: 'table-cell',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  )
}

EllipsisFlexText.propTypes = {
  children: PropTypes.string,
}

export default EllipsisFlexText
