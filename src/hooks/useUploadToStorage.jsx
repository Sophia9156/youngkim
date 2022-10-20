import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";

export default function useUploadToStorage() {
  const [imageURL, setImageURL] = useState("");

  const uploadToStorage = (ref, file) => {
    const uploadTask = uploadBytesResumable(ref, file);
  
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default: 
            console.log("snapshot state 없음");
        }
      },
      (error) => {
        console.log(error.code);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setImageURL(downloadURL);
        });
      }
    );
  }

  return [imageURL, uploadToStorage];
}