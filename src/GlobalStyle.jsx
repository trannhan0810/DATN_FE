/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Global, css } from '@emotion/react'
import emotionNormalize from 'emotion-normalize'
import { CLASS_UTILITY } from './shared/utils/css'

const GlobalStyle = props => {
  return (
    <Global
      {...props}
      styles={css`
        ${emotionNormalize}
        ${CLASS_UTILITY}
        :root {
          --primary-color: #152d79;
          --mix-primary-color: #03658c;
          --font: 'Roboto', 'HelveticaNeue', 'Helvetica Neue', sans-serif;
          --subtitle: #9fa2aa;
          --white-color: #fff;
          --black-color: #000;
          --success-color: #3db670;
          --secondary-color: #4b9bff;
          --yellow-color: #ffd76e;
          --warning-color: #e92b2c;
        }
        html {
          font-family: sans-serif;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }
        body {
          margin: 0;
          font-family: var(--font);
        }

        .t-400-25px-34px {
          font: normal 400 25px/34px var(--font);
        }
        .t-400-18px-22px {
          font: normal 400 18px/22px var(--font);
        }
        .t-500-12px-20px {
          font: normal 500 12px/20px var(--font);
        }
        .t-500-18px-20px {
          font: normal 500 18px/20px var(--font);
        }
        .t-600-28px-38px {
          font: normal 600 28px/38px var(--font);
        }

        .c-darkgrayishblue {
          color: var(--subtitle);
        }
        .c-black {
          color: var(--black-color);
        }
        .c-secondary-blue {
          color: var(--secondary-color);
        }
        .c-primary {
          color: var(--primary-color);
        }
        .c-yellow {
          color: var(--yellow-color);
        }
        .c-warning {
          color: var(--warning-color);
        }
        .c-success {
          color: var(--success-color);
        }
        .card-wrapper {
          /* width: 306px;
          height: 134px; */
          border-radius: 6px;
          margin: 0 30px 25px 30px;
        }
        .border-bt {
          border-bottom: 3px solid black;
          width: 126px;
        }
        // Override antd
        .ant-btn {
          border-radius: 8px !important;
        }
        .ant-input {
          border-radius: 8px !important;
        }
        .ant-pro-sider {
          && {
            background-color: var(--primary-color);
            border: 1px solid #f0f3fa;
            flex: 0 0 225px !important;
            max-width: 50px !important;
            min-width: 50px !important;
          }
        }
        .ant-pro-sider .ant-menu {
          padding-top: 96px;
        }
        .ant-pro-menu-item {
          font-weight: 700;
          font-size: 14px;
          line-height: 22px;
        }
        .ant-menu-dark.ant-menu-inline .ant-menu-item {
          height: 56px;
          display: flex;
          padding-top: 10px;
        }
        .ant-menu-item-selected {
          background-color: var(--mix-primary-color) !important;
          border-left: 3px solid white !important;
        }
        .ant-form-inline .ant-form-item {
          margin-bottom: 15px !important;
        }
        .ant-radio-group {
          margin-left: 30px;
        }
        .ant-input-affix-wrapper {
          border-radius: 8px;
        }
        // Antd Modal
        .ant-modal-header {
          background-color: rgba(255, 165, 0, 0.376);
          text-align: center;
        }
      `}
    />
  )
}

export default GlobalStyle
