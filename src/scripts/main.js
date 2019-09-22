// src/scripts/main.js
import { version } from '../../package.json';
import answer from 'the-answer';
import foo from './modules/foo.js';
import bar from './modules/foo.js';
import { square } from './modules/maths.js';

// src/components/.../*.js
import menu, { dropDown } from '../components/core/menu/menu.js'; // Daisy-chained default and specific function/s.


export default function () {
    console.log('version ' + version);

    console.log(foo);
    console.log(bar);

    // Functions from the menu.js
    console.log(menu);
    console.log(dropDown);

    // COMMENTED OUT FOR NOW => Because UMD and IIFE output formats are not supported for code-splitting builds.
    // ======================
    // import('./modules/foo.js').then(({ default: foo }) => console.log(foo));
    // import('./modules/bar.js').then(({ default: bar }) => console.log(bar));

    console.log(`the answer is ${answer}`);

    console.log( square( 5 ) );
}
