import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Partials/Header";
import Benefits from "../Partials/Benefits";
import useUser from "../Hooks/useUser";
import Welcome from "../Partials/Welcome";

const Home = () => {
    const [user, setUser] = useUser(true);
    const navigate = useNavigate();
    const [viewing, setViewing] = useState('default');

    useEffect(() => {
        if ((user !== null || user !== 'unauthenticated') && user.role === 'host') {
            navigate('/listing');
            // setViewing('welcome')
        }
    }, [user]);

    return (
        <>
            <Header active={'home'} />
            <div className="content">
                {
                    viewing === 'default' &&
                    <Benefits user={user} />
                }
            </div>
        </>
    )
}

export default Home;