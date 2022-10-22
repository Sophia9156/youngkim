import { child, get, ref, set } from "firebase/database";
import { DB } from "./firebase";

export const writeData = (pathname, data) => {
  return new Promise((resolve, reject) => {
    set(ref(DB, pathname), data)
    .then(() => {
      resolve(`Data is saved successfully in ${ref}`);
    })
    .catch((error) => reject(error));
  });
}

export const getData = (pathname) => {
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
}