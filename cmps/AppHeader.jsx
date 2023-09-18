import { LoginSignup } from "./LoginSignup.jsx"
import { TodoProgress } from "./TodoProgress.jsx"
import { loadTodos } from "../store/actions/todo.action.js"

const { useSelector } = ReactRedux
const { useEffect } = React
const { Link } = ReactRouterDOM

export function AppHeader() {
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    const todos = useSelector(storeState => storeState.todoModule.todos)

    useEffect(() => {
        loadTodos()
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