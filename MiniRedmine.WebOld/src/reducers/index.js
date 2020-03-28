import { combineReducers } from 'redux'
import appState from './appState'
import entriesState from './entriesState';

export default combineReducers({
    appState,
    entriesState
})