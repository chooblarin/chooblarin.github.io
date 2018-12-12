import React from "react";
import Link from "gatsby-link";

import Layout from "../components/layout";

export default ({ pageContext }) => {
  const { posts } = pageContext;
  const sortedPostArray = Object.keys(posts)
    .map(key => [key, posts[key].tag, posts[key].items])
    .sort((a, b) => {
      if (a[1] < b[1]) {
        return -1;
      }
      if (a[1] > b[1]) {
        return 1;
      }
      return 0;
    });
  return (
    <Layout>
      <h1>Tags</h1>
      <ul>
        {sortedPostArray.map(([key, tag, items]) => (
          <li key={key}>
            <Link to={`/tags/${key}`}>
              {tag} ({items.length})
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
