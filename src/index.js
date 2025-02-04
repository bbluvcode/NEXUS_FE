import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
import 'mdb-ui-kit';
import './index.css'
import './fontawesome.css'
import myStore from './redux/store'

import App from './App'

createRoot(document.getElementById('root')).render(
  <Provider store={myStore}>
    <App />
  </Provider>,
)
