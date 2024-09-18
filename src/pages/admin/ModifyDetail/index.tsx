import useHooks from "./index.hooks";
import DragDropFileUploader from "components/items/DragDropFileUploader";
import AdminBar from "components/layout/admin-bar/AdminBar";

const ModifyDetail: React.FC = () => {
  const { formik, id, painting, fileChange, onSubmit } = useHooks();

  return (
    <main>
      <AdminBar onSubmit={onSubmit} />
      <div className="upload-container">
        <div className="upload-image-container">
          <DragDropFileUploader
            id="image"
            fileTypes={["JPG", "JPEG", "PNG", "GIF"]}
            defaultFile={painting?.image ? painting.image : null}
            disabled={id === "intro" ? false : true}
            onChange={fileChange}
          />
        </div>
        <ul className="upload-form-container no-intro">
          <li className="upload-form-item">
            <input
              type="text"
              name="title"
              id="title"
              required
              placeholder={
                id === "intro" ? "인트로 제목 입력" : "작품명 입력 (필수 입력)"
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              defaultValue={painting?.title ? painting.title : ""}
              key={painting?.title ? painting.title : ""}
            />
          </li>
          <li className="upload-form-item description">
            <textarea
              name="description"
              id="description"
              placeholder={
                id === "intro" ? "인트로 내용 입력" : "작품설명 입력"
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              defaultValue={painting?.description ? painting.description : ""}
              key={
                painting?.description ? painting.description : ""
              }></textarea>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default ModifyDetail;
