import styled from '@emotion/styled'

const HomeLayoutStyle = styled.div`
  .home-body {
    display: flex;
    width: 100%;
    flex: 1;
    height: 94%;
  }
  .home-container {
    width: 100%;
    height: 100vh;
  }

  .home-sidebar {
    display: flex;
    flex: 1;
  }

  .home-leftFold {
    display: flex;
    flex: 3;
  }

  .home-rightFold {
    display: flex;
    flex: 11;
  }

  .content {
    display: flex;
    flex: 14;
  }
`

export default HomeLayoutStyle
