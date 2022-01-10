import styled from '@emotion/styled'

const AuthWrapper = styled.div`
  * {
    font-family: Inter, sans-serif;
  }

  .full-height {
    height: 100vh;

    .form-content {
      margin-top: 20px;
    }

    .custom-btn {
      width: 100%;
      border: none;
      color: white;
      background: var(--primary-color);
      height: 45px;
      border-radius: 8px;
      margin-top: 14px;
    }

    .left-side {
      img {
        width: 100%;
        max-width: 400px;
      }
      padding: 0 40px;
      background-color: var(--primary-color);
      justify-content: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      h1 {
        margin-bottom: 10px;
        white-space: pre-line;
        max-width: 320px;
      }
    }

    .right-col {
      max-height: 100vh;
      overflow: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .right-side {
      padding: 40px;
      margin: auto;
      max-width: 450px;
      justify-content: center;
      display: flex;
      flex-direction: column;
      width: -webkit-fill-available;

      .horizontal-center {
        display: flex;
        flex-direction: column;
        align-items: center;
        *:not(.media-login *) {
          margin-top: 15px;
        }

        button {
          margin: 0 5px;
        }
      }

      .separator {
        width: -webkit-fill-available;
        display: flex;
        align-items: center;
        text-align: center;
        color: #7a7a9d;
      }

      .separator::before,
      .separator::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid #edf2f7;
      }

      .separator:not(:empty)::before {
        margin-right: 1.25em;
      }

      .separator:not(:empty)::after {
        margin-left: 1.25em;
      }

      .ant-radio-group {
        display: flex;
        justify-content: space-between;

        .ant-radio-wrapper:not(.ant-radio-wrapper-checked) {
          color: #c1c1c1;
        }
      }
    }
    .ant-checkbox .ant-checkbox-checked {
      border-radius: 2px;
    }

    .ant-checkbox-inner {
      border-radius: 2px;
    }

    .ant-checkbox-checked:after {
      border-radius: 2px;
    }
  }

  @media (max-width: 760px) {
    .full-height {
      .left-side {
        display: none;
      }
    }
  }
`

export default AuthWrapper
