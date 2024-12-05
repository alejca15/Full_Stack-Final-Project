import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

const Candidates_tab = ({ Switch_Tab }) => {
  return (
    <div id="Athletes_cont">
      <div id="switch_cont">
        Atletas
        <Switch {...label} defaultChecked onChange={Switch_Tab} />
        Candidatos
      </div>
      <div id="Candidates_cont">

      </div>
    </div>
  );
};

export default Candidates_tab;
