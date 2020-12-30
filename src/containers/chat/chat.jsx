/*消息列表路由组件*/
import React from 'react'
import { connect } from 'react-redux'
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import { sendMsg, readMsg } from '../../redux/actions'
const Item = List.Item
class Chat extends React.Component {
  state = {
    content: '',
    isShow: false //是否显示表情列表
  }
  // 第一次render之前的回调
  componentWillMount () {
    this.emojis = [
      '😶',
      '😪',
      '😔',
      '😎',
      '😲',
      '😳',
      '❤',
      '😰',
      '😈',
      '👿',
      '💀',
      '💋',
      '👋',
      '👌',
      '👆',
      '👈',
      '👉',
      '👇',
      '👍',
      '👊',
      '👀',
      '💪',
      '👦',
      '👧',
      '🎅',
      '🏃',
      '🌂',
      '👣',
      '👙',
      '👠',
      '💄',
      '🎒',
      '👓',
      '☂️',
      '👯',
      '👕',
      '👰',
      '👮',
      '🙋',
      '👴',
      '🙌',
      '👏'
    ]
    this.emojis = this.emojis.map(value => ({ text: value }))
    // console.log(this.emojis)
  }

  // 保证列表自动滑动到底部
  componentDidMount () {
    // 初始化显示列表
    window.scrollTo(0, 1000)
    // 发送请求更新消息的未读状态
    // const readId = this.props.match.params.userId //接收消息的用户id
    // const userId = this.props.user._id // 自己的id
    // this.props.readMsg(readId, userId)
  }
  componentWillUnmount () {
    const readId = this.props.match.params.userId //接收消息的用户id
    const userId = this.props.user._id // 自己的id
    this.props.readMsg(readId, userId)
  }

  componentDidUpdate () {
    // 更新显示列表
    window.scrollTo(0, 1000000)
  }

  render () {
    const { user } = this.props
    // 我自己的头像
    const myIcon = user.header
      ? require(`../../assets/images/${user.header}.png`).default
      : null
    const { users, chatMsgs } = this.props.chat
    // 计算当期聊天的chatId
    const meId = user._id
    if (!users[meId]) {
      //如果没有获取到数据，直接什么显示都不展示
      return null
    }
    const targetId = this.props.match.params.userId
    const chatId = [meId, targetId].sort().join('_') //生成当前聊天的chat_id  然后和后台保存的chat_id进行比较，过滤用户
    // 展示当前用户的消息 需要对chatMsgs进行过滤
    // console.log('this.props.chat',this.props.chat);
    const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)
    // console.log('msgs',msgs);

    // 得到目标对象的头像
    const { header, username } = users[targetId]
    const targetIcon = header
      ? require(`../../assets/images/${header}.png`).default
      : null
    return (
      <div id='chat-page'>
        <NavBar
          icon={<Icon type='left'></Icon>}
          className='sticky-header'
          onLeftClick={() => this.props.history.goBack()}
        >
          {username}
        </NavBar>
        <List style={{ marginTop: 50, marginBottom: 50 }}>
          {/* alpha left right top bottom scale scaleBig scaleX scaleY */}
          <QueueAnim type={'top'} delay={249}>
            {msgs.map(msg => {
              if (meId === msg.to) {
                // 别人发给我的
                return (
                  <Item className='otherPeo' thumb={targetIcon} key={msg._id} wrap={true} multipleLine={true}>
                    <span>{msg.content}</span>
                  </Item>
                )
              } else {
                // 我发给别人的
                return (
                  <Item className='chat-me clearfix' thumb={myIcon} key={msg._id} wrap={true} multipleLine={true}>
                    <span>{msg.content}</span>
                  </Item>
                )
              }
            })}
          </QueueAnim>
        </List>
        <div className='am-tab-bar'>
          <InputItem
            placeholder='请输入'
            value={this.state.content}
            onFocus={() => {
              this.setState({ isShow: false })
            }}
            onChange={val => {
              this.setState({ content: val })
            }}
            extra={
              <span>
                <span
                  onClick={() => this.toggleShow()}
                  style={{ marginRight: 10 }}
                >
                  😉
                </span>
                <span onClick={() => this.send()}>发送</span>
              </span>
            }
          />
          {this.state.isShow ? (
            <Grid
              data={this.emojis}
              columnNum={8}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={item => {
                this.setState({ content: this.state.content + item.text })
              }}
            />
          ) : null}
        </div>
      </div>
    )
  }
  // 点击发送消息
  send = () => {
    const from = this.props.user._id
    const to = this.props.match.params.userId
    const content = this.state.content.trim()
    if (content) {
      this.props.sendMsg({ from, to, content })
      this.setState({ content: '' })
    }
  }
  // 点击显示表情列表
  toggleShow = () => {
    const isShow = !this.state.isShow
    this.setState({ isShow })
    if (isShow) {
      // 异步手动触发resize事件，解决表情列表显示的bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  }
}

export default connect(
  state => ({ user: state.user, chat: state.chatMsgList }), //这里的值就是reducers.js分发出来的
  { sendMsg, readMsg }
)(Chat)
