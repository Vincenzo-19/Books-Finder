const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProduction = process.env.NODE_ENV == 'production'

const stylesHandler = isProduction
    ? MiniCssExtractPlugin.loader
    : 'style-loader'

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '',
    },
    devServer: {
        open: true,
        host: 'localhost',
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3001,
        proxy: [
            {
                context: ['/api'],
                target: 'http://localhost:3000',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            favicon: './src/img/favicon.png',
            inject: 'body',
        }),
        ...(isProduction ? [new MiniCssExtractPlugin({ filename: 'main.css' })] : []),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        fallback: {
            path: false,
            fs: false,
            stream: false,
            http: false,
            querystring: false,
            crypto: false,
            zlib: false,
        },
    },
    externals: {
        express: 'commonjs express',
    },
}

module.exports = () => {
    if (isProduction) {
        config.mode = 'production'
    } else {
        config.mode = 'development'
    }
    return config
}
