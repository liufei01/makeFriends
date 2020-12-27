/**
 * 底部导航列表
 */
import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom' //希望在非路由组件中使用路由库的API

const Item = TabBar.Item

class Navfooter extends Component {
  static propTypes = {
    navList: PropTypes.array.isRequired,
    unReadCount: PropTypes.number.isRequired
  }
  render () {
    let { navList ,unReadCount} = this.props
    // 过滤hide为true的nav
    navList=navList.filter(nav=>!nav.hide)
    const path = this.props.location.pathname
    return (
      <TabBar>
        {navList.map(nav => (
          <Item
            key={nav.path}
            badge={nav.path==='/message'?unReadCount:0}
            title={nav.text}
            icon={
              <img
                src={require('./images/' + nav.icon + '.png').default}
                style={{ width: '22px', height: '22px' }}
              />
            }
            selectedIcon={
              <img
                src={require('./images/' + nav.icon + '-selected.png').default}
                style={{ width: '22px', height: '22px' }}
              />
            }
            selected={path === nav.path}
            onPress={() => this.props.history.replace(nav.path)}
          ></Item>
        ))}
      </TabBar>
    )
  }
}

export default withRouter(Navfooter) //向外暴露withRouter（）包装产生的组件
// 暴露之后，内部会向组件中传入一些路由组件的属性值
