import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import Cantons_Services from "../Services/Cantons_services";
import post_Direction from "../Services/Directions_services";
import post_Address from "../Services/Addresses_services";
import Athlete_services from "../Services/Athlete_services";
import post_AthleteSizes from "../Services/Athlete_sizes_services";

const Edit_athlete_form = () => {
  const [cantons, setCantons] = useState([]);
  const [province, setProvince] = useState(1);
  const [canton, setCanton] = useState("");

  // Función para cargar cantones basados en la provincia seleccionada
  const loadCantons = async (provinceId) => {
    try {
      const Cantons = await Cantons_Services.getCantons();
      const filteredCantons = Cantons.filter(
        (Canton) => Canton.province_id === parseInt(provinceId)
      );
      setCantons(filteredCantons); // Establecer el hook como los cantones filtrados
      setCanton(filteredCantons.length > 0 ? filteredCantons[0].id : ""); // Establecer canton por defecto
    } catch (error) {
      console.error("Error loading cantons", error);
    }
  };

  //useEffect para modificar el hook a los valores de las provincias
  useEffect(() => {
    loadCantons(province);
  }, [province]);

  const formik = useFormik({
    initialValues: {
      name: "",
      firstLastName: "",
      secondLastName: "",
      gender: "Masculino",
      address: "",
      birthday: "",
      nationality: "",
      phone: "",
      mail: "",
      password: "",
      educationalInstitution: "",
      grade: "",
      bloodType: "A+",
      side: "Derecha",
      shoesize: 1,
      shirtsize: 1,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Campo obligatorio"),
      firstLastName: Yup.string().required("Campo obligatorio"),
      secondLastName: Yup.string().required("Campo obligatorio"),
      address: Yup.string().required("Campo obligatorio"),
      nationality: Yup.string().required("Campo obligatorio"),
      phone: Yup.string().required("Campo obligatorio"),
      mail: Yup.string().email("Email inválido").required("Campo obligatorio"),
      password: Yup.string().required("Campo obligatorio"),
      educationalInstitution: Yup.string().required("Campo obligatorio"),
      grade: Yup.string().required("Campo obligatorio"),
    }),
    onSubmit: async (values) => {
      try {
        const addressData = { direction_name: values.address };
        const directionResponse = await post_Direction(addressData);
        const directionId = directionResponse.id;

        const newAddress = {
          province_id: parseInt(province),
          canton_id: parseInt(canton),
          direction_id: directionId,
        };
        const addressResponse = await post_Address(newAddress);
        const addressId = addressResponse.id;

        const newAthlete = {
          athlete_name: values.name,
          athlete_first_lastname: values.firstLastName,
          athlete_second_lastname: values.secondLastName,
          birthday: values.birthday,
          nationality: values.nationality,
          gender: values.gender,
          mail: values.mail,
          password: values.password,
          phone: values.phone,
          blood_type: values.bloodType,
          address_id: addressId,
          dominant_side: values.side,
          education_entity: values.educationalInstitution,
          actual_grade: values.grade,
          athlete_status: "Candidato",
        };

        const athleteResponse = await Athlete_services.post_Athlete(newAthlete);
        const athleteId = athleteResponse.id;

        const newAthleteSize = {
          shoe_sizes_id: parseInt(values.shoesize),
          shirt_sizes_id: parseInt(values.shirtsize),
          athlete_id: athleteId,
        };
        await post_AthleteSizes(newAthleteSize);
      } catch (error) {
        console.error("Error registering athlete", error);
      }
    },
  });

  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;
    setProvince(parseInt(selectedProvince));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Box sx={{ flexBasis: "calc(33.33% - 16px)" }}>
            <TextField
              fullWidth
              label="Nombre"
              variant="outlined"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Box>
          <Box sx={{ flexBasis: "calc(33.33% - 16px)" }}>
            <TextField
              fullWidth
              label="Primer Apellido"
              variant="outlined"
              name="firstLastName"
              value={formik.values.firstLastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstLastName &&
                Boolean(formik.errors.firstLastName)
              }
              helperText={
                formik.touched.firstLastName && formik.errors.firstLastName
              }
            />
          </Box>
          <Box sx={{ flexBasis: "calc(33.33% - 16px)" }}>
            <TextField
              fullWidth
              label="Segundo Apellido"
              variant="outlined"
              name="secondLastName"
              value={formik.values.secondLastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.secondLastName &&
                Boolean(formik.errors.secondLastName)
              }
              helperText={
                formik.touched.secondLastName && formik.errors.secondLastName
              }
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
          <Box sx={{ flexBasis: "calc(25% - 16px)" }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Género</InputLabel>
              <Select
                label="Género"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
              >
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Femenino">Femenino</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flexBasis: "calc(25% - 16px)" }}>
            <TextField
              fullWidth
              label="Dirección"
              variant="outlined"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Box>
          <Box sx={{ flexBasis: "calc(25% - 16px)" }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Provincia</InputLabel>
              <Select
                label="Provincia"
                name="province"
                value={province}
                onChange={handleProvinceChange}
              >
                <MenuItem value={1}>San José</MenuItem>
                <MenuItem value={2}>Alajuela</MenuItem>
                <MenuItem value={3}>Cartago</MenuItem>
                <MenuItem value={4}>Heredia</MenuItem>
                <MenuItem value={5}>Guanacaste</MenuItem>
                <MenuItem value={6}>Puntarenas</MenuItem>
                <MenuItem value={7}>Limón</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flexBasis: "calc(25% - 16px)" }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Cantón</InputLabel>
              <Select
                label="Cantón"
                name="canton"
                value={canton} // Cambia esto a 'canton' en lugar de 'cantons'
                onChange={(e) => setCanton(e.target.value)} // Esto sigue igual
              >
                {cantons.map((cantonItem) => (
                  <MenuItem key={cantonItem.id} value={cantonItem.id}>
                    {cantonItem.canton_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
          <Box sx={{ flexBasis: "calc(33.33% - 16px)" }}>
            <TextField
              fullWidth
              label="Fecha de Nacimiento"
              type="date"
              name="birthday"
              value={formik.values.birthday}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.birthday && Boolean(formik.errors.birthday)}
              helperText={formik.touched.birthday && formik.errors.birthday}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box sx={{ flexBasis: "calc(33.33% - 16px)" }}>
            <TextField
              fullWidth
              label="Nacionalidad"
              variant="outlined"
              name="nationality"
              value={formik.values.nationality}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.nationality && Boolean(formik.errors.nationality)
              }
              helperText={
                formik.touched.nationality && formik.errors.nationality
              }
            />
          </Box>
          <Box sx={{ flexBasis: "calc(33.33% - 16px)" }}>
            <TextField
              fullWidth
              label="Teléfono"
              variant="outlined"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
          <Box sx={{ flexBasis: "calc(50% - 16px)" }}>
            <TextField
              fullWidth
              label="Correo"
              variant="outlined"
              name="mail"
              value={formik.values.mail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mail && Boolean(formik.errors.mail)}
              helperText={formik.touched.mail && formik.errors.mail}
            />
          </Box>
          <Box sx={{ flexBasis: "calc(50% - 16px)" }}>
            <TextField
              fullWidth
              label="Contraseña"
              variant="outlined"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
          <Box sx={{ flexBasis: "calc(50% - 16px)" }}>
            <TextField
              fullWidth
              label="Centro Educativo"
              variant="outlined"
              name="educationalInstitution"
              value={formik.values.educationalInstitution}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.educationalInstitution &&
                Boolean(formik.errors.educationalInstitution)
              }
              helperText={
                formik.touched.educationalInstitution &&
                formik.errors.educationalInstitution
              }
            />
          </Box>
          <Box sx={{ flexBasis: "calc(50% - 16px)" }}>
            <TextField
              fullWidth
              label="Grado Actual"
              variant="outlined"
              name="grade"
              value={formik.values.grade}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.grade && Boolean(formik.errors.grade)}
              helperText={formik.touched.grade && formik.errors.grade}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
          <Box sx={{ flexBasis: "calc(33.33% - 16px)" }}>
            <TextField
              fullWidth
              label="Tamaño de Zapatos"
              variant="outlined"
              name="shoesize"
              type="number"
              value={formik.values.shoesize}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.shoesize && Boolean(formik.errors.shoesize)}
              helperText={formik.touched.shoesize && formik.errors.shoesize}
            />
          </Box>
          <Box sx={{ flexBasis: "calc(33.33% - 16px)" }}>
            <TextField
              fullWidth
              label="Tamaño de Camisa"
              variant="outlined"
              name="shirtsize"
              type="number"
              value={formik.values.shirtsize}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.shirtsize && Boolean(formik.errors.shirtsize)}
              helperText={formik.touched.shirtsize && formik.errors.shirtsize}
            />
          </Box>
        </Box>

        <Button
          fullWidth
          sx={{ mt: 3 }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Registrar Atleta
        </Button>
      </form>
    </Box>
  );
};

export default Edit_athlete_form;
