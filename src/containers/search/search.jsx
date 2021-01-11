import React, { Component } from 'react'
import {
  NavBar,
  Button,
  SearchBar,
  WhiteSpace,
  List,
  Checkbox,
  Icon
} from 'antd-mobile'
import {connect} from 'react-redux'
import {getXueLiPeo} from '../../redux/actions'

const CheckboxItem = Checkbox.CheckboxItem
class Search extends React.Component {
  state = {
    xueliArrays: []
  }
  onChange = val => {
    this.setState(
      {
        xueliArrays: [...this.state.xueliArrays, val]
      },
      function () {
        // console.log(this.state.xueliArrays)
      }
    )
  }
  render () {
    const data = [
      { xueii: '初中' },
      { xueii: '高中' },
      { xueii: '专科' },
      { xueii: '本科' },
      { xueii: '大学士' },
      { xueii: '太子伴读' },
      { xueii: '硕士' },
      { xueii: '博士' },
      { xueii: '博士后' }
    ]
    return (
      <div>
        <NavBar
          icon={<Icon type='left'></Icon>}
          className='sticky-header'
          onLeftClick={() => this.props.history.goBack()}
        >
          搜索
        </NavBar>

        <SearchBar
          style={{ marginTop: 50 }}
          placeholder='搜索'
          ref={ref => (this.autoFocusInst = ref)}
        />
        <WhiteSpace />

        <h3>按条件搜索</h3>
        <WhiteSpace />
        <List renderHeader={() => '学历'}>
          {data.map(i => (
            <CheckboxItem key={i.xueii} onChange={() => this.onChange(i)}>
              {i.xueii}
            </CheckboxItem>
          ))}
        </List>
        <WhiteSpace />
        <Button onClick={()=>this.searthRes()}>搜索</Button>
        <WhiteSpace />
      </div>
    )
  }
  searthRes=()=>{
    let {type}=this.props.user
    type=type==='shuaige'?'meinv':'shuaige'
    this.props.getXueLiPeo({type,xueliArrays:this.state.xueliArrays})
  }
}

export default connect(state=>({user:state.user,userList:state.userlist}),{getXueLiPeo})(Search)