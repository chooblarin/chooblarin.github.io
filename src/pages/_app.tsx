import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import Head from "next/head";
import * as React from "react";
import { siteConfig } from "src/constants";
import "../styles/globals.css";

const { title, description, url } = siteConfig;

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title={title}
        description={description}
        openGraph={{
          type: "website",
          title,
          description,
          url,
          site_name: title,
          images: [
            {
              url: "og-default.png",
              width: 1280,
              height: 675,
              alt: title,
            },
          ],
        }}
      />
      <Head>
        <meta
          name="google-site-verification"
          content="5MMy9toPN2P8O6xmRyiBp-l97-pCGSnLGS2AwiUdWpI"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
