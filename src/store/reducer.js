import { tassign } from "tassign";
import { LOADING, LOGIN_FORM_VALUES,  } from "./actions";
import { MAIN_LOGIN_FORM, LOGIN_STATUS } from "../actions";


export const HOME_INITIAL_STATE= {
    loading: false,
    formValues: [],
    loginFormValues: [],
    loginStatus: false,
}

function loading(state, action){
    const newState = state;
    newState.loading = action.value;
    return tassign(state,newState);
}

function formValues(state, action){
    const newState = state;
    newState.formValues = action.value;
    //console.log(newState.formValues);
    return tassign(state,newState);
}

function mainLoginForm(state, action){
    const newState = state;
    newState.loginFormValues = action.value;
    console.log('Form Values Null',newState.loginFormValues);
    return tassign(state,newState);
}

function loginStatus(state, action){
    const newState = state;
    newState.loginStatus = action.value;
  //  console.log(newState.loginStatus);
    return tassign(state,newState);
}

export const homeReducer = (state= HOME_INITIAL_STATE, action) => {

    switch(action.type) {
        case LOADING: return loading(state, action);
        case LOGIN_FORM_VALUES: return formValues(state, action);
        case MAIN_LOGIN_FORM: return mainLoginForm(state, action);
        case LOGIN_STATUS: return loginStatus(state, action);
        default: return state;
    }
    //return state;
}