import type { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout";
import Intro from "../components/intro";
import HeroPost from "../components/hero-post";
import MoreStories from "../components/more-stories";
import { getPosts } from "../fetchData/getPosts";

const Index = ({
  allPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

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
      </Container>
    </Layout>
  );
};

export default Index;

export const getStaticProps = async () => {
  const allPosts = await getPosts();

  return {
    props: { allPosts },
  };
};
