import path from 'path'
import webpack from 'webpack'

const PATH_SRC = path.join(__dirname, 'src')
const PATH_APP = path.join(__dirname, 'src', 'app')
const PATH_DIST = path.join(__dirname, 'dist')
const PATH_NODE_MODULES = path.join(__dirname, 'node_modules')

/* eslint-disable better/no-new */

const config = {
  devtool: 'cheap-source-map',
  resolve: {
    modules: [
      PATH_SRC,
      PATH_NODE_MODULES,
    ],
    extensions: ['.js'],
  },
  context: PATH_APP,
  entry: './',
  output: {
    filename: 'bundle.js',
    path: PATH_DIST,
    publicPath: '/static/',
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify('production'),
        },
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: PATH_SRC,
      },
    ],
  },
}

export default config
