import React from 'react';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.css';
import './app.module.css';


import routes from './routes/index';

const rootEl = document.getElementById('root');

ReactDOM.render(routes, rootEl);