/** @jsx jsx */
import { jsx, css } from "@emotion/core";
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
      <main
        css={css`
          max-width: 640px;
          padding: 0 10px;
          margin: 0 auto;
        `}
      >
        {postLinks}
      </main>
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
