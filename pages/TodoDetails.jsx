import { todoService } from "../services/todo.service.js"
import { EDIT_TODO, store } from '../store/store.js'
const { useSelector, useDispatch } = ReactRedux
const { useState, useEffect } = React
const { useParams, Link, useNavigate, useLocation } = ReactRouterDOM

export function TodoDetails() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const todoId = useParams().todoId
    const todos = useSelector(storeState => storeState.todos)
    let todo = todos.find(t => t._id === todoId)

    function saveChanges(ev) {
        ev.preventDefault()
        todoService.save(todo)
            .then(() => { navigate('/') })
    }

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
        todo = { ...todo, [field]: value }
        dispatch({ type: EDIT_TODO, todo })
    }

    return (

        !todo ? 'Loading..'
            : <section className="todo-details">
                <h2>Todo details</h2>
                <form className="details-form" onChange={handleChange}>
                    <label className="title">
                        Title:
                        <input type="text" name="title" value={todo.title} onChange={handleChange} />
                    </label>
                    <span className="created-at-label">
                        Created at:
                        <span className="created-at">{new Date(todo.createdAt).toLocaleString()}</span>
                    </span>
                    {todo.owner ? <h4 className="created-by">Created by <span className="owner">{todo.owner.fullname}</span>.</h4> : ''}
                    <label className="is-done-label">
                        <input type="checkbox" name="isDone" checked={todo.isDone} onChange={handleChange} />
                        <span className="is-done-status">
                            {todo.isDone ? 'Marked Done! 🎉' : 'Mark as done'}
                        </span>
                    </label>
                    <button onClick={saveChanges}>Save</button>
                </form>
            </section>

    )
}