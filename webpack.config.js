var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: './src/app.js',
	output: {
	    path: path.resolve(__dirname, "dist"),
        filename: 'app.bundle.js',
        //publicPath: "/"
	  },
	module: {
		rules: [
		{
			test: /\.css$/,
        	use: ExtractTextPlugin.extract({
	          fallback: "style-loader",
	          use: ["css-loader", "postcss-loader"],
	          // publicPath: "/dist"
        	})
		},
    {
        test: /\.js$/, // include .js files
        enforce: "pre", // preload the jshint loader
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        use: [
          {
            loader: "jshint-loader"
          }
        ]
      },
		{
    test: /\.(png|jpe?g|gif|svg)$/,
    use: [
        {
          loader: 'file-loader',
          options: {
            // path where the images will be saved
            name: 'img/[name].[ext]'
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              quality: 65
            },
            pngquant:{
              quality: "10-20",
              speed: 4
            },
            svgo:{
              plugins: [
                {
                  removeViewBox: false
                },
                {
                  removeEmptyAttrs: false
                }
              ]
            },
            gifsicle: {
              optimizationLevel: 7,
              interlaced: false
            },
            optipng: {
              optimizationLevel: 7,
              interlaced: false
            }
          }
        }
      ]
    },
	
		]
	},
	devServer: {
	  contentBase: path.join(__dirname, "dist"),
	  compress: true,
	  port: 8080,
	  stats: "errors-only",
	  open: true
	},
	plugins: [new HtmlWebpackPlugin({
    	title: 'Gretchen Wagener Burau',
    	minify: {
    		collapseWhitespace: true
    	},
    	hash: true,
    	template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
  	}),
	new ExtractTextPlugin({
		filename: "app.css",
		disable: false,
		allChunks: true
	})
  	]
	

}