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
                presets: [['@babel/preset-env', {
                    targets: {
                        browsers: ['last 2 chrome versions', '> 1% in KR'],
                    },
                    debug: true
                }], '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties', 'react-hot-loader/babel']
            }
        }]
    },
    output: {
        path: path.join(__dirname, 'dist'), // 현재 폴더(...../ending) 안에 들어있는 dist --> ...../ending/dist
        filename: 'app.js',
        publicPath: '/dist/'
    }
}