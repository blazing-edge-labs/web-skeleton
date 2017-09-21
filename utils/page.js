import React, { Component } from 'react';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import { makeStore } from '../store';

export const connectPage = withRedux.bind(null, makeStore);

export function buildBundlePath(nextData, filename) {
  const { buildId } = nextData;
  return `/_next/${buildId}${filename}`;
}

export function buildPageCSSPath(nextData) {
  const { buildId, pathname } = nextData;
  return `/_next/${buildId}/pages${pathname}.css`;
}

export class IncludePageCSS extends Component {
  render() {
    if (!global.__NEXT_DATA__) {
      return null;
    }

    return (
      <Head>
        <link rel="stylesheet" type="text/css" href={buildPageCSSPath(global.__NEXT_DATA__)} />
      </Head>
    );
  }
}
