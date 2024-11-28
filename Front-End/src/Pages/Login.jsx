import Login_form from "../Components/Login_form";
import Register_form from "../Components/Register_form";
import "../Styles/Login.css";
import { useState } from "react";
import Banner from "../Assets/FundaBanner.png";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

const Login = () => {
  const [SelectForm, setSelectForm] = useState("Login");


  //-----------------------------------------------------------------------//
  //OffCanvas para el Login
  const [stateLogin, setStateLogin] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  
  const toggleDrawerLogin = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setStateLogin({ ...stateLogin, [anchor]: open });
  };

  const List_login = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 450 }}
      role="presentation"
    >
      <Login_form />;
    </Box>
  );

//-----------------------------------------------------------------------//
  //OffCanvas para el Register

  const [stateRegister, setStateRegister] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


  const toggleDrawerRegister = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setStateRegister({ ...stateRegister, [anchor]: open });
  };

  const List_Register = (anchor) => (
    <Box
      id="Main_container_signup"
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 1050 }}
      role="presentation"
    >
      <Register_form />;
    </Box>
  );

//-----------------------------------------------------------------------//
  return (
    <>
      <div id="Login_body">
          <div id="Login_button">
            {["Iniciar Sesión"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button id="login_button" variant="contained" onClick={toggleDrawerLogin(anchor, true)}>
                  {anchor}
                </Button>
                <Drawer
                  anchor={"left"}
                  open={stateLogin[anchor]}
                  onClose={toggleDrawerLogin(anchor, false)}
                >
                  {List_login(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </div>
          <div id="Signup_button">
            {["Registrarse"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button id="login_button" variant="contained" color="error" onClick={toggleDrawerRegister(anchor, true)}>
                  {anchor}
                </Button>
                <Drawer
                  anchor={"right"}
                  open={stateRegister[anchor]}
                  onClose={toggleDrawerRegister(anchor, false)}
                >
                  {List_Register(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
        </div>
        <img id="Funda_banner" src={Banner} alt="CRC Banner" />
      </div>
    </>
  );
};

export default Login;
