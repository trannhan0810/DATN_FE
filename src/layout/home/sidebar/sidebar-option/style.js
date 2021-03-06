import styled from '@emotion/styled'

const SidebarOptionWrapper = styled.div`
  .sidebar-option {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 4px 8px;
    //color: #616161;
    cursor: pointer;
  }

  .sidebar-label {
    font-size: 9px;
  }

  .sidebar-icon {
    font-size: 24px;
  }

  .active {
    color: #6264a7;
    border-left: 8px solid #6264a7;
  }

  .sidebar-option:hover {
    color: #7274b7;
  }

  @media screen and (max-width: 720px) {
    .active {
      border-left: 0px;
      background-color: #6264a7;
      color: white;
    }

    .sidebar-option:hover {
      color: #7274b7;
    }
  }
`
export default SidebarOptionWrapper
