import { INCREMENT } from "../../actions";

export const increment = (param) => {
    return {
        type: INCREMENT,
        value: param
    }
}