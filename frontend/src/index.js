import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/video-react/dist/video-react.css"; // import css

/* ćšć±ćé */
window.$User = null;
window.$PreSearch = "";


ReactDOM.render(<App />, document.getElementById("root"));