import { TodoPreview } from "./TodoPreview.jsx"
export function TodoList({ todos, removeTodo, toggleIsDoneTodo }) {

    if (!todos || !todos.length) {
        return <h1 className="no-todos-indication">No todos to show..</h1>
    }

    return (
        todos.map(todo => {
            return <TodoPreview key={todo._id + todo.createdAt}
                todo={todo} onRemoveTodo={removeTodo}
                toggleIsDoneTodo={toggleIsDoneTodo}
            />
        })
    )
}