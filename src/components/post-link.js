import React from "react";
import { Link } from "gatsby";

export default ({ post }) => {
  const { slug, title, date } = post.frontmatter;
  return (
    <div>
      <Link to={`/post/${slug}`}>
        {title} ({date})
      </Link>
    </div>
  );
};
