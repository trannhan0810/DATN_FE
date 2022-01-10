import styled from '@emotion/styled'
import { Modal } from 'antd'

export const ModalWrapper = styled(Modal)`
  ${'' /* max-height: 90%; */}
  min-height: 30%;
  border-radius: 8px;
  overflow: hidden;

  .drawerContainer {
    display: flex;
    flex-direction: column;
    padding: 14px 0;
    ${'' /* min-height: calc(100vh - 60px); */}
  }
  .content {
    flex: 1;
    overflow-y: auto;
  }

  .ant-modal-content {
    border-radius: 8px;
    overflow: hidden;

    .ant-modal-body {
      background: #fff;

      .w-100 {
        width: 100%;
      }

      .modalTitleContent {
        background: '#ffa500';
      }

      .content-form {
        padding-bottom: 14px;
      }
    }
  }

  .ant-drawer-content-wrapper {
    min-width: 450px;
    .ant-drawer-body {
      padding: 0px;
      padding-top: 60px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .content {
        flex: 1;
        height: calc(100vh - 120px);
        overflow-y: auto;
      }
    }
    .ant-form {
    }
    .content-form {
      padding: 10px 24px;
      flex: 1;
    }
  }
  .ant-modal-header {
    background: '#fff';
    border-bottom: 1px solid #f4f7f9;
    color: '#ffa500';
  }
  .ant-modal-content {
    background: '#f4f7f9';
    padding-top: 60px;
  }
  .ant-modal-title {
    color: '#ffa500';
    font-size: 35px;
  }
  ${
    '' /* .ant-modal-close,
  .ant-modal-close-icon {
    display: none;
  } */
  }
  .ant-input,
  .ant-select-selection,
  .ant-input-number,
  .ant-select-dropdown-menu-item,
  .ant-select-dropdown-menu,
  .ant-select-dropdown,
  .ant-select-clear-icon,
  .ant-select-selector,
  .ant-select-dropdown-menu-vertical {
    background: '#fff' !important;
    border: 1px solid #e2e3e5;
    &:hover,
    &:focus,
    &:active {
      border: 1px solid #e2e3e5;
    }
  }
  textarea {
    background: '#fff';
    border: 1px solid #e2e3e5;
    &:hover,
    &:focus,
    &:active {
      border: 1px solid #e2e3e5;
    }
  }
  .ant-select-selection__clear {
    background-color: transparent;
    color: white;
    border-radius: 5px;
  }
  .ant-select-arrow-icon {
    background-color: transparent;
  }
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .ant-modal-footer {
    border-top: 1px solid '#f4f7f9';
  }

  .ant-modal-body {
    padding: 10px 24px;
  }

  .ant-tabs-bar {
    font-weight: 500;
  }
  .ant-tabs-nav {
    .ant-tabs-tab {
      padding-bottom: 5px;
    }
  }
  .ant-tabs-tab {
    font-family: Roboto;
    color: '#7f817c';
  }
  .ant-list {
    margin-top: 20px;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 460px;
  }
  div::-webkit-scrollbar-thumb {
    border-radius: 3px !important;
    background: '#b7b6c2' !important;
  }
  div::-webkit-scrollbar-track {
    position: absolute;
    border-radius: 3px !important;
    background: '#f0f3fa' !important;
  }
  div::-webkit-scrollbar-thumb:hover {
    border-radius: 3px !important;
    background: '#b7b6c2' !important;
  }
  div::-webkit-scrollbar {
    width: 6px;
    border-radius: 3px !important;
    background: '#b7b6c2' !important;
  }
  .ant-list-split .ant-list-item {
    border-bottom: none;
    padding: 1px 0px;
  }
  .ant-list-empty-text {
    color: '#969696';
  }
  .modalTitleContent {
    background: '#F6F6F6';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    display: flex;
    border-bottom: 1px solid #e2e3e5;
    .modalBtnBack {
      margin: 0px 24px;
      color: '#91938e';
    }
    .modalTitle {
      flex: 1;
      font-size: 20px;
      text-align: center;
      color: '#0f100d';
    }
  }

  .ant-form-item {
  }
  .ant-form-item-control {
    line-height: 2;
  }
  .txtTitle {
    font-size: 12px;
  }
  .ant-form-item-label {
    line-height: 1.5em;
    padding-bottom: 5px;
  }
  .ant-input-number {
    width: 100%;
  }
  .txtTitleForm {
    color: '#1f2933';
    font-size: 12px;
  }
`
