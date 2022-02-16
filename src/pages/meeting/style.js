import styled from '@emotion/styled'

const MeetingPageWrapper = styled.div`
  background-color: #202124;
  height: 100vh;
  width: 100wh;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;

  .meeting-main {
    min-height: 0px;
    width: 100%;
    flex: 1 1 0px;
    display: flex;

    .meeting-videos {
      display: flex;
      flex: 1 1 0;
      height: 100%;
      padding: 5px;
    }

    .meeting-info {
      min-width: 480px;
      display: flex;
      flex: 0 0 480px;
      height: 100%;
      padding: 5px;
    }
  }

  .control-bar {
    width: 100%;
    flex: 0 1 100px;
    display: flex;
  }
`

export default MeetingPageWrapper
