import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('webpack').Configuration} */
const config = {
    entry: './src/main.js',
    plugins: [
        new HtmlWebpackPlugin({
            title: '1History Statistics',
            template: './src/index.html.j2',
            filename: 'index.html.j2',
            publicPath: '/static',
            scriptLoading: 'blocking',
            inject: 'head',
        })
    ],
    output: {
        scriptType: 'text/javascript',
        filename: 'js/main.js',
        path: resolve(__dirname, 'static'),
    }
}

export default config;
