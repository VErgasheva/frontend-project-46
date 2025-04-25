import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import genDiff from '../index.js';
import parseContent from '../src/parsers.js';
import { file11Fixture } from '../__fixtures__/objs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  )).toEqual(readFileSync(getFixturePath(`result_${format}.txt`), 'utf-8'));
});

test('parseContent yaml', () => {
  expect(
    parseContent(readFileSync(getFixturePath('file11.yml')), 'yaml'),
  ).toEqual(file11Fixture);
});

test('parseContent json', () => {
  expect(
    parseContent(readFileSync(getFixturePath('file11.json')), 'json'),
  ).toEqual(file11Fixture);
});