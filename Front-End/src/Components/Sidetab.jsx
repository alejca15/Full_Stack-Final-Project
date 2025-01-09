import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-js-decode";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function Sidetab({ Selected_tab }) {
  const [value, setValue] = useState(Selected_tab);
  const navigate = useNavigate();

  //Obtenemos el valor del Token
  const Encrypted_token = sessionStorage.getItem("Token");
  const Decoded_token = jwtDecode(Encrypted_token);
  const Token_JSON = Decoded_token.payload;
  const Table_name = Token_JSON.Rol;


  const goCalendar=()=>{
    navigate("/Home")
  }
  const goGrades=()=>{
    navigate("/Home/Grades")
  }

  const goRecords=()=>{
    navigate("/Home/Records")
  }

  const goUser=()=>{
    navigate("/Home/User")
  }

  const goAthletes=()=>{
    navigate("/Home/Athletes")
  }

  //handlechange para el tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const display_tabs = () => {
    switch (Table_name) {
      case "Athletes":
        return [
          <Tab key="notas" onClick={goGrades} label="Notas" />,
          <Tab key="informacion" onClick={goUser} label="Informacion del Usuario" />,
        ];
      case "Mentors":
        return [
          <Tab key="atletas" onClick={goAthletes} label="Atletas" />,
          <Tab key="expediente" onClick={goRecords} label="Expediente" />,
          <Tab key="informacion" onClick={goUser}  label="Informacion del Usuario" />,
        ];
      case "Counselors":
        return [
          <Tab key="atletas" onClick={goAthletes} label="Atletas" />,
          <Tab key="mentores" label="Mentores" />,
          <Tab key="expediente" onClick={goRecords} label="Expediente" />,
          <Tab key="informacion" onClick={goUser}  label="Informacion del Usuario" />,
        ];
      case "Admins":
        return [
          <Tab key="atletas"  onClick={goAthletes} label="Atletas" />,
          <Tab key="expediente" onClick={goRecords}  label="Expediente" />,
          <Tab key="informacion" onClick={goUser}  label="Informacion del Usuario" />,
          <Tab key="sedes" label="Sedes" />,
        ];

      default:
        break;
    }
  };

  return (
    <div id="Sidetab_body">
      <Box sx={{ width: "100%" }}>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            orientation="vertical"
          >
            {display_tabs()}
          </Tabs>
        </Box>
      </Box>
    </div>
  );
}
