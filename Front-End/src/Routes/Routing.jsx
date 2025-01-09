import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login"
import Home from "../Pages/Home"
import User_info from "../Pages/User_info";
import Grades from "../Pages/Grades"
import Records from "../Pages/Records";
import Athletes from "../Pages/Athletes";
import Private_routes from "./Private_routes";


function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Private_routes><Home /></Private_routes>} />
        <Route path="/Home/User" element={<Private_routes><User_info /></Private_routes>} />
        <Route path="/Home/Grades" element={<Private_routes><Grades /></Private_routes>} />
        <Route path="/Home/Records" element={<Private_routes><Records /></Private_routes>} />
        <Route path="/Home/Athletes" element={<Private_routes><Athletes /></Private_routes>} />
      </Routes>
    </Router>
  );
}

export default Routing;
