

// const path = require('path');
// module.exports = {
//   entry: [
//     'babel-polyfill',
//     './src/index.jsx'
//   ],
//   resolve: {
//         extensions: ['*', '.js', '.jsx'],
//         modules: [__dirname , 'node_modules']
//   },
//   mode: 'development',
//   devtool: 'cheap-module-eval-source-map',
//   output: {
//     path: path.join(__dirname, '/dist'),
//     filename: 'bundle.js',
//     publicPath: '/build/'
//   },
//   devServer: {
//     contentBase: './dist',
//     hot: true
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           options: { presets: ["es2015", "react", "stage-0"] }
//         }
//       },
//       {
//         test: /\.jsx$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           options: { presets: ["es2015", "react", "stage-0"] }
//         }
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
  mode: 'production',
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

