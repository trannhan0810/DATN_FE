import styled from '@emotion/styled'

const HeaderWrapper = styled.div`
  width: 100%;
  height: 100%;

  .header {
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
    background-color: #464775;
    color: white;
    padding: 6px 0px;
  }

  .header-menu {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }

  .header-appName {
    display: flex;
    flex: 3;
    justify-content: flex-start;
    align-items: center;
  }

  @media only screen and (max-width: 400px) {
    .header-appName {
      display: none;
    }
  }

  .header-label {
    font-size: 20px;
    font-weight: 500;
    margin-left: 16px;
  }

  .header-rightFold {
    display: flex;
    flex: 11;
    justify-content: space-between;
  }

  .header-search {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 6;
    background-color: #e1e1e1;
    padding: 8px;
    border-radius: 6px;
    color: #464775;
  }

  .header-search input {
    border: none;
    width: 100%;
    font-size: 16px;
    background-color: #e1e1e1;
    margin-left: 6px;
    color: #464775;
  }

  .header-profile {
    display: flex;
    flex: 4;
    justify-content: flex-end;
    align-items: center;
    padding-right: 16px;
  }

  .header-user-name {
    margin-right: 16px;
    font-size: 24px;
  }

  .header-avatar {
    height: 32px;
    border-radius: 50%;
    margin-right: 16px;
  }

  .profile-options {
    font-size: 28px;
    margin-right: 16px;
  }

  .btn-logout {
    font-size: 28px;
  }
`
export default HeaderWrapper
