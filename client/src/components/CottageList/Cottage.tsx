import { Link } from 'react-router-dom';
import '../Room/Room.css';
import ReserveButton from '../ViewCottage/ReserveButton';
import EditCottage from './EditCottage';

const Cottage = ({
    cottage,
    isAdmin,
    dates,
    handleModification,
    handleReserveCottage,
}: any) => {
    return (
        <div
            className="room-card"
            style={{ marginBottom: '1em' }}
        >
            <div className="cottage-img">
                <img src="https://thumbs.dreamstime.com/b/tropical-beach-landscape-wooden-bridge-house-water-maldive-79617311.jpg" />
            </div>
            <div className="room-overview">
                <h2>{cottage.name}</h2>
                {/* <p>{}</p> */}
                <p>{cottage.description}</p>
            </div>
            <div className="room-actions">
                <div className="room-rate">₱{cottage.price}</div>
                <div className="room-cta">
                    {isAdmin ? (
                        <EditCottage
                            cottage={cottage}
                            handleModification={handleModification}
                        />
                    ) : (
                        // <ReserveCottage
                        //     cottage={cottage}
                        //     handleSubmit={handleSubmit}
                        // />
                        <>
                            <ReserveButton
                                cottage={cottage}
                                handleReserveCottage={handleReserveCottage}
                                dates={dates}
                            />
                            <button className="btn-view-room">
                                <Link
                                    state={dates}
                                    to={`/service/cottage/${cottage.cottageId}`}
                                    className="view-room-link"
                                >
                                    View
                                </Link>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cottage;
