import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { uploadToStorage } from "utils/firebase/storage";
import { writeData } from "utils/firebase/database";
import { resizeFile } from "utils/common";
import { useAppDispatch, useAppSelector } from "hooks/useStore";
import { paintingsOrderInit } from "store/List";

const useUpload = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { paintingsOrder } = useAppSelector((state) => state.list);
  const [category, setCategory] = useState("painting");
  const [file, setFile] = useState<any>(null);
  const [isIntro, setIntro] = useState(false);
  const [isUploading, setUploading] = useState(false);

  useEffect(() => {
    searchParams.has("category") &&
      setCategory(searchParams.get("category") as string);
  }, [searchParams]);

  useEffect(() => {
    dispatch(paintingsOrderInit());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
    },
    validationSchema: Yup.object({
      title:
        category === "painting" && !isIntro
          ? Yup.string().max(255).required("필수 항목입니다.")
          : Yup.string().max(255),
      description: Yup.string(),
      image: Yup.string(),
    }),
    onSubmit: async (values) => {
      setUploading(true);
      toast.dismiss();
      toast.loading("업로드 요청 중입니다.");
      const timestamp = new Date().valueOf();
      let storagePath = "";
      let databasePath = undefined;
      let imagePath = undefined;
      let data = undefined;

      switch (category) {
        case "painting": {
          if (isIntro) {
            storagePath = `intro/${file.name}`;
            databasePath = "intro/";
            imagePath = "intro/";
            data = {
              id: "intro",
              title: values["title"],
              description: values["description"],
            };
          } else {
            storagePath = `paintings/${timestamp}/${file.name}`;
            databasePath = `paintings/${timestamp}`;
            imagePath = `paintings/${timestamp}/`;
            data = {
              id: timestamp,
              title: values["title"],
              description: values["description"],
            };
          }
          break;
        }
        case "photograph": {
          storagePath = `photographs/${timestamp}/${file.name}`;
          databasePath = `photographs/${timestamp}`;
          imagePath = `photographs/${timestamp}/`;
          data = {
            id: timestamp,
          };
          break;
        }
        case "drawing": {
          storagePath = `drawings/${timestamp}/${file.name}`;
          databasePath = `drawings/${timestamp}`;
          imagePath = `drawings/${timestamp}`;
          data = {
            id: timestamp,
          };
          break;
        }
        case "contact": {
          storagePath = `contact/${file.name}`;
          databasePath = "contact/";
          imagePath = "contact/";
          break;
        }
        default:
          return;
      }

      try {
        let imageURL = undefined;
        if (file !== null) {
          const compressedFile = await resizeFile(file);
          imageURL = await uploadToStorage(storagePath, compressedFile);
        }
        await writeData(databasePath, {
          ...data,
          image: imageURL ?? "",
          imagePath: imageURL ? `${imagePath}${file.name}` : "",
        });
        if (category === "painting" && !isIntro) {
          if (paintingsOrder.length === 0) {
            await writeData("paintingsOrder", [timestamp]);
          } else {
            await writeData("paintingsOrder", [timestamp, ...paintingsOrder]);
          }
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

      // switch (category) {
      //   case "painting":
      //     if (isIntro) {
      //       try {
      //         if (file !== null) {
      //           const imageURL = await uploadToStorage(
      //             `intro/${file.name}`,
      //             file
      //           );
      //           await writeData("intro/", {
      //             id: "intro",
      //             title: values["title"],
      //             description: values["description"],
      //             image: imageURL,
      //             imagePath: `intro/${file.name}`,
      //           });
      //         } else {
      //           await writeData("intro/", {
      //             id: "intro",
      //             title: values["title"],
      //             description: values["description"],
      //             image: "",
      //             imagePath: "",
      //           });
      //         }
      //         toast.dismiss();
      //         toast.success("업로드를 성공적으로 마쳤습니다.");
      //         navigate("/admin-home");
      //         setUploading(false);
      //       } catch (error) {
      //         toast.dismiss();
      //         toast.error("다시 로그인 해주세요.");
      //         navigate("/admin-login");
      //         setUploading(false);
      //       }
      //     } else {
      //       try {
      //         const imageURL = await uploadToStorage(
      //           `paintings/${timestamp}/${file.name}`,
      //           file
      //         );
      //         await writeData("paintings/" + timestamp, {
      //           id: timestamp,
      //           title: values["title"],
      //           description: values["description"],
      //           image: imageURL,
      //           imagePath: `paintings/${timestamp}/${file.name}`,
      //         });
      //         if (paintingsOrder.length === 0) {
      //           await writeData("paintingsOrder", [timestamp]);
      //         } else {
      //           await writeData("paintingsOrder", [
      //             timestamp,
      //             ...paintingsOrder,
      //           ]);
      //         }
      //         toast.dismiss();
      //         toast.success("업로드를 성공적으로 마쳤습니다.");
      //         navigate("/admin-home");
      //         setUploading(false);
      //       } catch (error) {
      //         toast.dismiss();
      //         toast.error("다시 로그인 해주세요.");
      //         navigate("/admin-login");
      //         setUploading(false);
      //       }
      //     }
      //     break;
      //   case "photograph":
      //     try {
      //       const imageURL = await uploadToStorage(
      //         `photographs/${timestamp}/${file.name}`,
      //         file
      //       );
      //       await writeData("photographs/" + timestamp, {
      //         id: timestamp,
      //         image: imageURL,
      //         imagePath: `photographs/${timestamp}/${file.name}`,
      //       });
      //       toast.dismiss();
      //       toast.success("업로드를 성공적으로 마쳤습니다.");
      //       navigate("/admin-home");
      //       setUploading(false);
      //     } catch (error) {
      //       toast.dismiss();
      //       toast.error("다시 로그인 해주세요.");
      //       navigate("/admin-login");
      //       setUploading(false);
      //     }
      //     break;
      //   case "drawing":
      //     try {
      //       const imageURL = await uploadToStorage(
      //         `drawings/${timestamp}/${file.name}`,
      //         file
      //       );
      //       await writeData("drawings/" + timestamp, {
      //         id: timestamp,
      //         image: imageURL,
      //         imagePath: `drawings/${timestamp}/${file.name}`,
      //       });
      //       toast.dismiss();
      //       toast.success("업로드를 성공적으로 마쳤습니다.");
      //       navigate("/admin-home");
      //       setUploading(false);
      //     } catch (error) {
      //       toast.dismiss();
      //       toast.error("다시 로그인 해주세요.");
      //       navigate("/admin-login");
      //       setUploading(false);
      //     }
      //     break;
      //   case "contact":
      //     try {
      //       const imageURL = await uploadToStorage(
      //         `contact/${file.name}`,
      //         file
      //       );
      //       await writeData("contact/", {
      //         id: timestamp,
      //         image: imageURL,
      //         imagePath: `contact/${file.name}`,
      //       });
      //       toast.dismiss();
      //       toast.success("업로드를 성공적으로 마쳤습니다.");
      //       navigate("/admin-home");
      //       setUploading(false);
      //     } catch (error) {
      //       toast.dismiss();
      //       toast.error("다시 로그인 해주세요.");
      //       navigate("/admin-login");
      //       setUploading(false);
      //     }
      //     break;
      //   default:
      //     return;
      // }
    },
  });

  const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) =>
    setIntro(e.target.checked);

  const fileChange = (file: any) => setFile(file);

  const onSubmit = useCallback(() => {
    if (isUploading === false) {
      if (category === "painting") {
        if (isIntro) {
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
          } else if (file === null) {
            toast.dismiss();
            toast.error("이미지를 업로드해주세요.");
          } else {
            formik.handleSubmit();
          }
        }
      } else {
        if (file === null) {
          toast.dismiss();
          toast.error("이미지를 업로드해주세요.");
        } else {
          formik.handleSubmit();
        }
      }
    }
  }, [category, file, formik, isIntro, isUploading]);

  return {
    formik,
    isIntro,
    category,
    onChangeCheckbox,
    fileChange,
    onSubmit,
  };
};

export default useUpload;
