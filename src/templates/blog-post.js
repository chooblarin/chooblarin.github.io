/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Helmet from "react-helmet";
import { graphql } from "gatsby";

import Layout from "../components/layout";

export default function({ data }) {
  const { site, markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout>
      <Helmet>
        <title>{`${frontmatter.title} | ${site.siteMetadata.title}`}</title>
        <script async src="https://static.codepen.io/assets/embed/ei.js" />
        <script
          async
          src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML"
        />
        <script type="text/x-mathjax-config">
          {`
          MathJax.Hub.Config({
            tex2jax: {
              inlineMath: [['$','$']],
              displayMath: [['$$','$$']],
              processEscapes: true
            },
            CommonHTML: { matchFontHeight: false },
            displayAlign: "left",
            displayIndent: "2em"
          });
          `}
        </script>
      </Helmet>
      <h1
        css={css`
          font-size: 3.2rem;
          margin: 20px 0 24px;
        `}
      >
        {frontmatter.title}
      </h1>
      <p
        css={css`
          color: #878787;
          font-size: 16px;
        `}
      >
        {frontmatter.date}
      </p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
    }
  }
`;
