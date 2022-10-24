import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "./style/adminbar.scss";
import Button from "components/items/Button";

export default function AdminBar({onSubmit, isUploading}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const handleChangeCategory = e => setSearchParams({category: e.target.textContent});

  return (
    <div className="admin-bar">
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
      <ul className="admin-bar-btn-list">
        <li className="admin-bar-btn-item">
          <Button type="button"
            onClick={() => navigate("/admin-home")}
          >취소</Button>
        </li>
        {pathname === "/admin-upload" ? (
          <li className="admin-bar-btn-item">
            <Button type="button" color="grey"
              onClick={() => isUploading === false && onSubmit()}
            >업로드</Button>
          </li>
        ) : (
          <li className="admin-bar-btn-item">
            <Button type="button" color="grey"
              onClick={() => isUploading === false && onSubmit()}
            >선택삭제</Button>
          </li>
        )}
      </ul>
    </div>
  )
}