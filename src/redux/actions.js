// 包含多个action creator 异步action 同步action
import { reqRegister, reqLogin } from '../api/index'

import { AUTH_SUCCESS, ERROR_MSG } from './action-types'

// 每一个action_types都对应一个同步action

// 授权成功的action
const authSuccess=(user)=>({
  type:AUTH_SUCCESS,data:user
})

// 授权失败的action
const errorMsg=(msg)=>({
  type:ERROR_MSG,data:msg
})
// 注册异步action
export const register = (user) => {
  const {username ,password,password2,type}=user
  // 表单验证
  if (password!=password2) {
    return errorMsg('2次密码保持一致')
  }
  return async dispatch => {
    // 发送注册的异步ajax请求
    const response = await reqRegister({username ,password,type})
    if (!response) {
      return
    }
    const res = response.data
    if (res.code == 0) {
      //分发成功的同步action
      dispatch(authSuccess(res.data))
    } else {
      //分发失败的同步action
      dispatch(errorMsg(res.data))
    }
  }
}

// 登录异步action
export const login = (user) => {
  return async dispatch => {
    // 发送注册的异步ajax请求
    const res = await reqLogin(user)
    const data = res.data
    if (data.code == 0) {
      //分发成功的同步action
      dispatch(authSuccess(res.data))
    } else {
      //分发失败的同步action
      dispatch(errorMsg(res.data))
    }
  }
}
