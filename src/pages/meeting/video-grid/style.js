import styled from '@emotion/styled'

const VideoGridWrapper = styled.div`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  //background-color: #444;

  .grid-item {
    height: 100%;
    width: 100%;
    flex: 0 0 1;
    border-radius: 5%;
  }

  .scrollable {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #444;
    display: flex;
    justify-content: center;

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      display: none;
    }
  }
`

export default VideoGridWrapper
