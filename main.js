import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
// import createLogger from 'redux-logger'
import { selectSubreddit, fetchPosts } from './Actions/actions'
import rootReducer from './Reducers/reducers'
import AsyncApp from './Containers/AsyncApp'

// const loggerMiddleware = createLogger();

const configureStore = (preloadedState) => {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      // loggerMiddleware // neat middleware that logs actions
    )
  );
};

const store = configureStore();

store.dispatch(selectSubreddit('reactjs'));
store.dispatch(fetchPosts('reactjs')).then(() => {
  console.log(store.getState());
});

render(
  <Provider store={store}>
    <AsyncApp/>
  </Provider>,
  document.getElementById('app')
);