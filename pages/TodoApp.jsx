import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { TodoList } from "../cmps/TodoList.jsx"
import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { AddTodoForm } from "../cmps/AddTodoForm.jsx"

import { addTodoAction, loadTodos, removeTodo, setFilterBy, toggleIsDone } from "../store/actions/todo.action.js"
const { useSelector } = ReactRedux
const { useEffect } = React


export function TodoApp() {
    const todos = useSelector(storeState => storeState.todoModule.todos)
    const filterBy = useSelector(storeState => storeState.todoModule.filterBy)
    const loggedUser = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
        loadTodos(filterBy)
            .catch(err => console.log(err))
    }, [loggedUser, filterBy])

    function onSetFilterBy(filterBy) {
        setFilterBy(filterBy)
    }

    function onAddTodo(ev, todo) {
        ev.preventDefault()
        addTodoAction(todo)
            .then(showSuccessMsg('Added new todo!'))
            .catch(err => showErrorMsg(err))
    }

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .then(showSuccessMsg(`Removed todo -${todoId}`))
            .catch(err => showErrorMsg(err))
    }

    function onToggleIsDoneTodo(todo) {
        toggleIsDone(todo)
            .then(res => {
                const txt = !todo.isDone ? 'Unmarked todo' : 'Marked Todo as done!'
                showSuccessMsg(txt)
            })
            .catch(err => showErrorMsg(err))
    }

    return (
        <section className="todo-app">
            <TodoFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
            <AddTodoForm onAddTodo={onAddTodo} />
            <TodoList todos={todos} removeTodo={onRemoveTodo} toggleIsDoneTodo={onToggleIsDoneTodo} />
        </section>
    )
}