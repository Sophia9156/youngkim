import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { paintingInit } from "redux/List";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import DragDropFileUploader from "components/items/DragDropFileUploader";
import AdminBar from "components/layout/admin-bar/AdminBar";

export default function ModifyDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { painting } = useSelector(state => state.list);

  useEffect(() => {
    dispatch(paintingInit({id}));
  }, [dispatch, id]);

  const onSubmit = () => {

  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
    },
    validationSchema: Yup.object({
      title: id !== "intro" ? Yup.string().max(255).required("필수 항목입니다.") : Yup.string().max(255),
      description: Yup.string(),
      image: Yup.string(),
    }),
    onSubmit: (values) => {

    }
  });

  return (
    <main>
      <AdminBar onSubmit={onSubmit} />
      <div className="upload-container">
        <div className="upload-image-container">
          <DragDropFileUploader id="painting" fileTypes={["JPG", "JPEG", "PNG", "GIF"]} 
            defaultFile={painting.image ? painting.image : null}
            disabled={id === "intro" ? false : true}
          />
        </div>
        <ul className="upload-form-container no-intro">
          <li className="upload-form-item">
            <input type="text" name="title" id="title" required
              placeholder={id === "intro" ? "인트로 제목 입력" : "작품명 입력 (필수 입력)"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              defaultValue={painting.title ? painting.title : ""}
              key={painting.title ? painting.title : ""}
            />
          </li>
          <li className="upload-form-item description">
            <textarea name="description" id="description"
              placeholder={id === "intro" ? "인트로 내용 입력" : "작품설명 입력"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              defaultValue={painting.description ? painting.description : ""}
              key={painting.description ? painting.description : ""}
            ></textarea>
          </li>
        </ul>
      </div>
    </main>
  )
}