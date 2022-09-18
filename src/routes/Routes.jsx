import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "pages/Admin";
import Contact from "pages/Contact";
import Drawings from "pages/Drawings";
import Paintings from "pages/Paintings";
import Photographs from "pages/Photographs";

export default function CreateRoutes() {
  return (
    <Routes>
      <Route path="/paintings" element={<Paintings />} />
      <Route path="/photographs" element={<Photographs />} />
      <Route path="/drawings" element={<Drawings />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<Navigate replace to="/paintings" />} />
    </Routes>
  )
}