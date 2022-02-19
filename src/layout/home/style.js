import styled from '@emotion/styled'

const HomeLayoutStyle = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .home-header {
    width: 100%;
    flex: 0 0 50px;
    //max-height: 50px;
  }

  .home-body {
    width: 100%;
    flex: 1;

    .home-body-inner {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
    }

    .home-sidebar {
      flex: 1;
      height: 100%;
      display: flex;
    }

    .content {
      flex: 14;
      height: 100%;
      display: flex;

      .content-left-fold {
        display: flex;
        flex: 3;
      }

      .content-right-fold {
        display: flex;
        flex: 11;
      }
    }
  }
`

export default HomeLayoutStyle
