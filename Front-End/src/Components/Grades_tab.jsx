import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Fade from "@mui/material/Fade";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { storage } from "../firebaseConfig";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Grades_Tab = ({ User }) => {
  const route = `crc-endurance/Notas/${User.athlete_name} ${User.athlete_first_lastname} ${User.athlete_second_lastname}`;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState([]);

  const notes_ref = ref(storage, route);

  const uploaded_toast = () => toast.success("Archivo subido con éxito");

  //Use Effects para mantener los datos actualizados
  useEffect(() => {
    const fetchUrls = async () => {
      setNotes([]);
      const res = await listAll(notes_ref);


      // Obtener los Pdfs (Notas)
      const pdfs = await Promise.all(
        res.items.map(async (item) => {
          if (item.Url.includes("pdf")) {
            const url = await getDownloadURL(item);
            return { Name: item.name, Path: item.fullPath, Url: item.Url };
          }
        })
      );
      setNotes(pdfs);
    };

    fetchUrls();
  }, [route]);

  const Upload_file = () => {
    if (file === null) return;
    const file_ref = ref(storage, `${route}/${file.name}`);
    uploadBytes(file_ref, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const file_uploaded = {
          Name: file_ref.name,
          Path: file_ref.fullPath,
          Url: url,
        };
        setNotes((prev) => [...prev, file_uploaded]);
      });
      uploaded_toast();
    });
  };

  return (
    <div className="Grades_Tab_body">
      <div className="Grades_container"></div>
      <div className="Grades_Tab_Footer">
        <Button onClick={handleOpen} variant="contained" color="info">
          Añadir nueva nota <AddIcon />{" "}
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Archivo a añadir
            </Typography>
            <Box>
              <input
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              <Button
                onClick={() => console.log(User)}
                variant="contained"
                color="primary"
              >
                Subir
              </Button>
              <Button variant="contained" color="error" onClick={handleClose}>
                Cancelar
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Grades_Tab;
