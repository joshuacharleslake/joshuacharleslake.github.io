/* eslint-disable no-undef */
/*
 * Webpack Packages
 */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
    entry: ['@babel/polyfill', './src/js/app.js', './src/scss/styles.scss'],
    output: {
        filename: 'bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/js/'),
        publicPath: 'dist/js/'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            emitError: true,
                            emitWarnings: true
                        }
                    }
                ]
            },

            // Styles
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    postcssPresetEnv({
                                        stage: 3,
                                        browsers: 'last 2 versions'
                                    })
                                ],
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: '../css/style.css',
            allChunks: true
        })
    ],

    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
