import React from 'react'
import { Link } from 'react-router-dom'

export default function NavCom() {
  return (
    <div>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/page">page</Link></li>
        <li><Link to="/count">count</Link></li>
      </ul>
    </div>
  )
}
