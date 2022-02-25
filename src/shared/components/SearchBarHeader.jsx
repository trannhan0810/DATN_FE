import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Tooltip } from 'antd'
import { Close, Search } from '@mui/icons-material'

const SearchBarHeaderWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  .search-icon {
    flex: 0 0 auto;
    cursor: pointer;
  }

  .search-bar {
    over-flow: none;
    flex: 1 1 0px;
    font-size: 18px;

    input {
      background-color: transparent;
      border: none;
      outline: none;
    }
  }
`

const SearchBarHeader = props => {
  const { isSearch, setIsSearch, title, searchPlaceHolder, searchInputRef } = props

  return (
    <SearchBarHeaderWrapper>
      <div className="search-bar">
        {isSearch ? <input ref={searchInputRef} className="search-bar" placeholder={searchPlaceHolder} /> : title}
      </div>
      <Tooltip className="search-icon" onClick={() => setIsSearch(!isSearch)}>
        {isSearch ? <Close /> : <Search />}
      </Tooltip>
    </SearchBarHeaderWrapper>
  )
}

SearchBarHeader.propTypes = {
  isSearch: PropTypes.bool,
  setIsSearch: PropTypes.func,
  title: PropTypes.string,
  searchPlaceHolder: PropTypes.string,
  searchInputRef: PropTypes.shape({ current: PropTypes.node }),
}

export default SearchBarHeader
