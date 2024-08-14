import _ from 'lodash';

const printValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (tree) => {
  const cb = (node, path = '') => {
    const {
      key, value, type, newValue, children,
    } = node;
    const nodeName = path ? `${path}.${key}` : key;
    const printedValue = printValue(value);
    const printedNewValue = printValue(newValue);
    switch (type) {
      case 'root':
        return children.map((item) => cb(item, path)).join('\n');
      case 'nested':
        return children.flatMap((item) => cb(item, nodeName)).join('\n');
      case 'added':
        return `Property '${nodeName}' was added with value: ${printedValue}`;
      case 'removed':
        return `Property '${nodeName}' was removed`;
      case 'updated':
        return `Property '${nodeName}' was updated. From ${printedValue} to ${printedNewValue}`;
      default:
        return [];
    }
  };
  return cb(tree).trim();
};

export default plain;
