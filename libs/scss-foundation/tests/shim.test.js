/**
 * @jest-environment ./jest-environment-single-context
 */

const path = require('path');
const sassTrue = require('sass-true');
const sass = require('sass');
const glob = require('glob');

describe('Scss unit tests', () => {
    const paths = path.resolve(process.cwd(), 'tests/**/*.tests.scss').replace(/\\/g,'/');
    const sassTestFiles = glob.sync(paths);

    sassTestFiles.forEach(file => sassTrue.runSass({ describe, it, sass }, file, {loadPaths: ['../../node_modules'] }));
});