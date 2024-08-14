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

const formatLine = (depth, sign, key, value) => `${indent(depth).slice(0, -2)}${sign} ${key}: ${formatValue(value, depth + 1)}`;

const makeStylish = (tree, depth = 1) => {
  const result = tree.children.map((node) => {
    switch (node.type) {
      case 'nested':
        return `${indent(depth)}${node.key}: {\n${makeStylish(node, depth + 1)}\n${indent(depth)}}`;
      case 'unchanged':
        return formatLine(depth, ' ', node.key, node.value);
      case 'updated':
        return `${formatLine(depth, '-', node.key, node.value)}\n${formatLine(depth, '+', node.key, node.newValue)}`;
      case 'removed':
        return formatLine(depth, '-', node.key, node.value);
      case 'added':
        return formatLine(depth, '+', node.key, node.value);
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });
  return result.join('\n');
};
export default (tree) => `{\n${makeStylish(tree, 1)}\n}`;
