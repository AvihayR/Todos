import { todoService } from "../services/todo.service.js"
import { LoginSignup } from "./LoginSignup.jsx"
import { TodoProgress } from "./TodoProgress.jsx"
import { LOAD_TODOS_FROM_STORAGE } from '../store/reducers/todo.reducer.js'

const { useSelector, useDispatch } = ReactRedux
const { useEffect, useState } = React
const { Link } = ReactRouterDOM

export function AppHeader() {
    const dispatch = useDispatch()
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    const todos = useSelector(storeState => storeState.todoModule.todos)

    useEffect(() => {
        todoService.query()
            .then((todos) => dispatch({ type: LOAD_TODOS_FROM_STORAGE, todos }))
            .then(console.log)
            .catch(err => console.log('Error:', err))
    }, [])


    return (
        <header className="app-header">
            <Link to='/'>
                <h1 className="logo">⛅Todo-bien</h1>
            </Link>
            {loggedUser && <TodoProgress todos={todos} />}
            <LoginSignup />
        </header>
    )
}