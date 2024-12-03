import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login"
import Home from "../Pages/Home"




function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default Routing;
