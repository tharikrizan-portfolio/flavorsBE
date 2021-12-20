import {
    OPEN_ALERT, CLOSE_ALERT, SAVE_TITLE, SAVE_DESCRIPTION
} from "./types";

export const openAlert = () => {
    return (dispatch) => {
        dispatch({type: OPEN_ALERT, payload: true})
    }
}

export const closeAlert = () => {
    return (dispatch) => {
        dispatch({type: CLOSE_ALERT, payload: false})
    }
}
