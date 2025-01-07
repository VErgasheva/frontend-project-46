#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(`Comparing files: ${filepath1} and ${filepath2}`)
  });

program.helpOption('-h, --help', 'output usage information');
program.parse();

