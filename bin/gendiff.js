#!/usr/bin/env node

import path from 'node:path'; 
import { Command } from 'commander';
import parseFile from './src/parser.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0') 
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'display help for command')
  .action((filepath1, filepath2) => {
    const absolutePath1 = path.resolve(process.cwd(), filepath1);
    const absolutePath2 = path.resolve(process.cwd(), filepath2);

    const data1 = parseFile(absolutePath1);
    const data2 = parseFile(absolutePath2);

    console.log('File 1:', data1);
    console.log('File 2:', data2);
  });

program.parse();
