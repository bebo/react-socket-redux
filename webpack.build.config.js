var webpack = require('webpack');
var path = require('path');

process.env.NODE_ENV = 'production';

module.exports = {
  // Don't attempt to continue if there are any errors.
  bail: true,
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: 'source-map',
  // In production, we only want to load the polyfills and the app code.
  entry: [
    require.resolve('./polyfills'),
    path.resolve(__dirname, './src/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'react-socket-redux.js',
    libraryTarget: 'umd',
    library: 'react-socket-redux',
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
      },
    ],
  },
  plugins: [
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV was set to production here.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"', PUBLIC_URL: '""' } }),
    // This helps ensure the builds are consistent if source hasn't changed:
    new webpack.optimize.OccurrenceOrderPlugin(),
    // Try to dedupe duplicated modules, if any:
    new webpack.optimize.DedupePlugin(),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    })
  ],
};