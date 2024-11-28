import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login"
import Athlete from "../Pages/Athlete"




function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Athlete" element={<Athlete />} />
      </Routes>
    </Router>
  );
}

export default Routing;
