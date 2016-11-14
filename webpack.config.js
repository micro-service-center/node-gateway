/**
 * Created by Frank on 11/11/16.
 */
const path = require('path')
const fs = require('fs')
const JsDocPlugin = require('jsdoc-webpack-plugin')

const nodeModules = {}

fs.readdirSync('node_modules')
    .filter(file => !file.includes('.bin'))
    .forEach(module => nodeModules[module] = `commonjs ${module}`)

module.exports = [
    {
        devtool: '#source-map',
        context: path.join(__dirname, './src/server'),
        entry: './app.js',
        output: {
            path: path.join(__dirname, './dist/server'),
            filename: 'app.js',
            libraryTarget: 'commonjs2'
        },
        target: 'node',
        externals: nodeModules,
        resolve: {
            extensions: ['', '.js', '.json']
        },
        module: {
            loaders: [
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                }
            ]
        },
        plugins: [
            new JsDocPlugin({
                conf: './jsdoc.conf'
            })
        ]
    },

]
