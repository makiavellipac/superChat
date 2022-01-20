import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const dotenv = require('dotenv');

const config = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    publicPath: '',
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
          },
          {
            loader: 'postcss-loader',
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
            options: { name: 'Assets/Fonts/[name].ext' },
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
      // plugin para librerias de stylos ajenos al Dom
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
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
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()],
  },
};

export default config;
