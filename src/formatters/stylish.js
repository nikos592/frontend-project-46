import _ from 'lodash';

const spaceSize = 4;

const indent = (depth) => ' '.repeat(spaceSize * depth);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const lines = Object.entries(value).map(([key, val]) => {
    const stringifyVal = stringify(val, depth + 1);
    return `${indent(depth + 1)}${key}: ${stringifyVal}`;
  });

  return `{\n${lines.join('\n')}\n${indent(depth)}}`;
};

const makeLine = (key, value, sign, depth) => {
  const ind = ' '.repeat(spaceSize * depth - 2);
  return `${ind}${sign} ${key}: ${stringify(value, depth)}`;
};

const stylish = (tree) => {
  const iter = (nodes, depth) => {
    const lines = nodes.map((node) => {
      const {
        key, type, value, newValue, oldValue, children,
      } = node;

      switch (type) {
        case 'nested':
          return `${indent(depth)}${key}: {\n${iter(children, depth + 1)}\n${indent(depth)}}`;

        case 'added':
          return makeLine(key, value, '+', depth);

        case 'removed':
          return makeLine(key, value, '-', depth);

        case 'unchanged':
          return makeLine(key, value, ' ', depth);

        case 'changed':
          return [
            makeLine(key, oldValue, '-', depth),
            makeLine(key, newValue, '+', depth),
          ].join('\n');

        default:
          throw new Error(`Unknown node type: ${type}`);
      }
    });

    return lines.join('\n');
  };

  return `{\n${iter(tree, 1)}\n}`;
};

export default stylish;
