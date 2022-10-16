import TopBtn from "components/items/TopBtn";
import Footer from "components/layout/footer/Footer";
import Header from "components/layout/header/Header";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";
import CreateRoutes from "routes/Routes";

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Header />
        <CreateRoutes />
        <Footer />
        <TopBtn />
      </Router>
    </div>
  );
}

export default App;