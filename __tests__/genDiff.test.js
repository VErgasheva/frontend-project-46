const { fileURLToPath } = require('url');
const path = require('path');
const { parseFile } = require('../src/parsers.js');
const genDiff = require('../src/genDiff.js');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (__filename) => path.join(__dirname, '..', '__fixtures', __filename);

test('gendiff flat JSON', () => {
  const file1 = parseFile(getFixturePath('file1.json'));
  const file2 = parseFile(getFixturePath('file2.json'));
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(genDiff(file1, file2)).toBe(expected);
});
