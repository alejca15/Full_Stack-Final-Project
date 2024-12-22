import Routing from "./Routes/Routing";
import "../Src/Styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Endurance_provider from "./Components/Context/Endurance_provider";

function App() {
  return (
    <Endurance_provider>
      <Routing />
    </Endurance_provider>
  );
}

export default App;
