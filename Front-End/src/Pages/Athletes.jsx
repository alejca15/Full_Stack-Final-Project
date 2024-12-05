import Navbar from "../Components/Navbar";
import Sidetab from "../Components/Sidetab";
import "../Styles/Athletes.css";
import Athletes_tab from "../Components/Athletes_tab";
import Candidates_tab from "../Components/Candidates";
import { jwtDecode } from "jwt-js-decode";
import Athlete_services from "../Services/Athlete_services";
import Counselors_services from "../Services/Counselors_services";
import Mentors_services from "../Services/Mentors_services";
import Admins_services from "../Services/Admins_services";
import { useState } from "react";

const Athletes = () => {
  //Hook de control de tab
  const [Tab, setTab] = useState("Athletes");
  const showCandidates = () =>setTab("Candidates");
  const showAthletes = () => setTab("Athletes");

 const load_Tab=()=>{
    switch (Tab) {
        case "Athletes":
          return <Athletes_tab Switch_Tab={showCandidates}/>;
        case "Candidates":
          return <Candidates_tab Switch_Tab={showAthletes}/>;
        default:
          break;
      }
 }

  let user_logged = {};

  //Obtenemos el valor del Token
  const Encrypted_token = sessionStorage.getItem("Token");
  const Decoded_token = jwtDecode(Encrypted_token);
  const Token_JSON = Decoded_token.payload;
  const Table_name = Token_JSON.Rol;
  console.log(Token_JSON);

  const Load_user_logged = async () => {
    const serviceMap = {
      Athletes: Athlete_services.getAthletes,
      Mentors: Mentors_services.get_mentors,
      Admins: Admins_services.get_Admins,
      Counselors: Counselors_services.get_counselors,
    };

    const selectedService = serviceMap[Table_name];

    if (selectedService) {
      const list = await selectedService();
      user_logged = list.find((user) => user.id === Token_JSON.id);
    } else {
      console.error(`No se encontró el servicio para la tabla: ${Table_name}`);
    }
  };

  Load_user_logged();

  return (
    <div className="Home_body">
      <div id="Nav_container">
        <Navbar />
      </div>
      <div id="Current_tab">
        {load_Tab()}
      </div>
      <div id="Sidetab_container">
        <Sidetab Selected_tab={1} />
      </div>
    </div>
  );
};

export default Athletes;
