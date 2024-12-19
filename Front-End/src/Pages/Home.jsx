import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidetab from "../Components/Sidetab";
import "../Styles/Home.css";
import Calendar_tab from "../Components/Calendar";
import { jwtDecode } from "jwt-js-decode";
import Athlete_services from "../Services/Athlete_services";
import Counselors_services from "../Services/Counselors_services";
import Mentors_services from "../Services/Mentors_services";
import Admins_services from "../Services/Admins_services";

const Home = () => {
  //Hook de control de tab

  let user_logged = {};

  //Obtenemos el valor del Token
  const Encrypted_token = sessionStorage.getItem("Token");
  const Decoded_token = jwtDecode(Encrypted_token);
  const Token_JSON = Decoded_token.payload;
  const Rol = Token_JSON.Rol;

  const Load_user_logged = async () => {
    const serviceMap = {
      Athletes: Athlete_services.getAthletes,
      Mentors: Mentors_services.get_mentors,
      Admins: Admins_services.get_Admins,
      Counselors: Counselors_services.get_counselors,
    };

    const selectedService = serviceMap[Rol];

    if (selectedService) {
      const list = await selectedService();
      user_logged = list.find((user) => user.id === Token_JSON.Table_id);
    } else {
      console.error(`No se encontró el servicio para la tabla: ${Rol}`);
    }
  };

  Load_user_logged();


  return (
    <div className="Home_body">
      <div id="Nav_container">
        <Navbar />
      </div>
      <div id="Current_tab"><Calendar_tab/></div>
      <div id="Sidetab_container">
        <Sidetab
        Selected_tab={0}
        />
      </div>
    </div>
  );
};

export default Home;
