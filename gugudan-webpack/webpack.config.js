const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval', //product 일 때에는 hidden-source-map
    resolve: {
        extensions: ['.jsx', '.js']
    },

    entry: {
        app: './client'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: []
            }
        }]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    }
}