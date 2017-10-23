/* jshint esversion: 6 */
const path = require('path');
const webpack = require('webpack');
const envFile = require('node-env-file');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  // disable: process.env.NODE_ENV === "development"
});

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
// process.env.NODE_ENV = process.env.NODE_ENV || 'development';
try {
  envFile(path.join(__dirname, `config/${process.env.NODE_ENV}.env`));
} catch (e) {
  console.error(e);
}

const VENDOR_LIBS = [
  'axios', 'history', 'jquery', 'react', 'react-collapsible', 'react-dom', 'react-paginate', 'react-redux', 'react-router', 'react-router-dom', 'react-router-redux', 'react-scroll', 'redux', 'redux-form', 'redux-thunk',
];

module.exports = {
  entry: {
    bundle: [
      'babel-polyfill',
      // 'script-loader!jquery/dist/jquery.min.js',
      // 'script-loader!foundation-sites/dist/js/foundation.min.js',
      './app/app.jsx',
    ],
    vendor: VENDOR_LIBS,
  },
  // externals: {
  //   jquery: 'jQuery',
  // },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        ROOT_URL: JSON.stringify(process.env.ROOT_URL),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_KEY: JSON.stringify(process.env.API_KEY),
        AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
        DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
        PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
        STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
        MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID),
        GITHUB_ACCESS_TOKEN: JSON.stringify(process.env.GITHUB_ACCESS_TOKEN),
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
    }),
    new HtmlWebpackPlugin({
      template: './app/index.html',
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      debug: false,
      compress: {
        screw_ie8: false,
        warnings: false,
      },
      sourceMap: false,
      beautify: false,
      // mangle: {
      //   screw_ie8: false,
      //   keep_fnames: false,
      // },
      comments: false,
    }),
    // new ExtractTextPlugin({
    //   filename: 'build.min.css',
    //   allChunks: true,
    // }),
    extractSass,
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].[chunkhash].js',
  },
  resolve: {
    modules: [
      path.resolve(__dirname, './app'),
      path.resolve(__dirname, './app/assets'),
      path.resolve(__dirname, './app/common'),
      path.resolve(__dirname, './app/actions'),
      path.resolve(__dirname, './app/reducers'),
      path.resolve(__dirname, './app/store'),
      path.resolve(__dirname, './app/styles'),
      path.resolve(__dirname, './app/utilities'),
      path.resolve(__dirname, './app/helpers'),
      path.resolve(__dirname, './app/components'),
      path.resolve(__dirname, './app/components/common'),
      path.resolve(__dirname, './app/components/auth'),
      path.resolve(__dirname, './app/components/modal'),
      path.resolve(__dirname, './app/components/admins'),
      path.resolve(__dirname, './app/components/adminMessages'),
      path.resolve(__dirname, './app/components/bannedWords'),
      path.resolve(__dirname, './app/components/cashLogs'),
      path.resolve(__dirname, './app/components/cashoutRequests'),
      path.resolve(__dirname, './app/components/fields'),
      path.resolve(__dirname, './app/components/photos'),
      path.resolve(__dirname, './app/components/photoComments'),
      path.resolve(__dirname, './app/components/pointLogs'),
      path.resolve(__dirname, './app/components/talks'),
      path.resolve(__dirname, './app/components/users'),
      path.resolve(__dirname, './app/components/userUpdateLogs'),
      path.resolve(__dirname, './app/components/videoChatLogs'),
      path.resolve(__dirname, './app/screens'),
      'node_modules',
    ],
    alias: {
      applicationStyles: 'app.scss',
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['env'],
          plugins: ['transform-runtime'],
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader',
          }, {
            loader: 'sass-loader',
            // options: {
            //   includePaths: ['app/styles'],
            // },
          }],
          // use style-loader in development
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                optimizationLevel: 7,
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
                interlaced: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              svgo: {
                plugins: [{
                  removeViewBox: false,
                }, {
                  removeEmptyAttrs: false,
                }],
              },
            },
          },
        ],
      },
    ],
  },
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map',
};
