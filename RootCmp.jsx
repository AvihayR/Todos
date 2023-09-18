const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { Provider } = ReactRedux

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
// import { AppFooter } from './cmps/AppFooter.jsx'
import { TodoApp } from './pages/TodoApp.jsx'
import { TodoDetails } from './pages/TodoDetails.jsx'
import { store } from './store/store.js'


export function App() {

    return (
        <Provider store={store}>
            <Router>
                <AppHeader />
                <section className="main-layout app">
                    <main>
                        <Routes>
                            <Route path="/" element={<TodoApp />} />
                            <Route path="/todo" element={<TodoDetails />} />
                            <Route path="/todo/:todoId" element={<TodoDetails />} />
                            {/* <Route element={<AboutUs />} path="/about" /> */}
                            {/* <Route element={<CarIndex />} path="/car" /> */}
                        </Routes>
                    </main>
                </section>
                <UserMsg />
                {/* <AppFooter /> */}
            </Router>
        </Provider>
    )
}


