// webpack.prod.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'nosources-source-map', // Atau false jika tidak memerlukan source map sama sekali
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true, // Menghapus semua console.log
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path][base].gz', // Menambahkan .gz untuk file hasil kompresi
      algorithm: 'gzip', // Menggunakan gzip untuk kompresi
      test: /\.(js|css|html|svg)$/, // Mengompres file yang cocok dengan ekstensi ini
      threshold: 8192,
      minRatio: 0.8,
    }),
  ],
});
