import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router";
import post_login from "../Services/post_login";
import { jwtDecode } from "jwt-js-decode";

function Login_form() {
  const navigate = useNavigate();
  const [Password, setPassword] = useState("");
  const [Mail, setMail] = useState("");

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
      navigate("/Home")
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
