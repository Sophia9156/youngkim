import Footer from "components/layout/footer/Footer";
import Header from "components/layout/header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import CreateRoutes from "routes/Routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <CreateRoutes />
        <Footer />
      </Router>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;