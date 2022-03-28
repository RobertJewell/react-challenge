import { db } from "../config/firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { IPost } from "../types/post";

export const getPostBySlug = async (slug: string) => {
	const q = query(collection(db, "posts"), where("slug", "==", slug));

	const querySnapshot = await getDocs(q);

	const place = querySnapshot.docs.map((doc) => {
		return doc.data() as IPost;
	});

	return place.length === 1 ? place[0] : null;
};
