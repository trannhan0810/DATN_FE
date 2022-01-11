/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import './class-card.css'
import PropTypes from 'prop-types'
import { Redirect, useLocation } from 'react-router'
import { Tooltip } from 'antd'
import useRouter from 'shared/hooks/useRouter'

function ClassCard({ item }) {
  const [isRedirect, setIsRedirect] = useState(false)
  const { history } = useRouter()
  const location = useLocation()

  const redirect = () => {
    history.push(location.pathname)
    setIsRedirect(true)
  }

  return (
    <Tooltip className="class-card" onClick={redirect}>
      {isRedirect && <Redirect to={`/classes/${item.id}`} />}
      <div className="class-top">
        <img src={item.avatar} alt="" className="class-avatar" />
        <div className="class-info">
          <label className="class-title">{item.name}</label>
          <label className="class-subtitle">{item.type}</label>
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
