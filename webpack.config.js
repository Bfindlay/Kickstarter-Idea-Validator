// const path = require('path');
// const loader = require('babel-loader');

// module.exports = {
//   devtool: 'eval-source-map',
//   entry: [
//     './src/index.jsx'
//   ],
//   output: {
//     path: path.join(__dirname, 'dist'),
//     filename: 'bundle.js',
//     publicPath: '/build/'
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         loaders: ['babel-loader'],
//         include: path.join(__dirname, 'src')
//       },
//       {
//         test: /\.scss$/,
//         loaders: ["style", "css", "sass"]
//       }
//     ]
//   }
// }

const path = require('path');
module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.jsx'
  ],
  resolve: {
        extensions: ['*', '.js', '.jsx'],
        modules: [__dirname , 'node_modules']
  },
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["es2015", "react", "stage-0"] }
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["es2015", "react", "stage-0"] }
        }
      }
    ]
  }
}
