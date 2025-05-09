import genDiff from '../index.js';
import parseContent from '../src/parsers.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('genDiff', () => {
  test('разница между простыми объектами', () => {
    const obj1 = {
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    };
    const obj2 = {
      timeout: 20,
      verbose: true,
      host: 'hexlet.io',
    };
    const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
    expect(genDiff(obj1, obj2)).toBe(expected);
  });

  test('plain format json', () => {
    const obj1 = parseContent(getFixturePath('file11.json'));
    const obj2 = parseContent(getFixturePath('file22.json'));
  
    const expected = [
      "Property 'common.follow' was added with value: false",
      "Property 'common.setting2' was removed",
      "Property 'common.setting3' was updated. From true to null",
      "Property 'common.setting4' was added with value: 'blah blah'",
      "Property 'common.setting5' was added with value: [complex value]",
      "Property 'common.setting6.doge.wow' was updated. From '' to 'so much'",
      "Property 'common.setting6.ops' was added with value: 'vops'",
      "Property 'group1.baz' was updated. From 'bas' to 'bars'",
      "Property 'group1.nest' was updated. From [complex value] to 'str'",
      "Property 'group2' was removed",
      "Property 'group3' was added with value: [complex value]"
    ].join('\n');
  
    expect(genDiff(obj1, obj2, 'plain')).toBe(expected);
  });

  test('разница между пустыми объектами', () => {
    expect(genDiff({}, {})).toBe('{\n}');
  });

  test('объекты без различий', () => {
    const obj = { a: 1, b: 2 };
    expect(genDiff(obj, obj)).toBe('{\n    a: 1\n    b: 2\n}');
  });

  test('объекты с вложенностью сравниваются по верхнему уровню', () => {
    const obj1 = { a: { x: 1 }, b: 2 };
    const obj2 = { a: { x: 2 }, b: 2 };
    const expected = `{
    a: {
      - x: 1
      + x: 2
    }
    b: 2
}`;
    expect(genDiff(obj1, obj2)).toBe(expected);
  });
  test('json format', () => {
    const obj1 = parseContent(getFixturePath('file11.json'));
    const obj2 = parseContent(getFixturePath('file22.json'));
    const result = genDiff(obj1, obj2, 'json');
    expect(() => JSON.parse(result)).not.toThrow();
    const diff = JSON.parse(result);
    expect(Array.isArray(diff)).toBe(true);
    expect(diff.some((node) => node.key === 'common')).toBe(true);
  });
});