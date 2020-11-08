import { GetStaticProps } from "next";
import Head from "next/head";
import {
  getBlogPostContent,
  getBlogPostFilenames,
} from "../lib/post-files-handler";

type HomeProps = {
  postIds: string[];
};

export const getStaticProps: GetStaticProps = async () => {
  const filenames = getBlogPostFilenames();

  for (const filename of filenames) {
    await getBlogPostContent(filename);
  }

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
