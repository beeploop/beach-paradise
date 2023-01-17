import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type TAdminData = {
    name: string;
    role: string;
    email: string;
    phone: string;
};

type TUserToken = {
    data: TAdminData;
    token: string;
};

export default function useAuth() {
    const [token, setToken] = useState(getToken());
    const navigate = useNavigate();

    function getToken() {
        const tokenString = sessionStorage.getItem('token');
        if (tokenString) {
            const storedToken = JSON.parse(tokenString);
            return storedToken;
        }
    }

    function saveToken(userToken: TUserToken) {
        console.log({ userToken });
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
        if (userToken.data.role === 'admin') {
            navigate('/admin/dashboard');
        } else if (userToken.data.role === 'staff') {
            navigate('/reception');
        }
    }

    return {
        token: token,
        setToken: saveToken,
    };
}
