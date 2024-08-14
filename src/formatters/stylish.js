import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount);

const formatValue = (currentValue, depth) => {
  if (!_.isPlainObject(currentValue)) {
    return currentValue;
  }
  const bracketIndent = indent(depth - 1);
  const lines = Object.entries(currentValue)
    .map(([key, val]) => `${indent(depth)}${key}: ${formatValue(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
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
