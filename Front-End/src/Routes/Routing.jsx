import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login"
import Home from "../Pages/Home"
import User_info from "../Pages/User_info";
import Grades from "../Pages/Grades"
import Incidents from "../Pages/Incidents";
import Athletes from "../Pages/Athletes";





function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Home/User" element={<User_info />} />
        <Route path="/Home/Grades" element={<Grades />} />
        <Route path="/Home/Incidents" element={<Incidents />} />
        <Route path="/Home/Athletes" element={<Athletes />} />
      </Routes>
    </Router>
  );
}

export default Routing;
