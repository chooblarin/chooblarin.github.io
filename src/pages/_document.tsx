import { ColorThemeScript } from "@/lib/ColorThemeScript";
import { gaMeasurementId } from "@/lib/gtag";
import Document, { Head, Html, Main, NextScript } from "next/document";
import * as React from "react";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied'
            });
            gtag('set', 'ads_data_redaction', true);
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}', {
              page_path: window.location.pathname,
              anonymize_ip: true
            });
          `,
            }}
          />
        </Head>
        <body>
          <ColorThemeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
