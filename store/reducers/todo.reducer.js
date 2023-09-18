import { todoService } from "../../services/todo.service.js"
import { userService } from "../../services/user.service.js"

export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const TOGGLE_IS_DONE = 'TOGGLE_IS_DONE'
export const EDIT_TODO = 'EDIT_TODO'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const LOAD_TODOS_FROM_STORAGE = 'LOAD_TODOS_FROM_STORAGE'

const loggedUser = userService.getLoggedinUser()

const initialState = {
    todos: [],
    filterBy: {},
}

export function todoReducer(state = initialState, action = {}) {
    switch (action.type) {
        case ADD_TODO:
            return { ...state, todos: [...state.todos, action.todo] }
        case REMOVE_TODO:
            return { ...state, todos: state.todos.filter(t => t._id !== action._id) }
        case TOGGLE_IS_DONE:
        case EDIT_TODO:
            return { ...state, todos: state.todos.map(todo => todo._id === action._id ? action.todo : todo) }
        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }
        case LOAD_TODOS_FROM_STORAGE:
            return { ...state, todos: action.todos.filter(t => !t.owner || t.owner && loggedUser && t.owner._id === loggedUser._id) }
        default:
            return state
    }
}