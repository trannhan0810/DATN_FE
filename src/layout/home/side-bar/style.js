import styled from '@emotion/styled'

const SideBarWrapper = styled.div`
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  z-index: -2;
  display: flex;
  min-width: 48px;
  background-color: #ebebeb;
  .side-bar-item-holder {
    height: auto;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .side-bar-item {
    span {
      font-size: 1.5em;
      color: white;
    }

    text {
      color: white;
    }
  }
`
export default SideBarWrapper
