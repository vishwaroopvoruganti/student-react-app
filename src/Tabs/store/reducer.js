import { tassign } from "tassign";
import {REACTIVE_SEARCH_FORM_VALUES} from './actions';
export const TAB_INITIAL_STATE= {
    reactiveSearchFormValues: [],
}



function formValues(state, action){
    const newState = state;
    newState.reactiveSearchFormValues = action.value;
   // console.log(newState.reactiveSearchFormValues);
    return tassign(state,newState);
}
export const tabReducer = (state= TAB_INITIAL_STATE, action) => {

    switch(action.type) {
       
        case REACTIVE_SEARCH_FORM_VALUES: return formValues(state, action);
        default: return state;
    }
    //return state;
}