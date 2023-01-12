import { Link } from 'react-router-dom'
import NewReserveButton from './NewReserveButton'

const UserButton = ({ room, handleReserveRoom, dates }: any) => {
    return (
        <>
            {/* <button
                className="btn-reserve"
                onClick={() => {
                    reserveRoom(room.roomNumber)
                }}
            >
                Reserve
            </button> */}
            <NewReserveButton
                room={room}
                dates={dates}
                handleReserveRoom={handleReserveRoom}
            />
            <button className="btn-view-room">
                <Link
                    state={dates}
                    to={`/service/rooms/${room.roomNumber}`}
                    className="view-room-link"
                >
                    View
                </Link>
            </button>
        </>
    )
}

export default UserButton
