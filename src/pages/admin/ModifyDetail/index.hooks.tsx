import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/useStore";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { paintingInit } from "store/List";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { uploadToStorage } from "utils/firebase/storage";
import { writeData } from "utils/firebase/database";

const useModifyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { painting } = useAppSelector((state) => state.list);
  const [file, setFile] = useState<any>(null);
  const [isUploading, setUploading] = useState(false);

  useEffect(() => {
    id && dispatch(paintingInit({ id }));
  }, [dispatch, id]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
    },
    validationSchema: Yup.object({
      title:
        id !== "intro"
          ? Yup.string().max(255).required("필수 항목입니다.")
          : Yup.string().max(255),
      description: Yup.string(),
      image: Yup.string(),
    }),
    onSubmit: async (values) => {
      setUploading(true);
      toast.dismiss();
      toast.loading("수정 내용을 저장 중입니다.");
      let databasePath;
      let data;

      if (id === "intro") {
        if (file !== null) {
          const imageURL = await uploadToStorage(`intro/${file.name}`, file);
          databasePath = "intro/";
          data = {
            id: "intro",
            title: values["title"],
            description: values["description"],
            image: imageURL,
          };
        } else {
          databasePath = "intro/";
          data = {
            id: "intro",
            title: values["title"],
            description: values["description"],
            image: "",
          };
        }
      } else if (painting) {
        databasePath = "paintings/" + painting.id;
        data = {
          id: painting.id,
          title: values["title"],
          description: values["description"],
          image: painting.image,
        };
      }

      if (databasePath && data) {
        try {
          await writeData(databasePath, data);
          toast.dismiss();
          toast.success("내용 수정을 성공적으로 마쳤습니다.");
          navigate({
            pathname: "/admin-modify",
            search: createSearchParams({
              category: "painting",
            }).toString(),
          });
          setUploading(false);
        } catch (error) {
          toast.dismiss();
          toast.error("다시 로그인 해주세요.");
          navigate("/admin-login");
          setUploading(false);
        }
      }
    },
  });

  // 초기값 셋팅
  useEffect(() => {
    if (painting) {
      painting.title === null ||
      painting.title === undefined ||
      painting.title === ""
        ? (formik.values.title = "")
        : (formik.values.title = painting.title);
      painting.description === null ||
      painting.description === undefined ||
      painting.description === ""
        ? (formik.values.description = "")
        : (formik.values.description = painting.description);
      painting.image === null ||
      painting.image === undefined ||
      painting.image === ""
        ? (formik.values.image = "")
        : (formik.values.image = painting.image);
    }
  }, [painting]);

  const fileChange = (file: any) => setFile(file);

  const onSubmit = useCallback(() => {
    if (isUploading === false) {
      if (id === "intro") {
        if (
          formik.values.title === "" &&
          formik.values.description === "" &&
          formik.values.image === ""
        ) {
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
  }, [formik, id, isUploading]);

  return {
    formik,
    id,
    painting,
    fileChange,
    onSubmit,
  };
};

export default useModifyDetail;
