// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ import đúng cho React 18
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

// ✅ React 18 dùng createRoot thay vì ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
