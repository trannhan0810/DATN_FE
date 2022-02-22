import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConfigProvider, Empty } from 'antd'
import viVN from 'antd/lib/locale/vi_VN'
import { ClearCacheProvider } from 'react-clear-cache'
import App from './App'
import GlobalStyle from './GlobalStyle'
import reportWebVitals from './reportWebVitals'
import { formConfig } from './configs/constants'
import 'antd/dist/antd.less'
import store from './store'

ReactDOM.render(
  <>
    <GlobalStyle />
    <ConfigProvider renderEmpty={() => <Empty />} form={formConfig} locale={viVN}>
      <Provider store={store}>
        <ClearCacheProvider duration={5000}>
          <App />
        </ClearCacheProvider>
      </Provider>
    </ConfigProvider>
  </>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
