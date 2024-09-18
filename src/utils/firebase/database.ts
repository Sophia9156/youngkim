import { child, get, ref, remove, set } from "firebase/database";
import { DB } from "./firebase";

/**
 * @description Firebase 데이터베이스 쓰기
 * @param pathname 데이터베이스 경로
 * @param data 데이터
 * @returns Promise
 */
export const writeData = (pathname: string, data: any) => {
  return new Promise((resolve, reject) => {
    set(ref(DB, pathname), data)
      .then(() => {
        resolve(`Data is saved successfully in ${pathname}`);
      })
      .catch((error) => reject(error));
  });
};

/**
 * @description Firebase 데이터베이스 읽기
 * @param pathname 데이터베이스 경로
 * @returns Promise
 */
export const getData = (pathname: string) => {
  const dbRef = ref(DB);
  return new Promise((resolve, reject) => {
    get(child(dbRef, pathname))
      .then((snapshot) => {
        if (snapshot.exists()) {
          resolve(snapshot.val());
        } else {
          resolve(null);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * @description Firebase 데이터베이스 삭제
 * @param pathname 데이터베이스 경로
 * @returns Promise
 */
export const deleteData = (pathname: string) => {
  return new Promise((resolve, reject) => {
    remove(ref(DB, pathname))
      .then(() => {
        resolve(`Data is removed successfully in ${pathname}`);
      })
      .catch((error) => reject(error));
  });
};
