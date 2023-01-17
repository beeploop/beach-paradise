import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Cottagecard from './Cottagecard';

const ViewCottage = () => {
    const [cottage, setCottage] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { VITE_REACT_APP_BASE_URL } = import.meta.env;

    console.log(location);

    useEffect(() => {
        console.log(id);
        fetchRoom();
    }, []);

    function backToPrevPage() {
        navigate(-1);
    }

    async function fetchRoom() {
        // const response = await fetch(`http://localhost:5000/api/cottage/${id}`)
        const response = await fetch(
            `${VITE_REACT_APP_BASE_URL}/api/cottage/${id}`
        );
        const cottage = await response.json();
        console.log(cottage);
        setCottage(cottage);
    }

    return (
        <div className="main">
            <nav className="individual-room">
                <span
                    onClick={() => {
                        backToPrevPage();
                    }}
                >
                    &larr;
                </span>
            </nav>
            <Cottagecard
                cottage={cottage}
                dates={location.state}
            />
        </div>
    );
};

export default ViewCottage;
