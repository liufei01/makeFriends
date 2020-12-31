/*包含多个用于生成新的state的reducer函数的模块*/
import { combineReducers } from 'redux'

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
import { setPath } from '../utils/index'

const initUser = {
  username: '', //用户名
  type: '', //用户类型
  msg: '', //错误信息提示
  redirectTo: '' //需要自动重定向的路由路径
}
// 产生user状态的reducer
function user (state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const { type, header } = action.data
      return { ...action.data, redirectTo: setPath(type, header) }
    case ERROR_MSG:
      return { ...state, msg: action.data }
    case RECEIVE_MSG: //data是user
      return action.data
    case RESET_USER: // data是msg
      return { ...initUser, msg: action.data }

    default:
      return state
  }
}

const initUserList = []
// 产生userlist状态的reducer
function userlist (state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USERLIST:
      return action.data
    default:
      return state
  }
}

const initChat = {
  users: {}, //所有用户信息的对象
  chatMsgs: [], //当前用户所有相关msg的数组
  unReadCount: 0 //消息未读的总数量
}
//  产生聊天状态的reducer
function chatMsgList (state = initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST: //data ：{users,chaMsgs}
      const { users, chatMsgs,userId } = action.data  //reduce reduce函数是一个累加器，
      return { users, chatMsgs, unReadCount: chatMsgs.reduce((preTotal,msg)=>preTotal+(!msg.read&&msg.to===userId?1:0),0) }
    case RECEIVE_MSG_ONE: // 返回的data：chatMsg
      const {chatMsg} = action.data
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],
        unReadCount: state.unReadCount+(!chatMsg.read&&chatMsg.to===action.data.userId?1:0)
      }
    case READ_MSG:
      const {count ,from,to} = action.data
      return {
        users: state.users,
        chatMsgs: state.chatMsgs.map(msg=>{
          if (msg.from===from&&msg.to===to&&!msg.read) {  //需要更新read的状态
            return {...msg,read:true}
          }else{ // 不需要更新
            return msg
          }
        }),
        unReadCount: state.unReadCount-count
      }
    default:
      return state
  }
}
//返回合并后的reducer函数
export default combineReducers({ user, userlist, chatMsgList })
