import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface TPropFunction {
    handleLogout: Function;
}

const LogoutAdmin = ({ handleLogout }: TPropFunction) => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            // handleLogout();
            sessionStorage.clear();
            navigate('/');
        }, 1000);
    });

    return (
        <div className="main">
            <h1>Logging out...</h1>
        </div>
    );
};

export default LogoutAdmin;
