import { ref, set } from "firebase/database";
import { database } from "utils/firebase/firebase";

export const writeData = (category, title, description, isIntro, image, id) => {
  set(ref(database, `${category}/${id}`), {
    id: id,
    title: title,
    description: description,
    isIntro: isIntro,
    image: image
  });
}