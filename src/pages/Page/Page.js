import React, { Component } from 'react'
import styles from './Page.less'
import pic from '@/assets/images/flower.jpg'

export default class Page extends Component {
  render() {
    return (
      <div className={styles.page}>
        Page页面
        <img src={pic} alt="加载失败"/>
      </div>
    )
  }
}
