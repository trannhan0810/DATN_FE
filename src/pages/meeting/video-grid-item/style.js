import styled from '@emotion/styled'

const VideoItem = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px;
  overflow: hidden;

  video {
    //border-radius: 1px;
    position: relative;
    object-fit: cover;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
`

export default VideoItem
