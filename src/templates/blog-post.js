/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { graphql, Link } from "gatsby";
import Helmet from "react-helmet";
import { DiscussionEmbed } from "disqus-react";

import Layout from "../components/layout";
const slugify = require("../helper/slugify");

const disqusShortname = "chooblarin";

export default function({ data }) {
  const { site, markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const disqusConfig = {
    identifier: frontmatter.slug,
    title: frontmatter.title
  };
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
          margin: 20px 0 12px;
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
      <div
        css={{
          display: "flex",
          flexFlow: "row wrap",
          marginBottom: "4rem",
          "& .tag": {
            color: "#6B6B6B",
            background: "#EEEEEE",
            fontSize: "12px",
            padding: "7px 12px",
            margin: "4px 8px 4px 0",
            borderRadius: "2px"
          }
        }}
      >
        {frontmatter.tags.map(tag => (
          <Link to={`/tags/${slugify(tag)}`} key={tag}>
            <span className="tag">{`#${tag}`}</span>
          </Link>
        ))}
      </div>
      <div
        css={css`
          margin-bottom: 8rem;
        `}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
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
        slug
      }
    }
  }
`;
