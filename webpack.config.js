const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'awesome-seo.js',
    path: path.resolve(__dirname, 'docs'),
    library: 'AwesomeSEO',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
};
