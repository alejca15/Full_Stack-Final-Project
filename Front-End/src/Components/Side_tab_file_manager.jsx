import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import FolderIcon from "@mui/icons-material/Folder";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";

// Estilos para los acordeones de la barra lateral
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))({
  backgroundColor: 'white',
  border: 'none',
  '&:before': {
    display: 'none',
  },
});

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))({
  backgroundColor: 'white',
  minHeight: '30px !important',
  '& .MuiAccordionSummary-content': {
    margin: 0,
    justifyContent: 'space-between',
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    order: -1, // Mueve el icono de expansión a la izquierda
  },
});

const AccordionDetails = styled(MuiAccordionDetails)({
  backgroundColor: 'white',
  padding: 0,
  display: 'block', // Asegura que el contenido se expanda verticalmente
});

// Estilos para el menu de Nuevo
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

// Componente de la barra lateral
export default function Side_tab_file_manager({
  loadFiles,
  newfolder,
  close_button,
  scheme,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (close_button) {
      close_button();
    }
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [panel]: isExpanded,
    }));
  };{}
  const renderAccordions = (folders, level = 0) => {
    const paddingLeft = `${level * 20}px`; // Incrementa el padding para cada nivel de anidación
    return folders.map((folder) => {
      if (folder.children && folder.children.length > 0) {
        return (
          <Accordion key={folder.path} expanded={!!expanded[folder.path]} onChange={handleChange(folder.path)} style={{ paddingLeft }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontSize: 'smaller' }}>{folder.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {renderAccordions(folder.children, level + 1)}
            </AccordionDetails>
          </Accordion>
        );
      } else {
        return (
          <Box key={folder.path} display="flex" alignItems="center" style={{ paddingLeft:"20px", height: '30px' }}>
            <FolderIcon sx={{ fontSize: 'smaller' }} />
            <Typography sx={{ fontSize: 'smaller', marginLeft: '8px' }}>{folder.name}</Typography>
          </Box>
        );
      }
    });
  };

  return (
    <div id='side_tab_file_manager'>
    <Button
      id="add_file_button"
      aria-controls={open ? 'demo-customized-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      variant="contained"
      disableElevation
      onClick={handleClick}
      endIcon={<AddIcon />}
    >
      Añadir
    </Button>
    <StyledMenu
      id="demo-customized-menu"
      MenuListProps={{
        'aria-labelledby': 'add_file_button',
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={newfolder} disableRipple>
        <FolderIcon />
        Carpeta
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
      <MenuItem onClick={loadFiles} disableRipple>
        <AttachFileIcon />
        Añadir Archivo
      </MenuItem>
    </StyledMenu>
    <Accordion expanded={!!expanded['crc-endurance']} onChange={handleChange('crc-endurance')} style={{ paddingLeft: '0px' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ fontSize: 'smaller' }}>crc-endurance</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {renderAccordions(scheme)}
      </AccordionDetails>
    </Accordion>
  </div>
  );
}
