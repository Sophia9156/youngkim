import { Router } from "react-router-dom";
import CreateRoutes from "./routes/Routes";

function App() {
  return (
    <div className="App">
      <Router>
        <CreateRoutes />
      </Router>
    </div>
  );
}

export default App;