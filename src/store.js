import { EMPLOYEE_INITIAL_STATE, employeeReducer } from "./Employee/store/reducer";
import { combineReducers } from "redux";
import { STUDENT_INITIAL_STATE, studentReducer } from "./Container/store/reducer";
import { HOME_INITIAL_STATE, homeReducer } from "./store/reducer";

const initialState = {
    employee: EMPLOYEE_INITIAL_STATE,
    student: STUDENT_INITIAL_STATE,
    home: HOME_INITIAL_STATE
}


export const rootReducer = combineReducers({
    employee: employeeReducer,
    student: studentReducer,
    home: homeReducer
})
