import { todoService } from "../../services/todo.service.js"
import { userService } from "../../services/user.service.js"
import { SET_FILTER_BY, ADD_TODO, REMOVE_TODO, TOGGLE_IS_DONE, LOAD_TODOS_FROM_STORAGE } from '../reducers/todo.reducer.js'
import { store } from "../store.js"

const loggedUser = userService.getLoggedinUser()

export function loadTodos(filterBy) {
    return todoService.query(filterBy)
        .then((todos) => {
            store.dispatch({ type: LOAD_TODOS_FROM_STORAGE, todos })
        })
        .catch(err => {
            console.log('Error:', err)
            throw err
        })
}

export function addTodoAction(todo) {
    todo.owner = loggedUser
    return todoService.save(todo)
        .then((res) => { store.dispatch({ type: ADD_TODO, todo: res }) })
        .catch(err => {
            console.log('Error:', err)
            throw err
        })
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(
            store.dispatch({ type: REMOVE_TODO, _id: todoId })
        )
        .catch(err => {
            console.log('Error:', err)
            throw err
        })
}


export function toggleIsDone(todo) {
    todo.isDone = !todo.isDone
    return todoService.save(todo)
        .then(
            store.dispatch({ type: TOGGLE_IS_DONE, todo })
        )
        .catch(err => {
            console.log('Error:', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}
