import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./style/upload.scss";
import AdminBar from "components/layout/admin-bar/AdminBar";
import Checkbox from "components/items/Checkbox";
import DragDropFileUploader from "components/items/DragDropFileUploader";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { uploadToStorage } from "utils/firebase/storage";
import { writeData } from "utils/firebase/database";

export default function Upload() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [category, setCategory] = useState("painting");
  const [file, setFile] = useState(null);
  const [isIntro, setIntro] = useState(false);
  const [isUploading, setUploading] = useState(false);

  useEffect(() => searchParams.has("category") && setCategory(categoryParam), [categoryParam, searchParams]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "imageUrl",
    },
    validationSchema: Yup.object({
      title: category === "painting" ? Yup.string().max(255).required("필수 항목입니다.") : Yup.string().max(255),
      description: Yup.string(),
      image: Yup.mixed().required()
    }),
    onSubmit: async (values) => {
      setUploading(true);
      toast.dismiss();
      toast.loading("업로드 요청 중입니다.");
      const timestamp = new Date().valueOf();

      switch (category) {
        case "painting":
          if(isIntro) {
            try {
              if(file !== null) {
                const imageURL = await uploadToStorage(`intro/${file.name}`, file);
                await writeData('intro/', {
                  id: timestamp,
                  title: values["title"],
                  description: values["description"],
                  image: imageURL
                });
              } else {
                await writeData('intro/', {
                  id: timestamp,
                  title: values["title"],
                  description: values["description"],
                  image: ""
                });
              }
              toast.dismiss();
              toast.success("업로드를 성공적으로 마쳤습니다.");
              navigate("/admin-home");
              setUploading(false);
            } catch (error) {
              toast.dismiss();
              toast.error("다시 로그인 해주세요.");
              navigate("/admin-login");
              setUploading(false);
            }
          } else {
            try {
              const imageURL = await uploadToStorage(`paintings/${timestamp}/${file.name}`, file);
              await writeData('paintings/' + timestamp, {
                id: timestamp,
                title: values["title"],
                description: values["description"],
                image: imageURL
              });
              toast.dismiss();
              toast.success("업로드를 성공적으로 마쳤습니다.");
              navigate("/admin-home");
              setUploading(false);
            } catch (error) {
              toast.dismiss();
              toast.error("다시 로그인 해주세요.");
              navigate("/admin-login");
              setUploading(false);
            }
          }
          break;
        case "photograph":
          try {
            const imageURL = await uploadToStorage(`photographs/${timestamp}/${file.name}`, file);
            await writeData('photographs/' + timestamp, {
              id: timestamp,
              image: imageURL
            });
            toast.dismiss();
            toast.success("업로드를 성공적으로 마쳤습니다.");
            navigate("/admin-home");
            setUploading(false);
          } catch (error) {
            toast.dismiss();
            toast.error("다시 로그인 해주세요.");
            navigate("/admin-login");
            setUploading(false);
          }
          break;
        case "drawing":
          try {
            const imageURL = await uploadToStorage(`drawings/${timestamp}/${file.name}`, file);
            await writeData('drawings/' + timestamp, {
              id: timestamp,
              image: imageURL
            });
            toast.dismiss();
            toast.success("업로드를 성공적으로 마쳤습니다.");
            navigate("/admin-home");
            setUploading(false);
          } catch (error) {
            toast.dismiss();
            toast.error("다시 로그인 해주세요.");
            navigate("/admin-login");
            setUploading(false);
          }
          break;
        case "contact":
          try {
            const imageURL = await uploadToStorage(`contact/${file.name}`, file);
            await writeData('contact/', {
              id: timestamp,
              image: imageURL
            });
            toast.dismiss();
            toast.success("업로드를 성공적으로 마쳤습니다.");
            navigate("/admin-home");
            setUploading(false);
          } catch (error) {
            toast.dismiss();
            toast.error("다시 로그인 해주세요.");
            navigate("/admin-login");
            setUploading(false);
          }
          break;
        default: console.log("No Category");
      }
    }
  });

  const fileChange = (file) => setFile(file);

  return (
    <main>
      <AdminBar formik={formik} isUploading={isUploading} />
      <div className="upload-container">
        <div className="upload-image-container">
          <DragDropFileUploader id="painting" fileTypes={["JPG", "JPEG", "PNG", "GIF"]} 
            onChange={fileChange}
          />
        </div>
        {category === "painting" && (
          <ul className="upload-form-container">
            <li className="upload-form-item">
              <Checkbox 
                id="isIntro" 
                name="isIntro"
                onChange={e => setIntro(e.target.checked)}
              />
              <label className="checkbox-label" htmlFor="isIntro">인트로로 설정</label>
            </li>
            <li className="upload-form-item">
              <input type="text" name="title" id="title" required
                placeholder={isIntro ? "인트로 제목 입력" : "작품명 입력 (필수 입력)"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </li>
            <li className="upload-form-item description">
              <textarea name="description" id="description"
                placeholder={isIntro ? "인트로 내용 입력" : "작품설명 입력"}
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