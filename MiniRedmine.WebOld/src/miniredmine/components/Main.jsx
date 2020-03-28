import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import TimeEntries from './TimeEntries';
import Templates from './Templates';

const Main = () => (
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/timeentries" component={TimeEntries} />
        <Route path="/templates" component={Templates} />
      </Switch>
    </main>
  );

  export default Main;