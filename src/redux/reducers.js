/*包含多个用于生成新的state的reducer函数的模块*/
import { combineReducers } from 'redux'

import { AUTH_SUCCESS, ERROR_MSG,RECEIVE_MSG,RESET_USER } from './action-types'
import {setPath} from '../utils/index'

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
      const {type,header}=action.data
      return { ...action.data, redirectTo: setPath(type,header) }
    case ERROR_MSG:
      return { ...state, msg: action.data }
    case RECEIVE_MSG:  //data是user
      return action.data
    case RESET_USER:  // data是msg
      return { ...initUser, msg: action.data }

    default:
      return state
  }
}

//返回合并后的reducer函数
export default combineReducers({ user })
