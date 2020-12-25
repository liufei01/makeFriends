import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux' // 引入文件使用redux做准备
import { HashRouter, Route, Switch } from 'react-router-dom'
import './test/socketIO_test'

import store from './redux/store'
import Register from './containers/register/register'
import Login from './containers/login/login'
import Main from './containers/main/main'
import './assets/css/index.less'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path='/register' component={Register}></Route>
        <Route path='/login' component={Login}></Route>
        <Route component={Main}></Route>
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)
