import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import App from './App'
import rootReducer from './reducers/rootReducer'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'


// Create the redux store. Apply redux-thunk middleware for async operations, and enable browser devtools.
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)


// Connect the redux store to the top-level App component
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
