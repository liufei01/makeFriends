// 注册主界面m组件
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ShuaiGeInfo from '../shuaige_info/shuaige_info'
import MeiNvInfo from '../meinv_info/meinv_info'
export default class Main extends Component {
  constructor () {
    super()
    this.state = {}
  }
  render () {
    return (
      <div>
        <Switch>
          <Route path='/shuaigeinfo' component={ShuaiGeInfo}></Route>
          <Route path='/meinvinfo' component={MeiNvInfo}></Route>
        </Switch>
      </div>
    )
  }
}
