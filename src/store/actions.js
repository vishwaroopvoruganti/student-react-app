import {MAIN_LOGIN_FORM, LOGIN_STATUS} from '../actions';

export const LOADING = 'LOADING';
export const LOGIN_FORM_VALUES = 'LOGIN_FORM_VALUES';

export const loginFormValues = (param) => {
    return {
        type: MAIN_LOGIN_FORM,
        value:param
    }
}

export const loginStatus = (param) => {
    return {
        type: LOGIN_STATUS,
        value:param
    }
}

