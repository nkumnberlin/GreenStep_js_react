# GreenStep_js_react
1. https://www.valentinog.com/blog/react-webpack-babel/
2. https://www.robinwieruch.de/react-semantic-ui-tutorial/
3. https://medium.com/@a.carreras.c/using-semantic-ui-react-your-react-js-app-523ddc9abeb3
https://guide.freecodecamp.org/semantic-ui/


Install:

npm i @babel/plugin-proposal-class-properties
npm i --save-dev style-loader
npm i css-loader -D
npm i url-loader -D
npm i file-loader -D
npm i react-google-autocomplete --save
npm install -s @material-ui/icons

Requierments:
node.js unter 10.11.0 wird benötigt für semantic-ui
npm install node@10.11.0

nach installieren von semantic-react:
cd semantic
gulp build

```javascript
webpack.config:
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve("url-loader"),
                options: {
                    limit: 10000,
                    name: "static/media/[name].[hash:8].[ext]",
                },
            },
            {
                test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
                loader: require.resolve("file-loader"),
                options: {
                    name: "/static/media/[name].[hash:8].[ext]",
                },
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
};

.babelrc:
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": [
    "@babel/plugin-proposal-class-properties"
  ]
}

package.json:
{
  "name": "prototypeWebsite",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server --open --mode development",
    "build": "webpack --mode production"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.4.4",
    "@babel/preset-env": "^7.4.4",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.5",
    "css-loader": "^2.1.1",
    "file-loader": "^3.0.1",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "prop-types": "^15.7.2",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "style-loader": "^0.23.1",
    "url-loader": "^1.1.2",
    "webpack": "^4.30.0",
    "webpack-cli": "^3.3.1",
    "webpack-dev-server": "^3.3.1"
  },
  "dependencies": {
    "@babel/plugin-proposal-class-properties": "^7.4.4",
    "node": "^10.11.0",
    "semantic-ui": "^2.4.2",
    "semantic-ui-css": "^2.4.1",
    "semantic-ui-react": "^0.86.0"
  }
}
'''

