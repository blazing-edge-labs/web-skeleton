module.exports = {
  presets: [
    ['next/babel', {
      'preset-env': {
        modules: process.env.NODE_ENV === 'test' ? 'commonjs' : false,
        targets: {
          browsers: ['>1% in us', 'firefox esr', 'not ie > 0'],
          node: '8',
        }
      }
    }]
  ],
  plugins: [
    'inline-dotenv',
    ['module-resolver', {
      root: ['./']
    }]
  ]
}
