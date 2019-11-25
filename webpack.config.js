const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globule = require('globule');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const magicImporter = require('node-sass-magic-importer');

// 参照元パス
const SRC_PATH = './src/';
// 出力先パス
const DEST_PATH = './dest';
const DEST_ASSETS_PATH = './dest/assets/';

// 'production'か'development'を指定
const MODE = 'development';
// const MODE = 'production';

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = MODE === 'development';

const app = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: MODE,

  entry: {
    main: [SRC_PATH + 'ts/main.ts'],
    style: [SRC_PATH + 'scss/style.scss'],
  },

  output: {
    filename: 'js/app-[contenthash:8].js',
    path: path.resolve(__dirname, DEST_ASSETS_PATH),
    publicPath: path.build,
  },

  module: {
    rules: [
      // pug-loaderの設定
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
              root: path.resolve(__dirname, SRC_PATH + 'pug'),
            },
          },
        ],
      },
      // ts/babel-loaderの設定
      {
        test: /\.ts?$/,
        use: [
          // 下から順に処理される
          {loader: 'babel-loader'},
          {loader: 'ts-loader'},
        ],
        exclude: /node_modules/,
      },

      // css/sass-loaderの設定
      {
        test: /\.(sa|sc|c)ss$/,

        use: [
          // 'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // CSSをバンドルするための機能
          {
            loader: 'css-loader',
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: true,
              // ソースマップを有効にする
              sourceMap: enabledSourceMap,
              importLoaders: 2,
            },
          },
          {loader: 'postcss-loader'},
          {
            loader: 'sass-loader',
            options: {sourceMap: enabledSourceMap, importer: magicImporter()},
          },
        ],
      },
      {
        // url/file-loaderの設定
        // image base64 encode
        test: /\.(jpe?g|png|gif|svg|ico|webp)(\?.+)?$/,
        include: [path.resolve(__dirname, SRC_PATH, 'img')],
        loaders: 'url-loader',
        options: {
          limit: 100 * 1024, // 100KB以上だったら埋め込んだファイルとして分離する
          fallback: 'file-loader',
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(
      [DEST_ASSETS_PATH + 'css', DEST_ASSETS_PATH + 'js'],
      {
        // ビルド時削除から除外するディレクトリまたはファイルを指定
        exclude: [DEST_ASSETS_PATH + 'img', DEST_ASSETS_PATH + 'font'],
      }
    ),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/app-[hash:8].css',
    }),
    new CopyPlugin([{from: SRC_PATH + 'font', to: 'font'}]),
  ],

  // 最適化オプションを上書き
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({}),
      new TerserPlugin({
        terserOptions: {
          ecma: 6,
          compress: true,
          output: {
            comments: false,
            beautify: false,
          },
        },
      }),
    ],
    minimize: enabledSourceMap,
  },

  // --------------------
  // webpack-dev-server(ローカルサーバー)用設定
  devServer: {
    open: true, // ブラウザを自動で開く
    openPage: 'index.html', // 自動で指定したページを開く
    contentBase: path.join(__dirname, DEST_PATH), // HTML等コンテンツのルートディレクトリ
    watchContentBase: true, // コンテンツの変更監視をする
    port: 8090, // ポート番号
    host: '0.0.0.0', // ホスト設定
    disableHostCheck: true, // ローカルサーバーを外部公開
    useLocalIp: true, // IPアドレス表示
    compress: true,
  },
  // --------------------

  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
};

// include(_)を除いたPugファイルをすべてfindしてコンパイル
const documents = globule.find(SRC_PATH + 'pug/**/*.pug', {
  ignore: [SRC_PATH + 'pug/**/_*/*.pug'],
});
documents.forEach((document) => {
  // if (document.match(/_template/)) {
  //   const dirName = document
  //     .replace('./src/documents/', '')
  //     .replace('/_template.pug', '');
  //   const replaceJson = document
  //     .replace('_template', '_data')
  //     .replace('.pug', '.json');
  //   const json = require(replaceJson);
  //   Object.keys(json).forEach((f) => {
  //     const fileName = f;
  //     app.plugins.push(
  //       new HtmlWebpackPlugin({
  //         filename: `${dirName}/${fileName}.html`,
  //         template: document,
  //         data: json[f],
  //       })
  //     );
  //   });
  // } else {
  const fileName = document
    .replace(SRC_PATH + 'pug/', '../')
    .replace('.pug', '.html');
  app.plugins.push(
    new HtmlWebpackPlugin({
      filename: `${fileName}`,
      template: document,
    })
  );
  // }
});

module.exports = app;
