import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { usersReducer } from './usersReducer/usersReducer';
import { fetchReducer } from './fetchReducer/fetchReducer';
import { tasksReducer } from './tasksReducer/tasksReducer';

const reducers = combineReducers({
  fetch: fetchReducer,
  users: usersReducer,
  tasks: tasksReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
