const { useNavigate } = ReactRouterDOM


export function TodoPreview({ todo, onRemoveTodo, toggleIsDoneTodo }) {
    const { title, createdAt, isDone, _id } = todo
    const navigate = useNavigate()

    function handleChange(ev) {
        ev.stopPropagation()
        const { target } = ev

        const field = target.dataset.name
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
        toggleIsDoneTodo(todo)
    }

    return (
        <div className={`todo-preview ${todo.isDone ? 'done' : ''}`} onClick={() => navigate(`/todo/${todo._id}`)}>
            <input checked={todo.isDone} type="checkbox" onChange={ev => handleChange(ev)} onClick={ev => ev.stopPropagation()} />
            <h3 className="todo-title">{title}</h3>
            <button onClick={(ev) => {
                ev.stopPropagation()
                onRemoveTodo(_id)
            }}>X</button>
        </div>
    )
}