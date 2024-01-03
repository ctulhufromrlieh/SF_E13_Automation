const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebPackPlugin = require("terser-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

// const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const myEslintOptions = {
  extensions: ["js"],
  exclude: ["node_modules", "dist"],
};

module.exports = {
    entry: ["./src/index.js", "./src/style.scss"],
    mode: "production",
    // devtool: "inline-source-map",
    output: {
        filename: "main.js"
    },

    devServer: {
        static: "./dist",
        // hot: true,
        port: 3002,
        open: true,
    },    

    plugins : [
        // new HtmlWebpackPlugin({
        //     title: 'Production',
        //   }),        
        new MiniCssExtractPlugin(),
        new TerserWebPackPlugin(),
        new CssMinimizerWebpackPlugin(),
        new ESLintPlugin(myEslintOptions),
        new CopyPlugin({
            patterns: [
              {
                context: "./src",
                from: "*.html",
                to: ""
              },
            ],
          }),
    ],
    optimization: {
        minimize: true,
        minimizer: [ 
            new TerserWebPackPlugin(), 
            new CssMinimizerWebpackPlugin(),
            new HtmlMinimizerPlugin(),
        ]
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                type: "asset/resource",
              },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                        }
                    }, "css-loader", "sass-loader"
                ]
            },
            // {
            //     test: /\.html$/,
            //     use: "html-minifier-webpack-plugin"
            // }
        ]
    }
};