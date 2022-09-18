import { Navigate, Route, Routes } from "react-router-dom";
import Contact from "pages/Contact";
import Drawings from "pages/Drawings";
import Paintings from "pages/Paintings";
import Photographs from "pages/Photographs";
import Login from "pages/admin/Login";
import AdminHome from "pages/admin/AdminHome";

export default function CreateRoutes() {
  return (
    <Routes>
      <Route path="/paintings" element={<Paintings />} />
      <Route path="/photographs" element={<Photographs />} />
      <Route path="/drawings" element={<Drawings />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin-login" element={<Login />} />
      <Route path="/admin-home" element={<AdminHome />} />
      <Route path="*" element={<Navigate replace to="/paintings" />} />
      <Route path="/admin*" element={<Navigate replace to ="/admin-home" />} />
    </Routes>
  )
}