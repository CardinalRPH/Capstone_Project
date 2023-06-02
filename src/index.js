import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './scripts/App';
import reportWebVitals from './scripts/reportWebVitals';

import './styles/index.css';
import './styles/style.css';
import 'jquery'
import './styles/css/sb-admin-2.min.css';
import './scripts/js/sb-admin-2.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
