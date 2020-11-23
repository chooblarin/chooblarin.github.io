import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
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
      <Component {...pageProps} />
    </>
  );
}

export default App;
