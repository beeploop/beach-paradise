import { Outlet } from 'react-router-dom'
import UserSidebar from './Sidebar/UserSidebar'
import './Content-Item-Style.css'

const ContentHolder = () => {
    return (
        <div className="main-container">
            <UserSidebar />
            <Outlet />
        </div>
    )
}

export default ContentHolder
