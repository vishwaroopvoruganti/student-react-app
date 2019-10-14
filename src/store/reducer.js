import { tassign } from "tassign";
import { LOADING, LOGIN_FORM_VALUES } from "./actions";

export const HOME_INITIAL_STATE= {
    loading: false,
    formValues: [],
}

function loading(state, action){
    const newState = state;
    newState.loading = action.value;
    return tassign(state,newState);
}

function formValues(state, action){
    const newState = state;
    newState.formValues = action.value;
    console.log(newState.formValues);
    return tassign(state,newState);
}
export const homeReducer = (state= HOME_INITIAL_STATE, action) => {

    switch(action.type) {
        case LOADING: return loading(state, action);
        case LOGIN_FORM_VALUES: return formValues(state, action);
        default: return state;
    }
    //return state;
}