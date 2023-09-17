const { Fragment } = React

export function TodoFilter({ onSetFilterBy, filterBy }) {


    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        const filterToSet = { [field]: value }
        onSetFilterBy(filterToSet)
    }

    return (
        <Fragment>
            <h3>Filter by:</h3>
            <form className="todo-filter" onChange={handleChange} onSubmit={ev => ev.preventDefault()}>
                <label>
                    <input name="txt" type="text" placeholder="Search via text.." />
                </label>
                <section className="status-bar">
                    <label>
                        All
                        <input defaultChecked={true} name="status" value='all' type="radio" />
                    </label>
                    <label>
                        Active
                        <input name="status" value='active' type="radio" />
                    </label>
                    <label>
                        Done
                        <input name="status" value='done' type="radio" />
                    </label>
                </section>
            </form>
        </Fragment>

    )
}