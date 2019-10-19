import { employeeReducer } from "./Employee/store/reducer";
import { combineReducers } from "redux";
import { studentReducer } from "./Container/store/reducer";
import { homeReducer } from "./store/reducer";
import { tabReducer } from "./Tabs/store/reducer";



export const rootReducer = combineReducers({
    employee: employeeReducer,
    student: studentReducer,
    home: homeReducer,
    tab: tabReducer
})
