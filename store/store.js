import { todoService } from "../services/todo.service.js"
import { userService } from "../services/user.service.js"
const { createStore } = Redux



const initialState = {
    todos: [],
    filterBy: {},
    user: userService.getLoggedinUser(),
}


function appReducer(state = initialState, action) {
    // console.log(action.todo)
    function toggleTodo() {
        let todos = [...state.todos]
        let todoIdx = todos.findIndex(t => t._id === action.todo._id)

        todos[todoIdx] = action.todo
        return todos
    }

    switch (action.type) {
        case 'ADD_TODO':
            return { ...state, todos: [...state.todos, action.todo] }
        case 'REMOVE_TODO':
            return { ...state, todos: state.todos.filter(t => t._id !== action._id) }
        case 'TOGGLE_IS_DONE':
        case 'EDIT_TODO':
            return { ...state, todos: toggleTodo() }
        case 'SET_FILTER_BY':
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }
        case 'LOAD_TODOS_FROM_STORAGE':
            return { ...state, todos: action.todos }
        case 'SET_LOGGED_USER':
            return { ...state, user: action.user }
        case 'LOG_OUT':
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