import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(
    <Routes history={BrowserRouter} />,
    document.getElementById('root')
);
registerServiceWorker();
