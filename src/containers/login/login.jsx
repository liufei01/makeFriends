// 用户登录页面
import React, { Component } from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile'
import Logo from '../../components/logo/logo'
export default class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  // 处理输入框/单选框变化, 收集数据到 state
  handleChange = (name, value) => {
    this.setState({ [name]: value })
  }
  // 跳转到注册路由
  toRegister = () => {
    this.props.history.replace('/register')
  }
  // 注册
  login = () => {
    console.log(this.state)
  }
  render () {
    return (
      <div>
        <NavBar>快乐交友</NavBar>
        <Logo />
        <WingBlank>
          <List>
            <InputItem
              placeholder='输入用户名'
              onChange={val => this.handleChange('username', val)}
            >
              用户名:
            </InputItem>
            <WhiteSpace />
            <InputItem
              type='password'
              placeholder='输入密码'
              onChange={val => this.handleChange('password', val)}
            >
              密&nbsp;&nbsp;&nbsp;码:
            </InputItem>
            <WhiteSpace />
            <Button type='primary' onClick={this.login}>
              登&nbsp;&nbsp;&nbsp;陆
            </Button>
            <WhiteSpace />
            <Button onClick={this.toRegister}>还没有账号</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}
