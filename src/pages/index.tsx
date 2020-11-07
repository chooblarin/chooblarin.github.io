import { GetStaticProps } from "next";
import Head from "next/head";
import { getBlogPostFilenames } from "../lib/getBlogPostFilenames";

type HomeProps = {
  postIds: string[];
};

export const getStaticProps: GetStaticProps = async () => {
  const filenames = getBlogPostFilenames();
  const props: HomeProps = {
    postIds: filenames,
  };
  return {
    props,
  };
};

const Home: React.FC<HomeProps> = ({ postIds }) => {
  return (
    <div>
      <Head>
        <title>chooblarin's blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Hello
      <main>
        {postIds.map((postId) => (
          <div key={postId}>{postId}</div>
        ))}
      </main>
    </div>
  );
};

export default Home;
