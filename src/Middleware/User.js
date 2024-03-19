import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserMiddleware = ({children}) => {
    const [admin, setAdmin] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (admin === null) {
            let myData = JSON.parse(window.localStorage.getItem('user_data'));
            if (myData === null) {
                navigate('/');
            } else {
                setAdmin(myData)
            }
        }
    }, [admin]);

    if (admin !== null) {
        return children;
    }
}

export default UserMiddleware;