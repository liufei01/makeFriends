// 帅哥信息完善的路由容器组件
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'
import { updateUser } from '../../redux/actions'

class MeiNvInfo extends Component {
  constructor () {
    super()
    this.state = {
      header: '',
      waimao: '',
      xueii: '',
      money: '',
      detail: ''
    }
  }
  render () {
    const { header, type } = this.props
    if (header) {
      const path = type == 'meinv' ? '/meinv' : '/shuaige'
      return <Redirect to={path} />
    }
    return (
      <div>
        <NavBar>美女信息完善</NavBar>
        <HeaderSelector setHandleHeader={this.setHandleHeader}></HeaderSelector>
        <InputItem
          placeholder='输入美貌'
          onChange={val => this.handleChange('waimao', val)}
        >
          美貌 ：
        </InputItem>
        <InputItem
          placeholder='输入学历'
          onChange={val => this.handleChange('xueii', val)}
        >
          学历 ：
        </InputItem>
        <InputItem
          placeholder='输入薪资'
          onChange={val => this.handleChange('money', val)}
        >
          薪资 ：
        </InputItem>
        <TextareaItem
          title='交友宣言 ：'
          rows={3}
          clear
          count={200}
          onChange={val => this.handleChange('detail', val)}
        ></TextareaItem>
        <Button type='primary' onClick={this.save}>
          保存
        </Button>
      </div>
    )
  }
  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }
  // 更新header
  setHandleHeader = header => {
    this.setState({
      header
    })
  }
  save = () => {
    this.props.updateUser(this.state)
  }
}

export default connect(state => state.user,{updateUser})(MeiNvInfo)
