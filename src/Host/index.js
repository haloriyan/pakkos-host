import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Second from "./Second";
import Listing from "./Listing";
import Create from "./Create";
import Login from "./Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import config from "../config";
import Edit from "./Edit";
import UserMiddleware from "../Middleware/User";

const HostRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<GoogleOAuthProvider clientId={config.google_client_id}><Home /></GoogleOAuthProvider>} />
            <Route path="/login" element={<GoogleOAuthProvider clientId={config.google_client_id}><Login /></GoogleOAuthProvider>} />
            <Route path="/listing" element={<GoogleOAuthProvider clientId={config.google_client_id}><Listing /></GoogleOAuthProvider>} />
            <Route path="/listing/:id/edit" element={<GoogleOAuthProvider clientId={config.google_client_id}><UserMiddleware><Edit /></UserMiddleware></GoogleOAuthProvider>} />
            <Route path="/create" element={<GoogleOAuthProvider clientId={config.google_client_id}><UserMiddleware><Create /></UserMiddleware></GoogleOAuthProvider>} />
        </Routes>
    )
}

export default HostRouter;