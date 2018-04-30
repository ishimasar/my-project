const PATH = require('path');
const SCSS_PATH = PATH.join(__dirname, './src/scss');
const CSS_PATH = PATH.join(__dirname, './src/css');
const TS_PATH = PATH.join(__dirname, './src/ts');
const JS_PATH = PATH.join(__dirname, './src/js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');

module.exports = [
  {
    entry: {
      'style': SCSS_PATH + '/style.scss'
    },
    output: {
      path: CSS_PATH,
      filename: '[name].css'
    },
    module: {
      rules: [
        {
          test: /.scss$/,
          use: ExtractTextPlugin.extract({
            use: ['css-loader?minimize!',/*'css-loader',*/ 'csscomb-loader', 'postcss-loader'/*, 'sass-loader'*/]
          })
        },
        {
          test: /.(gif|jpg|png|svg|otf|ttf|woff|eot)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              emitFile: false
            }
          }
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].css'),
      new StyleLintPlugin()
    ]
  },
  {
    entry: {
      'main': TS_PATH + '/main.ts'
    },
    output: {
      path: JS_PATH,
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /.ts$/,
          use: ['ts-loader']
        }
      ]
    }
  }
]
