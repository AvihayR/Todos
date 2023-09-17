import { TodoPreview } from "./TodoPreview.jsx"
export function TodoList({ todos, removeTodo, toggleIsDoneTodo }) {

    return (
        todos.map(todo => {
            return <TodoPreview key={todo._id + todo.createdAt}
                todo={todo} onRemoveTodo={removeTodo}
                toggleIsDoneTodo={toggleIsDoneTodo}
            />
        })
    )
}