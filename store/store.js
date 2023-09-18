import { todoService } from "../services/todo.service.js"
import { userService } from "../services/user.service.js"
const { createStore } = Redux

export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const TOGGLE_IS_DONE = 'TOGGLE_IS_DONE'
export const EDIT_TODO = 'EDIT_TODO'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const LOAD_TODOS_FROM_STORAGE = 'LOAD_TODOS_FROM_STORAGE'
export const SET_LOGGED_USER = 'SET_LOGGED_USER'
export const LOG_OUT = 'LOG_OUT'


const initialState = {
    todos: [],
    filterBy: {},
    user: userService.getLoggedinUser(),
}

function appReducer(state = initialState, action) {

    switch (action.type) {
        case ADD_TODO:
            return { ...state, todos: [...state.todos, action.todo] }
        case REMOVE_TODO:
            return { ...state, todos: state.todos.filter(t => t._id !== action._id) }
        case TOGGLE_IS_DONE:
        case EDIT_TODO:
            return { ...state, todos: state.todos.map(todo => todo.id === action.id ? action.todo : todo) }
        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }
        case LOAD_TODOS_FROM_STORAGE:
            return { ...state, todos: action.todos.filter(t => t.owner && state.user && t.owner._id === state.user._id || !t.owner) }
        case SET_LOGGED_USER:
            return { ...state, user: action.user }
        case LOG_OUT:
            return { ...state, user: null }
        default: return state
    }
}

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : () => { }

export const store = createStore(appReducer, middleware)

store.subscribe(() => {
    console.log('Current state is:', store.getState())
})