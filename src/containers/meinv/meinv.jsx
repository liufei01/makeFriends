/**
 * 美女主界面路由容器组件
 */
import React, { Component } from 'react'
import { getUserList } from '../../redux/actions'
import UserList from '../../components/user-list/user-list'
import { connect } from 'react-redux'

class Meinv extends Component {
  componentDidMount () {
    if (!this.props.userlist.show) {
      this.props.getUserList('shuaige')
    }
  }
  render () {
    return <UserList userlist={this.props.userlist.show?this.props.userlist.userLists:this.props.userlist}></UserList>
  }
}

export default connect(state => ({ userlist: state.userlist }), {
  getUserList
})(Meinv)
