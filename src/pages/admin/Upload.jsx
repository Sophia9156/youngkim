import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./style/upload.scss";
import AdminBar from "components/layout/admin-bar/AdminBar";
import Checkbox from "components/items/Checkbox";
import DragDropFileUploader from "components/items/DragDropFileUploader";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { ref } from "firebase/storage";
import { storage } from "utils/firebase/firebase";
import useUploadToStorage from "hooks/useUploadToStorage";

export default function Upload() {
  const [searchParams] = useSearchParams();
  const [imageURL, uploadToStorage] = useUploadToStorage();
  const categoryParam = searchParams.get("category");
  const [category, setCategory] = useState("painting");
  const [file, setFile] = useState(null);

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
      switch (category) {
        case "painting": 
          uploadToStorage(ref(storage, `paintings/${file.name}`), file);
          console.log(imageURL);
          break;
        case "photograph":
          console.log("photograph");
          break;
        case "drawing":
          console.log("drawing");
          break;
        case "contact":
          console.log("contact");
          break;
        default: console.log("업로드 카테고리 없음");
      }
      toast.dismiss();
      toast.success("업로드를 성공적으로 마쳤습니다.");
    }
  });

  const fileChange = (file) => setFile(file);

  return (
    <main>
      <AdminBar formik={formik} />
      <div className="upload-container">
        <div className="upload-image-container">
          <DragDropFileUploader id="painting" fileTypes={["JPG", "JPEG", "PNG", "GIF"]} 
            onChange={fileChange}
          />
        </div>
        {category === 'painting' && (
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
        )}
      </div>
    </main>
  )
}