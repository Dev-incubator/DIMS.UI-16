import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { usersReducer } from './users/reducers/usersReducer';
import { tasksReducer } from './tasks/reducers/tasksReducer';
import { usersLoaderReducer } from './users/reducers/usersLoaderReducer';
import { tasksLoaderReducer } from './tasks/reducers/tasksLoaderReducer';
import { usersErrorReducer } from './users/reducers/usersErrorReducer';
import { tasksErrorReducer } from './tasks/reducers/tasksErrorReducer';

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
