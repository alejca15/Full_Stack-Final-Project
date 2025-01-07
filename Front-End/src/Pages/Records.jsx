import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Sidetab from "../Components/Sidetab";
import "../Styles/Home.css";
import File_manager from "../Components/File_manager";
import { jwtDecode } from "jwt-js-decode";
import Athlete_services from "../Services/Athlete_services";
import Counselors_services from "../Services/Counselors_services";
import Mentors_services from "../Services/Mentors_services";
import Admins_services from "../Services/Admins_services";
import "../Styles/Records.css";


const Records = () => {
  //Hook de control de tab
  const [userLogged, setUserLogged] = useState(null);

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
      return list.find((user) => user.id === Token_JSON.Table_id);
      
    } else {
      console.error(`No se encontró el servicio para la tabla: ${Rol}`);
    }
  };

  // useEffect para cargar el usuario cuando el componente se monta
  useEffect(() => {
    const fetchUser = async () => {
      const user = await Load_user_logged();
      setUserLogged(user); // Establecemos el estado con los datos del usuario
    };

    fetchUser();
  }, []); // Se ejecuta solo una vez al montarse el componente




  return (
    <div className="Home_body">
      <div id="Nav_container">
        <Navbar />
      </div>
      <div id="Current_tab"><File_manager/></div>
      <div id="Sidetab_container">
        <Sidetab Selected_tab={2}
        />
      </div>
    </div>
  );
};

export default Records;
