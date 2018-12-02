import React from "react";

import PostLink from "../components/post-link";

export default ({ pageContext }) => {
  const { tag, items } = pageContext;
  return (
    <div>
      <h1>{tag}</h1>
      {items.map(item => (
        <PostLink key={item.id} post={item} />
      ))}
    </div>
  );
};
