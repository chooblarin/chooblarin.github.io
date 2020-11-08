import { TitleLogo } from "@/components/TitleLogo";
import { BlogPost } from "@/lib/BlogPost";
import { getAllBlogPosts } from "@/lib/post-files-handler";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

type HomeProps = {
  posts: BlogPost[];
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllBlogPosts();
  const props: HomeProps = {
    posts: posts.map(({ post }) => post),
  };
  return {
    props,
  };
};

const Home: React.FC<HomeProps> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>chooblarin's blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <TitleLogo />
        </div>
        Blog posts
        <section>
          {posts.map((post) => (
            <div key={post.slug}>
              <Link href={`/post/${post.slug}`}>{post.title}</Link>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;
