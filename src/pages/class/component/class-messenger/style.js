import styled from '@emotion/styled'

const ClassMessengerWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;

  .classMessenger-content {
    width: 100%;
    flex: 1 1 0;
    border-bottom: 2px solid lightgray;
    overflow-y: scroll;
    display: flex;
    flex-direction: column-reverse;
    padding: 8px;

    .post-item {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      border-radius: 8px;
      box-shadow: 5px 0px 6px #dbdbdb, -5px 0px 6px #dbdbdb;
      margin-bottom: 8px;
    }
  }

  .classMessenger-footer {
    width: 100%;
    flex: 0 0 64px;
    display: flex;
    align-items: center;

    .send-msg-form {
      width: 100%;
      display: flex;
      align-items: center;
      background-color: white;
      border-radius: 8px;
      box-shadow: 5px 0px 6px #dbdbdb, -5px 0px 6px #dbdbdb;
      padding: 0px 12px;

      input,
      input:focus {
        width: 0px;
        flex: 1 1 0px;
        padding: 12px;
        border: none;
        outline: none;
        font-size: 20px;
      }

      svg {
        flex: 0 0 auto;
        cursor: pointer;
      }
    }
  }
`
export default ClassMessengerWrapper
