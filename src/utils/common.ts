import Resizer from "react-image-file-resizer";

export const getBase64 = (fileObj: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileObj);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error :", error);
    };
  });
};

export const resizeFile = (file: File) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      600,
      600,
      "JPG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "blob"
    );
  });
};
