
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { SET_LOGGED_USER, LOG_OUT, store } from '../store/store.js'

const { useSelector, useDispatch } = ReactRedux
const { useState } = React

function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
    }
}

export function LoginSignup() {

    const [credentials, setCredentials] = useState(getEmptyCredentials())
    const [isSignupState, setIsSignupState] = useState(false)
    const dispatch = useDispatch()
    const loggedUser = useSelector(storeState => storeState.user)
    // console.log(loggedUser)

    function onLogout() {
        userService.logout()
            .then(dispatch({ type: LOG_OUT }))
    }

    function onSetUser(user) {
        dispatch({ type: SET_LOGGED_USER, user })
    }

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials(credentials => ({ ...credentials, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        const method = isSignupState ? 'signup' : 'login'

        console.log(method)

        return userService[method](credentials)
            .then((user) => {
                onSetUser(user)
                // showSuccessMsg(`Welcome ${user.fullname}`)
                console.log(`Welcome, ${user}`)
            })
            .catch(err => {
                // showErrorMsg('OOps try again')
                console.log('Oops, try again')
            })
    }

    function onToggleSignupState() {
        setIsSignupState(isSignupState => !isSignupState)
    }

    const { username, password, fullname } = credentials

    return (
        loggedUser ?
            <section className='logged-user-panel'>
                <h1>Hello, {loggedUser.fullname}!</h1>
                <button onClick={onLogout}>Logout</button>
            </section>
            :
            <div className="login-page">
                <h2 className="login-signup-reminder">'Login / Sign up to save Private todos!'</h2>
                <form className="login-form" onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={handleCredentialsChange}
                        required
                        autoFocus
                    />

                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={handleCredentialsChange}
                        required
                    />

                    {isSignupState && <input
                        type="text"
                        name="fullname"
                        value={fullname}
                        placeholder="Full name"
                        onChange={handleCredentialsChange}
                        required
                    />}

                    <button>{isSignupState ? 'Signup' : 'Login'}</button>
                </form>

                <div className="btns">
                    <a href="#" onClick={onToggleSignupState}>
                        {isSignupState ? 'Already a member? Login' : 'New user? Signup here'}
                    </a >
                </div>
            </div >
    )
}

