import buildDiff from './src/genDiff.js';
import getFormatter from './src/formatters/index.js';

const genDiff = (obj1, obj2, formatName = 'stylish') => {
  const diffTree = buildDiff(obj1, obj2);
  const formatter = getFormatter(formatName);
  return formatter(diffTree);
};

export default genDiff;