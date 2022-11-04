import Menu from "@/components/menu/Menu";
import Post from "@/components/posts/Post";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { getRequest } from "@/lib/api";
import { withSessionSsr } from "@/lib/withSession";
import hljs from "highlight.js";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";

const Home: NextPage<{ session: Session; post: Post }> = ({ session, post }) => {
  const setSession = useStore((state) => state.setSession);

  React.useEffect(() => {
    document.querySelectorAll("pre").forEach((el) => {
      hljs.highlightElement(el);
    });
  }, []);

  React.useEffect(() => {
    setSession(session);
  }, []);

  return (
    <>
      <Head>
        <title>{post?.title}</title>
        <meta name="description" content="Updev community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <MainContainer>
        <Post data={post} />
      </MainContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSessionSsr(async (context) => {
  const { req } = context;
  const post = await getRequest({ endpoint: `/posts/${context.params?.slug}` });

  return {
    props: {
      session: req?.session?.user || null,
      post: post.data,
    },
  };
});

export default Home;
