/*包含多个用于生成新的state的reducer函数的模块*/
import { combineReducers } from 'redux'

import {AUTH_SUCCESS,ERROR_MSG} from './action-types'

const initUser={
  username:'',  //用户名
  type:'', //用户类型
  msg:'',  //错误信息提示
  redirectTo:'' //需要自动重定向的路由路径 
}
// 产生user状态的reducer
function user(state=initUser,action) { 
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...action.data,redirectTo:'/'}
    case ERROR_MSG:
      return {...state,msg:action.data}
  
    default:
      return state;
  }
 }

//返回合并后的reducer函数
export default combineReducers({ user })
