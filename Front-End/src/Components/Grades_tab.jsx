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
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Athlete_services from "../Services/Athlete_services";
import Athletes_records_services from "../Services/Athletes_records_services";

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
  const notes_ref = ref(storage, route + "/");
  const [fileContent, setFileContent] = useState(null);

  const [file_view, setfile_view] = useState(false);
  const close_file_view = () => {
    setfile_view(false);
    setFileContent(null);
  };
  const open_file_view = async (note) => {
    const url = await getDownloadURL(ref(storage, note.Path));
    setFileContent(<iframe src={url} width="100%" height="100%" />);
    setfile_view(true);
  };

  const uploaded_toast = () => toast.success("Archivo subido con éxito");
  const not_pdf_toast = () => toast.error("El archivo no es un PDF");

  // Use Effects para mantener los datos actualizados
  useEffect(() => {
    const fetchUrls = async () => {
      setNotes([]);
      const res = await listAll(notes_ref);
  
      // Obtener los Pdfs (Notas)
      const pdfs = await Promise.all(
        res.items.map(async (item) => {
          const url = await getDownloadURL(item);
          if (url.includes(".pdf")) {
            return { Name: item.name, Path: item.fullPath, Url: url };
          }
        })
      );
  
      // Filtrar los valores undefined
      const filteredPdfs = pdfs.filter((pdf) => pdf !== undefined);
      setNotes(filteredPdfs);
    };
  
    fetchUrls();
  }, [route]);

  const Upload_file = () => {
    if (file === null) return;
    if (!file.name.includes(".pdf")) {
      not_pdf_toast();
      return handleClose();
    }
    const file_ref = ref(storage, `${route}/${file.name}`);
    uploadBytes(file_ref, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        const file_uploaded = {
          Name: file_ref.name,
          Path: file_ref.fullPath,
          Url: url,
        };
        setNotes((prev) => [...prev, file_uploaded]);
  
        // Crear el objeto para el POST
        const athleteRecord = {
          folder_id: route,
          file_name: file.name,
          file_url: url,
          athlete_id: parseInt(User.id),
        };
  
        // Hacer el POST a la base de datos
        try {
          await Athletes_records_services.post_AthleteRecord(athleteRecord);
          uploaded_toast();
        } catch (error) {
          console.error("Error posting athlete record:", error);
        }
  
        handleClose();
      });
    });
  };

  const display_notes = () => {
    return notes.map((note, index) => {
      return (
        <div
          onDoubleClick={() => open_file_view(note)}
          className="note_cont"
          key={note.Path} // Usar Path como key para asegurar unicidad
        >
          <PictureAsPdfIcon id="pdf_icon" />
          <p>{note.Name}</p>
        </div>
      );
    });
  };

  return (
    <div className="Grades_Tab_body">
      <div className="Grades_container">{display_notes()}</div>
      <div className="Grades_Tab_Footer">
        <Button onClick={()=>console.log(notes)} variant="contained" color="info">
          Añadir nueva nota <AddIcon />{" "}
        </Button>
      </div>
      {/*Modal para añadir archivos*/}
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
                onClick={() => Upload_file()}
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
      {/*Modal para ver archivos*/}
      <Modal
        open={file_view}
        onClose={open_file_view}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={file_view}>
          <Box className="file_view_modal">
            <Box id="file_view_cont">{fileContent}</Box>
            <Button variant="contained" color="error" onClick={close_file_view}>
              Cerrar
            </Button>
          </Box>
        </Fade>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Grades_Tab;
