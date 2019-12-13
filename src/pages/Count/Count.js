import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { increment, decrement, reset } from '@/actions/count'
import { Button } from 'antd'
function p() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
}

@connect(
  state => state,
  { increment, decrement, reset }
)
class Count extends PureComponent {
  componentDidMount() {
    this.query()
  }
  async query() {
    const res = await p()
    console.log(res)
  }
  render() {
    return (
      <div>
        <div>当前计数为{this.props.count}</div>
        <Button className="ml15" type="primary" onClick={this.props.increment}>增加</Button>
        <Button className="ml15" type="primary" onClick={this.props.decrement}>减少</Button>
        <Button className="ml15" type="primary" onClick={this.props.reset}>重置</Button>
      </div>
    )
  }
}

Count.propTypes = {
  count: PropTypes.number,
  increment: PropTypes.func,
  decrement: PropTypes.func,
  reset: PropTypes.func 
}

export default Count
