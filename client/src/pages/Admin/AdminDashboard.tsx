import ContentHeader from '../../components/ContentHeader'
import DashboardLayout from '../../components/Dashboard/DashboardLayout'

const AdminDashboard = () => {
    return (
        <div className="main">
            <ContentHeader text={'Dashboard'} />
            <DashboardLayout />
        </div>
    )
}

export default AdminDashboard
