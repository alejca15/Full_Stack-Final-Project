import Switch from "@mui/material/Switch";
import Athlete_services from "../Services/Athlete_services";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Locations_services from "../Services/Locations_services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const label = { inputProps: { "aria-label": "Switch demo" } };

const Candidates_tab = ({ SwitchTab }) => {
  const [Candidates, setCandidates] = useState([]);
  const [Locations, setLocations] = useState([]);

  //Toastify
  const notify_accepted_athlete = () => toast("Candidato aceptado!");
  const notify_denied_athlete = () => toast("Candidato rechazado!");

      

  //useEffect para los candidatos
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await Athlete_services.get_candidates();
        if (!response) {
          return console.log("No se pudieron obtener los candidatos");
        }
        setCandidates(response); //Cambia el valor del hook
      } catch (error) {
        console.error("Error al obtener los candidatos:", error);
      }
    };
    fetchCandidates(); //Llama a la función
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

  //Funcion que acepta Atletas
  const accept_athlete = async (athlete) => {
    console.log(athlete);
    try {
      athlete.athlete_status = "Activo";
      const response = await Athlete_services.updateAthlete(athlete);
      if (!response) {
        console.error(error);
        return console.log("El atleta no pudo ser actualizado");
      }
      setCandidates((Candidates) =>
        Candidates.filter((candidate) => candidate.id !== athlete.id)
      );
      notify_accepted_athlete();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  //Funcion que Deniega Atletas
  const deny_athlete = async (athlete) => {
    try {
      athlete.athlete_status = "Inactivo";
      const response = await Athlete_services.updateAthlete(athlete);
      if (!response) {
        console.error(error);
        return console.log("El atleta no pudo ser actualizado");
      }
      setCandidates((Candidates) =>
        Candidates.filter((candidate) => candidate.id !== athlete.id)
      );
      notify_denied_athlete();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const Candidate_card = (candidate) => {
    return (
      <div key={"Card del usuario" + candidate.id} id="candidate_card">
        <div id="candidate_info_cont">
          <div>Nombre: {candidate.athlete_name}</div>
          <div>Primer Apellido: {candidate.athlete_first_lastname}</div>
          <div>Segundo Apellido: {candidate.athlete_second_lastname}</div>
        </div>
        <div id="btns_container">
          <Button
            variant="contained"
            color="success"
            onClick={(e) => accept_athlete(candidate)}
          >
            Aceptar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={(e) => deny_athlete(candidate)}
          >
            Denegar
          </Button>
          
        </div>
      </div>
    );
  };

  const Display_candidates = () => {
    return Locations.map((Location) => {
      return (
        <div>
          <Accordion id="Accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              {Location.location_name}
            </AccordionSummary>
            <AccordionDetails id="Accordion_info">
              {Candidates.map((Candidate) => {
                if (Candidate.location_id === Location.id) {
                  return Candidate_card(Candidate);
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
    <div id="Athletes_cont">
      <div id="switch_cont">
        <div id="switch">
          Atletas
          <Switch {...label} defaultChecked onChange={SwitchTab} />
          Candidatos
        </div>
      </div>
      <div id="Candidates_cont">{Display_candidates()}</div>
    </div>
  );
};

export default Candidates_tab;
