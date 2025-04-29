const fs = require('fs');
const path = require('path');
const { genDiff } = require('../index.js');
const { parseContent } = require('../src/parsers.js');
const { file11Fixture } = require('../fixtures/objs.js');

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures', filename);

test.each([
  'stylish',
  'plain',
  'json',
])('genDiff %s', (format) => {
  expect(genDiff(
    getFixturePath('file11.json'),
    getFixturePath('file22.json'),
    format,
  )).toEqual(fs.readFileSync(getFixturePath(`result_${format}.txt`), 'utf-8'));
});

test('parseContent yaml', () => {
  expect(
    parseContent(fs.readFileSync(getFixturePath('file11.yml')), 'utf-8'),  
  ).toEqual(file11Fixture);
});

test('parseContent json', () => {
  expect(
    parseContent(fs.readFileSync(getFixturePath('file11.json')), 'utf-8'),  
  ).toEqual(file11Fixture);
});

