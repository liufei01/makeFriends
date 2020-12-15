// 帅哥信息完善的路由容器组件
import React, {Component} from 'react'
import { connect } from "react-redux";
import { NavBar,InputItem,TextareaItem ,Button} from "antd-mobile";
import HeaderSelector from "../../components/header-selector/header-selector";

class ShuaiGeInfo extends Component {
  render() {
    return <div>
      <NavBar>帅哥信息完善</NavBar>
      <HeaderSelector></HeaderSelector>
      <InputItem placeholder='输入年龄'>年龄 ：</InputItem>
      <InputItem placeholder='输入职业'>职业 ：</InputItem>
      <InputItem placeholder='输入薪资'>薪资 ：</InputItem>
      <TextareaItem title='交友宣言 ：' rows={3} clear count={200}> </TextareaItem>
      <Button type='primary'>保存</Button>
    </div>
  }
}

export default connect(
  state =>({}),
  {}
)(ShuaiGeInfo)