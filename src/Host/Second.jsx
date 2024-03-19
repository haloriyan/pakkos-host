import React from "react";
import { Link } from "react-router-dom";

const Second = () => {
    return (
        <>
            Second. Go to <Link to={'/'}>Home</Link>
            {/* Second. Go to <a href={'/'}>Home</a> */}
        </>
    )
}

export default Second;