// webpack.dev.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map', // Membantu untuk melakukan debugging dengan source map
  devServer: {
    static: './dist', // Folder dist sebagai sumber statis
    hot: true, // Hot Module Replacement untuk perubahan real-time
    open: true, // Membuka aplikasi di browser setelah server dijalankan
    port: 3000, // Port yang digunakan oleh Webpack Dev Server
  },
});
