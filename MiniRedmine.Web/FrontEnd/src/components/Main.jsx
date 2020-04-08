import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import SimpleCapture from './SimpleCapture';
import Templates from './Templates';

const Main = () => (
    <Switch>
        <Route path="/Login">
            <Login />
        </Route>
        <PrivateRoute exact path="/">
            <Home />
        </PrivateRoute>
        <PrivateRoute path="/SimpleCapture">
            <SimpleCapture />
        </PrivateRoute>        
        <PrivateRoute path="/Templates">
            <Templates />
        </PrivateRoute>
    </Switch>
);

export default Main;