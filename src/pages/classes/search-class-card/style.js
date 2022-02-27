import styled from '@emotion/styled'

const ClassListCardWrapper = styled.div`
  height: 100%;
  width: 100%;

  .class-list-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px 0px;

    .class-list-container {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
`

const ClassListItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  cursor: pointer;

  &:hover {
    background-color: white;
  }

  .class-list-item-avatar {
    flex: 0 0 auto;
    display: flex;
  }
  .class-list-item-name {
    flex: 1 1 0px;
    display: flex;
    font-size: 18px;
    margin: 0px 4px;
  }
  .class-list-item-menu {
    flex: 0 0 auto;
    display: flex;
  }
`

export default ClassListCardWrapper
export { ClassListItem }
