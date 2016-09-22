var path = require('path');
const webpack = require('webpack');

//const NODE_ENV = process.env.NODE_ENV || 'development';
const NODE_ENV = 'development';
//const NODE_ENV = 'production';

/*
 if (!DEBUG) {
 plugins.push(
 new webpack.optimize.UglifyJsPlugin()
 );
 }
 */

module.exports = {
    //entry: './frontend/docs.js',
//    context: __dirname + '/frontend',
    entry: {
        docs: './frontend/docs.js',
        doc:  './frontend/doc.js'
    },
    output: {
        path: __dirname + '/public/javascripts',
        filename: '[name].js',
        library: '[name]'
    },

    watch: NODE_ENV == 'development', // наблюдает за изменениями

    watchOptions: {
      aggregateTimeout: 300 // задержка перед сборкой после изменений
    },
    externals: {
        // Use external version of React
        "react": "React",
        "react-dom": "ReactDOM",
    },
    devtool: NODE_ENV == 'development' ? "cheap-inline-source-map": null , // для разработки, для продакшена cheap-source-map
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
    },
    plugins: [
//        new webpack.NoerrorsPlugin(),
        new webpack.DefinePlugin({NODE_ENV:JSON.stringify(NODE_ENV)}),
        new webpack.optimize.CommonsChunkPlugin({
            name:"common",
            chunks: ['docs'], // список модулей для выявления общих модулей
            minChunks: 2
        })
/*
        ,new webpack.ProvidePlugin({
            '$':          'jquery',
            '_':          'lodash',
            'ReactDOM':   'react-dom',
        })
*/
        //             'cssModule':  'react-css-modules',         'Promise':    'bluebird'

],

/*
    resolve: {
      modulesDirectories: ['node_modules'],
      extensions: ['','js']
    },
*/

    module: {
        loaders: [

            {
                test: /\.js$/,
                //include: __dirname + '/frontend',
                loader: "babel?compact=false"
            },

            { test: /\.jsx$/, loader: "jsx-loader?harmony"}

        ]
    }
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}
