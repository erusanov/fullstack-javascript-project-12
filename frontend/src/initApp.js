import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './app/App.jsx'

import './locale/i18n.js'
import './api/index.js'
import './util/profanityFilter.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(React.createElement(App))
