import styled from '@emotion/styled'

const HomeLayoutStyle = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100wh;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .home-header {
    width: 100%;
    flex: 0 0 64px;
  }

  .home-body {
    width: 100%;
    flex: 1 1 0px;
    display: flex;
    flex-direction: row;

    .home-sidebar {
      height: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .content {
      height: 100%;
      flex: 14;
      display: flex;

      .content-left-fold {
        height: 100%;
        flex: 3;
        @media only screen and (max-width: 720px) {
          display: none;
        }
      }

      .content-right-fold {
        height: 100%;
        flex: 11;
      }
    }
  }

  @media screen and (max-width: 700px) {
    .home-body {
      flex-direction: column-reverse;

      .home-sidebar {
        width: 100%;
        height: auto;
        flex: 0 0 auto;
        display: flex;
        flex-direction: row;
      }

      .content {
        width: 100%;
        flex: 1 1 0;
      }
    }
  }
`

export default HomeLayoutStyle
