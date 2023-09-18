import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { logIn, logOut, signUp } from '../store/actions/user.action.js'

const { useSelector } = ReactRedux
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
    const loggedUser = useSelector(storeState => storeState.userModule.user)

    function onLogout() {
        logOut()
            .then(res => showSuccessMsg('Logged out!'))
            .catch(err => showErrorMsg(err))
    }

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials(credentials => ({ ...credentials, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        if (isSignupState) {
            return signUp(credentials)
                .then(showSuccessMsg('Signed up successfully!'))
                .catch(err => console.log(err))
        } else {
            logIn(credentials)
                .then(res => showSuccessMsg(`Logged in successfully!`))
                .catch(err => showErrorMsg(`Error: ${err}`))
        }
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
                <h2 className="login-signup-reminder">Login / Sign up to save Private todos!</h2>
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

