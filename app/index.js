//import 'fetch-ie8';
import 'es5-shim';
import 'es5-shim/es5-sham';
import 'es6-shim';

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers,applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { HashRouter as Router,Route,Link,Switch} from 'react-router-dom'
import {syncHistoryWithStore} from 'react-router-redux'
import  * as reducers from './reducers/index' // Or wherever you keep your reducers

import RecordPost from 'components/RecordPost'
import Main from 'containers/Main'
import Stat from 'components/Stat'
import Detail from 'components/Detail'
import NoMatch from 'components/Page404'

//import DevTools from './containers/DevTools'

import myCreateStores from './store'
const browserHistory = createHistory()

import { CSSTransitionGroup } from 'react-transition-group'

import { Layout } from 'antd'
const { Content, Footer } = Layout

import Header from './components/Header'
import Sider from './components/Sider'
import ModalDialog from './containers/ModalDialog'

import 'static/css/antd.css'
import './static/scss/index.scss'

const stores = myCreateStores(browserHistory)
const history = syncHistoryWithStore(browserHistory, stores)

// console.log('location is ',location);
// console.log('history is ',history);
ReactDOM.render(
  <Provider store={stores}>
    <Router history={history}>
      <Layout>
        <ModalDialog></ModalDialog>
        <Header></Header>
        {/*className='ant-layout-has-sider' 没有则无法并排，小蚂蚁金服antd bug？*/}
        <Layout className='ant-layout-has-sider'> 
          <Sider></Sider>
          <Content style={{minHeight:600}}>
            <CSSTransitionGroup transitionName='fade' transitionEnterTimeout={300} transitionLeaveTimeout={300}>
              <Switch>
                <Route exact path="/" location={history.location} key={history.location.key} component={Main}/>
                <Route path="/add" location={history.location} key={history.location.key} component={RecordPost}/>
                <Route path="/stat" location={history.location} key={history.location.key} component={Stat}/>
                <Route path="/:title/:date" location={history.location} key={history.location.key} component={Detail}/>
                <Route location={history.location} key={history.location.key} component={NoMatch}/>
              </Switch>
            </CSSTransitionGroup>
          </Content>
        </Layout>
        <Footer className='footer' style={{ textAlign: 'center',color:'white' }}>
          源码地址：https://github.com/kkltmoyu/NightPost.git，欢迎交流
        </Footer>
       {/* <DevTools />*/}
      </Layout>
    </Router>
  </Provider>,
  document.getElementById('app')
)
