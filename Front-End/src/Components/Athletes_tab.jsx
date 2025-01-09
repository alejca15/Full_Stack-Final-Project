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
import User_services from "../Services/User_services";
import Counselors_services from "../Services/Counselors_services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Athletes_records_services from "../Services/Athletes_records_services";

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
  const [Users, setUsers] = useState([]);
  const [file_view, setfile_view] = useState(false);
  const [files_records, setFiles_records] = useState([]);
  const [grade_to_show, setGrade_to_show] = useState(null);

  //useEffect para traer los files records
  useEffect(() => {
    try {
      const response = Athletes_records_services.get_AthleteRecords();
      if (!response) {
        return console.log("No se encontraron los files records");
      } else {
        setFiles_records(response);
        return console.log("Files records encontrados");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  //useEffect para cargar el ultimo archivo de notas que subio
  useEffect(() => {}, [files_records]);

  //Toastify
  const toastify_password_resseted = () =>
    toast.success("Contraseña restaurada!");
  const toastify_athlete_updated = () => toast.success("Atleta Editado!");

  //Manejo del modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = (Athlete) => {
    setSelected_athlete(Athlete);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const grade_modal_close = () => setfile_view(false);
  const grade_modal_open = (athlete) => {
    const note_info = get_last_note_info(athlete);
    setfile_view(true);
  };

  //Obtener el valor del token
  const Encrypted_token = sessionStorage.getItem("Token");
  const Decoded_token = jwtDecode(Encrypted_token);
  const Token_JSON = Decoded_token.payload;
  const Rol = Token_JSON.Rol;

  //Obtener el valor del usuario loggeado
  const [user_logged, setUser_logged] = useState(null);
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
      const user = list.find((user) => user.id === Token_JSON.Table_id);
      setUser_logged(user);
    } else {
      console.error(`No se encontró el servicio para la tabla: ${Rol}`);
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
  //funcion para obtener la informacion de la nota mas reciente
  const get_last_note_info = async (athlete) => {
    try {
      // Esperar a que la promesa se resuelva
      const records = await files_records;

      // Asegurarse de que records sea un array
      if (!Array.isArray(records) || records.length === 0) {
        return setGrade_to_show(
          <div id="empty_folder_page" key={"empty_folder"}>
            <p>No tiene Notas</p>
          </div>
        );
      }

      const athlete_records = records.filter(
        (file) => file.athlete_id === athlete
      );

      if (athlete_records.length === 0) {
        return setGrade_to_show(
          <div id="empty_folder_page" key={"empty_folder"}>
            <p>No tiene Notas</p>
          </div>
        );
      }

      // Ordenar los registros por createdAt en orden descendente
      athlete_records.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      // Retornar el registro más reciente
      const latest = athlete_records[0];

      if (latest) {
        setGrade_to_show(
          <iframe src={latest.file_url} width="100%" height="100%" />
        );
      }

      return latest;
    } catch (error) {
      console.error("Error fetching athlete records:", error);
      return setGrade_to_show(
        <div id="empty_folder_page" key={"empty_folder"}>
          <p>Error al obtener las notas</p>
        </div>
      );
    }
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
          usersResponse,
        ] = await Promise.all([
          Athlete_services.get_accepted_athletes(),
          Locations_services.get_Locations(),
          Addresses_services.get_Addresses(),
          Directions_services.get_Directions(),
          Cantons_services.getCantons(),
          Parents_services.get_parents(),
          User_services.get_users(),
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
        if (usersResponse) setUsers(usersResponse);
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

  //Funcion que busca el correo del usuario y devuelve
  const load_mail = (athlete) => {
    const user = Users.find((user) => user.athlete_id === athlete.id);
    if (user) {
      return <p>{user.mail}</p>;
    }
    return <p>No hay correo</p>;
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
                            <GradingIcon
                              onClick={() => grade_modal_open(athlete.id)}
                            />
                          </p>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails id="Athlete_accordion_info">
                        <div id="mail_cont">
                          <p style={{ fontWeight: "bold" }}>Correo</p>
                          {load_mail(athlete)}
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
                          onClick={(e) => {
                            handleOpen(athlete);
                          }}
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
    <div style={{ padding: 4 }} id="Athletes_cont">
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
              <Edit_athlete_form
                User={{ ...selected_athlete }}
                Self_close={handleClose}
                Resseted_toastify={toastify_password_resseted}
                Athlete_updated={toastify_athlete_updated}
              />
            </Box>
          </Fade>
        </Modal>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={file_view}
          onClose={grade_modal_close}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={file_view}>
            <Box className="file_view_modal">
              <Box id="file_view_cont">{grade_to_show}</Box>
              <Button
                onClick={grade_modal_close}
                variant="contained"
                color="info"
              >
                Cerrar
              </Button>
            </Box>
          </Fade>
        </Modal>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AthletesTab;
