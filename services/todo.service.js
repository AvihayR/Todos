import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import demoData from './demoData.js'
const { useSelector, useDispatch } = ReactRedux

const STORAGE_KEY = 'todoDB'

export const todoService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo,
}

_createTodos()

function query(filterBy = { txt: '', status: '' }) {
    // return axios.get(BASE_URL).then(res => res.data)
    return storageService.query(STORAGE_KEY)
        .then((todos) => {
            if (filterBy.txt)
                todos = todos.filter(t => t.title.toLowerCase().includes(filterBy.txt.toLowerCase()))
            if (filterBy.status === 'done') return todos.filter(t => t.isDone)
            else if (filterBy.status === 'active') return todos.filter(t => !t.isDone)

            else return todos
        })
}
function getById(todoId) {
    return storageService.get(STORAGE_KEY, todoId)
}
function remove(todoId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, todoId)
}

function save(todo) {
    if (todo._id) {
        return storageService.put(STORAGE_KEY, todo)
    } else {
        // when switching to backend - remove the next line
        // todo.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, todo)
    }
}

function getEmptyTodo() {
    return {
        title: '',
        isDone: false,
        createdAt: Date.now(),
    }
}


function _createTodos() {
    let todos = utilService.loadFromStorage(STORAGE_KEY)
    if (!todos || !todos.length) {
        todos = demoData
        utilService.saveToStorage(STORAGE_KEY, todos)
    }
}