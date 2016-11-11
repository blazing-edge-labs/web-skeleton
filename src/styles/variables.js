// It can't be exported as es6 default module because default styling wouldn't
// work correctly so we need to use module.exports

const colors = {
  background: '#fff',
  font: '#000',
};

const fonts = {
  main: 'sans-serif',
  size: 16,
};

module.exports = {
  colors,
  fonts,
};
