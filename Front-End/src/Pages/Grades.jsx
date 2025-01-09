import Navbar from "../Components/Navbar";
import Sidetab from "../Components/Sidetab";
import "../Styles/Home.css";
import Grades_tab from "../Components/Grades_tab";
import { jwtDecode } from "jwt-js-decode";
import Athlete_services from "../Services/Athlete_services";
import Counselors_services from "../Services/Counselors_services";
import Mentors_services from "../Services/Mentors_services";
import Admins_services from "../Services/Admins_services";
import "../Styles/Grades.css";
import { useState, useEffect } from "react";

const Grades = () => {
  //Hook de control de tab
  const [userLogged, setUserLogged] = useState("");

  //Obtenemos el valor del Token
  const Encrypted_token = sessionStorage.getItem("Token");
  const Decoded_token = jwtDecode(Encrypted_token);
  const Token_JSON = Decoded_token.payload;
  const Table_name = Token_JSON.Rol;

  useEffect(() => {
    const Load_user_logged = async () => {
      const serviceMap = {
        Athletes: Athlete_services.get_Athletes,
        Mentors: Mentors_services.get_mentors,
        Admins: Admins_services.get_Admins,
        Counselors: Counselors_services.get_counselors,
      };

      const selectedService = serviceMap[Table_name];

      if (selectedService) {
        const list = await selectedService();
        const user = list.find((user) => user.id === Token_JSON.Table_id);
        setUserLogged(user);
      } else {
        console.error(`No se encontró el servicio para la tabla: ${Table_name}`);
      }
    };

    Load_user_logged();
  }, [Table_name, Token_JSON.Table_id]);


  return (
    <div className="Home_body">
      <div id="Nav_container">
        <Navbar />
      </div>
      <div id="Current_tab">
        <Grades_tab User={userLogged} />
      </div>
      <div id="Sidetab_container">
        <Sidetab Selected_tab={1} />
      </div>
    </div>
  );
};

export default Grades;
