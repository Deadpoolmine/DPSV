import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* 全局变量 */
window.$User = null;


ReactDOM.render(<App />, document.getElementById("root"));