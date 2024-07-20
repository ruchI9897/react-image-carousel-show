const path = require('path');

module.exports = {
  entry: './src/index.ts', // Entry point of your library
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'index.js', // Output filename
    library: 'image-show-react', // Name of the library
    libraryTarget: 'umd', // Universal Module Definition format
    umdNamedDefine: true // Use named AMD modules
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Process TypeScript files
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader' // TypeScript loader
        }
      },
      {
        test: /\.css$/, // Process CSS files
        use: [
          'style-loader', // Injects CSS into the DOM
          'css-loader' // Parses CSS files
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'] // Resolve TypeScript and JavaScript files
  },
  externals: {
    react: 'react', // Exclude React from the bundle
    'react-dom': 'react-dom' // Exclude ReactDOM from the bundle
  },
  mode: 'production' // Build mode (use 'development' for development builds)
};
