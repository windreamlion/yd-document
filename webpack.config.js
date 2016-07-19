var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

const myLocalIP = require('my-local-ip');

const port = 3000;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const examplesPath = path.join(__dirname, '/');
const host = myLocalIP();

console.log("host:",host)
//+ host + ':' + port
var config = {
    port:port,
    devtool: 'eval',
    devServer: {
        historyApiFallback: true,
        stats: {colors: true},
        publicPath: '/dist/',
        noInfo: false,
        port: port,
        hot: true
        },
    entry: [
        'webpack-dev-server/client?http://localhost:3000' ,
        'webpack/hot/only-dev-server',
        './src/index'
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ["", ".jsx", ".js", ".scss"],
        alias: {
            'react-fabricjs': path.join(__dirname, 'src'),
            'react-fabricjs/lib': path.join(__dirname, 'src'),
        },
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),

        new HtmlWebpackPlugin({
            title: 'React Sketch',
            description: 'Sketch Element for React based applications, backed-up by fabricjs as its core',
            keywords: ['react', 'canvas', 'sketch', 'fabricjs', 'fabric.js'],
            template: path.join(examplesPath, 'index.html'),
            inject: 'body',
            filename: 'index.html',
            chunks: ['examples']
        }),
        new OpenBrowserPlugin({url: 'http://localhost:' + port})
    ],
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: ['react-hot','babel'],
                include: path.join(__dirname, 'src'),
                exclude: path.join(__dirname, 'node_modules'),
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                ],
                include: path.join(__dirname, 'example'),
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
                include: path.join(__dirname, 'example'),
            },
            // {
            // 	test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            // 	loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]"
            // },
            // {
            // 	test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            // 	loader: "file-loader?name=[name].[ext]"
            // },
            // {
            // 	test: /\.(jpe?g|png|gif|svg)$/i,
            // 	loaders: [
            // 		'file?hash=sha512&digest=hex&name=[hash].[ext]',
            // 		'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            // 	]
            // }

        ],
        noParse: [],
    },
    postcss: function () {
        return [autoprefixer];
    },
};
//
// deps.forEach(function (dep) {
// 	var depPath = path.resolve(nodeModules, dep);
// 	config.resolve.alias[dep.split(path.sep)[0]] = depPath;
// 	config.module.noParse.push(depPath);
// });

module.exports = config;
