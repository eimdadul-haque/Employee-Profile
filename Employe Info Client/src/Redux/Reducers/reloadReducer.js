import { ActionType } from "../ActionType"

export const employeReducer = (state = {
    employes: [],
    employe: {}

}, action) => {
    switch (action.type) {
        case ActionType.RELOAD:
            return { ...state, reload: action.payload };
        case ActionType.GET_ALL:
            return { ...state, employes: action.payload };
        case ActionType.EDIT_DATA:
            return { ...state, employe: action.payload };
        default:
            return state;
    }
}
