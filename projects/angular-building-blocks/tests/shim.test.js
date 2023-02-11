/**
 * @jest-environment node
 */

const path = require('path');
const sassTrue = require('sass-true');
const glob = require('glob');

describe('Scss unit tests', () => {
    const paths = path.resolve(process.cwd(), 'tests/**/*.tests.scss');
    const sassTestFiles = glob.sync(paths);

    sassTestFiles.forEach(file => sassTrue.runSass({ file }, { describe, it }));
});