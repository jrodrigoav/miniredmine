import {
    ADD_TIMEENTRIES,
    ADD_ACTIVITIES
} from '../actions';

const initialState = {
    entries: [],
    activities:[]
};

function entriesState(state = initialState, action) {
    switch (action.type) {
        case ADD_TIMEENTRIES:
            return Object.assign({}, state, {
                entries: action.entries
            });
        case ADD_ACTIVITIES:
            return Object.assign({}, state, {
                activities: action.activities
            });
        default:
            return state
    }
};

export default entriesState;