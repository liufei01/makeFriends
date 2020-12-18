// 工具函数
// 处理登录成功之后跳转的页面
/** 根据type类型
 * 跳转1、帅哥跳转帅哥主页面
 * 跳转2、美女跳转美女主页面
 * 根据header
 * 跳转3、有header跳转进响应页面
 * 跳转4、无header 跳转信息完善页面
 *
 */
// 四种路由情况

export function setPath (type, header) {
  let path
  if (type === 'shuaige') {
    path= '/shuaige'
  } else {
    path= '/meinv'
  }

  if (!header) {
    path=path + 'info'
  }

  return path
}
