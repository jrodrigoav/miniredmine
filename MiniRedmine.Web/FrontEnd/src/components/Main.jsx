import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import TimeEntries from './TimeEntries';
import Login from './Login';
import Templates from './Templates';
import SimpleCapture from './SimpleCapture';

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
        <PrivateRoute exact path="/TimeEntries">
            <TimeEntries />
        </PrivateRoute>
        <PrivateRoute path="/Templates">
            <Templates />
        </PrivateRoute>
    </Switch>
);

export default Main;