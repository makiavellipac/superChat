import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    publicPath: '/',
  },
  entry: './src/index.tsx',
  module: {
    rules: [
      // Modulo para que se compilen archivos con terminacion .Js, Jsx, Ts, Tsx
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        // Modulo para que se compilen archivos .css
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/, // Modulo para la importación de imagenes
        use: [
          {
            loader: 'file-loader',
            options: { name: 'Assets/Images/[name].[ext]' },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, // modulo de importacion de fuentes
        use: [
          {
            loader: 'file-loader',
            options: { name: 'Assets/[name].ext' },
          },
        ],
      },
    ],
  },
  resolve: {
    // extenciones que soporta la compilacion
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // plugin para archivos Html
      template: 'public/index.html',
    }),
    new MiniCssExtractPlugin({
      // plugin para librerias de stylos agenas al Dom
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.HotModuleReplacementPlugin(), // pugin para webpack-server
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      // plugin para terminaciones
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
    }),
  ],
  // configuracion del puerto
  devServer: {
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true,
  },
};

export default config;