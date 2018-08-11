const path = require("path");

module.exports = {
  entry: "./frontend/index.js",
  output: {
    path: path.resolve('public/assets'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        include: [`${__dirname}/frontend`],
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "es2016", "es2017", "react", "stage-2"],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]  
  }
};