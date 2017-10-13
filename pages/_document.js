import React from 'react'

import Document, { Head, Main, NextScript } from 'next/document'
import addStyles, { flush } from '../next-style-loader/addStyles'

import mainStyle from '../styles/main.scss'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    addStyles(mainStyle)
    const props = renderPage()
    props.nextStyle = flush()
    return props
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          { this.props.nextStyle.tag }
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
