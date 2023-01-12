import { useState, lazy, Suspense, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Loader from './components/Loader/Loader'
import Homepage from './pages/Homepage'
const StaffPage = lazy(() => import('./pages/Staff/StaffPage'))
const UserContentHolder = lazy(() => import('./components/UserContentHolder'))
const RoomsPage = lazy(() => import('./pages/User/RoomsPage'))
const CottagesPage = lazy(() => import('./pages/User/CottagesPage'))
const ReservationsPage = lazy(() => import('./pages/Admin/ReservationsPage'))
const ViewRoom = lazy(() => import('./components/ViewRoom/ViewRoom'))
const AdminContentHolder = lazy(() => import('./components/AdminContentHolder'))
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'))
const AdminRoomsPage = lazy(() => import('./pages/Admin/AdminRoomsPage'))
const AdminCottagesPage = lazy(() => import('./pages/Admin/AdminCottagesPage'))
const LogoutAdmin = lazy(() => import('./components/LogoutAdmin'))
import { AuthenticationTitle } from './components/AdminLogin/AuthenticationTitle'
import './App.css'
import AddCottage from './components/AddCottage/AddCottage'
import ViewCottage from './components/ViewCottage/ViewCottage'
import { NotFoundTitle } from './components/NotFound/NotFoundTitle'

type TAdmin = {
    adminID: number
    email: String
    password: String
}

const App = () => {
    const [auth, setAuth] = useState({
        isLogged: false,
        details: {},
    })

    function authAdmin(admin: TAdmin) {
        setAuth((current) => ({ isLogged: true, details: admin }))
        console.log(admin)
    }

    function handleLogout() {
        setAuth((current) => ({ isLogged: false, details: {} }))
    }

    return (
        <div className="App-container">
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route
                        path="/auth"
                        element={<AuthenticationTitle setAuth={authAdmin} />}
                    />
                    <Route
                        path="/admin"
                        element={<AdminContentHolder auth={auth} />}
                    >
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="rooms" element={<AdminRoomsPage />} />
                        <Route
                            path="cottages"
                            element={<AdminCottagesPage />}
                        />
                        <Route
                            path="reservations"
                            element={<ReservationsPage />}
                        />
                        <Route
                            path="logout"
                            element={
                                <LogoutAdmin handleLogout={handleLogout} />
                            }
                        />
                    </Route>
                    <Route path="/reception" element={<StaffPage />} />
                    <Route path="/service" element={<UserContentHolder />}>
                        <Route index element={<RoomsPage />} />
                        <Route path="rooms" element={<RoomsPage />} />
                        <Route path="rooms/:id" element={<ViewRoom />} />
                        <Route path="cottages" element={<CottagesPage />} />
                        <Route path="cottage/:id" element={<ViewCottage />} />
                    </Route>
                    <Route path="/404" element={<NotFoundTitle />} />
                    <Route
                        path="*"
                        element={<Navigate replace to={'/404'} />}
                    />
                </Routes>
            </Suspense>
        </div>
    )
}

export default App
