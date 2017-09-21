import 'babel-polyfill';
import React from 'react';

import Document, { Head, Main, NextScript } from 'next/document';
import { buildBundlePath } from '../utils/page';

// export default Document;

export default class MyDocument extends Document {
  static getInitialProps(ctx) {
    const props = Document.getInitialProps(ctx);

    return props;
  }

  render() {
    const nextData = this.props.__NEXT_DATA__;

    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {nextData && <link rel="stylesheet" type="text/css" href={buildBundlePath(nextData, '/main.css')} />}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
