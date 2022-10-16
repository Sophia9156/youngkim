import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Contact from "pages/Contact";
import Drawings from "pages/Drawings";
import Paintings from "pages/Paintings";
import Photographs from "pages/Photographs";
import Login from "pages/admin/Login";
import AdminHome from "pages/admin/AdminHome";
import { useSelector } from "react-redux";
import Upload from "pages/admin/Upload";
import Modify from "pages/admin/Modify";

export default function CreateRoutes() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggingIn } = useSelector(state => state.login);

  useEffect(() => {
    if(pathname.includes("/admin")) {
      if(!isLoggingIn) {
        navigate("/admin-login");
      }
    }
  }, [isLoggingIn, navigate, pathname]);

  // 페이지 이동 시 상단 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/paintings" element={<Paintings />} />
      <Route path="/photographs" element={<Photographs />} />
      <Route path="/drawings" element={<Drawings />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin-login" element={<Login />} />
      <Route path="/admin-home" element={<AdminHome />} />
      <Route path="/admin-upload" element={<Upload />} />
      <Route path="/admin-modify" element={<Modify />} />
      <Route path="*" element={<Navigate replace to="/paintings" />} />
      <Route path="/admin*" element={<Navigate replace to ="/admin-login" />} />
    </Routes>
  )
}