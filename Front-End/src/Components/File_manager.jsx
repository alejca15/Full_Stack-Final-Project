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
import EditIcon from "@mui/icons-material/Edit";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import MovieIcon from "@mui/icons-material/Movie";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import SdCardAlertIcon from "@mui/icons-material/SdCardAlert";
import HomeIcon from "@mui/icons-material/Home";

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
  const [folders_scheme, setFolders_scheme] = useState([]);
  const [files_to_paste, setFiles_to_paste] = useState([]);
  const [is_cut, setIs_cut] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [routeInputValue, setRouteInputValue] = useState(root);
  const [searchTerm, setSearchTerm] = useState("");

  const [edit_file_name_modal_visibility, setEdit_file_name_modal_visibility] =
    useState(false);
  const [download_file_modal_visibility, setDownload_file_modal_visibility] =
    useState(false);
  const [file_to_download, setFile_to_download] = useState(null);

  const [files_in_route, setFiles_in_route] = useState([]);

  const file_modal_open = () => setFile_modal_visibility(true);
  const file_modal_close = () => setFile_modal_visibility(false);

  const folder_modal_open = () => setFolder_modal_visibility(true);
  const folder_modal_close = () => setFolder_modal_visibility(false);

  const cancel_modal_visibliity_open = () => setCancel_modal_visibility(true);
  const cancel_modal_visibliity_close = () => setCancel_modal_visibility(false);

  const dowload_file_modal_open = (file) => {
    setFile_to_download(file),
      setDownload_file_modal_visibility(true),
      open_file(file);
  };
  const dowload_file_modal_close = () => {
    setFileContent(null), setDownload_file_modal_visibility(false);
  };

  const change_file_name_modal_open = () =>
    setEdit_file_name_modal_visibility(true);
  const change_file_name_modal_close = () =>
    setEdit_file_name_modal_visibility(false);

  const file_list_ref = ref(storage, actual_route);

  const open_uploaded_toast = () => toast("Archivo subido correctamente!");
  const folder_created_toast = () => toast("Carpeta creada correctamente!");
  const cancelled_files_succesfully = () =>
    toast.success("Archivos eliminados");
  const cancelled_files_error = () =>
    toast.error("Los archivos no fueron eliminados, intente nuevamente.");
  const pasted_files_succesfully = () => toast.success("Archivos pegados");
  const paste_files_error = () => toast.error("Los archivos no fueron pegados");
  const name_changed_succesfully = () => toast.success("Nombre cambiado");
  const name_changed_error = () => toast.error("El nombre no fue cambiado");
  const already_exists_toast = () =>
    toast.error("Ya existe un archivo con ese nombre");

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
    const file_ref = ref(storage, `${actual_route}/${file.name}`);
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
      close_menu_when_added();
      return file_modal_close();
    });
  };

  const generate_folders_scheme = async (storage, root) => {
    const queue = [{ path: root, parent: null }];
    const structure = [];

    while (queue.length > 0) {
      const { path: currentPath, parent } = queue.shift();
      const folderRef = ref(storage, currentPath);
      const res = await listAll(folderRef);

      const folders = res.prefixes.map((prefix) => ({
        name: prefix.name,
        path: prefix.fullPath,
        children: [],
      }));

      if (parent === null) {
        structure.push(...folders);
      } else {
        const parentFolder = findFolder(structure, parent);
        if (parentFolder) {
          parentFolder.children.push(...folders);
        }
      }

      folders.forEach((folder) => {
        queue.push({ path: folder.path, parent: folder.path });
      });
    }

    return structure;
  };

  const findFolder = (folders, path) => {
    for (const folder of folders) {
      if (folder.path === path) {
        return folder;
      }
      if (folder.children) {
        const found = findFolder(folder.children, path);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchFolders = async () => {
      const folderStructure = await generate_folders_scheme(storage, root);
      setFolders_scheme(folderStructure);
      setLoading(false);
    };

    fetchFolders();
  }, [root]);

  // Sincroniza el valor del TextField con actual_route
  useEffect(() => {
    setRouteInputValue(actual_route);
  }, [actual_route]);

  const handleRouteInputChange = (event) => {
    setRouteInputValue(event.target.value);
  };

  const handleRouteInputBlur = () => {
    setActual_route(routeInputValue);
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
      close_menu_when_added();
      setSelected_files([]);
    }
  };

  //Funcion para abrir carpetas
  const open_folder = (file) => {
    const is_empty = file.Path.includes("/.empty") ? true : false;
    if (is_empty) {
      const roote_to_go = file.Path.replace("/.empty", "");
      return setActual_route(roote_to_go);
    }
    setActual_route(file.Path);
    setSelected_files([]);
  };

  //Funcion que muestra si ya existe un archivo con el mismo nombre
  const file_exists = () => {
    return files_to_paste.some((fileToPaste) =>
      files_in_route.some(
        (file) =>
          (file.Name === fileToPaste.Name &&
            file.Url !== null &&
            fileToPaste.Url !== null) ||
          (file.Name === fileToPaste.Name &&
            file.Url === null &&
            fileToPaste.Url === null)
      )
    );
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
          onClick={() => select_file(file)}
        >
          <div>
            <FolderIcon
              id="folder_icon"
              onDoubleClick={() => open_folder(file)}
            />
            <p>{file.Name}</p>
          </div>
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

      const file_name = file.Name.split(".").shift().toLowerCase();

      const image_extensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
      const text_extensions = ["txt", "md", "json", "xml", "csv"];
      const video_extensions = [
        "mp4",
        "avi",
        "mov",
        "wmv",
        "flv",
        "mkv",
        "gif",
      ];
      const pdf_extensions = ["pdf"];
      const audio_extensions = ["mp3", "wav", "ogg", "flac"];

      const isImage = includes_string(image_extensions, file_extension);
      const isText = includes_string(text_extensions, file_extension);
      const isVideo = includes_string(video_extensions, file_extension);
      const isPdf = includes_string(pdf_extensions, file_extension);
      const isAudio = includes_string(audio_extensions, file_extension);

      if (file_extension.includes("empty?alt=media&token")) {
        return null;
      }
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
          onClick={() => select_file(file)}
          onDoubleClick={() => dowload_file_modal_open(file)}
        >
          {isImage ? (
            <div>
              <img src={file.Url} alt="file" />
              <p>{file_name}</p>
            </div>
          ) : isText ? (
            <div>
              <TextSnippetIcon id="folder_icon" />
              <p>{file_name}</p>
            </div>
          ) : isVideo ? (
            <div>
              <MovieIcon id="folder_icon" />
              <p>{file_name}</p>
            </div>
          ) : isPdf ? (
            <div>
              <PictureAsPdfIcon id="folder_icon" />
              <p>{file_name}</p>
            </div>
          ) : isAudio ? (
            <div>
              <AudioFileIcon id="folder_icon" />
              <p>{file_name}</p>
            </div>
          ) : (
            <div>
              <SdCardAlertIcon id="folder_icon" />
              <p>{file_name}</p>
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
    setSelected_files([]);
    setSearchTerm("");
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

  //verifica si el folder esta vacío
  const isFolderEmpty = (files) => {
    if (files.length === 0) return true;

    return files.every((file) => {
      if (file.Url !== null && !file.Url.includes(".empty")) return false; // Si hay un archivo que no es .empty, no está vacío
      if (file.children && file.children.length > 0) {
        return isFolderEmpty(file.children); // Verificar recursivamente
      }
      return true; // Si es una carpeta sin hijos o solo tiene .empty
    });
  };

  //funcion que despliega el contenedor principal del file manager
  const display_all_files = () => {
    if (loading) {
      return <div key={"loading_cont"}>Cargando...</div>;
    }

    const filteredFiles = searchTerm
      ? filterFiles(files_in_route, searchTerm)
      : files_in_route;

    if (filteredFiles.length === 0) {
      return (
        <div id="empty_folder_page" key={"empty_folder"}>
          <p>{searchTerm ? "Archivos no encontrados" : "Carpeta Vacía"}</p>
        </div>
      );
    }

    return (
      <>
        {display_folders(filteredFiles)}
        {display_files(filteredFiles)}
      </>
    );
  };

  // Función para manejar el cambio del TextField
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterFiles = (files, searchTerm) => {
    return files.filter((file) =>
      file.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  //Funcion que muestra el boton de menu de seleccion
  const selected_menu = () => {
    if (selected_files.length > 0) {
      const just_one = selected_files.length === 1;
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
              <div id="file_option_cont" onClick={handle_cut_option}>
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
            {just_one && (
              <div id="file_option">
                <div
                  id="file_option_cont"
                  onClick={change_file_name_modal_open}
                >
                  <EditIcon id="file_option_icon" />
                  <Button
                    onClick={change_file_name_modal_open}
                    style={{
                      background: "none",
                      border: "none",
                      color: "black",
                    }}
                  >
                    Editar
                  </Button>
                </div>
              </div>
            )}
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
    setIs_cut(false);
  };

  //Funcion que despliega el boton de pegar
  const display_selected_files_buttons = () => {
    if (selected_files.length > 0 || files_to_paste.length > 0) {
      return (
        <div id="selected_files_buttons_cont">
          {files_to_paste.length > 0 && (
            <Button onClick={paste} id="paste_button" color="primary">
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

  //funcion que pega los archivos seleccionados
  const paste_selected_files = async (destinationPath) => {
    const updatedFiles = [];

    for (const file of files_to_paste) {
      if (file.Url !== null) {
        const fileRef = ref(storage, file.Path);
        const newFilePath = `${destinationPath}/${file.Name}`;
        const newFileRef = ref(storage, newFilePath);

        try {
          const url = await getDownloadURL(fileRef);
          const response = await fetch(url);
          const blob = await response.blob();
          await uploadBytes(newFileRef, blob);
          const new_url = await getDownloadURL(newFileRef);

          updatedFiles.push({
            ...file,
            Path: newFilePath,
            Url: new_url,
          });
        } catch (error) {
          return paste_files_error();
        }
      } else {
        try {
          await paste_folder(file.Path, destinationPath);
          updatedFiles.push({
            ...file,
            Path: `${destinationPath}/${file.Name}`,
          });
        } catch (error) {
          return paste_files_error();
        }
      }
    }

    // Actualizar el estado para reflejar los cambios
    setFiles_in_route((prevFiles) => [...prevFiles, ...updatedFiles]);
    pasted_files_succesfully();
    setFiles_to_paste([]);
  };

  //Funcion que pega una carpeta
  const paste_folder = async (folderPath, destinationPath) => {
    const folderRef = ref(storage, folderPath);

    try {
      // Listar todos los archivos y carpetas dentro de la carpeta
      const result = await listAll(folderRef);

      // Crear la nueva ruta de la carpeta
      const newFolderPath = `${destinationPath}/${folderPath.split("/").pop()}`;

      // Copiar cada archivo y carpeta recursivamente
      const pastePromises = result.items.map((itemRef) => {
        const newFilePath = `${newFolderPath}/${itemRef.name}`;
        return paste_single_file(
          { Path: itemRef.fullPath, Name: itemRef.name },
          newFolderPath
        );
      });

      const folderPastePromises = result.prefixes.map((prefixRef) => {
        return paste_folder(prefixRef.fullPath, newFolderPath);
      });

      await Promise.all([...pastePromises, ...folderPastePromises]);

      console.log(
        `Carpeta ${folderPath} pegada exitosamente en ${newFolderPath}`
      );
    } catch (error) {
      console.error(`Error al pegar la carpeta ${folderPath}:`, error);
    }
  };

  //Funcion que pega un solo archivo
  const paste_single_file = async (file, destinationPath) => {
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

      console.log(`Archivo ${file.Name} pegado exitosamente en ${newFilePath}`);
    } catch (error) {
      console.error(`Error al pegar el archivo ${file.Name}:`, error);
    }
  };

  //Funcion que elimina un archivo
  const delete_file = (filePath) => {
    const fileRef = ref(storage, filePath);
    console.log("Entre");

    deleteObject(fileRef)
      .then(() => {
        console.log("Archivo elminado correctamente");
      })
      .catch((error) => {
        console.error("Error al eliminar el archivo:", error);
        cancelled_files_error();
      });
  };

  //Funcion que elimina una carpeta
  const delete_folder = async (folderPath) => {
    const folderRef = ref(storage, folderPath);
    try {
      // Listar todos los archivos y carpetas dentro de la carpeta
      const result = await listAll(folderRef);

      // Eliminar todos los archivos dentro de la carpeta
      const deleteFilePromises = result.items.map((itemRef) =>
        deleteObject(itemRef)
      );

      // Eliminar todas las subcarpetas dentro de la carpeta de forma recursiva
      const deleteFolderPromises = result.prefixes.map((prefixRef) =>
        delete_folder(prefixRef.fullPath)
      );

      // Esperar a que todas las promesas de eliminación se completen
      await Promise.all([...deleteFilePromises, ...deleteFolderPromises]);

      // Eliminar la carpeta vacía
      await deleteObject(folderRef);

      console.log(`Carpeta ${folderPath} eliminada exitosamente`);
    } catch (error) {
      console.error(`Error al eliminar la carpeta ${folderPath}:`, error);
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

  //Funcion que edita el nombre de un archivo
  const update_file_name = async () => {
    const oldFilePath = selected_files[0].Path;
    const oldFileName = selected_files[0].Name;
    const oldFileRef = ref(storage, oldFilePath);

    // Extraer la extensión del archivo original
    const fileExtension = oldFileName.substring(oldFileName.lastIndexOf("."));
    const newFileName = `${folder_name}${fileExtension}`;
    const newFilePath = `${actual_route}/${newFileName}`;
    const newFileRef = ref(storage, newFilePath);

    try {
      const url = await getDownloadURL(oldFileRef);
      const response = await fetch(url);
      const blob = await response.blob();
      await uploadBytes(newFileRef, blob);
      const new_url = await getDownloadURL(newFileRef);
      await deleteObject(oldFileRef);
      setFiles_in_route((prevFiles) =>
        prevFiles.map((file) => {
          if (file.Path === oldFilePath) {
            return {
              ...file,
              Name: folder_name + fileExtension,
              Path: newFilePath,
              Url: new_url,
            };
          }
          return file;
        })
      );
      console.log(`Archivo renombrado exitosamente a ${newFileName}`);
    } catch (error) {
      console.error(`Error al renombrar el archivo ${oldFilePath}:`, error);
    }
  };

  //funcion que edite el nombre de un folder
  const update_folder_name = async () => {
    const oldFolderPath = selected_files[0].Path;
    const newFolderPath = `${actual_route}/${folder_name}`;
    const oldFolderRef = ref(storage, oldFolderPath);

    try {
      // Listar todos los archivos y carpetas dentro de la carpeta original
      const result = await listAll(oldFolderRef);

      // Copiar cada archivo y carpeta recursivamente a la nueva ubicación con el nuevo nombre
      const pastePromises = result.items.map((itemRef) => {
        const newFilePath = `${newFolderPath}/${itemRef.name}`;
        return paste_single_file(
          { Path: itemRef.fullPath, Name: itemRef.name },
          newFolderPath
        );
      });

      const folderPastePromises = result.prefixes.map((prefixRef) => {
        return paste_folder(prefixRef.fullPath, newFolderPath);
      });

      await Promise.all([...pastePromises, ...folderPastePromises]);

      // Si la carpeta está vacía, crear un archivo vacío en la nueva carpeta
      if (result.items.length === 0 && result.prefixes.length === 0) {
        const emptyFileRef = ref(storage, `${newFolderPath}/.empty`);
        const emptyBlob = new Blob([""], { type: "text/plain" });
        await uploadBytes(emptyFileRef, emptyBlob);
      }

      // Eliminar la carpeta original
      await delete_folder(oldFolderPath);

      // Actualizar el estado para reflejar los cambios
      setFiles_in_route((prevFiles) =>
        prevFiles.map((file) => {
          if (file.Path.startsWith(oldFolderPath)) {
            return {
              ...file,
              Name: folder_name,
              Path: file.Path.replace(oldFolderPath, newFolderPath),
              Url: null,
            };
          }
          return file;
        })
      );
      change_file_name_modal_close();
      console.log(`Carpeta renombrada exitosamente a ${newFolderPath}`);
    } catch (error) {
      change_file_name_modal_close();
      console.error(`Error al renombrar la carpeta ${oldFolderPath}:`, error);
    }
  };

  //funcion que cambia el nombre del archivo o folder
  const edit_name = async () => {
    if (selected_files[0].Url != null) {
      try {
        await update_file_name();
        change_file_name_modal_close();
        setSelected_files([]);
        return name_changed_succesfully();
      } catch (error) {
        change_file_name_modal_close();
        return name_changed_error();
      }
    } else {
      update_folder_name();
    }
  };

  // Función que pega
  const paste = async () => {
    if (file_exists()) {
      already_exists_toast();
      return;
    }
    if (is_cut) {
      // Pegar los archivos en la nueva ubicación
      await paste_selected_files(actual_route);

      // Eliminar los archivos originales después de pegar
      for (const file of files_to_paste) {
        if (file.Url !== null) {
          delete_file(file.Path);
        } else {
          await delete_folder(file.Path);
        }
      }

      // Limpiar el estado de archivos a pegar

      setFiles_to_paste([]);
      setIs_cut(false);
      const folderStructure = await generate_folders_scheme(storage, root);
      setFolders_scheme(folderStructure);
    } else {
      await paste_selected_files(actual_route);
      const folderStructure = await generate_folders_scheme(storage, root);
      setFolders_scheme(folderStructure);
    }
  };

  //funcion que corta los archivos seleccionados
  const handle_cut_option = () => {
    setCopied_files(selected_files);
    setFiles_to_paste(selected_files);
    setSelected_files([]);
    setIs_cut(true);
    setExpanded(false);
  };

  //funcion que cierra el menu de añadir
  const close_menu_when_added = () => {
    setAnchorEl(null);
  };

  //funcion para un click en un lugar de deseleccion
  const blank_click = () => {
    setExpanded(false);
    close_menu_when_added();
  };

  //funcion que abre un archivo
  const open_file = async (file) => {
    try {
      const url = file.Url;
      const fileExtension = file.Path.split(".").pop().toLowerCase();

      let content;
      if (
        ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(fileExtension)
      ) {
        content = (
          <img src={url} alt="file" style={{ width: "100%", height: "100%" }} />
        );
      } else if (
        ["mp4", "avi", "mov", "wmv", "flv", "mkv"].includes(fileExtension)
      ) {
        content = (
          <video controls style={{ width: "100%", height: "100%" }}>
            <source src={url} type={`video/${fileExtension}`} />
            Tu navegador no soporta la etiqueta de video.
          </video>
        );
      } else if (["mp3", "wav", "ogg", "flac"].includes(fileExtension)) {
        content = (
          <audio controls style={{ width: "100%" }}>
            <source src={url} type={`audio/${fileExtension}`} />
            Tu navegador no soporta la etiqueta de audio.
          </audio>
        );
      } else if (fileExtension === "pdf") {
        content = (
          <iframe src={url} style={{ width: "100%", height: "100%" }} />
        );
      } else {
        content = (
          <iframe src={url} style={{ width: "100%", height: "100%" }}>
            Tu navegador no soporta la visualización de este archivo.
          </iframe>
        );
      }

      setFileContent(content);
      setDownload_file_modal_visibility(true);
      console.log(`Archivo ${file.Path} abierto exitosamente`);
    } catch (error) {
      console.error(`Error al abrir el archivo ${file.Path}:`, error);
    }
  };

  //funcion que descarga un archivo por url
  const download_file_by_url = async (file) => {
    const fileName = file.Name;
    const url = file.Url;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      const fileExtension = fileName.split(".").pop();
      const downloadName = fileName.includes(".")
        ? fileName
        : `${fileName}.${fileExtension}`;
      link.href = window.URL.createObjectURL(blob);
      link.download = downloadName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log(`Archivo ${fileName} descargado exitosamente`);
    } catch (error) {
      console.error(`Error al descargar el archivo ${fileName}:`, error);
    }
  };

  const nav_to_route = (route) => {
    setActual_route(route);
    setSearchTerm("");
    setSelected_files([]);
  };

  return (
    <div className="file_manager_body">
      <div className="file_manager_header">
        <div id="file_manager_searchbar_cont">
          <TextField
            id="file_manager_searchbar"
            placeholder="Buscar Archivo"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div id="selection_menu_button_cont">{selected_menu()}</div>
      </div>
      <div className="sidetab_cont">
        <Side_tab_file_manager
          newfolder={folder_modal_open}
          loadFiles={file_modal_open}
          close_button={close_menu_when_added}
          scheme={folders_scheme}
          nav_to_route={(e) => nav_to_route(e)}
        />
      </div>
      <div onClick={blank_click} className="file_manager_files">
        <div id="route_cont">
          <div id="selected_files_buttons">
            {display_selected_files_buttons()}
          </div>
          <div className="route_cont">
            <HomeIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                setActual_route(root), setSelected_files([]), setSearchTerm("");
              }}
            />
            <ArrowBackIcon onClick={go_back} style={{ cursor: "pointer" }} />
            <TextField
              value={routeInputValue}
              onChange={handleRouteInputChange}
              onBlur={handleRouteInputBlur}
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
              <Button
                onClick={() => setFolder_modal_visibility(false)}
                variant="contained"
                color="error"
              >
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
      <Modal
        open={edit_file_name_modal_visibility}
        onClose={change_file_name_modal_close}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={edit_file_name_modal_visibility}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Nuevo nombre
            </Typography>
            <Box>
              <TextField
                label="Nombre del archivo"
                onChange={(e) => setFolder_name(e.target.value)}
                variant="outlined"
              />
              <Button onClick={edit_name} variant="contained" color="primary">
                Aceptar
              </Button>
              <Button
                onClick={change_file_name_modal_close}
                variant="contained"
                color="error"
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <Modal
        open={download_file_modal_visibility}
        onClose={dowload_file_modal_close}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={download_file_modal_visibility}>
          <Box className="download_file_modal">
            <Box id="open_file_cont">{fileContent}</Box>
            <Box id="download_file_buttons">
              <Button
                onClick={() => download_file_by_url(file_to_download)}
                variant="contained"
                color="primary"
              >
                Descargar
              </Button>
              <Button
                onClick={dowload_file_modal_close}
                variant="contained"
                color="error"
              >
                Cerrar
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
