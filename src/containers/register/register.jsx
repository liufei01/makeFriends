// 注册路由组件
import React, { Component } from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile'
import { connect } from 'react-redux'
import Logo from '../../components/logo/logo'
import { register } from '../../redux/actions'
import { Redirect } from 'react-router-dom'  //路由重定向跳转
class Register extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      password2: '',
      type: 'shuaige'
    }
  }
  render () {
    // const { type } = this.state
    const {msg,redirectTo}=this.props
    if (redirectTo) {
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <NavBar>快乐交友</NavBar>
        <Logo />
        <WingBlank>
          <List>
            {msg? <div className='error-msg'>{msg}</div>:null}
            <WhiteSpace />
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
            <InputItem
              type='password'
              placeholder='输入确认密码'
              onChange={val => this.handleChange('password2', val)}
            >
              确认密码:
            </InputItem>
            <WhiteSpace />
            <List.Item>
              <span style={{ marginRight: 30 }}>用户类型:</span>
              <Radio
                checked={this.state.type === 'shuaige'}
                onClick={() => {
                  this.handleChange('type', 'shuaige')
                }}
              >
                帅哥
              </Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio
                checked={this.state.type === 'meinv'}
                onClick={() => {
                  this.handleChange('type', 'meinv')
                }}
              >
                美女
              </Radio>
            </List.Item>
            <WhiteSpace />
            <Button type='primary' onClick={this.register}>
              注&nbsp;&nbsp;&nbsp;册
            </Button>
            <WhiteSpace />
            <Button type='ghost' onClick={this.toLogin}>
              已经有账号
            </Button>
          </List>
        </WingBlank>
      </div>
    )
  }

  // 进行数据双向绑定
  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  // 跳转到登录页面
  toLogin = () => {
    this.props.history.replace('./login')
  }
  // 注册成功
  register = () => {
    this.props.register(this.state)
  }
}

export default connect(state => state.user, { register })(Register)
