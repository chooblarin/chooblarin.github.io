import React from "react";
import Link from "gatsby-link";

import PostLink from "../components/post-link";

export default ({ pageContext }) => {
  const { posts, tag, items } = pageContext;
  if (tag) {
    console.log(items);
    return (
      <div>
        <h1>{tag}</h1>
        {items.map(item => (
          <PostLink key={item.id} post={item} />
        ))}
      </div>
    );
  } else {
    const sortedPostArray = Object.keys(posts)
      .map(key => [key, posts[key].tag])
      .sort((a, b) => a[1] - b[1]);
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
  }
};
