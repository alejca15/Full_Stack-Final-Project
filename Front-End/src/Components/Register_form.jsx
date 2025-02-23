import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Cantons_services from "../Services/Cantons_services";
import Direction_services from "../Services/Directions_services";
import Address_Services from "../Services/Addresses_services";
import Athlete_services from "../Services/Athlete_services";
import Athlete_sizes_services from "../Services/Athlete_sizes_services";
import User_services from "../Services/User_services";

function Register_form({ close_drawer }) {
  const [validated, setValidated] = useState(false);
  const [Name, setName] = useState("");
  const [First_lastname, setFirst_lastname] = useState("");
  const [Second_lastname, setSecond_lastname] = useState("");
  const [Birthday, setBirthday] = useState("");
  const [Nationality, setNationality] = useState("");
  const [Gender, setGender] = useState("Masculino");
  const [Mail, setMail] = useState("");
  const [Password, setPassword] = useState("");
  const [Phone, setPhone] = useState("");
  const [Bloodtype, setBloodtype] = useState("A+");
  const [Side, setSide] = useState("Derecha");
  const [Educational_institution, setEducational_institution] = useState("");
  const [Grade, setGrade] = useState("");
  const [Province, SetProvince] = useState(1);
  const [cantons, setCantons] = useState([]);
  const [canton, setCanton] = useState(1);
  const [Address, setAddress] = useState("");
  const [Shoesize, setShoesize] = useState("");
  const [Shirtsize, setShirtsize] = useState("");
  const [Location, setLocation] = useState("");

  // Función para manejar el envío del formularioz
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  // Función para cargar cantones basados en la provincia seleccionada
  const loadCantons = async (provinceId) => {
    try {
      const Cantons = await Cantons_services.getCantons();
      const filteredCantons = Cantons.filter(
        (Canton) => Canton.province_id === parseInt(provinceId)
      );
      setCantons(filteredCantons); // Establecer el hook como los cantones filtrados
    } catch (error) {
      console.error("Error loading cantons", error);
    }
  };

  //useEffect para modificar el hook a los valores de las provincias
  useEffect(() => {
    loadCantons(Province);
  }, [Province]);

  //Selecciona la provincia y hace que cada vez se seleccione una provincia el hook del canton sea 0
  //Esto con tal de poder validar que el canton que se este seleccionando sea el correcto
  const Select_province = (event) => {
    const selectedProvince = event.target.value;
    SetProvince(parseInt(selectedProvince));
    switch (selectedProvince) {
      case "1":
        setCanton(1);
        break;
      case "2":
        setCanton(15);
        break;
      case "3":
        setCanton(26);
        break;
      case "4":
        setCanton(33);
        break;
      case "5":
        setCanton(41);
        break;
      case "6":
        setCanton(52);
        break;
      case "7":
        setCanton(67);
        break;
      default:
        setCanton(1);
    }
  };

  //Funcion que hace el post del nuevo Atleta, direction y Sizes
  const add_Athlete = async () => {
    try {
      const Address_data = {
        direction_name: Address,
      };

      //Obtenemos el id del JSON que acaba de ser posteado
      const direction_JSON = await Direction_services.post_Direction(
        Address_data
      );
      const direction_id = direction_JSON.id;

      const new_Address = {
        province_id: parseInt(Province),
        canton_id: parseInt(canton),
        direction_id: parseInt(direction_id),
      };

      //Obtenemos el id del JSON que acaba de ser posteado
      const address_JSON = await Address_Services.post_Address(new_Address);
      const address_id = address_JSON.id;

      //Fecha y formato legible para el post
      const date = new Date();
      const formattedDate = date.toISOString().split("T")[0];

      //JSON del Atleta
      const new_Athlete = {
        athlete_name: Name,
        athlete_first_lastname: First_lastname,
        athlete_second_lastname: Second_lastname,
        birthday: Birthday,
        nationality: Nationality,
        gender: Gender,
        phone: Phone,
        blood_type: Bloodtype,
        address_id: parseInt(address_id),
        dominant_side: Side,
        education_entity: Educational_institution,
        actual_grade: Grade,
        addition_date: formattedDate,
        location_id: Location,
        athlete_status: "Candidato",
      };

      console.log("Nuevo Atleta",new_Athlete);
      
      //Obtenemos el id del JSON que acaba de ser posteado
      const posted_athlete = await Athlete_services.post_Athlete(new_Athlete);
      const posted_athlete_id = posted_athlete.id;

      const user = {
        mail: Mail,
        password: Password,
        counselor_id: null,
        admin_id: null,
        athlete_id: posted_athlete_id,
        mentor_id: null, //
      };

      console.log("Nuevo Usuario",user);
      

      const new_user = await User_services.post_user(user);
      //Post de la talla su tabla
      const new_Athlete_size = {
        shoe_sizes_id: parseInt(Shoesize),
        shirt_sizes_id: parseInt(Shirtsize),
        athlete_id: posted_athlete_id,
      };
      await Athlete_sizes_services.post_AthleteSizes(new_Athlete_size);
      close_drawer();
      return console.log("Atleta registrado con éxito");
    } catch (error) {
      console.error("Error adding athlete", error);
      return false;
    }
  };

  return (
    <div id="Form_body">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="input_group_container">
          <Row className="mb-1" id="Form_row">
            <h5>Informacion Basica</h5>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
                type="text"
                placeholder="Nombre"
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>1er Apellido</Form.Label>
              <Form.Control
                required
                type="text"
                onChange={(e) => {
                  setFirst_lastname(e.target.value);
                }}
                placeholder="Apellido"
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>2do Apellido</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Apellido"
                  aria-describedby="inputGroupPrepend"
                  required
                  onChange={(e) => {
                    setSecond_lastname(e.target.value);
                  }}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-1" id="Form_row">
            <Form.Group as={Col} md="1" controlId="validationCustom06">
              <Form.Label>Genero</Form.Label>
              <Form.Select
                size="sm"
                style={{ width: "7rem" }}
                aria-label="Default select example"
                id="Select"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom03">
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Direccion"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group
              id="Select"
              as={Col}
              md="2"
              controlId="validationCustom04"
            >
              <Form.Label>Provincia</Form.Label>
              <Form.Select
                size="sm"
                style={{ width: "7rem" }}
                aria-label="Default select example"
                id="Select"
                onChange={Select_province}
              >
                <option value={1}>San José</option>
                <option value={4}>Heredia</option>
                <option value={2}>Alajuela</option>
                <option value={3}>Cartago</option>
                <option value={5}>Guanacaste</option>
                <option value={6}>Puntarenas</option>
                <option value={7}>Limón</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              id="Select"
              as={Col}
              md="2"
              controlId="validationCustom17"
            >
              <Form.Label>Sede</Form.Label>
              <Form.Select
                size="sm"
                style={{ width: "7rem" }}
                aria-label="Default select example"
                id="Select"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              >
                <option value={1}>San José</option>
                <option value={2}>Sarchí</option>
                <option value={3}>Guapiles</option>
                <option value={4}>Paraíso</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="validationCustom05">
              <Form.Label>Canton</Form.Label>
              <Form.Select
                size="sm"
                style={{ width: "7rem" }}
                onChange={(e) => setCanton(parseInt(e.target.value))}
                aria-label="Default select example"
                id="Select"
              >
                {cantons.map((Canton) => (
                  <option key={Canton.id} value={parseInt(Canton.id)}>
                    {Canton.canton_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-1" id="Form_row">
            <Form.Group as={Col} md="3" controlId="validationCustom07">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                required
                onChange={(e) => {
                  setBirthday(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom08">
              <Form.Label>Nacionalidad</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setNationality(e.target.value);
                }}
                type="text"
                placeholder="Nacionalidad"
                required
              />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom10">
              <Form.Label>Télefono</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                required
                type="text"
                placeholder="Télefono"
              />
            </Form.Group>
          </Row>
        </div>
        <div className="input_group_container">
          <Row className="mb-1" id="Form_row">
            <h5>Credenciales</h5>
            <Form.Group as={Col} md="5" controlId="validationCustom09">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setMail(e.target.value);
                }}
                required
                type="text"
                placeholder="Correo"
              />
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="validationCustom11">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                type="password"
                placeholder="Contraseña"
              />
            </Form.Group>
          </Row>
        </div>
        <Row className="mb-1">
          <div id="titles_row">
            <div id="register_split_containers">
              <h5 id="education_title">Informacion sobre Educacion</h5>
              <Form.Group
                id="left_select"
                as={Col}
                md="3"
                controlId="validationCustom12"
              >
                <Form.Label>Centro Educativo</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setEducational_institution(e.target.value);
                  }}
                  required
                  type="text"
                  placeholder="Institución"
                />
              </Form.Group>
              <Form.Group
                id="right_select"
                as={Col}
                md="2"
                controlId="validationCustom13"
              >
                <Form.Label>Grado Actual</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setGrade(e.target.value);
                  }}
                  required
                  type="text"
                  placeholder="Grado"
                />
              </Form.Group>
            </div>
            <div id="register_split_containers">
              <h5 id="education_title">Informacion Médica</h5>
              <Form.Group
                id="right_select"
                as={Col}
                md="2"
                controlId="validationCustom14"
              >
                <Form.Label>Tipo de Sangre</Form.Label>
                <Form.Select
                  size="sm"
                  style={{ width: "7rem" }}
                  aria-label="Default select example"
                  id="Select"
                  onChange={(e) => {
                    setBloodtype(e.target.value);
                  }}
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                id="left_select"
                as={Col}
                md="2"
                controlId="validationCustom17"
              >
                <Form.Label>Lateralidad</Form.Label>
                <Form.Select
                  size="sm"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setSide(e.target.value);
                  }}
                >
                  <option value="Derecha">Derecha</option>
                  <option value="Izquierda">Izquierda</option>
                  <option value="Ambidiestro">Ambidiestro</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>
        </Row>
        <div className="input_group_container">
          <Row className="mb-1" id="sizes_row">
            <h5 id="sizes_title">Tallas</h5>
            <Form.Group
              id="Size_group"
              as={Col}
              md="4"
              controlId="validationCustom15"
            >
              <Form.Label>Talla de Tenis</Form.Label>
              <Form.Select
                size="sm"
                style={{ width: "7rem" }}
                aria-label="Default select example"
                id="Select"
                onChange={(e) => {
                  setShoesize(e.target.value);
                }}
              >
                <option value={1}>35</option>
                <option value={2}>36</option>
                <option value={3}>37</option>
                <option value={4}>38</option>
                <option value={5}>39</option>
                <option value={6}>40</option>
                <option value={7}>41</option>
                <option value={8}>42</option>
                <option value={9}>43</option>
                <option value={10}>44</option>
                <option value={11}>45</option>
                <option value={12}>46</option>
                <option value={13}>47</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              id="Size_group"
              as={Col}
              md="4"
              controlId="validationCustom16"
            >
              <Form.Label>Talla de Camisa</Form.Label>
              <Form.Select
                size="sm"
                style={{ width: "7rem" }}
                aria-label="Default select example"
                id="Select"
                onChange={(e) => {
                  setShirtsize(e.target.value);
                }}
              >
                <option value={1}>XS</option>
                <option value={2}>S</option>
                <option value={3}>M</option>
                <option value={4}>L</option>
                <option value={5}>XL</option>
                <option value={6}>XXL</option>
              </Form.Select>
            </Form.Group>
          </Row>
        </div>
        <Button onClick={add_Athlete} id="Register_button">
          Registrarse
        </Button>
      </Form>
    </div>
  );
}

export default Register_form;
