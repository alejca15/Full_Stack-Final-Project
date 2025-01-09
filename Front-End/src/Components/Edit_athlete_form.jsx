import * as React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Box,} from "@mui/material";
import Cantons_Services from "../Services/Cantons_services";
import Directions_services from "../Services/Directions_services";
import post_Address from "../Services/Addresses_services";
import Athlete_services from "../Services/Athlete_services";
import Athlete_sizes_services from "../Services/Athlete_sizes_services";
import Addresses_services from "../Services/Addresses_services";
import User_services from "../Services/User_services";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";

const Edit_athlete_form = ({ User,Resseted_toastify }) => {
  const [cantons, setCantons] = useState([]);
  const [province, setProvince] = useState(1);
  const [canton, setCanton] = useState("");
  const [Address, setAddress] = useState(null);
  const [Direction, setDirection] = useState(null);
  const [Shoe_size, setShoe_size] = useState("34");
  const [Shirt_size, setShirt_size] = useState("XS");
  const [Athlete, setAthlete] = useState("");



  //Manejo del modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //Estilos para el modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "25%",
    height: "35%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
  };


  // Cargar el correo del atleta
  const loadUser = async () => {
    try {
      const users = await User_services.get_users();
      const user_found = users.find((user) => user.athlete_id === User.id);
      setAthlete(user_found);
    } catch (error) {
      console.error("Error loading user mail", error);
    }
  };

  useEffect(() => {
    loadUser();
  }, [User.id]);

  // Cargar cantones basado en la provincia seleccionada
  const loadCantons = async (provinceId) => {
    try {
      const Cantons = await Cantons_Services.getCantons();
      const filteredCantons = Cantons.filter(
        (Canton) => Canton.province_id === parseInt(provinceId)
      );
      setCantons(filteredCantons);
      setCanton(filteredCantons.length > 0 ? filteredCantons[0].id : "");
    } catch (error) {
      console.error("Error loading cantons", error);
    }
  };

  useEffect(() => {
    loadCantons(province);
  }, [province]);

  // Cargar direcciones para el usuario
  const loadAddresses = async () => {
    try {
      const Addresses = await Addresses_services.get_Addresses();
      if (Addresses) {
        const userAddress = Addresses.find(
          (address) => address.id === User.address_id
        );
        setAddress(userAddress);
        setProvince(userAddress.province_id);
        setCanton(userAddress.canton_id);
      }
    } catch (error) {
      console.error("Error loading Addresses", error);
    }
  };

  useEffect(() => {
    if (User.address_id) {
      loadAddresses();
    }
  }, [User.address_id]); // Dependemos de User.address_id para cargar las direcciones

  // Cargar dirección exacta cuando 'Address' se haya actualizado
  const loadDirection = async () => {
    if (Address && Address.direction_id) {
      try {
        const Directions = await Directions_services.get_Directions();
        if (Directions) {
          const userDirection = Directions.find(
            (direction) => direction.id === Address.direction_id
          );
          setDirection(userDirection);
        }
      } catch (error) {
        console.error("Error loading Direction", error);
      }
    }
  };

  useEffect(() => {
    if (Address && Address.direction_id) {
      loadDirection();
    }
  }, [Address]);

  useEffect(() => {
    if (Address && Direction) {     
      formik.setValues({
        ...formik.values,
        address: Direction.direction_name,
        province: Address.province_id,
        canton: Address.canton_id,
      });
    }
  }, [Address, Direction]);

  //Cargar las tallas
  const loadSizes = async (athlete_id) => {
    try {
      const Sizes = await Athlete_sizes_services.get_AthleteSizes();
      const filtered_size = Sizes.find(
        (Size) => Size.athlete_id === parseInt(athlete_id)
      );
      if (filtered_size) {
        setShoe_size(filtered_size.shoe_sizes_id);
        setShirt_size(filtered_size.shirt_sizes_id);
      }
    } catch (error) {
      console.error("Error loading sizes", error);
    }
  };

  useEffect(() => {
    loadSizes(User.id);
    loadAddresses()
  }, [User.id]);

  useEffect(() => {
    if (Shoe_size && Shirt_size) {
      formik.setValues({
        ...formik.values,
        shoesize: Shoe_size,
        shirtsize: Shirt_size,
      });
    }
  }, [Shoe_size, Shirt_size]);

  useEffect(() => {
    if (Athlete) {
      formik.setFieldValue("mail", Athlete.mail);
    }
  }, [Athlete]);

  const formik = useFormik({
    initialValues: {
      name: User.athlete_name,
      firstLastName: User.athlete_first_lastname,
      secondLastName: User.athlete_second_lastname,
      gender: User.gender,
      address: "",
      province: 1,
      canton: "",
      birthday: User.birthday,
      nationality: User.nationality,
      phone: User.phone,
      mail: Athlete.mail || "",
      password: "",
      educationalInstitution: User.education_entity,
      grade: User.actual_grade,
      bloodType: User.blood_type,
      side: User.dominant_side,
      shoesize: Shoe_size,
      shirtsize: Shirt_size,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Campo obligatorio"),
      firstLastName: Yup.string().required("Campo obligatorio"),
      secondLastName: Yup.string().required("Campo obligatorio"),
      address: Yup.string().required("Campo obligatorio"),
      nationality: Yup.string().required("Campo obligatorio"),
      phone: Yup.string().required("Campo obligatorio"),
      mail: Yup.string().email("Email inválido").required("Campo obligatorio"),
      password: Yup.string(), // No requerido para mantener la contraseña actual
      educationalInstitution: Yup.string().required("Campo obligatorio"),
      grade: Yup.string().required("Campo obligatorio"),
    }),
    onSubmit: async (values) => {
      try {
        //Put de Direcction
        if (Direction.direction_name != values.address) {
          console.log("entre a direccion especifica");
          
          Direction.direction_name = values.address;
          const response = await Directions_services.update_Direction(Direction.id, Direction);
          if (!response) {
            console.error("Error al actualizar dirección", error);
          }
          else{
            console.log("Direccion exacta Actualizada");
            
          }
        }
  
        //Put de Address        
        if (Address.province_id != province || Address.canton_id != canton) {
          console.log("Entre a Address");
          Address.province_id = province;
          Address.canton_id = canton;
          const response = await post_Address.update_Address(Address.id, Address);
          if (!response) {
            console.error("Error al actualizar dirección", error);
          }
          else{
            console.log("Direccion Actualizada");
          }
        }
  
        //Put de User
        if (Athlete.mail != values.mail) {
          Athlete.mail = values.mail;
          const response = await User_services.update_user(Athlete.id, Athlete);
          if (!response) {
            console.error("Error al actualizar correo", error);
          }
          else {
            console.log("Usuario actualizado");
            
          }
        }
        
        const athletes_response=await Athlete_services.get_Athletes();
        //Put de Athlete
        const updated_athlete = {
          id: User.id,
          athlete_name: values.name,
          athlete_first_lastname: values.firstLastName,
          athlete_second_lastname: values.secondLastName,
          birthday: values.birthday,
          nationality: values.nationality,
          gender: values.gender,
          phone: values.phone,
          blood_type: values.bloodType,
          address_id: Address.id,
          dominant_side: values.side,
          education_entity: values.educationalInstitution,
          actual_grade: values.grade,
          addition_date: User.addition_date,
          location_id: User.location_id,
          athlete_status: "Activo",
        };
      
        const response = await Athlete_services.update_Athlete(updated_athlete.id,updated_athlete);
        if (!response) {
          console.error("Error al actualizar el atleta", error);
        }
        if (response) {
          console.log("Atleta actualizado");
          
        }
  
        //Put de Athlete_sizes
        const sizes_response = await Athlete_sizes_services.get_AthleteSizes();
        if (!sizes_response) {
          console.error(error);
          throw error;
        } else {
          const sizes_found = sizes_response.find(size => size.athlete_id === User.id);
          if (!sizes_found) {
            const new_sizes = {
              athlete_id: User.id,
              shoe_sizes_id: values.shoesize,
              shirt_sizes_id: values.shirtsize
            };
            const response = await Athlete_sizes_services.post_AthleteSizes(new_sizes);
            if (!response) {
              console.error("Error al actualizar tallas", error);
            }
          } else {            
            sizes_found.shoe_sizes_id = values.shoesize;
            sizes_found.shirt_sizes_id = values.shirtsize;
            const response = await Athlete_sizes_services.update_AthleteSize(sizes_found.id, sizes_found);
            if (!response) {
              console.error("Error al actualizar tallas", error);
            }
          }
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;
    setProvince(parseInt(selectedProvince));
  };

  const reset_password=async()=>{
    try {
      const updated_user={...Athlete,password:"CRCenduranceOTP"}
      console.log("usuario a actualizar",updated_user);
      
      const response= await User_services.update_user(Athlete.id,updated_user);
      if (!response) {
        console.error("Error al resetear contraseña",error);
      }
      else{
        Resseted_toastify();
        handleClose();
      }
    } catch (error) {
      console.error(error);
      throw error; 
    }

  }

  return (
    <Box>
      <form id="edit_athlete_form" onSubmit={formik.handleSubmit}>
        <Box
          sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}
          id="first_form_box"
        >
          <Box sx={{ flexBasis: "calc(33.33% - 16px)" }}>
            <TextField
              label="Nombre"
              variant="outlined"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
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
        <Box
          sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}
          id="second_form_box"
        >
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
              <InputLabel>Cantón</InputLabel>
              <Select
                label="Cantón"
                name="canton"
                value={canton}
                onChange={(e) => {                  
                  setCanton(e.target.value)
                  console.log(canton);
                  
                }}
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
        <Box
          sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}
          id="third_form_box"
        >
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
                id="third_box_input"
              >
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Femenino">Femenino</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flexBasis: "calc(33.33% - 16px)" }}>
            <TextField
              label="Fecha de Nacimiento"
              type="date"
              name="birthday"
              value={formik.values.birthday}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.birthday && Boolean(formik.errors.birthday)}
              helperText={formik.touched.birthday && formik.errors.birthday}
              id="third_box_input"
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
              id="third_box_input"
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
              id="third_box_input"
            />
          </Box>
        </Box>

        <Box
          sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}
          id="fourth_form_box"
        >
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
          <Button
            style={{ fontSize: "x-small" }}
            variant="contained"
            color="error"
            onClick={(e) => {
              handleOpen();
            }}
          >
            Restablecer contraseña
          </Button>
        </Box>

        <Box
          sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}
          id="fifth_form_box"
        >
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

        <Box
          sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}
          id="sixth_form_box"
        >
          <Box sx={{ flexBasis: "calc(33.33% - 16px)" }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Tamaño de Zapatos</InputLabel>
              <Select
                label="Tamaño de Zapatos"
                name="shoesize"
                value={formik.values.shoesize}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.shoesize && Boolean(formik.errors.shoesize)
                }
              >
                <MenuItem value={1}>35</MenuItem>
                <MenuItem value={2}>36</MenuItem>
                <MenuItem value={3}>37</MenuItem>
                <MenuItem value={4}>38</MenuItem>
                <MenuItem value={5}>39</MenuItem>
                <MenuItem value={6}>40</MenuItem>
                <MenuItem value={7}>41</MenuItem>
                <MenuItem value={8}>42</MenuItem>
                <MenuItem value={9}>43</MenuItem>
                <MenuItem value={10}>44</MenuItem>
                <MenuItem value={11}>45</MenuItem>
                <MenuItem value={12}>46</MenuItem>
                <MenuItem value={13}>47</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flexBasis: "calc(33.33% - 16px)" }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Tamaño de Camisa</InputLabel>
              <Select
                label="Tamaño de Camisa"
                name="shirtsize"
                value={formik.values.shirtsize}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.shirtsize && Boolean(formik.errors.shirtsize)
                }
              >
                <MenuItem value={1}>XS</MenuItem>
                <MenuItem value={2}>S</MenuItem>
                <MenuItem value={3}>M</MenuItem>
                <MenuItem value={4}>L</MenuItem>
                <MenuItem value={5}>XL</MenuItem>
                <MenuItem value={6}>XXL</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Button
          id="edit_athlete_button"
          sx={{ mt: 3 }}
          variant="contained"
          color="success"
          type="submit"
        >
          Completado
        </Button>
      </form>

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
          <Box id="reset_password_modal" sx={style}>
            <div id="reset_password_modal_content">
              <p>
                Al aceptar la contraseña será restablecida a "CRCenduranceOTP"
              </p>
              <Button
                variant="contained"
                color="success"
                id="reset_password_accept_button"
                onClick={(e)=>reset_password()}
              >
                Aceptar
              </Button>
              <Button
                id="reset_password_deny_button"
                variant="contained"
                color="error"
                onClick={handleClose}
              >
                Cancelar
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Edit_athlete_form;
