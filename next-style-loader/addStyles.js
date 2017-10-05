/* eslint no-underscore-dangle:0 */

const React = require('react');
const styleLoaderAddStyles = require('style-loader/lib/addStyles');

const ssrStyleElId = 'next-style-ssr';
const isServer = typeof window === 'undefined';

let serverStyles = !isServer ? null : [];
// let removedSsrStyleEl = false;

// function removeSsrStyleEl() {
//   const styleEl = document.getElementById(ssrStyleElId);
//   if (styleEl) styleEl.parentNode.removeChild(styleEl);
// }

function addStyles(style_) {
  const styles = Array.isArray(style_) ? style_ : [style_];
  const nextStyles = [].concat(...styles.map(s => s._nextStyles));

  if (isServer) {
    serverStyles.push(...nextStyles);
    return null;
  }

  // if (!removedSsrStyleEl) {
  //   removedSsrStyleEl = true;
  //   setTimeout(removeSsrStyleEl, 1000);
  // }

  const styleLoaderStyles = nextStyles.map(s => [s.id, s.content, '', s.sourceMap]);
  return styleLoaderAddStyles(styleLoaderStyles);
}

function flush() {
  if (!isServer) {
    throw new Error('flush() should only be called on the server');
  }

  const flushedStyles = serverStyles;
  const flushedCss = serverStyles.map(s => s.content).join('');

  serverStyles = [];

  return {
    tag: <style id={ssrStyleElId} dangerouslySetInnerHTML={{ __html: flushedCss }} />, // eslint-disable-line
    styles: flushedStyles,
  };
}

addStyles.flush = flush;
module.exports = addStyles;
