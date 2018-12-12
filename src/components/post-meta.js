import React from "react";
import Helmet from "react-helmet";

export default props => {
  const {
    site: { siteMetadata },
    markdownRemark
  } = props.data;
  const { excerpt, frontmatter } = markdownRemark;
  const { title, slug } = frontmatter;
  const url = `${siteMetadata.pageURL}/${slug}`;
  return (
    <Helmet>
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={`${title} | ${siteMetadata.title}`} />
      <meta property="og:description" content={excerpt} />
      {/* TODO: <meta property="og:image" content={} /> */}
    </Helmet>
  );
};
