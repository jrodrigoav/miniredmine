import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import MainNavigation from './components/MainNavigation';

const Root = () => (
    <BrowserRouter>
        <MainNavigation />
        <Main />
    </BrowserRouter>
);
ReactDOM.render(<Root />, document.getElementById('miniredmine2'));