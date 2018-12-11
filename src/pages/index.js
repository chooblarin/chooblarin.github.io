/** @jsx jsx */
import { jsx } from "@emotion/core";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import PostLink from "../components/post-link";
import Pagination from "../components/pagination";

export default ({ data: { allMarkdownRemark } }) => {
  const pagenateSize = 10;

  const postLinks = allMarkdownRemark.edges
    .slice(0, pagenateSize)
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />);

  const hasNext = postLinks.length >= pagenateSize;

  return (
    <Layout>
      {postLinks}
      {hasNext ? <Pagination first={true} last={!hasNext} page={1} /> : null}
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
