import styled from '@emotion/styled'

const ClassInfoLayoutWrapper = styled.div`
  width: 100%;
  padding: 0px 24px 0px 24px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;

  .rightFold-heading {
    flex: 0 0 90px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid lightgray;
    padding: 0px;

    .rightFold-heading-left {
      height: 100%;
      display: flex;
      flex-direction: column;

      .rightFold-class-name {
        display: flex;
        align-items: center;
        flex: 0 0 60px;
        font-size: 30px;
        font-weight: 600;
      }

      .rightFold-nav {
        flex: 0 0 30px;
        margin-left: -20px;
        display: flex;
        flex-direction: row;
      }

      .rightFold-nav-item {
        margin-left: 20px;
        font-size: 18px;
        font-weight: 400;
        display: flex;
        align-items: center;
      }

      .active {
        border-bottom: 4px solid #6264a7;
      }
    }

    .rightFold-heading-right {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }

  .class-messenger {
    flex: 1 1 0px;
  }
`

export default ClassInfoLayoutWrapper
