import React from 'react';
import { render } from 'react-dom';
import App from './App';

import './index.css';

render((
    <div className='app-index'>
        <App />
    </div>
    ),
    document.getElementById('root')
);
