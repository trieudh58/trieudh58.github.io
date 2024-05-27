const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.ts',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/'
  },
  optimization: {
    runtimeChunk: 'single'
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'assets', to: 'assets' },
        { from: 'index.html' },
        { from: 'favicon', to: 'favicon' },
      ]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',
              publicPath: 'assets/',
            },
          },
        ],
      },
      {
        test: /\.(png|ico|webmanifest)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'favicon/',
              publicPath: 'favicon/',
            },
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    port: 9000,
    historyApiFallback: {
      index: 'dist/index.html'
    },
  },
  mode: 'development'
};
