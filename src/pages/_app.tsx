import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import * as React from "react";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  const title = "chooblarin's blog";
  const description = "Sympathy driven development";
  const url = "https://chooblarin.github.io";
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
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default App;
