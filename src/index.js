import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { legacy_createStore as createStore,  applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import Reducers from './reducers'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(Reducers, compose(applyMiddleware(thunk)))

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
