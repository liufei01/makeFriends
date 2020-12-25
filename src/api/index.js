// 包含了很多接口请求的函数模块
// 注册接口
import ajax from './ajax'
export const reqRegister=(user)=>ajax('/register',user,'POST')

// 登录接口
export const reqLogin=({username,password})=>ajax('/login',{username,password},"POST")

// 更新用户接口
export const reqUpdataUser=(user)=>ajax('/update',user,'POST')

// 获取用户信息
export const reqUser=()=>ajax('/user')

// 获取用户列表
export const reqUserList=(type)=>ajax('/userlist',{type:type},"POST")