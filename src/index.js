import '@babel/polyfill'
// import 'core-js/stable'
// import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import store from './store'
import NavCom from './components/NavCom'
import RouterConfig from './router'
import './index.less'

const baseURL = {
	dev: 'http://localhost:3000',
	test: 'http://test.ever.com',
	prod: 'http://ever.com'
}[process.env.MODE]
console.log(baseURL)

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <Provider store={store}>
      <Router>
        <NavCom />
        <RouterConfig></RouterConfig>
      </Router>
    </Provider>
  </LocaleProvider>,
  document.getElementById('app')
)
