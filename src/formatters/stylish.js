const getIndent = (depth, sign = ' ') =>
  ' '.repeat(depth * 4 - 2) + sign + ' ';

const getBracketIndent = (depth) =>
  ' '.repeat(depth * 4 - 4);

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }
  const entries = Object.entries(value);
  const lines = entries.map(
    ([key, val]) =>
      `${getIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`
  );
  return ['{', ...lines, `${getBracketIndent(depth + 1)}}`].join('\n');
};

const stylish = (tree, depth = 1) => {
  const lines = tree.map((node) => {
    switch (node.type) {
      case 'added':
        return `${getIndent(depth, '+')}${node.key}: ${stringify(node.value, depth)}`;
      case 'removed':
        return `${getIndent(depth, '-')}${node.key}: ${stringify(node.value, depth)}`;
      case 'unchanged':
        return `${getIndent(depth)}${node.key}: ${stringify(node.value, depth)}`;
      case 'changed':
        return [
          `${getIndent(depth, '-')}${node.key}: ${stringify(node.oldValue, depth)}`,
          `${getIndent(depth, '+')}${node.key}: ${stringify(node.newValue, depth)}`
        ].join('\n');
      case 'nested':
        return `${getIndent(depth)}${node.key}: ${stylish(node.children, depth + 1)}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });
  return ['{', ...lines, `${getBracketIndent(depth)}}`].join('\n');
};

export default stylish;