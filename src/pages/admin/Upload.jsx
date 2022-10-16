import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./style/upload.scss";
import AdminBar from "components/layout/admin-bar/AdminBar";
import Checkbox from "components/items/Checkbox";
import DragDropFileUploader from "components/items/DragDropFileUploader";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { writeData } from "utils/apis/database";

export default function Upload() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [category, setCategory] = useState("painting");

  useEffect(() => searchParams.has("category") && setCategory(categoryParam), [categoryParam, searchParams]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "imageUrl",
      isIntro: false,
    },
    validationSchema: Yup.object({
      title: Yup.string().max(255).required("필수 항목입니다."),
      description: Yup.string(),
      image: Yup.mixed().required(),
      isIntro: Yup.boolean().required()
    }),
    onSubmit: (values) => {
      toast.dismiss();
      toast.loading("업로드 요청 중입니다.");
      writeData(categoryParam, values['title'], values['description'], values['isIntro'], values["image"], 2);
      toast.dismiss();
      toast.success("업로드를 성공적으로 마쳤습니다.");
    }
  });

  const fileChange = (file) => {

  }

  return (
    <main>
      <AdminBar formik={formik} />
      {category === 'painting' && (
        <div className="upload-container">
          <div className="upload-image-container">
            <DragDropFileUploader id="painting" fileTypes={["JPG", "JPEG", "PNG", "GIF"]} 
              onChange={file => console.log(file)}
            />
          </div>
          <ul className="upload-form-container">
            <li className="upload-form-item">
              <Checkbox 
                id="isIntro" 
                name="isIntro"
                onChange={e => formik.handleChange(e.target.checked)}
              />
              <label className="checkbox-label" htmlFor="isIntro">인트로로 설정</label>
            </li>
            <li className="upload-form-item">
              <input type="text" name="title" id="title" required
                placeholder="작품명 입력 (필수 입력)" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </li>
            <li className="upload-form-item description">
              <textarea name="description" id="description"
                placeholder="작품설명 입력"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
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