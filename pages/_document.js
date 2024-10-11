// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <meta property="og:title" content="CommUnity Hub - An Our Governance Initiative" />
          <meta
            property="og:description"
            content="Designed to make LANSUM Eden Gardens a scalable and sustainable community."
          />
          <meta property="og:image" content="/images/og-image.jpg" />
          <meta property="og:url" content="https://yourdomain.com" />
          <meta name="twitter:card" content="summary_large_image" />
          {/* Include other meta tags as needed */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
