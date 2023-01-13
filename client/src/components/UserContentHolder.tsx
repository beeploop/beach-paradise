import { Outlet } from 'react-router-dom';
import './Content-Item-Style.css';
import UserSidebar from './Sidebar/UserSidebar';

const ContentHolder = () => {
    return (
        <div className="main-container">
            <UserSidebar />
            <Outlet />
        </div>
    );
};

export default ContentHolder;
