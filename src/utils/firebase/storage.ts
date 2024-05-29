import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Storage } from "./firebase";

/**
 * @description Firebase 스토리지 업로드
 * @param pathname 스토리지 경로
 * @param file 파일
 * @returns Promise
 */
export const uploadToStorage = (pathname: string, file: any) => {
  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(ref(Storage, pathname), file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("snapshot state 없음");
        }
      },
      (error) => {
        reject(new Error(`uploadToStorage is failed: ${error.code}`));
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

/**
 * @description Firebase 스토리지 삭제
 * @param pathname 스토리지 경로
 * @returns Promise
 */
export const deleteToStorage = (pathname: string) => {
  return new Promise((resolve, reject) => {
    const desertRef = ref(Storage, pathname);

    deleteObject(desertRef)
      .then(() => {
        resolve("success");
      })
      .catch((error) => {
        reject(new Error(`deleteToStorage is failed: ${error}`));
      });
  });
};
