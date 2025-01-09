import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Sidetab from "../Components/Sidetab";
import "../Styles/Home.css";
import Edit_athlete_form from "../Components/Edit_athlete_form";
import { jwtDecode } from "jwt-js-decode";
import Athlete_services from "../Services/Athlete_services";
import Counselors_services from "../Services/Counselors_services";
import Mentors_services from "../Services/Mentors_services";
import Admins_services from "../Services/Admins_services";
import "../Styles/User_info.css";
import Edit_mentor_form from "../Components/Edit_mentor_form";


const User_info = () => {
  //Hook de control de tab
  const [userLogged, setUserLogged] = useState(null);

  //Obtenemos el valor del Token
  const Encrypted_token = sessionStorage.getItem("Token");
  const Decoded_token = jwtDecode(Encrypted_token);
  const Token_JSON = Decoded_token.payload;
  const Rol = Token_JSON.Rol;

  //Carga el usuario loggeado
  const Load_user_logged = async () => {
    const serviceMap = {
      Athletes: Athlete_services.get_Athletes,
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
  }, []); 

  // Si el usuario aún no se ha cargado, mostramos un mensaje de carga
  if (!userLogged) {
    return <div>Loading...</div>;
  }

  //Switch para validar cual form de edicion de usuarios se muestra 

  const show_edit_user_form = () => {
    switch (Rol) {
      case "Athletes":
        return <Edit_athlete_form User={userLogged} />;
      case "Mentors":
        return <div id="Edit_mentor_form_main_cont"><Edit_mentor_form  User={userLogged} /></div>;
      default:
        return <div>No se encontró el rol del usuario</div>;
    }
  };


  return (
    <div className="Home_body">
      <div id="Nav_container">
        <Navbar />
      </div>
      <div id="Current_tab">{show_edit_user_form()}</div>
      <div id="Sidetab_container">
        <Sidetab Selected_tab={3}
        />
      </div>
    </div>
  );
};

export default User_info;
