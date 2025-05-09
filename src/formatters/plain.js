const stringify = (value) => {
  if (value === null) return 'null';
  if (typeof value === 'string') return `'${value}'`;
  if (typeof value === 'object') return '[complex value]';
  return String(value);
};

const plain = (tree, parent = '') => {
  const iter = tree.flatMap((node) => {
    const path = parent ? `${parent}.${node.key}` : node.key;
    switch (node.type) {
      case 'added':
        return `Property '${path}' was added with value: ${stringify(node.value)}`;
      case 'removed':
        return `Property '${path}' was removed`;
      case 'changed':
        return `Property '${path}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
      case 'nested':
        return plain(node.children, path);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });
  return iter.join('\n');
};

export default plain;