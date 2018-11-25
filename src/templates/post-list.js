import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import PostLink from "../components/post-link";

export default ({ pageContext }) => {
  const { group, first, last, pageIndex } = pageContext;
  const page = pageIndex + 1; // pageIndex starts by 0
  const postLinks = group.map(edge => (
    <PostLink key={edge.node.id} post={edge.node} />
  ));

  return (
    <Layout>
      {postLinks}
      <div>{!first && <Link to={`page/${page - 1}`}>Newer posts</Link>}</div>
      <div>{!last && <Link to={`page/${page + 1}`}>Older posts</Link>}</div>
    </Layout>
  );
};
