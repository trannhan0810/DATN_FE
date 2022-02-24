import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const FoldCardWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #ebebeb;
  box-shadow: 5px 0px 6px #dbdbdb, -5px 0px 6px #dbdbdb;
  overflow-y: hidden;

  .fold-card-header {
    flex: 0 0 90px;
    width: 100%;
    display: flex;
    padding: 16px;
    align-items: center;
    border-bottom: 2px solid lightgray;
  }

  .fold-card-content {
    flex: 1 1 0px;
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;
  }
`

function FoldCard(props) {
  const { FoldCardHeader, FoldCardContent } = props

  return (
    <FoldCardWrapper>
      <div className="fold-card-header">{FoldCardHeader} </div>
      <div className="fold-card-content"> {FoldCardContent}</div>
    </FoldCardWrapper>
  )
}

FoldCard.propTypes = {
  FoldCardHeader: PropTypes.node,
  FoldCardContent: PropTypes.node,
}

export default FoldCard
