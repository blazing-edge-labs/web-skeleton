import 'babel-polyfill';
import React from 'react';

import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

import mainCSS from '../styles/main.scss';
// {/* <style jsx global>{mainCSS}</style> */}

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style dangerouslySetInnerHTML={{ __html: mainCSS }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
