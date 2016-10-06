let path = require('path');

let webpack = require('webpack');

let packageData = require('./package.json');

let minify = process.argv.indexOf('--minify') != -1;

let filename = [packageData.name, packageData.version, 'js'];
let plugins = [];

if (minify) {
    filename.splice(filename.length - 1, 0, 'min');
    plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
    entry: path.resolve(__dirname, packageData.main),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: filename.join('.'),
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }
      ]
    },
    plugins: plugins
};
