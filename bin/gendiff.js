#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0') 
  .argument('<filepath1>', 'path to the first file')
  .argument('<filepath2>', 'path to the second file')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'display help for command')
  .action((filepath1, filepath2, options) => {
    console.log(`Comparing files: ${filepath1} and ${filepath2}`);
    if (options.format) {
      console.log(`Output format: ${options.format}`);
    }
  });

program.parse();
