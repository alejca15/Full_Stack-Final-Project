import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import Locations_services from "../Services/Locations_services";
import User_services from "../Services/User_services";
import Mentors_services from "../Services/Mentors_services";
import { jwtDecode } from "jwt-js-decode";

const Edit_mentor_form = () => {
  const [Locations, setLocations] = useState([]);
  const [Users, setUsers] = useState([]);
  const [initialValues, setInitialValues] = useState({
    mentor_name: "",
    mentor_lastname: "",
    location_id: "",
    phone: "",
    mail: "",
  });

  // Obtener el valor del token
  const Encrypted_token = sessionStorage.getItem("Token");
  const Decoded_token = jwtDecode(Encrypted_token);
  const Token_JSON = Decoded_token.payload;
  const Rol = Token_JSON.Rol;

  // useEffect para Obtener todos los valores
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [Location_response, Users_response, Mentors_response] =
          await Promise.all([
            Locations_services.get_Locations(),
            User_services.get_users(),
            Mentors_services.get_mentors(),
          ]);

        if (Location_response) setLocations(Location_response);
        if (Users_response) {
          setUsers(Users_response);
          const user_found = Users_response.find((user) => {
            return user.mentor_id === Token_JSON.Table_id;
          });
          if (!user_found) {
            return console.log("No se pudo encontrar el mentor");
          } else {
            setInitialValues((prevValues) => ({
              ...prevValues,
              mail: user_found.mail || "",
            }));
          }
        }
        if (Mentors_response) {
          const mentor = Mentors_response.find(
            (mentor) => mentor.id === Token_JSON.Table_id
          );
          if (!mentor) {
            return console.log("No se pudo encontrar el mentor");
          } else {
            setInitialValues((prevValues) => ({
              ...prevValues,
              mentor_name: mentor.mentor_name || "",
              mentor_lastname: mentor.mentor_lastname || "",
              location_id: mentor.location_id || "",
              phone: mentor.phone || "",
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      mentor_name: Yup.string().required("Campo obligatorio"),
      mentor_lastname: Yup.string().required("Campo obligatorio"),
      location_id: Yup.number()
        .required("Campo obligatorio")
        .integer("Debe ser un número entero"),
      phone: Yup.string()
        .required("Campo obligatorio")
        .matches(/^[0-9]+$/, "Debe ser un número válido"),
      mail: Yup.string()
        .email("Email inválido")
        .required("Campo obligatorio")
        .matches(/@/, 'Debe contener "@"'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Container id="Edit_mentor_form_main_cont" component="main">
      <form id="Form" onSubmit={formik.handleSubmit}>
        <Box id="Form_box">
          <Box id="User_picture_cont">
            <div id="picture_cont">Foto</div>
          </Box>
          <Box id="Mentor_info_cont">
          <TextField
              id="edit_form_input"
              name="mail"
              label="Correo Electrónico"
              value={formik.values.mail}
              onChange={formik.handleChange}
              error={formik.touched.mail && Boolean(formik.errors.mail)}
              helperText={formik.touched.mail && formik.errors.mail}
              margin="normal"
            />
            <Button id="reset_mentor_passwrod_btn" color="error" variant="contained" sx={{ mt: 2 }}>
              Restablecer contraseña
            </Button>
          </Box>

          <Box id="Mentor_contact_cont">
            <TextField
              id="edit_form_input"
              name="location_id"
              label="ID de Ubicación"
              value={formik.values.location_id}
              onChange={formik.handleChange}
              error={
                formik.touched.location_id && Boolean(formik.errors.location_id)
              }
              helperText={
                formik.touched.location_id && formik.errors.location_id
              }
            />
            <TextField
              id="edit_form_input"
              name="phone"
              label="Teléfono"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            
          </Box>
          <Box id="Credentials_cont">
          <TextField
              id="edit_form_input"
              name="mentor_name"
              label="Nombre"
              value={formik.values.mentor_name}
              onChange={formik.handleChange}
              error={
                formik.touched.mentor_name && Boolean(formik.errors.mentor_name)
              }
              helperText={
                formik.touched.mentor_name && formik.errors.mentor_name
              }
              
            />
            <TextField
              id="edit_form_input"
              name="mentor_lastname"
              label="Primer Apellido"
              value={formik.values.mentor_lastname}
              onChange={formik.handleChange}
              error={
                formik.touched.mentor_lastname &&
                Boolean(formik.errors.mentor_lastname)
              }
              helperText={
                formik.touched.mentor_lastname && formik.errors.mentor_lastname
              }
             
            />
          </Box>
          <Button
            id="Save_info_btn"
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Guardar
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Edit_mentor_form;
