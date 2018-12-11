import React from "react";

import Layout from "../components/layout";
import PostLink from "../components/post-link";
import Pagination from "../components/pagination";

export default ({ pageContext }) => {
  const { group, first, last, pageIndex } = pageContext;
  const page = pageIndex + 1; // pageIndex starts by 0
  const postLinks = group.map(edge => (
    <PostLink key={edge.node.id} post={edge.node} />
  ));

  return (
    <Layout>
      {postLinks}
      <Pagination first={first} last={last} page={page} />
    </Layout>
  );
};
