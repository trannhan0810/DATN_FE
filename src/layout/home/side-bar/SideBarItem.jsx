import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router'
import { Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import Text from 'antd/lib/typography/Text'

const SideBarItem = props => {
  const { name, icon, path } = props
  const location = useLocation()
  const isMatchPath = location.pathname === path

  return (
    <div>
      <Tooltip title={name}>
        <Link to={path}>
          {icon} <Text>{name}</Text>
        </Link>
      </Tooltip>
    </div>
  )
}

SideBarItem.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.node,
  path: PropTypes.string,
}

export default SideBarItem
