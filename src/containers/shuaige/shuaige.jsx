/**
 * 帅哥主界面路由容器组件
 */
import React,{Component} from 'react'
import {getUserList} from '../../redux/actions'
import UserList from '../../components/user-list/user-list'
import {connect} from 'react-redux'

class Shuaige extends Component {
  componentDidMount() {
    this.props.getUserList('meinv')
  }
  render() {
    return (
      <UserList userlist={this.props.userlist}></UserList>
    )
  }
}

export default connect(
  state=>({userlist:state.userlist}),{getUserList}
)(Shuaige)