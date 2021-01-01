// 封装了很多接口请求的函数模块
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

// 获取当前用户的聊天消息列表
export const reqChatMsgList=()=>ajax('/msglist')

// 修改指定消息为已读
export const reqReadMsg=(from)=>ajax('/readmsg',{from},"POST")

// 按需搜索用户
export const reqSearchPeo=({type,xueliArrays})=>ajax('/searchPeopel',{type,xueliArrays},"POST")