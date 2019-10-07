import { tassign } from "tassign";
import { SEARCH_RESULTS } from "../../actions";

export const STUDENT_INITIAL_STATE = {
  results: [],  
}

function searchResults(state, action) {
    var newState = state;
    newState.results = action.value;
    return tassign(state,newState);
}

export const studentReducer=(state= STUDENT_INITIAL_STATE, action) => {
    switch(action.type) {
        case SEARCH_RESULTS: return searchResults(state, action);
    }
    return state;
}