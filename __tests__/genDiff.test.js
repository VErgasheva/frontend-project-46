import genDiff from '../src/genDiff';

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

  test('разница между пустыми объектами', () => {
    expect(genDiff({}, {})).toBe('{\n\n}');
  });

  test('объекты без различий', () => {
    const obj = { a: 1, b: 2 };
    expect(genDiff(obj, obj)).toBe('{\n    a: 1\n    b: 2\n}');
  });

  test('объекты с вложенностью сравниваются по верхнему уровню', () => {
    const obj1 = { a: { x: 1 }, b: 2 };
    const obj2 = { a: { x: 2 }, b: 2 };
    const expected = `{
  - a: [object Object]
  + a: [object Object]
    b: 2
}`;
    expect(genDiff(obj1, obj2)).toBe(expected);
  });
});
