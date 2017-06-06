import { createStore,combineReducers,applyMiddleware,compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {routerReducer, routerMiddleware} from 'react-router-redux'
import * as reducers from './reducers/index'

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
import DevTools from './containers/DevTools'

function myCreateStores(history){
	const middleware = routerMiddleware(history);
	const enhancer = compose(
	  //你要使用的中间件，放在前面
	  applyMiddleware(thunkMiddleware,middleware),
	  //必须的！启用带有monitors（监视显示）的DevTools
	  DevTools.instrument()
	)
	const store = createStore(
	    combineReducers({
	    	...reducers,
	    	//key 必须为routing
	    	routing: routerReducer
	    }),enhancer
 		//applyMiddleware(thunkMiddleware,middleware)
	)
	return store;
}

export default myCreateStores