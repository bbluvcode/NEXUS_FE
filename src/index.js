import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
import './index.css'
import './fontawesome.css'
import myStore from './redux/store'

import App from './App'
import store from './store'

createRoot(document.getElementById('root')).render(
  // <DataProvider>
  <Provider store={myStore}>
    <App />
  </Provider>,
  {
    /* </DataProvider>, */
  },
)
