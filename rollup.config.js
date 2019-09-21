// rollup.config.js
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
import rimraf from 'rimraf';
import { terser } from "rollup-plugin-terser";
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

//rimraf.sync('dist');

const pkg = require('./package.json');
const name = pkg.name;
const version = pkg.version;

const pluginsOptA = [
    json(),
    replace({
        delimiters: ['{{', '}}'],
        name,
        version
    }),
    terser(),
    resolve(),
    commonjs(),
    babel({
        exclude: 'node_modules/**' // only transpile our source code
    })
];

const pluginsOptB = [
    json(),
    replace({
        delimiters: ['{{', '}}'],
        name,
        version
    }),
    resolve(),
    commonjs(),
    babel({
        exclude: 'node_modules/**' // only transpile our source code
    })
];

const pluginsOptC = [
    json(),
    replace({
        delimiters: ['{{', '}}'],
        name,
        version
    }),
    resolve(),
    commonjs()
];

export default [
    {
        input: './src/scripts/main.js',
        output: [
            // "iife" format for use in the browser
            {
                name: 'WebApp', // 'IIFE' bundles require an "output.name"
                file: 'dist/scripts/main.js',
                format: 'iife',
                sourcemap: true,
            },
            // "cjs" format (aka CommonJS)
            {
                dir: 'dist/scripts/main.cjs',
                format: 'cjs',
                sourcemap: true,
            },
            // "umd" format (for use by Node applications and bundlers like Webpack)
            {
                name: 'WebApp', // 'UMD' bundles require an "output.name"
                dir: 'dist/scripts/main.umd',
                format: 'umd',
                sourcemap: true,
            },
            // "esm" format (aka ES6 modules)
            {
                dir: 'dist/scripts/main.esm',
                format: 'esm',
                sourcemap: true,
            }
        ],
        plugins: pluginsOptA
    },
    {
        // Me trying to dynamically update the service worker version number
        // I don't think this is the right solution though.
        // I may set up the logic in a Nunjucks serviceworker file
        input: './src/serviceworker.js',
        output: [
            {
                dir: 'dist',
                format: 'cjs',
            }
        ],
        plugins: pluginsOptC
    }
];
