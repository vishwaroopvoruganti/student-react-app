import { tassign } from "tassign";
import { SEARCH_RESULTS, DATA_TO_UPDATE } from "../../actions";

export const STUDENT_INITIAL_STATE = {
  results: [],  
  updateValues: null,
}

function searchResults(state, action) {
    var newState = state;
    newState.results = action.value;
    return tassign(state,newState);
}

function updateRecord(state, action) {
    var newState = state;
    newState.updateValues = action.value;
    console.log(newState.updateValues);
    return tassign(state,newState);
}

export const studentReducer=(state= STUDENT_INITIAL_STATE, action) => {
    switch(action.type) {
        case SEARCH_RESULTS: return searchResults(state, action);
        case DATA_TO_UPDATE: return updateRecord(state, action);
        default: return state;
    }
   // return state;
}