import Navbar from "../Components/Navbar";
import Sidetab from "../Components/Sidetab";
import "../Styles/Home.css";

const Home = () => {
  return (
    <div className="Home_body">
      <div id="Nav_container">
        <Navbar />
      </div>
      <div id="Sidetab_container">
        <Sidetab />
      </div>
    </div>
  );
};

export default Home;
