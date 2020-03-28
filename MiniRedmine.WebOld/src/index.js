import React from 'react';
import { createStore } from 'redux';
import rootReducer from './reducers';
import Root from './miniredmine/Root';
import ReactDOM from 'react-dom';

const store = createStore(rootReducer);

//const unsubscribe = store.subscribe(()=>console.log(store.getState()));
ReactDOM.render(<Root store={store}/>, document.getElementById('miniredmine'));