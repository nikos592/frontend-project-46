import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value) && !_.isArray(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (tree) => {
  const iter = (nodes, path) => {
    const lines = nodes.flatMap((node) => {
      const {
        key, type, value, children, value1, value2,
      } = node;
      const fullPath = path ? `${path}.${key}` : key;

      switch (type) {
        case 'added':
          return `Property '${fullPath}' was added with value: ${stringify(value)}`;
        case 'removed':
          return `Property '${fullPath}' was removed`;
        case 'changed':
          return `Property '${fullPath}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
        case 'nested':
          return iter(children, fullPath);
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });

    return lines;
  };

  return iter(tree, '').join('\n');
};

export default plain;
