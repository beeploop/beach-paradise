import { Link } from 'react-router-dom'
import ReserveButton from './ReserveButton'

const ReserveCottage = ({ cottage, handleSubmit }: any) => {
    return (
        <>
            <ReserveButton cottage={cottage} handleSubmit={handleSubmit} />
            <button className="btn-view-room">
                <Link
                    to={`/service/cottage/${cottage.cottageId}`}
                    className="view-room-link"
                >
                    View
                </Link>
            </button>
        </>
    )
}

export default ReserveCottage
