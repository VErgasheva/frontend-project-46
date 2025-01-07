#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information');

program.parse(process.argv);

program
  .option('-f, --format [type]', 'output format');

program
  .arguments('<filepath1> <filepath2>')
  .description('Two file paths to compare')
  .action((filepath1, filepath2) => {
    console.log(`Comparing files: ${filepath1} and ${filepath2}`);
  });

program
  .helpOption('-h, --help', 'output usage information');

program.parse(process.argv);

if (program.args.length < 2) {
  program.help();
}
