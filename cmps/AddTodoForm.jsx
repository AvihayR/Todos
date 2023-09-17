import { todoService } from "../services/todo.service.js";
const { useState } = React

export function AddTodoForm({ onAddTodo }) {
    const [newTodoToBuild, editTodo] = useState(todoService.getEmptyTodo())

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }
        editTodo(prevTodo => ({ ...prevTodo, createdAt: Date.now(), [field]: value }))
    }

    return (
        <form className="add-todo" onChange={handleChange} onSubmit={(ev) => {
            onAddTodo(ev, newTodoToBuild)
            editTodo(prevTodoToBuild => todoService.getEmptyTodo())
        }}>
            <input type="text" name="title" value={newTodoToBuild.title} onChange={handleChange} placeholder="📝Start Typing.. " required={true} />
            <button>Add Todo</button>
        </form>
    )
}