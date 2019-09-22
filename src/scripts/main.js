// src/scripts/main.js
import { version } from '../../package.json';
import answer from 'the-answer';

// Utils
import { square } from './utils/maths';
import embed from './utils/embed';
import smoothScroll from './utils/smoothScroll';

// Modules
import foo from './modules/foo';
import bar from './modules/bar';

// Components
import menu, { dropDown } from '../components/core/menu/menu.js'; // Daisy-chained 'default' and specific exported functions.


export default function () {
    console.log('version ' + version);

    console.log(foo);
    console.log(bar);

    // A test script (not in console.log)
    embed();

    smoothScroll();

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
