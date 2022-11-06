import { BrowserRouter as Router } from "react-router-dom";
import CreateRoutes from "routes/Routes";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import Footer from "components/layout/footer/Footer";
import Header from "components/layout/header/Header";
import TopBtn from "components/items/TopBtn";
import LoadingSpinner from "components/items/LoadingSpinner";

function App() {
  const { loading } = useSelector(state => state.list);

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Router>
          <Header />
          <CreateRoutes />
          <Footer />
          <TopBtn />
        </Router>
      </DndProvider>
      {loading && <LoadingSpinner />}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;