import styled from '@emotion/styled'

const ClassInfoWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #ebebeb;
  box-shadow: 5px 0px 6px #dbdbdb, -5px 0px 6px #dbdbdb;
  overflow-y: hidden;
  // /* Hide scrollbar for IE, Edge and Firefox */
  // -ms-overflow-style: none; /* IE and Edge */
  // scrollbar-width: none; /* Firefox */

  // /* Hide scrollbar for Chrome, Safari and Opera */
  // &::-webkit-scrollbar {
  //   display: none;
  // }

  .class-info-header {
    flex: 0 0 90px;
    width: 100%;
    display: flex;
    padding: 16px;
    align-items: center;
    border-bottom: 2px solid lightgray;

    .pointer-mouse {
      cursor: pointer;
    }
  }

  .class-info-content {
    flex: 1 0 auto;
    width: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 16px;

    .class-info-avatar {
      width: 120px;
      height: 120px;
      border-radius: 4px;
      box-shadow: #616161 2px 2px;
      object-fit: cover;
    }

    .class-info-name {
      font-weight: 600;
      font-size: 2em;
    }
  }

  .class-info-bottom {
    flex: 0 0 50%;
    width: 100%;
    //background-color: white;
  }
`

export default ClassInfoWrapper
