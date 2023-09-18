import { userService } from "../../services/user.service.js"
import { LOG_OUT, SET_LOGGED_USER } from "../reducers/user.reducer.js"
import { store } from "../store.js"


export function logOut() {
    return userService.logout()
        .then(store.dispatch({ type: LOG_OUT }))
        .catch(err => {
            console.log('Error:', err)
            throw err
        })
}

export function setLoggedUser(user) {
    store.dispatch({ type: SET_LOGGED_USER, user })
}

export function signUp(credentials) {
    return userService.signup(credentials)
        .then((user) => {
            setLoggedUser(user)
        })
        .catch(err => {
            console.log('Oops, try again')
            throw err
        })
}

export function logIn(credentials) {
    return userService.login(credentials)
        .then((user) => {
            setLoggedUser(user)
        })
        .catch(err => {
            console.log('Oops, try again')
            throw err
        })
}