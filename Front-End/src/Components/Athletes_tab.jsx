import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

const Athletes_tab = ({ Switch_Tab }) => {
  return (
    <div id="Athletes_cont">
      <div id="switch_cont">
        Atletas
        <Switch {...label} onChange={Switch_Tab} />
        Candidatos
      </div>
    </div>
  );
};

export default Athletes_tab;
