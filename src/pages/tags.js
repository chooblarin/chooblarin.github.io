import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";

import Layout from "../components/layout";

export default ({
  data: {
    site,
    allMarkdownRemark: { group }
  }
}) => (
  <Layout>
    <Helmet title={`Tags | ${site.siteMetadata.title}`} />
    <ul>
      {group.map(tag => (
        <li key={tag.fieldValue}>{tag.fieldValue}</li>
      ))}
    </ul>
  </Layout>
);

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 100) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
