import { Outlet, Navigate } from 'react-router-dom'
import AdminSidebar from './Sidebar/AdminSidebar'
import './Content-Item-Style.css'

interface TPropObject {
    auth: { isLogged: boolean; details: {} }
}

const AdminContentHolder = ({ auth }: TPropObject) => {
    console.log('is Logged: ', auth.isLogged)

    return auth.isLogged ? (
        <div className="main-container">
            <AdminSidebar />
            <Outlet />
        </div>
    ) : (
        <Navigate to={'/auth'} />
    )
}

export default AdminContentHolder
