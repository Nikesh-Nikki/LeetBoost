const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode : 'production',
    entry : './src/main.jsx',
    output : {
        filename : "bundle.js",
        path : path.resolve(__dirname,'dist')
    },
    plugins : [
        new HtmlWebpackPlugin(
            {
                template : './src/index.html',
                inject : 'body',
                filename : 'index.html'
            }
        )
    ],
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        }
    ]
  },
}