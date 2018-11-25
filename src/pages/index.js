import React from "react";
import { graphql } from "gatsby";

import Header from "../components/header";

export default () => {
  return (
    <div>
      <Header />
      <div>Hello</div>
    </div>
  );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
