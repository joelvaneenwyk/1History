import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('webpack').Configuration} */
const config = {
    entry: './src/main.js',
    output: {
        scriptType: 'module',
        filename: 'main.js',
        path: resolve(__dirname, 'static', 'js'),
    }
}

export default config;
