#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from './index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .version('1.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, program.opts().format));
  })
  .parse(process.argv);
