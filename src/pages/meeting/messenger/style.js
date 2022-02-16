import styled from '@emotion/styled'

const MessengerWrapper = styled.div`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 10px;
  display: flex;
  color: black;

  .mess-container {
    height: 100%;
    width: 100%;
    flex: 1;
    border-radius: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;

    .mess-header {
      flex: 0 0 40px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 20px;

      h3 {
        margin: 0;
        font-size: 25px;
        font-weight: 700;
      }

      svg {
        font-size: 25px;
        font-weight: 700;
        cursor: pointer;
      }
    }

    .mess-body {
      flex: 1 0 0;
      padding: 20px;
      overflow-y: auto;
      scrollbar-width: 5px;
      .chat-block {
        margin-bottom: 30px;
        .sender {
          font-weight: 600;
          font-size: 18px;

          small {
            margin-left: 5px;
            font-weight: 300;
          }
        }
        .msg {
          margin: 0;
          padding-top: 5px;
          color: #555;
          font-size: 16px;
        }
      }
    }

    .mess-footer {
      flex: 0 0 40px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 20px;

      input {
        background-color: #dbdbdbbe;
        font-size: 17.5px;
        padding: 5px;
        border-radius: 10px;
        border-color: transparent;
        outline: none;
        width: 90%;
        height: 40px;
      }
      svg {
        cursor: pointer;
      }
    }
  }
`

export default MessengerWrapper
