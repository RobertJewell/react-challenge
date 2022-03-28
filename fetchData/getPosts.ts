import { db } from "../config/firebase.config";
import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
} from "firebase/firestore";
import { IPost } from "../types/post";

export const getPosts = async (startPoint: string, maxItems: number) => {
	const citiesRef = collection(db, "posts");

	const q = await getDocs(
		query(
			citiesRef,
			orderBy("title"),
			startAfter(startPoint || ""),
			limit(maxItems)
		)
	);

	const posts = q.docs.map((doc) => {
		return doc.data() as IPost;
	});

	return posts;
};
