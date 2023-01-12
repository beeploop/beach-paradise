import { Outlet, Navigate } from 'react-router-dom'

interface TPropObject {
    auth: { islogged: boolean; details: {} }
}

function ProtectedRoutes({ auth }: TPropObject) {
    console.log('is Logged?: ', auth.islogged)

    return auth.islogged ? <Outlet /> : <Navigate to={'/auth'} />
}

export default ProtectedRoutes
