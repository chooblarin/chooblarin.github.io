import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";

export default function({ data }) {
  const { frontmatter, html } = data.markdownRemark;
  return (
    <div className="blog-post-container">
      <Helmet>
        <script async src="https://static.codepen.io/assets/embed/ei.js" />
        <script
          async
          src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML"
        />
        <script type="text/x-mathjax-config">
          {`
          MathJax.Hub.Config({
            tex2jax: {
              inlineMath: [['$','$'], ['\\(','\\)']],
              processEscapes: true
            },
            CommonHTML: { matchFontHeight: false },
            displayAlign: "left",
            displayIndent: "2em"
          });
          `}
        </script>
      </Helmet>
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
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
