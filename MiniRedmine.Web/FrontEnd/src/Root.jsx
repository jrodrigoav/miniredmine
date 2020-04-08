import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import Header from './components/Header';

const Root = () => (
    <BrowserRouter>
        <Header />
        <Main />
    </BrowserRouter>
);
ReactDOM.render(<Root />, document.getElementById('miniredmine2'));