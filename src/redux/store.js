import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { usersReducer } from './usersReducers/usersReducer';
import { tasksReducer } from './tasksReducers/tasksReducer';
import { usersLoaderReducer } from './usersReducers/usersLoaderReducer';
import { tasksLoaderReducer } from './tasksReducers/tasksLoaderReducer';
import { usersErrorReducer } from './usersReducers/usersErrorReducer';
import { tasksErrorReducer } from './tasksReducers/tasksErrorReducer';

const reducers = combineReducers({
  users: usersReducer,
  tasks: tasksReducer,
  usersLoader: usersLoaderReducer,
  tasksLoader: tasksLoaderReducer,
  usersError: usersErrorReducer,
  tasksError: tasksErrorReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
