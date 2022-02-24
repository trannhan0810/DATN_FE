import styled from '@emotion/styled'

const ClassInfoWrapper = styled.div`
  height: 100%;
  width: 100%;

  .class-summary-header {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .class-summary-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px;

    .class-summary-avatar {
      width: 120px;
      height: 120px;
      border-radius: 4px;
      box-shadow: #616161 2px 2px;
      object-fit: cover;
    }

    .class-summary-name {
      font-weight: 600;
      font-size: 2em;
    }

    .element {
      display: table;
      table-layout: fixed;
      width: 100%;
    }

    .truncate {
      display: table-cell;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
`

export default ClassInfoWrapper
