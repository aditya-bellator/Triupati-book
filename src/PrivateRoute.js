import { Navigate, Outlet } from "react-router-dom";
// import Auth from './pages/Auth'

export { PrivateRouter}

function PrivateRouter() {
    let userData = JSON.parse(localStorage.getItem('userMeta'))
    if (!userData) {
        return <Navigate to="/" />
    }
    return <Outlet />
}