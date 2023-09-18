import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { TodoList } from "../cmps/TodoList.jsx"
import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { AddTodoForm } from "../cmps/AddTodoForm.jsx"
import { SET_FILTER_BY, ADD_TODO, REMOVE_TODO, TOGGLE_IS_DONE, LOAD_TODOS_FROM_STORAGE, store } from '../store/store.js'

const { useSelector, useDispatch } = ReactRedux
const { useEffect } = React



export function TodoApp() {
    const todos = useSelector(storeState => storeState.todos)
    const filterBy = useSelector(storeState => storeState.filterBy)
    const loggedUser = useSelector(storeState => storeState.user)
    const dispatch = useDispatch()
    // showSuccessMsg('hello')

    useEffect(() => {
        todoService.query(filterBy)
            .then((todos) => dispatch({ type: LOAD_TODOS_FROM_STORAGE, todos }))
            .catch(err => console.log('Error:', err))
    }, [loggedUser, filterBy])

    function setFilterBy(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    function addTodo(ev, todo) {
        ev.preventDefault()
        todo.owner = loggedUser

        todoService.save(todo)
            .then((res) => { dispatch({ type: ADD_TODO, todo: res }) })
            .then(showSuccessMsg('Added new todo!'))
            .catch(showErrorMsg('Could\'nt add a new todo..'))
    }

    function removeTodo(todoId) {
        todoService.remove(todoId)
            .then(
                () => { dispatch({ type: REMOVE_TODO, _id: todoId }) }
            )
            .then(showSuccessMsg(`Removed todo -${todoId}`))
            .catch(err => showErrorMsg(err))
    }

    function toggleIsDoneTodo(todo) {
        todo.isDone = !todo.isDone
        todoService.save(todo)
            .then(
                dispatch({ type: TOGGLE_IS_DONE, todo })
            )
            .catch(err => console.log('Error:', err))
    }

    return (
        <section className="todo-app">
            {/* <AppHeader /> */}
            <TodoFilter onSetFilterBy={setFilterBy} filterBy={filterBy} />
            <AddTodoForm onAddTodo={addTodo} />
            <TodoList todos={todos} removeTodo={removeTodo} toggleIsDoneTodo={toggleIsDoneTodo} />
        </section>
    )
}