import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router";

function Login_form() {
  const navigate= useNavigate();

  const redirection=()=>{
    return navigate("/Athlete")
  }

  
  return (
    <>
      <div id="login_credentials_container">
        <div id="mail_input_container">
          <h5>Correo Electronico</h5>
          <TextField id="standard-basic" variant="standard" />
        </div>
        <div id="password_input_container">
          <h5>Contraseña</h5>
          <TextField id="standard-basic" variant="standard" />
        </div>
        <Button onClick={redirection} variant="contained">Ingresar</Button>
      </div>
    </>
  );
}

export default Login_form;
