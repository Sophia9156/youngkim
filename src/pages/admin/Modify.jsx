import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./style/modify.scss";
import AdminBar from "components/layout/admin-bar/AdminBar";

export default function Modify() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [category, setCategory] = useState("painting");

  useEffect(() => searchParams.has("category") && setCategory(categoryParam), [categoryParam, searchParams]);

  return (
    <main>
      <AdminBar />
      {category === 'painting' && (
        <div className="modify-container">
          painting
        </div>
      )}
      {category === 'photograph' && (
        <div className="modify-container">
          photograph
        </div>
      )}
      {category === 'drawing' && (
        <div className="modify-container">
          drawing
        </div>
      )}
    </main>
  )
}