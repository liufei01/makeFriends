// 包含多个action creator 异步action 同步action
import { reqRegister, reqLogin,reqUpdataUser,reqUser } from '../api/index'

import { AUTH_SUCCESS, ERROR_MSG,RECEIVE_MSG,RESET_USER } from './action-types'

// 每一个action_types都对应一个同步action

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
    if (res.code == 0) {
      //分发成功的同步action
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
    if (res.code == 0) {
      //分发成功的同步action
      dispatch(authSuccess(res.data))
    } else {
      //分发失败的同步action
      dispatch(errorMsg(res.msg))
    }
  }
}

// 更新用户action
export const updateUser=(user)=>{
  return async dispath=>{
    const response= await reqUpdataUser(user)
    const res=response.data
    if (res.code==0) {
      // 分发成功的同步action
      dispath(receiveMsg(res.data))
    }else{
      // 分发失败的同步action
      dispath(reserMsg(res.msg))
    }
  }
}

// 获取用户的action
export const getUser=()=>{
  return async dispath=>{
    const response=await reqUser()
    const res=response.data
    if(res.code==0) {
      // 分发成功的同步
      dispath(receiveMsg(res.data))
    }else{
      dispath(reserMsg(res.msg))
    }
  }
}
