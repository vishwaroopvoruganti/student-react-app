import { tassign } from "tassign";
import { LOADING } from "./actions";

export const HOME_INITIAL_STATE= {
    loading: false,
}

function loading(state, action){
    const newState = state;
    newState.loading = action.value;
    return tassign(state,newState);
}
export const homeReducer = (state= HOME_INITIAL_STATE, action) => {

    switch(action.type) {
        case LOADING: return loading(state, action);
    }
    return state;
}