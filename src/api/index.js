// 封装了很多接口请求的函数模块
// 注册接口
import ajax from './ajax'
export const reqRegister=(user)=>ajax('/api/register',user,'POST')

// 登录接口
export const reqLogin=({username,password})=>ajax('/api/login',{username,password},"POST")

// 更新用户接口
export const reqUpdataUser=(user)=>ajax('/api/update',user,'POST')

// 获取用户信息
export const reqUser=()=>ajax('/api/user')

// 获取用户列表
export const reqUserList=(type)=>ajax('/api/userlist',{type:type},"POST")

// 获取当前用户的聊天消息列表
export const reqChatMsgList=()=>ajax('/api/msglist')

// 修改指定消息为已读
export const reqReadMsg=(from)=>ajax('/api/readmsg',{from},"POST")

// 按需搜索用户
export const reqSearchPeo=({type,xueliArrays})=>ajax('/api/searchPeopel',{type,xueliArrays},"POST")