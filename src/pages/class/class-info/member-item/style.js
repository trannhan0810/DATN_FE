import styled from '@emotion/styled'

const MemberItemWrapper = styled.div`
  .item-avatar {
    height: 32px;
  }

  .dialer-item {
    display: flex;
    width: 100%;
    flex: 1;
    padding: 6px 0px;
  }

  .item-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 8px;
    overflow: hidden;
  }

  .item-icons {
    display: flex;
  }

  .item-title {
    font-weight: 500;
  }

  .item-subtitle {
    font-size: 12px;
    color: #616161;
  }

  .item-icon {
    font-size: 16px;
  }
`
export default MemberItemWrapper