import React,{Component} from 'react'

import logo from './images/logo.png'
import './logo.less'

export default class Logo extends Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    return (
      <div className='logo-container'>
        <img src={logo} alt='logo' className='logo-img' />
      </div>
    )
  }
}
