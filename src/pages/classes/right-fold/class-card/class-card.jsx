/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import './class-card.css'
import PropTypes from 'prop-types'
import { Tooltip } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import useRouter from 'shared/hooks/useRouter'

function ClassCard({ item }) {
  const { history } = useRouter()
  return (
    <Tooltip className="class-card flex" onClick={() => history.push(`/classes/${item.id}`)}>
      <img src={item.avatar} alt="" className="class-card-avatar" />
      <div className="class-card-info">
        <div className="class-card-menu">
          <label className="class-card-name">{item.name}</label>
          <MoreOutlined className="class-card-icon" rotate={90} />
        </div>
        <div className="class-card-content">
          <label className="class-card-description">{item.type}</label>
        </div>
      </div>
    </Tooltip>
  )
}

ClassCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    avatar: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }),
}

export default ClassCard
