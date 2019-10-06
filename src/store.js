import { EMPLOYEE_INITIAL_STATE, employeeReducer } from "./Employee/store";
import { combineReducers } from "redux";

const initialState = {
    employee: EMPLOYEE_INITIAL_STATE,
}


export const rootReducer = combineReducers({
    employee: employeeReducer,
})
