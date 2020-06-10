const path = require('path');

// 웹팩 설정
module.exports = {
    name: 'ending-settings', // 웹팩 이름. 마음대로 작성
    mode: 'development', // 실서비스에서는 production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']
    },

    // * 중요 *
    // entry: 입력 설정, output: 출력 설정
    // client.jsx와 Ending.jsx를 dist/app.js로 합쳐야 한다.
    // 
    // client.jsx가 Ending.jsx를 불러와서 사용하기 때문에 따로 적어줄 필요는 없다. (웹팩이 알아서 뚝딱뚝딱)
    // resolve에 확장자 적어주면 확장자 생략 가능.
    entry: {
        app: ['./client']
    },
    output: {
        path: path.join(__dirname, 'dist'), // 현재 폴더(...../ending) 안에 들어있는 dist --> ...../ending/dist
        filename: 'app.js'
    }
}