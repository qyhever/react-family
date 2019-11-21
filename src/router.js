import React from 'react'
import { Route, Switch } from 'react-router-dom'
import loadable from 'react-loadable'
import Loading from '@/components/Loading'
import Exception404 from '@/pages/Exception/Exception404'

const Home = loadable({
  loader: () => import('@/pages/Home'),
  loading: Loading,
  timeout: 10000
})
const Page = loadable({
  loader: () => import('@/pages/Page'),
  loading: Loading,
  timeout: 10000
})
const Count = loadable({
  loader: () => import('@/pages/Count'),
  loading: Loading,
  timeout: 10000
})

const RouterConfig = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/page" component={Page} />
    <Route exact path="/count" component={Count} />
    <Route component={Exception404} />
  </Switch>
)

export default RouterConfig
