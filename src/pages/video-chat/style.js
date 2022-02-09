import styled from '@emotion/styled'

const VideoChatWrapper = styled.div`
  background-color: #202124;

  #grid-root {
    padding-top: 1%;
    padding-left: 1%;
    padding-right: 1%;
    padding-bottom: 5%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  #grid-list {
    width: 90%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    overflow: hidden;
    justify-content: center;
  }

  video {
    width: 100%;
    height: 87vh;
    object-fit: cover;
    z-index: 0;
  }
`

export default VideoChatWrapper
