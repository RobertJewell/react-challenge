import { useState } from "react";
import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout";
import Intro from "../components/intro";
import HeroPost from "../components/hero-post";
import MoreStories from "../components/more-stories";
import { getPosts } from "../fetchData/getPosts";
import { IPost } from "../types/post";
import { numberPagesToLoad } from "../constants/blog";

interface IPostsArray {
	allPosts: IPost[];
}

const Index: React.FC<IPostsArray> = ({ allPosts }) => {
	const [allPostsArray, setAllPostsArray] = useState<IPost[]>(allPosts);
	const [postsShown, setPostsShown] = useState(
		allPostsArray.length - numberPagesToLoad
	);

	const heroPost: IPost = allPostsArray[0];
	const morePosts: IPost[] = allPostsArray.slice(1, postsShown);

	const loadMorePosts = async () => {
		setPostsShown(postsShown + numberPagesToLoad);
		const lastpostTitle = allPostsArray[allPostsArray.length - 1].title;
		const newPosts = await getPosts(lastpostTitle, numberPagesToLoad);
		setAllPostsArray([...allPostsArray, ...newPosts]);
	};

	return (
		<Layout>
			<Head>
				<title>Next.js Blog Example with Firebase</title>
			</Head>
			<Container>
				<Intro />
				{heroPost && (
					<HeroPost
						title={heroPost.title}
						slug={heroPost.slug}
						excerpt={heroPost.excerpt}
					/>
				)}
				{morePosts.length > 0 && <MoreStories posts={morePosts} />}
				{postsShown <= allPostsArray.length ? (
					<div className="flex mb-16">
						<div
							className="inline-block px-8 py-3 mx-auto text-white bg-black rounded-md cursor-pointer"
							onClick={loadMorePosts}
						>
							Load More
						</div>
					</div>
				) : (
					<p className="w-full mt-6 mb-12 text-center">
						{"You're all caught up! 🎉"}
					</p>
				)}
			</Container>
		</Layout>
	);
};

export default Index;

export const getStaticProps = async () => {
	const numberPostsToLoad = 3 + numberPagesToLoad;
	const allPosts = await getPosts("", numberPostsToLoad);

	return {
		props: { allPosts },
	};
};
