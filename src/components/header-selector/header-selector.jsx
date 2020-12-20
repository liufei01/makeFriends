// 信息页面的头部

import React,{ Component } from "react";
import {List ,Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {
  static propTypes={
    setHandleHeader:PropTypes.func.isRequired
  }

  state={
    icon:null
  }
  constructor(prop) {
    super(prop)
    this.headerList=[]
    for (let i = 0; i < 20; i++) {
      this.headerList.push({
        text:'头像'+(i+1),
        icon:require(`../../assets/images/头像${i+1}.png`).default
      })
      
    }
  }
  render () {
    // const listHeader='请选择头像'
    // 头部头像
    const {icon}=this.state
    const listHeader=icon? (<div>已选择的头像：<img src={icon} /></div>):'请选择头像'
    return (
      <List renderHeader={()=>listHeader}>
        <Grid data={this.headerList} columnNum={5} onClick={this.headerClick}></Grid>
      </List>
    )
  }
  headerClick=({text,icon})=>{
    this.setState({
      icon
    })
    this.props.setHandleHeader(text)

  }
}