import styled from '@emotion/styled'

const HomeLayoutStyle = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;

  .add-button {
    background-color: #6264a7;
    width: fit-content;
    color: white;
    justify-content: center;
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 4px;
    margin-left: 8px;
    cursor: pointer;
  }

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
      // background-color: #6264a7;

      // .sidebar-icon {
      //   color: white;
      // }
    }

    .content {
      height: 100%;
      flex: 14;
      display: flex;

      .content-left-fold {
        height: 100%;
        flex: 3;
      }

      .content-right-fold {
        height: 100%;
        flex: 11;
      }
    }
  }

  @media screen and (max-width: 720px) {
    .home-body {
      flex-direction: column-reverse;

      .home-sidebar {
        width: 100%;
        height: auto;
        flex: 0 0 auto;
        display: flex;
        flex-direction: row;

        .side-bar-icon {
          flex: 1;
        }
      }

      .content {
        width: 100%;
        flex: 1 1 0;

        .content-left-fold {
          display: none;
        }

        .content-right-fold {
          width: 100%;
        }
      }
    }
  }
`

export default HomeLayoutStyle
