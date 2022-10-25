import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./style/adminbar.scss";
import Button from "components/items/Button";

export default function AdminBar({
  onSubmit,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const handleChangeCategory = e => setSearchParams({category: e.target.textContent});

  return (
    <div className="admin-bar">
      {(id === undefined || id === null || id === "") ? (
        <div className="admin-bar-category-wrap">
          <button type="button" className={`admin-bar-category-btn ${categoryParam === 'painting' ? 'active' : ''}`}
            onClick={handleChangeCategory}
          >painting</button>
          <button type="button" className={`admin-bar-category-btn ${categoryParam === 'photograph' ? 'active' : ''}`}
            onClick={handleChangeCategory}
          >photograph</button>
          <button type="button" className={`admin-bar-category-btn ${categoryParam === 'drawing' ? 'active' : ''}`}
            onClick={handleChangeCategory}
          >drawing</button>
          <button type="button" className={`admin-bar-category-btn ${categoryParam === 'contact' ? 'active' : ''}`}
            onClick={handleChangeCategory}
          >contact</button>
        </div>
      ) : (
        <div></div>
      )}
      <ul className="admin-bar-btn-list">
        <li className="admin-bar-btn-item">
          <Button type="button"
            onClick={() => {
              (id === undefined || id === null || id === "") ? navigate("/admin-home") : navigate(-1)
            }}
          >취소</Button>
        </li>
        <li className="admin-bar-btn-item">
          <Button type="button" color="grey"
            onClick={onSubmit}
          >{pathname === "/admin-upload" ? "업로드" : ((id === undefined || id === null || id === "") ? "선택삭제" : "저장하기")}</Button>
        </li>
      </ul>
    </div>
  )
}