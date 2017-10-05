/* eslint no-invalid-this:0 no-underscore-dangle:0 */

'use strict';

const { getHashDigest } = require('loader-utils');
const path = require('path');

module.exports = function loader(source, sourceMap) {
  if (this.cacheable) this.cacheable();

  let content;

  // Grab the content from the css-loader
  if (source.indexOf('module.exports =') !== -1) {
    content = this.exec(source, this.resource);
  // Otherwise it's a css string
  } else {
    content = [[this.resourcePath, content, '', sourceMap]];
  }

  // Preserve CSS modules locals
  const out = content.locals || {};

  // Generate _nextStyles that will be used by applyStyles()
  out._nextStyles = content.map((entry) => {
    const relativePath = path.relative(this._compiler.context, entry[0]);

    return {
      id: getHashDigest(relativePath, 'md5', 'hex'),
      content: entry[1],
      sourceMap: entry[3],
    };
  });

  return `module.exports = ${JSON.stringify(out)};`;
};
