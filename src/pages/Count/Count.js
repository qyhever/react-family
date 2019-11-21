import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { increment, decrement, reset } from '@/actions/count'
import { Button } from 'antd'

@connect(
  state => state,
  { increment, decrement, reset }
)
class Count extends PureComponent {
  componentDidMount() {
    const a = { name: 'zs' }
    const b = 2
    const c = {
      a
    }
    if (a === b) {
      console.log(a, b, c)
    }
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
