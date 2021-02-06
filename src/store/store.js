import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {ItemReducer} from '../reducer/ItemReducer';
import {listReducer} from '../reducer/ListReducer';

const reducers = combineReducers({
  item: ItemReducer,
  list: listReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const api = process.env.REACT_APP_API;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk.withExtraArgument(api))));

export default store;