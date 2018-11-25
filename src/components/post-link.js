import React from "react";
import { Link } from "gatsby";

export default ({ post }) => {
  const { slug, title, date } = post.frontmatter;
  return (
    <div>
      <Link to={slug}>
        {title} ({date})
      </Link>
    </div>
  );
};
