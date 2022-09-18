import Footer from "components/layout/footer/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/layout/header/Header";
import CreateRoutes from "./routes/Routes";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <CreateRoutes />
        <Footer />
      </Router>
    </div>
  );
}

export default App;