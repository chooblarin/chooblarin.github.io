import React from "react";

import Layout from "../components/layout";
import PostLink from "../components/post-link";

export default ({ pageContext }) => {
  const { tag, items } = pageContext;
  return (
    <Layout>
      <h1>{`#${tag}`}</h1>
      {items.map(item => (
        <PostLink key={item.id} post={item} />
      ))}
    </Layout>
  );
};
