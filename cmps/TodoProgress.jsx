const { useSelector } = ReactRedux

export function TodoProgress({ todos }) {
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    const doneTodos = todos.filter(t => t.isDone)

    if (todos.length === 0 && doneTodos.length === 0) return <h2>No todos yet, Try adding one!</h2>
    else return (
        <label className="progress">
            Your progress:
            <progress value={doneTodos.length} max={todos.length}></progress>
            <span className="progress-status">

                {
                    doneTodos.length >= todos.length ?
                        'All todos are done! 🎉'
                        :
                        ` ${parseInt((doneTodos.length / todos.length) * 100)}%`
                }

            </span>
        </label>
    )
}