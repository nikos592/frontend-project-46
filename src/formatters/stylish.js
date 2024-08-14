import _ from 'lodash';

const indent = (depth) => '    '.repeat(depth);

const formatValue = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value;
  }
  const entries = Object.entries(value).map(
    ([key, val]) => `${indent(depth + 1)}${key}: ${formatValue(val, depth + 1)}`,
  );
  return `{\n${entries.join('\n')}\n${indent(depth)}}`;
};

const makeStylish = (tree, depth = 1) => {
  const result = tree.children.map((node) => {
    switch (node.type) {
      case 'nested':
        return `${indent(depth)}${node.key}: {\n${makeStylish(node, depth + 1)}\n${indent(depth)}}`;
      case 'unchanged':
        return `${indent(depth)}${node.key}: ${formatValue(node.value, depth + 1)}`;
      case 'updated':
        return `${indent(depth)}- ${node.key}: ${formatValue(node.value, depth + 1)}\n${indent(depth)}+ ${node.key}: ${formatValue(node.newValue, depth + 1)}`;
      case 'removed':
        return `${indent(depth)}- ${node.key}: ${formatValue(node.value, depth + 1)}`;
      case 'added':
        return `${indent(depth)}+ ${node.key}: ${formatValue(node.value, depth + 1)}`;
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });
  return result.join('\n');
};

export default (tree) => `{\n${makeStylish(tree, 1)}\n}`;
