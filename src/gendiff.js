#!/usr/bin/env node

import { Command } from 'commander';
import { createRequire } from 'module';
import generateDiff from './generateDiff.js';

const require = createRequire(import.meta.url);

const { version } = require('../package');

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .version(version, '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .usage('[options] <filepath1> <filepath2>');

program.parse(process.argv);

const [filepath1, filepath2] = program.args;

if (!filepath1 || !filepath2) {
  console.error('Please provide filepath1 and filepath2');
  process.exit(1);
}

try {
  generateDiff(filepath1, filepath2);
} catch (error) {
  console.error('Error comparing files:', error.message);
  process.exit(1);
}
