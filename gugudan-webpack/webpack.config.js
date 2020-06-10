const path = require('path');
const webpack = require('webpack');

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
                        // 브라우저 호환 어느정도까지 할 지 설정하는 것
                        // 너무 많이 호환시키면 babel이 처리하기 힘들어져서 느려진다.

                        // last 2 chrome versions: 현재가 70버전이라고 하면, 70, 69버전만 호환되도록.
                        // > 1% in KR: 한국에서 1% 이상 점유율을 가진 브라우저
                        browsers: ['last 2 chrome versions', '> 1% in KR'],
                    },
                    debug: true
                }], '@babel/preset-react'], // preset은 plugin 모음집.
                plugins: []
            }
        }]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true })
    ], // 확장프로그램
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    }
}