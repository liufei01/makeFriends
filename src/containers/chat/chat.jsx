/*消息列表路由组件*/
import React from 'react'
import { connect } from 'react-redux'
import { NavBar, List, InputItem } from 'antd-mobile'
const Item = List.Item
export default class Chat extends React.Component {
  render () {
    return (
      <div id='chat-page'>
        <NavBar>aa</NavBar>
        <List>
          <Item thumb={require('../../assets/images/头像1.png').default}>你好</Item>
          <Item thumb={require('../../assets/images/头像1.png').default}>你好2</Item>
          <Item className='chat-me' extra='我'>
            很好
          </Item>
          <Item className='chat-me' extra='我'>
            很好2
          </Item>
        </List>
        <div className='am-tab-bar'>
          <InputItem placeholder='请输入' extra={<span>发送</span>} />
        </div>
      </div>
    )
  }
}
