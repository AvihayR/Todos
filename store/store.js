import { todoService } from "../services/todo.service.js"
import { userService } from "../services/user.service.js"
import { todoReducer } from "./reducers/todo.reducer.js"
import { userReducer } from "./reducers/user.reducer.js"

const { createStore, combineReducers } = Redux

const rootReducer = combineReducers({
    userModule: userReducer,
    todoModule: todoReducer
})

const initialState = {
    todos: [],
    filterBy: {},
    user: userService.getLoggedinUser(),
}



const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : () => { }

export const store = createStore(rootReducer, middleware)
window.gStroe = store.getState()

store.subscribe(() => {
    console.log('Current state is:', store.getState())
})