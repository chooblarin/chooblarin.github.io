import React from "react";
import Link from "gatsby-link";

export default ({ pageContext }) => {
  const { posts } = pageContext;
  const sortedPostArray = Object.keys(posts)
    .map(key => [key, posts[key].tag])
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
    <div>
      <h1>Tags</h1>
      <ul>
        {sortedPostArray.map(([key, tag]) => (
          <li key={key}>
            <Link to={`/tags/${key}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
