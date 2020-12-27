// 包含多个action creator 异步action 同步action
import io from 'socket.io-client'
import {
  reqRegister,
  reqLogin,
  reqUpdataUser,
  reqUser,
  reqUserList,
  reqChatMsgList,
  reqReadMsg
} from '../api/index'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_MSG,
  RESET_USER,
  RECEIVE_USERLIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG_ONE,
  READ_MSG
} from './action-types'

// 每一个action_types都对应一个同步action
/**
 * 单例对象
 * 1、创建对象之前，判断对象是否已经创建，只有没创建才会创建
 * 2、创建对象之后，保存对象
 */
// 把socket封装成函数
function initIO (dispatch,userId) {
  if (!io.socket) {
    //连接服务器,得到代表连接的socket对象
    io.socket = io('ws://localhost:3000')
    //绑定'receiveMessage'的监听,来接收服务器发送的消息
    io.socket.on('receiveMsg', function (chatMsg) {
      console.log('浏览器端接收到消息:', chatMsg)
      // 只有当chatMsg是当前用户相关的消息，才去分发同步action保存消息
      if (userId === chatMsg.from || userId === chatMsg.to) {
        dispatch(receiveMsgOne({chatMsg,userId}))
      }
    })
  }
}

// 异步获取消息列表数据
async function getMsgList (dispatch,userId) {
  initIO(dispatch,userId)
  const responsent = await reqChatMsgList()
  const res = responsent.data
  if (res.code === 0) {
    const { users, chatMsgs } = res.data
    // 分发同步action
    dispatch(chat({ users, chatMsgs,userId }))
  }
}

// 授权成功的action
const authSuccess = user => ({
  type: AUTH_SUCCESS,
  data: user
})

// 授权失败的action
const errorMsg = msg => ({
  type: ERROR_MSG,
  data: msg
})
// 接收用户的同步action
const receiveMsg = user => ({
  type: RECEIVE_MSG,
  data: user
})
// 重置用户的同步action
export const reserMsg = msg => ({
  type: RESET_USER,
  data: msg
})
// 接收用户列表的同步action
export const receiveUserList = userlist => ({
  type: RECEIVE_USERLIST,
  data: userlist
})
// 接收消息列表的同步action
const chat = ({ users, chatMsgs ,userId}) => ({
  type: RECEIVE_MSG_LIST,
  data: { users, chatMsgs,userId }
})
// 接收一个消息同步action
const receiveMsgOne = ({chatMsg,userId}) => ({
  type: RECEIVE_MSG_ONE,
  data: {chatMsg,userId}
})
// 读取某个聊天消息同步action
const readMsgs = ({count,from,to}) => ({
  type: READ_MSG,
  data: {count,from,to}
})
// 注册异步action
export const register = ({ username, password, password2, type }) => {
  // 进行前台表单验证, 如果不合法返回一个同步 action 对象, 显示提示信息
  if (!username || !password || !type) {
    return errorMsg('用户名密码必须输入')
  }
  if (password !== password2) {
    return errorMsg('密码和确认密码不同')
  }

  return async dispatch => {
    // 发送注册的异步ajax请求
    const response = await reqRegister({ username, password, type })
    const res = response.data
    if (res.code === 0) {
      //分发成功的同步action
      getMsgList(dispatch,res.data._id) // 注册成功即登录成功的时候获取消息列表
      dispatch(authSuccess(res.data))
    } else {
      //分发失败的同步action
      dispatch(errorMsg(res.msg))
    }
  }
}

// 登录异步action
export const login = ({ username, password }) => {
  if (!username || !password) {
    return errorMsg('用户密码必须输入')
  }
  return async dispatch => {
    // 发送注册的异步ajax请求
    const response = await reqLogin({ username, password })
    const res = response.data
    if (res.code === 0) {
      //分发成功的同步action
      getMsgList(dispatch,res.data._id) // 登录成功的时候获取消息列表
      dispatch(authSuccess(res.data))
    } else {
      //分发失败的同步action
      dispatch(errorMsg(res.msg))
    }
  }
}

// 更新用户action
export const updateUser = user => {
  return async dispatch => {
    const response = await reqUpdataUser(user)
    const res = response.data
    if (res.code === 0) {
      // 分发成功的同步action
      dispatch(receiveMsg(res.data))
    } else {
      // 分发失败的同步action
      dispatch(reserMsg(res.msg))
    }
  }
}

// 获取用户的action
export const getUser = () => {
  return async dispatch => {
    const response = await reqUser()
    const res = response.data
    if (res.code === 0) {
      // 分发成功的同步
      getMsgList(dispatch,res.data._id) // 获取用户列表说明已经登录成功的时候获取消息列表
      dispatch(receiveMsg(res.data))
    } else {
      dispatch(reserMsg(res.msg))
    }
  }
}
// 获取用户列表的action
export const getUserList = type => {
  return async dispatch => {
    const response = await reqUserList(type)
    const res = response.data
    if (res.code === 0) {
      // 分发成功的同步
      dispatch(receiveUserList(res.data))
    }
  }
}
// 发送消息的异步action
export const sendMsg = ({ from, to, content }) => {
  return dispatch => {
    console.log('客发服务发送消息', from, to, content)
    io.socket.emit('sendMsg', { from, to, content })
  }
}
// 读取消息的异步action
export const readMsg = (from,to) => {
  return async dispatch => {
    const response = await reqReadMsg(from)
    const res = response.data
    if (res.code === 0) {
      // 分发成功的同步action
      const count = res.data
      dispatch(readMsgs({count,from,to}))
    }
  }
}
