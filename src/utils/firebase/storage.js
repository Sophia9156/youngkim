import { getDownloadURL, uploadBytesResumable } from "firebase/storage";

export const uploadToStorage = (ref, file) => {
  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(ref, file);

    uploadTask.on('state_changed',
      (snapshot) => {
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
        reject(new Error(`uploadToStorage is failed: ${error.code}`));
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  })
}