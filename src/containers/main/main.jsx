// 注册主界面m组件
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import ShuaiGeInfo from '../shuaige_info/shuaige_info'
import MeiNvInfo from '../meinv_info/meinv_info'
import Cookies from 'js-cookie' // 可以操作前端cookie的对象set()/get()/remove()
import { setPath } from '../../utils/index'
import { getUser } from '../../redux/actions'

class Main extends Component {
  constructor () {
    super()
    this.state = {}
  }
  // 生命周期函数
  componentDidMount () {
    // 曾经登录过（cookie中有userId），但是现在还没登录（reducer中有userId的数据），如果cookie中有userId，发送请求获取对应的user
    const userId = Cookies.get('userId')
    if (userId && !this.props._id) {
      // 发送异步请求，获取user
      this.props.getUser()
    }
  }
  render () {
    /**
     * 实现自动登录的条件
     * 1、componentDidMount：曾经登录过（cookie中有userId），但是现在还没登录（reducer中有userId的数据），如果cookie中有userId，发送请求获取对应的user
     * 2、render ：如果cookie中没有userid，跳转到登录页面
     * 2.1判断redux管理的user中是否有_id,如果没有，暂时不做处理
     * 2.2如果有_id 说明当前已经登录，显示对应的界面
     * 3、如果已经登录，如果请求的时根目录
     * 根据user的type和header来计算出一个重定向的路由路径，并自动重定向
     *
     */

    //  路由跳转情况1：没有userId，直接跳转到login页面
    const userId = Cookies.get('userId')
    if (!userId) {
      return <Redirect to={'/login'} />
    }
    // 路由跳转情况2：如果没有_id通过生命周期函数去请求用户信息获取用户信息实现自登陆
    // 如果有_id进根据url的地址进行跳转
    if (!this.props._id) {
      return null
    } else {
      let path = this.props.location.pathname
      if (path == '/') path = setPath(this.props.type, this.props.header)
      return (
        <div>
          <Switch>
            <Route path='/shuaigeinfo' component={ShuaiGeInfo}></Route>
            <Route path='/meinvinfo' component={MeiNvInfo}></Route>
            <Redirect to={path} />
          </Switch>
        </div>
      )
    }
  }
}

export default connect(state => state.user, { getUser })(Main)
