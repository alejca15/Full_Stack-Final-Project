import * as React from "react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-js-decode";
import Athlete_services from "../Services/Athlete_services";
import Locations_services from "../Services/Locations_services";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import GradingIcon from "@mui/icons-material/Grading";
import Addresses_services from "../Services/Addresses_services";
import Directions_services from "../Services/Directions_services";
import Cantons_services from "../Services/Cantons_services";
import Parents_services from "../Services/Parents_services";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Edit_athlete_form from "../Components/Edit_athlete_form";
import Mentors_services from "../Services/Mentors_services";
import Admins_services from "../Services/Admins_services";
import Counselors_services from "../Services/Counselors_services";

const label = { inputProps: { "aria-label": "Switch demo" } };

const AthletesTab = ({ SwitchTab }) => {
  //Hooks
  const [athletes, setAthletes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [cantons, setCantons] = useState([]);
  const [directions, setDirections] = useState([]);
  const [userAddresses, setUserAddresses] = useState({});
  const [parents, setParents] = useState([]);
  const [selected_athlete, setSelected_athlete] = useState({});

  //Manejo del modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = (Athlete) => {
    setSelected_athlete(Athlete)
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //Obtener el valor del token
  const Encrypted_token = sessionStorage.getItem("Token");
  const Decoded_token = jwtDecode(Encrypted_token);
  const Token_JSON = Decoded_token.payload;
  const Table_name = Token_JSON.Rol;

  //Obtener el valor del usuario loggeado
  const [user_logged, setUser_logged] = useState(null);
  const Load_user_logged = async () => {
    const serviceMap = {
      Athletes: Athlete_services.getAthletes,
      Mentors: Mentors_services.get_mentors,
      Admins: Admins_services.get_Admins,
      Counselors: Counselors_services.get_counselors,
    };

    const selectedService = serviceMap[Table_name];

    if (selectedService) {
      const list = await selectedService();
      const user = list.find((user) => user.id === Token_JSON.id);
      setUser_logged(user);
    } else {
      console.error(`No se encontró el servicio para la tabla: ${Table_name}`);
    }
  };

  useEffect(() => {
    Load_user_logged();
  }, []);

  //Estilos para el modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    height: "90%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const provinces = {
    1: "San José",
    2: "Alajuela",
    3: "Cartago",
    4: "Heredia",
    5: "Guanacaste",
    6: "Puntarenas",
    7: "Limón",
  };

  //Convertir fecha a string
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", options);
  };

  //useEffect para Obtener todos los valores
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          athletesResponse,
          locationsResponse,
          addressesResponse,
          directionsResponse,
          cantonsResponse,
          parentsResponse,
        ] = await Promise.all([
          Athlete_services.get_accepted_athletes(),
          Locations_services.get_Locations(),
          Addresses_services.get_Adresses(),
          Directions_services.get_Directions(),
          Cantons_services.getCantons(),
          Parents_services.get_parents(),
        ]);

        if (athletesResponse) setAthletes(athletesResponse);
        if (locationsResponse) setLocations(locationsResponse);
        if (addressesResponse) {
          const addressMap = {};
          addressesResponse.forEach((address) => {
            addressMap[address.id] = address;
          });
          setUserAddresses(addressMap);
        }
        if (directionsResponse) setDirections(directionsResponse);
        if (cantonsResponse) setCantons(cantonsResponse);
        if (parentsResponse) setParents(parentsResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //Funcion que crea el contenedor de padres
  const DisplayParents = (athlete) => {
    const athleteParents = parents.filter(
      (parent) => parent.athlete_id === athlete.id
    );

    return (
      <div id="parents_cont">
        <h6 id="parent_title_h">Encargados</h6>
        <div id="parents_name_cont">
          {athleteParents.map((parent) => (
            <div
              key={
                parent.id
                  ? parent.id
                  : `${parent.parent_name}-${parent.parent_phone}`
              }
            >
              <p>
                {parent.parent_name} {parent.parent_first_lastname}{" "}
                {parent.parent_second_lastname}
              </p>
            </div>
          ))}
        </div>
        <h6 id="parent_phone_title">Contacto</h6>
        <div id="parents_phone_cont">
          {athleteParents.map((parent) => (
            <div
              key={
                parent.phone
                  ? parent.phone
                  : `${parent.parent_name}-${parent.id}`
              }
            >
              <p>{parent.parent_phone}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  //Funcion que despliega el tab con la informacion del atleta
  const DisplayAthletes = () => {
    return locations.map((location) => {
      return (
        <div key={location.id}>
          <Accordion id="Accordion_athlete">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              {location.location_name}
            </AccordionSummary>
            <div id="Column_tab">
              <p>Nombre</p>
              <p>Contacto</p>
              <p>Equipo Asignado</p>
              <p>Notas</p>
            </div>
            <AccordionDetails id="Accordion_info">
              {athletes.map((athlete) => {
                if (athlete.location_id === location.id) {
                  const address = userAddresses[athlete.address_id];
                  return (
                    <Accordion
                      key={
                        athlete.id || `${athlete.athlete_name}-${athlete.phone}`
                      }
                      id="Accordion"
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="Athlete_acordion_tab"
                      >
                        <div id="athlete_tab_accordion">
                          <p id="name_paragraph">
                            {athlete.athlete_name}{" "}
                            {athlete.athlete_first_lastname}{" "}
                            {athlete.athlete_second_lastname}
                          </p>
                          <p id="contact_paragraph">{athlete.phone}</p>
                          <p id="medical_icon">
                            <HomeRepairServiceIcon />
                          </p>
                          <p id="grades_icon">
                            <GradingIcon />
                          </p>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails id="Athlete_accordion_info">
                        <div id="mail_cont">
                          <p style={{ fontWeight: "bold" }}>Correo</p>
                          <p>{athlete.mail}</p>
                        </div>
                        <div id="address_cont">
                          <div>
                            <p style={{ fontWeight: "bold" }}>Dirección</p>
                          </div>
                          <div>
                            {address && provinces[address.province_id]}, {""}
                            {address &&
                              cantons.find(
                                (canton) => canton.id === address.canton_id
                              )?.canton_name}
                            , {""}
                            {address &&
                              directions.find(
                                (direction) =>
                                  direction.id === address.direction_id
                              )?.direction_name}
                          </div>
                        </div>

                        {DisplayParents(athlete)}
                        <div id="important_info_cont">
                          <div id="medical_info">
                            <div>
                              <h6>Información Médica</h6>
                              <div id="blood_type_cont">
                                <p>Tipo de Sangre</p>
                                <p style={{ fontWeight: "bold" }}>
                                  {athlete.blood_type}
                                </p>
                              </div>
                              <div id="laterality_cont">
                                <p>Lateralidad</p>
                                <p style={{ fontWeight: "bold" }}>
                                  {athlete.dominant_side}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div id="basic_info_cont">
                            <div>
                              <h6>Información básica</h6>
                              <div id="nationality_cont">
                                <p style={{ fontWeight: "bold" }}>
                                  {athlete.nationality}
                                </p>
                              </div>
                              <div id="gender_cont">
                                <p>Género</p>
                                <p style={{ fontWeight: "bold" }}>
                                  {athlete.gender}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div id="birthday_cont">
                            <p style={{ fontWeight: "bold" }}>
                              Fecha de Nacimiento
                            </p>
                            <p>{formatDate(athlete.birthday)}</p>
                          </div>
                        </div>
                        <div id="educational_info_cont">
                          <p style={{ fontWeight: "bold" }}>
                            Institucion Educativa
                          </p>
                          <p>{athlete.education_entity}</p>
                          <p style={{ fontWeight: "bold" }}>Grado Cursando</p>
                          <p>{athlete.actual_grade}</p>
                        </div>
                        <div id="athlete_picture_cont"></div>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(e)=>{handleOpen(athlete)}}
                        >
                          Editar Atleta
                        </Button>
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
    <div style={{padding:4}} id="Athletes_cont">
      <div id="switch_cont">
        <div id="switch">
          Atletas
          <Switch {...label} onChange={SwitchTab} />
          Candidatos
        </div>
      </div>
      <div id="athletes_card_cont">{DisplayAthletes()}</div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box id="edit_athlete_form_box" sx={style}>
              <Edit_athlete_form User={{ ...selected_athlete }} />
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default AthletesTab;
