import buildDiff from './src/genDiff.js';
import getFormatter from './src/formatters/index.js';
import parseContent from './src/parsers.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const obj1 = typeof filepath1 === 'string' && filepath1.endsWith('.json' || '.yml' || '.yaml')
    ? parseContent(filepath1)
    : filepath1;
  const obj2 = typeof filepath2 === 'string' && filepath2.endsWith('.json' || '.yml' || '.yaml')
    ? parseContent(filepath2)
    : filepath2;
  const diffTree = buildDiff(obj1, obj2);
  const formatter = getFormatter(formatName);
  return formatter(diffTree);
};

export default genDiff;
