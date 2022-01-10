import styled from '@emotion/styled'

const HeaderWrapper = styled.div`
  .header {
    background-color: var(--primary-color);
    color: white;
    height: 48px;
    min-width: 52px;
    justify-content: center;
    align-items: center;

    .logo-holder {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .logo {
        align-self: center;
      }
    }

    .app-name {
      font-size: 1.5em;
      padding-left: 10px;
    }

    .btn-menu {
      background-color: var(--primary-color);
      color: white;
    }
  }
`
export default HeaderWrapper
