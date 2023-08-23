/**
 * @jest-environment jest-environment-node-single-context
 */

const path = require('path');
const sassTrue = require('sass-true');
const glob = require('glob');

describe('Scss unit tests', () => {
    const paths = path.resolve(process.cwd(), 'tests/**/*.tests.scss').replace(/\\/g,'/');
    const sassTestFiles = glob.sync(paths);

    sassTestFiles.forEach(file => sassTrue.runSass({ describe, it }, file, {loadPaths: ['../../node_modules'] }));
});