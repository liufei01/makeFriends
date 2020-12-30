// 注册主界面m组件
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavBar, Icon } from 'antd-mobile'
import ShuaiGeInfo from '../shuaige_info/shuaige_info'
import MeiNvInfo from '../meinv_info/meinv_info'
import MeiNv from '../meinv/meinv'
import ShuaiGe from '../shuaige/shuaige'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'
import Search from '../search/search'
import Cookies from 'js-cookie' // 可以操作前端cookie的对象set()/get()/remove()
import { setPath } from '../../utils/index'
import { getUser } from '../../redux/actions'

class Main extends Component {
  constructor () {
    super()
    this.state = {}
  }
  // 给组件对象添加属性
  navList = [
    //包含所有导航组件的相关属性信息
    {
      path: '/shuaige', // 路由路径
      component: ShuaiGe,
      title: '美女列表',
      icon: 'meinv',
      text: '美女'
    },
    {
      path: '/meinv', // 路由路径
      component: MeiNv,
      title: '帅哥列表',
      icon: 'shuaige',
      text: '帅哥'
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息'
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人'
    }
  ]
  // 生命周期函数
  componentDidMount () {
    // 曾经登录过（cookie中有userId），但是现在还没登录（reducer中有userId的数据），如果cookie中有userId，发送请求获取对应的user
    const userId = Cookies.get('userId')

    if (userId && !this.props.user._id) {
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
    const { unReadCount } = this.props
    if (!userId) {
      return <Redirect to={'/login'} />
    }
    // 路由跳转情况2：如果没有_id通过生命周期函数去请求用户信息获取用户信息实现自登陆
    // 如果有_id进根据url的地址进行跳转
    if (!this.props.user._id) {
      return null
    } else {
      let path = this.props.location.pathname
      if (path == '/')
        path = setPath(this.props.user.type, this.props.user.header)

      const { navList } = this
      const routePath = this.props.location.pathname
      const currentNav = navList.find(nav => nav.path === routePath) //得到当前的nav，可能没有
      // 处理底部导航的显示和隐藏
      if (currentNav) {
        if (this.props.user.type == 'meinv') {
          this.navList[0].hide = true
        } else {
          this.navList[1].hide = true
        }
      }
      return (
        <div>
          {currentNav ? (
            currentNav.path === '/personal' ? (
              <NavBar
                className='sticky-header'
                rightContent={[<Icon key='1' type='ellipsis' />]}
              >
                {currentNav.title}
              </NavBar>
            ) : (
              <NavBar
                className='sticky-header'
                rightContent={[
                  <Icon
                    key='0'
                    type='search'
                    style={{ marginRight: '16px' }}
                    onClick={()=>this.props.history.push(`/search`)}
                  />,
                  <Icon key='1' type='ellipsis' />
                ]}
              >
                {currentNav.title}
              </NavBar>
            )
          ) : null}

          <Switch>
            {navList.map(nav => (
              <Route
                path={nav.path}
                component={nav.component}
                key={nav.path}
              ></Route>
            ))}
            <Route path='/shuaigeinfo' component={ShuaiGeInfo}></Route>
            <Route path='/meinvinfo' component={MeiNvInfo}></Route>
            <Route path='/search' component={Search}></Route>
            <Route path='/chat/:userId' component={Chat}></Route>
            <Route path='/notfound' component={NotFound}></Route>
            <Redirect to={path} />
          </Switch>
          {currentNav ? (
            <NavFooter navList={navList} unReadCount={unReadCount}></NavFooter>
          ) : null}
        </div>
      )
    }
  }
}

export default connect(
  state => ({ user: state.user, unReadCount: state.chatMsgList.unReadCount }),
  { getUser }
)(Main)
