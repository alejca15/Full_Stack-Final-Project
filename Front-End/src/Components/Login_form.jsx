import { useState, useContext } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router";
import post_login from "../Services/post_login";
import Endurance_context from "./Context/Endurance_context";
import { jwtDecode } from "jwt-js-decode";
import Athlete_services from "../Services/Athlete_services";

function Login_form() {
  const navigate = useNavigate();
  const [Password, setPassword] = useState("");
  const [Mail, setMail] = useState("");
  const { login } = useContext(Endurance_context);

  const validate_login = async () => {
    //Validaciones
    if (!Password || !Mail) {
      return console.log("Faltan datos");
    }

    const credentials = { mail_usuario: Mail, contra_usuario: Password };

    const encrypted_token_JSON = await post_login(credentials);

    //Resultado y manejo del Token
    if (encrypted_token_JSON && encrypted_token_JSON.token) {
      const token = encrypted_token_JSON.token;
      sessionStorage.setItem("Token", token);
      const Decoded_token = jwtDecode(token);
      const Token_JSON = Decoded_token.payload;
      const Rol = Token_JSON.Rol;
      
      if (Rol === "Athletes") {
        const Candidates = await Athlete_services.get_candidates();
        const is_candidate = Candidates.find((candidate) => candidate.id === Token_JSON.Table_id);
        if (is_candidate) {
          return window.location.reload()
        }
      }
      login(Rol);
      navigate("/Home");
    }
  };

  return (
    <>
      <div id="login_credentials_container">
        <div id="mail_input_container">
          <h5>Correo Electronico</h5>
          <TextField
            onChange={(e) => setMail(e.target.value)}
            id="standard-basic"
            variant="standard"
          />
        </div>
        <div id="password_input_container">
          <h5>Contraseña</h5>
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            id="standard-basic"
            variant="standard"
          />
        </div>
        <Button onClick={validate_login} variant="contained">
          Ingresar
        </Button>
      </div>
    </>
  );
}

export default Login_form;
