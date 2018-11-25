import React from "react";
import { graphql } from "gatsby";

import Header from "../components/header";
import PostLink from "../components/post-link";

export default ({ data: { allMarkdownRemark } }) => {
  const postLinks = allMarkdownRemark.edges.map(edge => (
    <PostLink key={edge.node.id} post={edge.node} />
  ));
  return (
    <div>
      <Header />
      <div>{postLinks}</div>
    </div>
  );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 400)
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            slug
          }
        }
      }
    }
  }
`;
