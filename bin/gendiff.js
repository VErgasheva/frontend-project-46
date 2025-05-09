#!/usr/bin/env node

import { Command } from 'commander';
import parseContent from '../src/parsers.js';
import genDiff from '../index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    const obj1 = parseContent(filepath1);
    const obj2 = parseContent(filepath2);
    const diff = genDiff(obj1, obj2, options.format);
    console.log(diff);
  });

program.parse(process.argv);