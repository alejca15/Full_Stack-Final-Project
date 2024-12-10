import Switch from "@mui/material/Switch";
import { useState, useEffect } from "react";
import Athlete_services from "../Services/Athlete_services";
import Locations_services from "../Services/Locations_services";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import GradingIcon from '@mui/icons-material/Grading';
import Addresses_services from "../Services/Addresses_services";
import Directions_services from "../Services/Directions_services";
import Cantons_services from "../Services/Cantons_services";

const label = { inputProps: { "aria-label": "Switch demo" } };

const Athletes_tab = ({ Switch_Tab }) => {
  //Hooks
  const [Athletes, setAthletes] = useState([]);
  const [Locations, setLocations] = useState([]);
  const [Addresses,setAddresses]=useState([]);
  const [Cantons,setCantons]=useState([]);
  const [Directions,setDirections]=useState([]);

  const Provinces={
    "San José":1,
  }

  //useEffect para los atletas
  useEffect(() => {
    const fetch_athletes = async () => {
      try {
        const response = await Athlete_services.getAthletes();
        if (!response) {
          return console.log("No se pudieron obtener los atletas");
        }
        setAthletes(response); //Cambia el valor del hook
      } catch (error) {
        console.error("Error al obtener los atletas:", error);
      }
    };
    fetch_athletes(); //Llama a la función
  }, []);

  //useEffect para las sedes
  useEffect(() => {
    //Función async para obtener los datos
    const fetchLocations = async () => {
      try {
        const response = await Locations_services.get_Locations();
        if (!response) {
          return console.log("No se pudieron obtener las sedes");
        }
        setLocations(response); //Cambia el valor del hook
      } catch (error) {
        console.error("Error al obtener las sedes:", error);
      }
    };
    fetchLocations(); //Llama a la función
  }, []);

  //useEffect para las direcciones
  useEffect(() => {
    const fetch_addresses = async () => {
      try {
        const response = await Addresses_services.get_Adresses()
        if (!response) {
          return console.log("No se pudieron obtener las Direcciones");
        }
        setAddresses(response); //Cambia el valor del hook
      } catch (error) {
        console.error("Error al obtener las Direcciones:", error);
      }
    };
    fetch_addresses(); //Llama a la función
  }, []);

  //useEffect para las Direcciones Exactas
  useEffect(() => {
    const fetch_directions = async () => {
      try {
        const response = await Directions_services.get_Directions();
        if (!response) {
          return console.log("No se pudieron obtener las Direcciones exactas");
        }
        setDirections(response); //Cambia el valor del hook
      } catch (error) {
        console.error("Error al obtener las Direcciones exactas", error);
      }
    };
    fetch_directions(); //Llama a la función
  }, []);

   //useEffect para los cantones
   useEffect(() => {
    const fetch_cantons = async () => {
      try {
        const response = await Cantons_services.getCantons()
        if (!response) {
          return console.log("No se pudieron obtener los Cantones");
        }
        setCantons(response); //Cambia el valor del hook
      } catch (error) {
        console.error("Error al obtener los Cantones", error);
      }
    };
    fetch_cantons(); //Llama a la función
  }, []);

  const Display_athletes = () => {
    return Locations.map((Location) => {
      return (
        <div>
          <Accordion id="Accordion_athlete">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{color:"white"}} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              {Location.location_name}
            </AccordionSummary>
            <div id="Column_tab">
              <p>Nombre</p>
              <p>Contacto</p>
              <p>Expediente Médico</p>
              <p>Notas</p>
            </div>
            <AccordionDetails id="Accordion_info">
              {Athletes.map((Athlete) => {
                if (Athlete.location_id === Location.id) {
                  return (
                    <Accordion id="Accordion">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="Athlete_acordion_tab"
                      >
                        <div id="athlete_tab_accordion">
                          <p id="name_paragraph">{Athlete.athlete_name} {Athlete.athlete_first_lastname} {Athlete.athlete_second_lastname}</p>
                          <p id="contact_paragraph">{Athlete.phone}</p>
                          <p id="medical_icon"><MedicalInformationIcon/></p>
                          <p id="grades_icon"><GradingIcon/></p>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails id="Athlete_accordion_info">
                        <div>
                          <p>Correo: {Athlete.mail}</p>
                          <p>Dirección: {}</p>
                        </div>
                        
                      </AccordionDetails>
                    </Accordion>
                  );
                }
                return null;
              })}
            </AccordionDetails>
          </Accordion>
        </div>
      );
    });
  };

  return (
    <div style={{padding:8}} id="Athletes_cont">
      <div  id="switch_cont">
        <div id="switch">
          Atletas
          <Switch {...label} onChange={Switch_Tab} />
          Candidatos
        </div>
      </div>
      <div  id="athletes_card_cont">{Display_athletes()}</div>
    </div>
  );
};

export default Athletes_tab;
