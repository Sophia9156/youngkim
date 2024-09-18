import "./upload.scss";
import useHooks from "./index.hooks";
import AdminBar from "components/layout/admin-bar/AdminBar";
import Checkbox from "components/items/Checkbox";
import DragDropFileUploader from "components/items/DragDropFileUploader";

const Upload: React.FC = () => {
  const { formik, isIntro, category, onChangeCheckbox, fileChange, onSubmit } =
    useHooks();

  return (
    <main>
      <AdminBar onSubmit={onSubmit} />
      <div className="upload-container">
        <div className="upload-image-container">
          <DragDropFileUploader
            id="image"
            fileTypes={["JPG", "JPEG", "PNG", "GIF"]}
            onChange={fileChange}
            defaultFile={null}
            disabled={false}
          />
        </div>
        {category === "painting" && (
          <ul className="upload-form-container">
            <li className="upload-form-item">
              <Checkbox
                id="isIntro"
                name="isIntro"
                onChange={onChangeCheckbox}
              />
              <label
                className="checkbox-label"
                htmlFor="isIntro">
                인트로로 설정
              </label>
            </li>
            <li className="upload-form-item">
              <input
                type="text"
                name="title"
                id="title"
                required
                placeholder={
                  isIntro ? "인트로 제목 입력" : "작품명 입력 (필수 입력)"
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </li>
            <li className="upload-form-item description">
              <textarea
                name="description"
                id="description"
                placeholder={isIntro ? "인트로 내용 입력" : "작품설명 입력"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}></textarea>
            </li>
          </ul>
        )}
      </div>
    </main>
  );
};

export default Upload;
