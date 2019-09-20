// src/main.js
import { version } from '../package.json';
import answer from 'the-answer';
import foo from './modules/foo.js';
import bar from './modules/foo.js';
import { square } from './modules/maths.js';

export default function () {
    console.log('version ' + version);

    console.log(foo);
    console.log(bar);

    // COMMENTED OUT FOR NOW => Because UMD and IIFE output formats are not supported for code-splitting builds.
    // ======================
    // import('./modules/foo.js').then(({ default: foo }) => console.log(foo));
    // import('./modules/bar.js').then(({ default: bar }) => console.log(bar));

    console.log(`the answer is ${answer}`);

    console.log( square( 5 ) );
}
