import styled from '@emotion/styled'

const MeetingControllerWrapper = styled.nav`
  height: 100%;
  width: 100%;
  align-items: center;
  padding: 10px;

  .content {
    height: 100%;
    width: 100%;
    //background-color: white;
    border-radius: 5px;

    .time {
      display: flex;
      height: 100%;
      width: 100%;
      justify-content: center;
      align-items: center;
    }

    .buttons {
      display: flex;
      height: 100%;
      width: 100%;
      justify-content: center;
      align-items: center;

      .icon-button {
        border-radius: 50%;
      }
    }
  }
`

export default MeetingControllerWrapper
