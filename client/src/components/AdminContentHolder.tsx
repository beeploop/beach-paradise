import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './Content-Item-Style.css';
import AdminSidebar from './Sidebar/AdminSidebar';

interface TPropObject {
    auth: { isLogged: boolean; details: {} };
}

const AdminContentHolder = ({ auth }: TPropObject) => {
    // console.log('is Logged: ', auth.isLogged);
    const { token } = useAuth();
    console.log({ token });

    return token ? (
        token.data.role === 'admin' ? (
            <div className="main-container">
                <AdminSidebar />
                <Outlet />
            </div>
        ) : (
            <Navigate to={'/reception'} />
        )
    ) : (
        <Navigate to={'/auth'} />
    );
};

export default AdminContentHolder;
