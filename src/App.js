import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/layout/header/Header";
import CreateRoutes from "./routes/Routes";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <CreateRoutes />
      </Router>
    </div>
  );
}

export default App;