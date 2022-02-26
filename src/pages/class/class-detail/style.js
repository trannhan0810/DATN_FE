import styled from '@emotion/styled'

const ClassInfoLayoutWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;

  .rightFold-header {
    flex: 0 0 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .rightFold-class-name {
      display: flex;
      align-items: center;
      flex: 1 1 0px;
      font-size: 30px;
      font-weight: 600;
    }
  }

  .rightFold-content {
    flex: 1 1 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid lightgray;
    padding: 0px;

    > .ant-tabs .ant-tabs-content-holder .ant-tabs-content {
      flex: 1;
      height: 100%;
    }
  }

  .class-content {
    flex: 1 1 0px;
    height: 100%;
    width: 100%;
  }
`

const ClassInfoHeader = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .rightFold-class-name {
    display: flex;
    align-items: center;
    flex: 1 1 0px;
    font-size: 30px;
    font-weight: 600;
  }
`

export default ClassInfoLayoutWrapper
export { ClassInfoHeader }
