import styled from '@emotion/styled'

const HeaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #464775;
  color: white;
  padding: 6px 0px;

  .header-logo {
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    padding: 0px 4px;
  }

  .header-menubar {
    height: 100%;
    flex: 14;
    display: flex;
    align-items: center;

    .header-appName {
      height: 100%;
      flex: 3 3 0px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      overflow: none;
      font-size: 20px;
      font-weight: 500;
      padding-left: 16px;

      @media only screen and (max-width: 720px) {
        display: none;
      }
    }

    .header-controls {
      height: 100%;
      flex: 11;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .header-search {
        height: 100%;
        flex: 1 1 0px;
        display: flex;
        max-width: 400px;
        justify-content: flex-start;
        align-items: center;
        background-color: #e1e1e1;
        padding: 8px 12px;
        border-radius: 6px;
        color: #464775;

        input {
          border: none;
          width: 100%;
          font-size: 16px;
          background-color: #e1e1e1;
          margin-left: 6px;
          color: #464775;
        }
      }

      .header-profile {
        height: 100%;
        flex: 0 0 auto;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-left: 8px;
      }

      .header-icon {
        height: 100%;
        padding: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28px;
        cursor: pointer;
      }
    }
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
