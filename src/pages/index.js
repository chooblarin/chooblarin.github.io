/** @jsx jsx */
import { jsx } from "@emotion/core";
import { graphql } from "gatsby";
import Helmet from "react-helmet";

import Layout from "../components/layout";
import PostLink from "../components/post-link";
import Pagination from "../components/pagination";

export default ({
  data: {
    site: { siteMetadata },
    allMarkdownRemark
  }
}) => {
  const { title, slogan, pageURL } = siteMetadata;

  const pagenateSize = 10;

  const postLinks = allMarkdownRemark.edges
    .slice(0, pagenateSize)
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />);

  const hasNext = postLinks.length >= pagenateSize;

  return (
    <Layout>
      <Helmet>
        <meta property="og:url" content={pageURL} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${title}`} />
        <meta property="og:description" content={slogan} />
        {/* TODO: <meta property="og:image" content={} /> */}
      </Helmet>
      {postLinks}
      {hasNext ? <Pagination first={true} last={!hasNext} page={1} /> : null}
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        slogan
        pageURL
      }
    }
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
