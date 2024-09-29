// webpack.common.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/scripts/main.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Membersihkan folder dist setiap build
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html', // File HTML template untuk aplikasi
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'], // Memungkinkan kita untuk menggunakan file HTML sebagai dependensi
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource', // Mengizinkan import gambar sebagai modul
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Memuat file CSS ke dalam bundle
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'], // Mendukung SCSS untuk styling
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Mengonversi kode modern JavaScript menjadi kompatibel
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
