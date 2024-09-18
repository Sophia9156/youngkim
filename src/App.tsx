import { BrowserRouter as Router } from "react-router-dom";
import CreateRoutes from "routes/Routes";
import { Toaster } from "react-hot-toast";
import { useAppSelector } from "hooks/useStore";
import Footer from "components/layout/footer/Footer";
import Header from "components/layout/header/Header";
import TopBtn from "components/items/TopBtn";
import LoadingSpinner from "components/items/LoadingSpinner";

function App() {
  const { loading } = useAppSelector((state) => state.list);

  return (
    <div className="App">
      <Router>
        <Header />
        <CreateRoutes />
        <Footer />
        <TopBtn />
      </Router>
      {loading && <LoadingSpinner />}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
