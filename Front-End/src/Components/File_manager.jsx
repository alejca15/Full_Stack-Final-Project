import React, { useState, useEffect, useRef, act } from "react";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { Button, Box, Typography, Modal, Fade, TextField } from "@mui/material";
import FilesServices from "../Services/Files_Services";
import { storage } from "../firebaseConfig";
import Side_tab_file_manager from "./Side_tab_file_manager";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FolderIcon from "@mui/icons-material/Folder";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import zIndex from "@mui/material/styles/zIndex";

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
  zIndex: 5000,
};

const File_manager = () => {
  const root = "crc-endurance";
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [folder_name, setFolder_name] = useState("");
  const [actual_route, setActual_route] = useState(root);
  const [file_modal_visibility, setFile_modal_visibility] = useState(false);
  const [folder_modal_visibliity, setFolder_modal_visibility] = useState(false);
  const [cancel_modal_visibliity, setCancel_modal_visibility] = useState(false);
  const [selected_files, setSelected_files] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [copied_files, setCopied_files] = useState([]);
  const [files_to_paste, setFiles_to_paste] = useState([]);

  const [files_in_route, setFiles_in_route] = useState([]);

  const file_modal_open = () => setFile_modal_visibility(true);
  const file_modal_close = () => setFile_modal_visibility(false);

  const folder_modal_open = () => setFolder_modal_visibility(true);
  const folder_modal_close = () => setFolder_modal_visibility(false);

  const cancel_modal_visibliity_open = () => setCancel_modal_visibility(true);
  const cancel_modal_visibliity_close = () => setCancel_modal_visibility(false);

  const file_list_ref = ref(storage, actual_route);

  const open_uploaded_toast = () => toast("Archivo subido correctamente!");
  const folder_created_toast = () => toast("Carpeta creada correctamente!");
  const cancelled_files_succesfully = () =>
    toast.success("Archivos eliminados");
  const cancelled_files_error = () =>
    toast.error("Los archivos no fueron eliminados, intente nuevamente.");
  const pasted_files_succesfully = () => toast.success("Archivos pegados");
  const paste_files_error = () => toast.error("Los archivos no fueron pegados");

  //Use Effects para mantener los datos actualizados
  useEffect(() => {
    const fetchUrls = async () => {
      setLoading(true);
      setFiles_in_route([]);
      const res = await listAll(file_list_ref);

      // Procesar los prefixes
      const prefixes = res.prefixes.map((prefix) => ({
        Name: prefix.name,
        Path: prefix.fullPath,
        Url: null, // Los prefixes no tienen URL
      }));

      // Procesar los items
      const items = await Promise.all(
        res.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return { Name: item.name, Path: item.fullPath, Url: url };
        })
      );

      // Combinar prefixes y items
      const combined = [...prefixes, ...items];
      setFiles_in_route(combined);
      setLoading(false);
    };

    fetchUrls();
  }, [actual_route]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const filesData = await FilesServices.get_files();
        setFiles(filesData);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  useEffect(() => {
    const order_files = () => {
      const sorted_files = [...files_in_route].sort((a, b) => {
        return a.Name.localeCompare(b.Name);
      });
      setFiles_in_route(sorted_files);
    };

    order_files();
  }, [files_in_route]);
  //Funcion para subir archivos
  const Upload_file = () => {
    if (file === null) return;
    const file_ref = ref(storage, `${actual_route}/${file.name + uuidv4()}`);
    uploadBytes(file_ref, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const file_uploaded = {
          Name: file_ref.name,
          Path: file_ref.fullPath,
          Url: url,
        };
        setFiles_in_route((prev) => [...prev, file_uploaded]);
        console.log(files_in_route);
      });
      open_uploaded_toast();
      setSelected_files([]);
      return file_modal_close();
    });
  };

  //Funcion para crear carpetas
  const createFolder = async () => {
    if (folder_name) {
      const folderRef = ref(storage, actual_route + `/${folder_name}/.empty`);
      const emptyFile = new Blob([""], { type: "text/plain" });
      const new_folder = {
        Name: folder_name,
        Path: folderRef.fullPath,
        Url: null,
      };
      setFiles_in_route((prev) => [...prev, new_folder]);
      await uploadBytes(folderRef, emptyFile);
      folder_created_toast();
      folder_modal_close();
      setSelected_files([]);
    }
  };

  const open_folder = (file) => {
    setActual_route(file.Path);
    setSelected_files([]);
  };

  //Dipslay Folders
  const display_folders = (files) => {
    return files.map((file) => {
      if (file.Url !== null) {
        return null;
      }

      const is_selected = selected_files.some(
        (selectedFile) => selectedFile.Path === file.Path
      );
      const is_copied = copied_files.some(
        (copied_file) => copied_file.Path === file.Path
      );

      const selected_when_copied = () => {
        if (is_selected && copied_files.length > 0) {
          return true;
        }
        return false;
      };

      return (
        <div
          style={
            selected_when_copied()
              ? { backgroundColor: "rgba(115, 154, 238, 0.86)" }
              : is_selected
              ? { backgroundColor: "rgba(115, 154, 238, 0.86)" }
              : is_copied
              ? { backgroundColor: "rgba(213, 213, 213, 0.86)" }
              : {}
          }
          key={file.Path}
          id="file_cont"
        >
          <FolderIcon
            onClick={() => select_file(file)}
            id="folder_icon"
            onDoubleClick={() => open_folder(file)}
          />
          <span>{file.Name}</span>
        </div>
      );
    });
  };

  //Display Files
  const display_files = (files) => {
    return files.map((file) => {
      if (file.Url === null) {
        return null;
      }
      const is_selected = selected_files.some(
        (selectedFile) => selectedFile.Path === file.Path
      );

      const is_copied = copied_files.some(
        (copied_file) => copied_file.Path === file.Path
      );
      function includes_string(a, b) {
        return a.some((substring) => b.includes(substring));
      }
      const file_extension = file.Url.split(".").pop().toLowerCase();

      const image_extensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
      const text_extensions = ["txt", "md", "json", "xml", "csv"];
      const video_extensions = ["mp4", "avi", "mov", "wmv", "flv", "mkv"];
      const pdf_extensions = ["pdf"];
      const audio_extensions = ["mp3", "wav", "ogg", "flac"];

      const isImage = includes_string(image_extensions, file_extension);
      const isText = includes_string(text_extensions, file_extension);
      const isVideo = includes_string(video_extensions, file_extension);
      const isPdf = includes_string(pdf_extensions, file_extension);
      const isAudio = includes_string(audio_extensions, file_extension);
      const isEmpty = file_extension.includes("empty?alt=media&token");

      return (
        <div
          key={file.Path}
          style={
            is_copied
              ? { backgroundColor: "rgba(213, 213, 213, 0.86)" }
              : is_selected
              ? { backgroundColor: "rgba(115, 154, 238, 0.86)" }
              : {}
          }
          id="file_cont"
        >
          {isImage ? (
            <img onClick={() => select_file(file)} src={file.Url} alt="file" />
          ) : isText ? (
            <div key={file.Path}>
              <span>Icono de texto</span>
              <a
                onClick={() => select_file(file)}
                href={file.Url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver archivo de texto
              </a>
            </div>
          ) : isVideo ? (
            <video controls key={file.Path}>
              <source
                onClick={() => select_file(file)}
                src={file.Url}
                type={`video/${file_extension}`}
              />
              Tu navegador no soporta la etiqueta de video.
            </video>
          ) : isPdf ? (
            <div key={file.Path}>
              <span>Icono de PDF</span>
              <a
                onClick={() => select_file(file)}
                href={file.Url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver PDF
              </a>
            </div>
          ) : isAudio ? (
            <audio controls key={file.Path}>
              <source
                onClick={() => select_file(file)}
                src={file.Url}
                type={`audio/${file_extension}`}
              />
              Tu navegador no soporta la etiqueta de audio.
            </audio>
          ) : isEmpty ? (
            <></>
          ) : (
            <div key={file.Path}>
              <span>Icono de archivo</span>
            </div>
          )}
        </div>
      );
    });
  };

  //Navegacion de hacia atras
  function go_back() {
    const lastSlashIndex = actual_route.lastIndexOf("/");
    if (lastSlashIndex !== -1) {
      const newRoute = actual_route.substring(0, lastSlashIndex);
      setActual_route(newRoute);
    }
  }

  //funcion para la seleccion de archivos
  const select_file = (file) => {
    const is_selected = selected_files.some(
      (selected_file) => selected_file.Path === file.Path
    );
    if (is_selected) {
      setSelected_files((prevSelectedFiles) => {
        const newSelectedFiles = new Set(prevSelectedFiles);
        newSelectedFiles.delete(file);
        return [...newSelectedFiles];
      });
      return;
    }

    setSelected_files((prevSelectedFiles) => {
      const newSelectedFiles = new Set(prevSelectedFiles);
      newSelectedFiles.add(file);
      return [...newSelectedFiles];
    });
    setCopied_files([]);
  };

  //funcion que despliega el contenedor principal del file manager
  const display_all_files = () => {
    if (loading) {
      return <div key={"loading_cont"}>Cargando...</div>;
    }

    return (
      <>
        {display_folders(files_in_route)}
        {display_files(files_in_route)}
      </>
    );
  };

  //Funcion que muestra el boton de menu de seleccion
  const selected_menu = () => {
    if (selected_files.length > 0) {
      return (
        <Accordion
          id="selected_menu"
          expanded={expanded}
          onChange={() => setExpanded(!expanded)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="open_selected_menu"
          >
            <Typography component="span">Menu de Seleccion</Typography>
          </AccordionSummary>
          <AccordionDetails id="selected_menu_options">
            <div id="file_option">
              <div
                id="file_option_cont"
                onClick={() => handleOptionClick(copy_files)}
              >
                <ContentCopyIcon id="file_option_icon" />
                <Button
                  style={{ background: "none", border: "none", color: "black" }}
                >
                  Copiar
                </Button>
              </div>
            </div>
            <div id="file_option">
              <div
                id="file_option_cont"
                onClick={() => handleOptionClick(() => console.log("Cortar"))}
              >
                <ContentCutIcon id="file_option_icon" />
                <Button
                  style={{ background: "none", border: "none", color: "black" }}
                >
                  Cortar
                </Button>
              </div>
            </div>
            <div id="file_option">
              <div id="file_option_cont" onClick={cancel_modal_visibliity_open}>
                <DeleteIcon id="file_option_icon" />
                <Button
                  style={{ background: "none", border: "none", color: "black" }}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      );
    }

    return null;
  };

  //Funcion que cierra el menu de seleccionados
  const handleOptionClick = (action) => {
    action();
    setExpanded(false);
  };
  //Funcion que copia los archivos seleccionados
  const copy_files = () => {
    setCopied_files(selected_files);
    setFiles_to_paste(selected_files);
    setSelected_files([]);
  };

  //Funcion que cancela la seleccion de archivos
  const cancel_selection = () => {
    setCopied_files([]);
    setFiles_to_paste([]);
    setSelected_files([]);
  };

  //Funcion que despliega el boton de pegar
  const display_selected_files_buttons = () => {
    if (selected_files.length > 0 || files_to_paste.length > 0) {
      return (
        <div id="selected_files_buttons_cont">
          {files_to_paste.length > 0 && (
            <Button
              onClick={()=>paste_selected_files(actual_route)}
              id="paste_button"
              color="primary"
            >
              Pegar
              <ContentPasteIcon />
            </Button>
          )}
          <Button
            onClick={cancel_selection}
            id="cancel_selection_button"
            color="error"
          >
            <span> Cancelar</span>
            <CloseIcon />
          </Button>
        </div>
      );
    }

    return null;
  };

  //Funcion que pega archivos

  //funcion que pega los archivos seleccionados
  const paste_selected_files = async (destinationPath) => {
  
    for (const file of files_to_paste) {
      if (file.Url !== null) {
        const fileRef = ref(storage, file.Path);
        const newFilePath = `${destinationPath}/${file.Name}`;
        const newFileRef = ref(storage, newFilePath);
  
        try {
          // Obtener la URL de descarga del archivo original
          const url = await getDownloadURL(fileRef);
  
          // Descargar el archivo original
          const response = await fetch(url);
          const blob = await response.blob();
  
          // Subir el archivo a la nueva ubicación
          await uploadBytes(newFileRef, blob);
  
         pasted_files_succesfully();
        } catch (error) {
          paste_files_error();
        }
      } else {
        // Es una carpeta
        await paste_folder(file.Path, destinationPath);
      }
    }
  
    // Actualizar el estado para reflejar los cambios
    setFiles_in_route((prevFiles) => [
      ...prevFiles,
      ...files_to_paste.map((file) => ({
        ...file,
        Path: `${destinationPath}/${file.Name}`,
      })),
    ]);
  
    // Limpiar el estado de archivos a pegar
    setFiles_to_paste([]);
  };

  const delete_file = (filePath) => {
    const fileRef = ref(storage, filePath);

    deleteObject(fileRef)
      .then(() => {
        console.log("Archivo elminado correctamente");
      })
      .catch((error) => {
        cancelled_files_error();
      });
  };

  const delete_folder = async (folderPath) => {
    const folderRef = ref(storage, folderPath);
    try {
      const result = await listAll(folderRef);
      const deletePromises = result.items.map((itemRef) =>
        deleteObject(itemRef)
      );
      await Promise.all(deletePromises);
    } catch (error) {
      cancelled_files_error();
    }
  };

  //Funcion que eliminar los archivos seleccionados
  const delete_selected_files = () => {
    selected_files.forEach((file) => {
      if (file.Url !== null) {
        delete_file(file.Path);
        setFiles_in_route((prevFiles) =>
          prevFiles.filter((f) => !f.Path.startsWith(file.Path))
        );
      } else {
        setFiles_in_route((prevFiles) =>
          prevFiles.filter((f) => !f.Path.startsWith(file.Path))
        );
        delete_folder(file.Path);
      }
    });
    cancelled_files_succesfully();
    setSelected_files([]);
    setCancel_modal_visibility(false);
  };

  return (
    <div className="file_manager_body">
      <div className="file_manager_header">
        <div id="file_manager_searchbar_cont">
          <TextField
            id="file_manager_searchbar"
            placeholder="Buscar Archivo"
            variant="outlined"
          />
        </div>

        <div id="selection_menu_button_cont">{selected_menu()}</div>
      </div>
      <div className="sidetab_cont">
        <Side_tab_file_manager
          newfolder={folder_modal_open}
          loadFiles={file_modal_open}
        />
      </div>
      <div onClick={() => setExpanded(false)} className="file_manager_files">
        <div id="route_cont">
          <div id="selected_files_buttons">
            {display_selected_files_buttons()}
          </div>
          <div className="route_cont">
            <ArrowBackIcon onClick={go_back} style={{ cursor: "pointer" }} />
            <TextField
              value={actual_route}
              variant="standard"
              id="route_cont_input"
            />
          </div>
        </div>
        {display_all_files()}
      </div>
      <Modal
        open={file_modal_visibility}
        onClose={file_modal_close}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={file_modal_visibility}>
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
              <Button variant="contained" color="primary" onClick={Upload_file}>
                Subir
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={file_modal_close}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <Modal
        open={folder_modal_visibliity}
        onClose={folder_modal_close}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={folder_modal_visibliity}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Crear carpeta
            </Typography>
            <Box>
              <TextField
                label="Nombre de la carpeta"
                onChange={(e) => setFolder_name(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={createFolder}
                color="primary"
              >
                Crear
              </Button>
              <Button variant="contained" color="error">
                Cancelar
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <Modal
        open={cancel_modal_visibliity}
        onClose={cancel_modal_visibliity_close}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={cancel_modal_visibliity}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Seguro que desea eliminar los archivos seleccionados?
            </Typography>
            <Box>
              <Button
                variant="contained"
                onClick={delete_selected_files}
                color="primary"
              >
                Aceptar
              </Button>
              <Button
                onClick={cancel_modal_visibliity_close}
                variant="contained"
                color="error"
              >
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

export default File_manager;
