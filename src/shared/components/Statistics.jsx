import React from 'react'
import { Card, Avatar } from 'antd'
import PropTypes from 'prop-types'

const { Meta } = Card
const Statistics = ({ title, icon, total, size, ...props }) => {
  return (
    <Card className="card-wrapper shadow-2">
      <Meta avatar={<Avatar icon={icon} shape="square" size={size} {...props} />} title={title} />
      <h6 className="t-600-28px-38px">{total}</h6>
    </Card>
  )
}

Statistics.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number,
  size: PropTypes.number,
  icon: PropTypes.node.isRequired,
}

export default Statistics
