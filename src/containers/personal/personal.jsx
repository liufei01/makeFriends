/*用户个人中心路由组件*/
import React from 'react'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { reserMsg } from '../../redux/actions'
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief
class Personal extends React.Component {
  handleLogout = () => {
    Modal.alert('退出', '确认退出登录吗?', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确认',
        onPress: () => {
          //清除cookie中的userId
          Cookies.remove('userId')
          //重置redux中的user状态
          this.props.reserMsg()
        }
      }
    ])
  }

  render () {
    const { username, age, xueii, money, header, detail, type } = this.props
    return (
      <div style={{marginBottom:55,marginTop:50}}>
        <Result
          img={
            <img
              src={require(`../../assets/images/${header}.png`).default}
              style={{ width: 50 }}
              alt='header'
            />
          }
          title={username}
          message={type === 'meinv' ? '美女' : '帅哥'}
        />
        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            <Brief>年龄: {age}</Brief>
            <Brief>薪资: {money}</Brief>
            <Brief>学历: {xueii}</Brief>
            <Brief>交友宣言: {detail}</Brief>
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Button type='warning' onClick={this.handleLogout}>
            退出登录
          </Button>
        </List>
      </div>
    )
  }
}

export default connect(state => state.user, { reserMsg })(Personal)
