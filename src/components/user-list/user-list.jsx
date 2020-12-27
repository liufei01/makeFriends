// 显示指定用户列表的UI组件
import React, { Component } from 'react'
import PropType from 'prop-types'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import { withRouter } from 'react-router-dom'
const Header = Card.Header
const Body = Card.Body
class UserList extends React.Component {
  static propType = {
    userList: PropType.array.isRequired
  }
  render () {
    const { userlist } = this.props
    const user = {
      header: '头像1',
      username: 'dapiaol',
      waimao: '美丽',
      money: '12',
      xueii: '本科',
      detail: 'dddd'
    }

    return (
      <WingBlank style={{ marginBottom: 55, marginTop: 50 }}>
        {/* alpha left right top bottom scale scaleBig scaleX scaleY */}
        <QueueAnim type={'right'} delay={300}>
          {userlist.map(user => {
            return (
              <div key={user._id}>
                <WhiteSpace />
                <Card
                  onClick={() => this.props.history.push(`/chat/${user._id}`)}
                >
                  <Header
                    thumb={
                      require(`../../assets/images/${user.header}.png`).default
                    }
                    extra={user.username}
                  />
                  <Body>
                    {user.waimao ? <div>美貌: {user.waimao}</div> : null}
                    {user.age ? <div>年龄: {user.age}</div> : null}
                    <div>学历: {user.xueii}</div>
                    <div>月薪: {user.money}</div>
                    <div>宣言: {user.detail}</div>
                  </Body>
                </Card>
              </div>
            )
          })}
        </QueueAnim>
      </WingBlank>
    )
  }
}

export default withRouter(UserList)
