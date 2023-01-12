import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Roomcard from './Roomcard'
import './ViewRoom.css'

const ViewRoom = () => {
    const [room, setRoom] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        fetchRoom()
    }, [])

    function backToPrevPage() {
        navigate(-1)
    }

    async function fetchRoom() {
        // const response = await fetch(`http://localhost:5000/api/rooms/${id}`)
        const response = await fetch(
            `https://beach-reservation.onrender.com/api/rooms/${id}`
        )
        const room = await response.json()
        console.log(room)
        setRoom(room)
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
            <Roomcard room={room} dates={location.state} />
        </div>
    )
}

export default ViewRoom
