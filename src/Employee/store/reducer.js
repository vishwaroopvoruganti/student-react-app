import { tassign } from "tassign";
import { INCREMENT, DECREMENT } from "../../actions";


export const EMPLOYEE_INITIAL_STATE = {
    counter: 0,
}

function incrementCounter(state, action){
    var newState = state;
    newState.counter = state.counter+action.value;
    return tassign(state,newState);
}

// function additionalSearchResults(state,action){
//     let addSearchResults: Array<any> = action.additionalSearchResults;
//     var newState = state;
//     newState.likeSearchResult.result.push.apply(newState.likeSearchResult.result, addSearchResults);
   
//     return tassign(state,newState);
// }

function decrementCounter(state, action){
    const newState = Object.assign({}, state);
   newState.counter = state.counter-1;
    return newState;
}

export const employeeReducer = (state=EMPLOYEE_INITIAL_STATE, action) => {
    switch(action.type) {
        case INCREMENT: return  incrementCounter(state, action);
        case DECREMENT: return  decrementCounter(state, action);
        default: return state;
    }
  //   return state;
};

export default employeeReducer;