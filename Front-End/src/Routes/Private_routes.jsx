import {React,useContext} from "react";
import { Navigate } from "react-router-dom";
import Endurance_context from "../Components/Context/Endurance_context";


const Private_routes = ({ children }) => {
    const { isAuthenticated } = useContext(Endurance_context);
    console.log("Log autentificacion",isAuthenticated);
    
    
    return isAuthenticated ? children : <Navigate to="/Login" />;
};

export default Private_routes;