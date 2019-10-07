import { SEARCH_RESULTS } from "../../actions";

export const searchResults = (param) => {
    return {
        type: SEARCH_RESULTS,
        value:param
    }
}