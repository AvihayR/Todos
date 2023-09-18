import { userService } from "../../services/user.service.js"
export const SET_LOGGED_USER = 'SET_LOGGED_USER'
export const LOG_OUT = 'LOG_OUT'

const initialState = {
    user: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_LOGGED_USER:
            return { ...state, user: action.user }
        case LOG_OUT:
            return { ...state, user: null }
        default:
            return state
    }
}