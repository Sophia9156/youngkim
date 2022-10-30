import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { paintingInit } from "redux/List";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import DragDropFileUploader from "components/items/DragDropFileUploader";
import AdminBar from "components/layout/admin-bar/AdminBar";
import { uploadToStorage } from "utils/firebase/storage";
import { writeData } from "utils/firebase/database";

export default function ModifyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { painting } = useSelector(state => state.list);
  const [file, setFile] = useState(null);
  const [isUploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(paintingInit({id}));
  }, [dispatch, id]);

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
    onSubmit: async (values) => {
      setUploading(true);
      toast.dismiss();
      toast.loading("수정 내용을 저장 중입니다.");

      if (id === "intro") {
        try {
          if(file !== null) {
            const imageURL = await uploadToStorage(`intro/${file.name}`, file);
            await writeData('intro/', {
              id: "intro",
              title: values["title"],
              description: values["description"],
              image: imageURL
            });
          } else {
            await writeData('intro/', {
              id: "intro",
              title: values["title"],
              description: values["description"],
              image: ""
            });
          }
          toast.dismiss();
          toast.success("내용 수정을 성공적으로 마쳤습니다.");
          navigate({
            pathname: "/admin-modify",
            search: createSearchParams({
              category: "painting"
            }).toString()
          });
          setUploading(false);
        } catch (error) {
          toast.dismiss();
          toast.error("다시 로그인 해주세요.");
          navigate("/admin-login");
          setUploading(false);
        }
      } else {
        try {
          await writeData('paintings/' + painting.id, {
            id: painting.id,
            title: values["title"],
            description: values["description"],
            image: painting.image
          });
          toast.dismiss();
          toast.success("내용 수정을 성공적으로 마쳤습니다.");
          navigate({
            pathname: "/admin-modify",
            search: createSearchParams({
              category: "painting"
            }).toString()
          });
          setUploading(false);
        } catch (error) {
          toast.dismiss();
          toast.error("다시 로그인 해주세요.");
          navigate("/admin-login");
          setUploading(false);
        }
      }
    }
  });

  // 초기값 셋팅
  useEffect(() => {
    painting.title === null || painting.title === undefined || painting.title === "" ?  formik.values.title = "" : formik.values.title = painting.title;
    painting.description === null || painting.description === undefined || painting.description === "" ? formik.values.description = "" : formik.values.description = painting.description;
    painting.image === null || painting.image === undefined || painting.image === "" ?
    formik.values.image = "" : formik.values.image = painting.image;
  }, [painting]);

  const fileChange = (file) => setFile(file);

  const onSubmit = () => {
    if (isUploading === false) {
      if (id === "intro") {
        if (formik.values.title === "" && formik.values.description === "" && formik.values.image === "") {
          toast.dismiss();
          toast.error("내용을 입력해주세요.");
        } else {
          formik.handleSubmit();
        }
      } else {
        if (formik.values.title === "") {
          toast.dismiss();
          toast.error("제목을 입력해주세요.");
        } else {
          formik.handleSubmit();
        }
      }
    }
  };

  return (
    <main>
      <AdminBar onSubmit={onSubmit} />
      <div className="upload-container">
        <div className="upload-image-container">
          <DragDropFileUploader id="image" fileTypes={["JPG", "JPEG", "PNG", "GIF"]} 
            defaultFile={painting.image ? painting.image : null}
            disabled={id === "intro" ? false : true}
            onChange={fileChange}
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