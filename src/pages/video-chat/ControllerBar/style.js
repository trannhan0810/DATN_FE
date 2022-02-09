import styled from '@emotion/styled'

const ControlBarWrapper = styled.nav`
  bottom: 0px;
  right: 0px;
  left: 0px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 12vh;
  background-color: #202124;
  color: white;
  font-size: medium;

  .control-button {
    background-color: "#404239"
    margin: 4px
  }
`

export default ControlBarWrapper
