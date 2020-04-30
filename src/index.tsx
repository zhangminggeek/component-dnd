import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import ReducerWrapper from './components/ReducerWrapper';
import App from './App';

ReactDOM.render(
  <ReducerWrapper>
    <App />
  </ReducerWrapper>,
  document.getElementById('root')
);
