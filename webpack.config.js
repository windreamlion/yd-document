var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

const myLocalIP = require('my-local-ip');

const port = 8080;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const srcPath = path.join(__dirname, 'src');
const examplePath = path.join(__dirname, 'example');

const host = myLocalIP();

console.log("host:", host);
//+ host + ':' + port
var config = {
    port: port,
    devtool: 'eval',
    devServer: {
        contentBase:'/',
        historyApiFallback: true,
        stats: {colors: true},
        publicPath: '/',
        noInfo: false,
        port: port,
        hot: true
    },
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index'
    ],

    output: {
        path: path.resolve(__dirname, '/'),
        filename: './dist/app.js'
    },

    resolve: {
        extensions: ["", ".jsx", ".js", ".scss"]
        // alias: {
        //     'react-fabricjs': path.join(__dirname, 'src'),
        //     'react-fabricjs/lib': path.join(__dirname, 'src'),
        // },
    },

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: ['react-hot', 'babel'],
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
                include: path.join(__dirname, 'src'),
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

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),

        new HtmlWebpackPlugin({
            title: 'React Sketch',
            template: path.join(examplePath, 'base.ejs'),
            inject: 'true',
            filename: 'index.html',
            chunks: ['src']
        }),
        new OpenBrowserPlugin({url: 'http://localhost:' + port})
    ]

};
//
// deps.forEach(function (dep) {
// 	var depPath = path.resolve(nodeModules, dep);
// 	config.resolve.alias[dep.split(path.sep)[0]] = depPath;
// 	config.module.noParse.push(depPath);
// });

module.exports = config;
