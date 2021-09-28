import { db } from "../config/firebase.config";
import { collection, getDocs } from "firebase/firestore";

export const getPosts = async () => {
  const querySnapshot = await getDocs(collection(db, "posts"));

  const posts = querySnapshot.docs.map((doc) => {
    return doc.data();
  });

  return posts;
};
