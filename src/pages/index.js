import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import PostLink from "../components/post-link";

export default ({ data: { allMarkdownRemark } }) => {
  const pagenateSize = 10;

  const postLinks = allMarkdownRemark.edges
    .slice(0, pagenateSize)
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />);

  return (
    <Layout>
      {postLinks}
      {postLinks.length >= pagenateSize && (
        <Link to="/page/2">Older posts</Link>
      )}
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
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
