import Icon from '@ant-design/icons'
import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as ArrowBottomLeft } from 'assets/svgs/arrow-bottom-left.svg'

const SVGS = {
  'arrow-bottom-left': ArrowBottomLeft,
}

const SVGIcon = ({ onClick, name, style, size = 20, color, className }) => {
  return (
    <Icon onClick={onClick} className={className} component={SVGS[name]} style={{ fontSize: size, color, ...style }} />
  )
}

SVGIcon.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.any, PropTypes.arrayOf(PropTypes.any)]),
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
}

export default SVGIcon
