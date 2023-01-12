import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Cottagecard from './Cottagecard'
// import './ViewRoom.css'

const ViewCottage = () => {
    const [cottage, setCottage] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    console.log(location)

    useEffect(() => {
        console.log(id)
        fetchRoom()
    }, [])

    function backToPrevPage() {
        navigate(-1)
    }

    async function fetchRoom() {
        // const response = await fetch(`http://localhost:5000/api/cottage/${id}`)
        const response = await fetch(
            `https://beach-reservation.onrender.com/api/cottage/${id}`
        )
        const cottage = await response.json()
        console.log(cottage)
        setCottage(cottage)
    }

    return (
        <div className="main">
            <nav className="individual-room">
                <span
                    onClick={() => {
                        backToPrevPage()
                    }}
                >
                    &larr;
                </span>
            </nav>
            <Cottagecard cottage={cottage} dates={location.state} />
        </div>
    )
}

export default ViewCottage
