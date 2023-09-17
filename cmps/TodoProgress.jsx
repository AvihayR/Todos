const { useSelector, useDispatch } = ReactRedux

export function TodoProgress({ todos }) {
    const loggedUser = useSelector(storeState => storeState.user)
    // const todos = useSelector(storeState => storeState.todos)
    const doneTodos = todos.filter(t => t.isDone)


    return (
        <label className="progress">
            Your progress:
            <progress value={doneTodos.length} max={todos.length}></progress>
            <span className="progress-status">
                {doneTodos.length >= todos.length ?
                    'All todos are done! 🎉'
                    :
                    ` ${parseInt((doneTodos.length / todos.length) * 100)}%`
                }
            </span>
        </label>
    )
}