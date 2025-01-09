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
        <Route path="/Home/User" element={<User_info />} />
        <Route path="/Home/Grades" element={<Grades />} />
        <Route path="/Home/Records" element={<Records />} />
        <Route path="/Home/Athletes" element={<Athletes />} />
      </Routes>
    </Router>
  );
}

export default Routing;
