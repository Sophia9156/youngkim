import { useSearchParams } from "react-router-dom";
import "./style/adminbar.scss";
import Button from "components/items/Button";

export default function AdminBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const handleClick = e => setSearchParams({category: e.target.textContent});

  return (
    <div className="admin-bar">
      <div className="admin-bar-category-wrap">
        <button className={`admin-bar-category-btn ${categoryParam === 'painting' ? 'active' : ''}`}
          onClick={handleClick}
        >painting</button>
        <button className={`admin-bar-category-btn ${categoryParam === 'photograph' ? 'active' : ''}`}
          onClick={handleClick}
        >photograph</button>
        <button className={`admin-bar-category-btn ${categoryParam === 'drawing' ? 'active' : ''}`}
          onClick={handleClick}
        >drawing</button>
      </div>
      <ul className="admin-bar-btn-list">
        <li className="admin-bar-btn-item">
          <Button>취소</Button>
        </li>
        <li className="admin-bar-btn-item">
          <Button grey>업로드</Button>
        </li>
      </ul>
    </div>
  )
}