import styled from '@emotion/styled'

const MeetingPageWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;

  .video-container {
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .messenger-container {
    width: 30vw;
  }

  .messenger-container {
    height: 100%
    width: 30vw;
    top: 0;
    right: 0;
    background-color: #aaa;
  }
`

export default MeetingPageWrapper
