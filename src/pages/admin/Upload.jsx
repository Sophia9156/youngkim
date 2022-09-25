import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./style/upload.scss";
import AdminBar from "components/layout/admin-bar/AdminBar";
import Checkbox from "components/items/Checkbox";
import DragDropFileUploader from "components/items/DragDropFileUploader";

export default function Upload() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [category, setCategory] = useState("painting");

  useEffect(() => searchParams.has("category") && setCategory(categoryParam), [categoryParam, searchParams]);

  return (
    <main>
      <AdminBar />
      {category === 'painting' && (
        <div className="upload-container">
          <div className="upload-image-container">
            <DragDropFileUploader id="painting" fileTypes={["JPG", "JPEG", "PNG", "GIF"]} 
              onChange={file => console.log(file)}
            />
          </div>
          <ul className="upload-form-container">
            <li className="upload-form-item">
              <Checkbox id="isIntro" 
                onChange={e => console.log(e.target.checked)}
              />
              <label className="checkbox-label" htmlFor="isIntro">인트로로 설정</label>
            </li>
            <li className="upload-form-item">
              <input type="text" placeholder="작품명 입력 (필수 입력)" />
            </li>
            <li className="upload-form-item description">
              <textarea placeholder="작품설명 입력"></textarea>
            </li>
          </ul>
        </div>
      )}
      {category === 'photograph' && (
        <div className="upload-container">
          <div className="upload-image-container">
            <DragDropFileUploader id="painting" fileTypes={["JPG", "JPEG", "PNG", "GIF"]} 
              onChange={file => console.log(file)}
            />
          </div>
        </div>
      )}
      {category === 'drawing' && (
        <div className="upload-container">
          <div className="upload-image-container">
            <DragDropFileUploader id="painting" fileTypes={["JPG", "JPEG", "PNG", "GIF"]} 
              onChange={file => console.log(file)}
            />
          </div>
        </div>
      )}
    </main>
  )
}