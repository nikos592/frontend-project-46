import _ from 'lodash';

const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

const buildDiff = (obj1, obj2, depth = 0) => {
  const allKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const indentSize = depth * 4;
  const currentIndent = ' '.repeat(indentSize);
  const closingBraceIndent = ' '.repeat(Math.max(0, indentSize - 4));

  const lines = allKeys.map((key) => {
    if (!_.has(obj2, key)) {
      return `${currentIndent}- ${key}: ${isObject(obj1[key]) ? buildDiff(obj1[key], {}, depth + 1) : obj1[key]}`;
    }
    if (!_.has(obj1, key)) {
      return `${currentIndent}+ ${key}: ${isObject(obj2[key]) ? buildDiff(obj2[key], {}, depth + 1) : obj2[key]}`;
    }
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return `${currentIndent}  ${key}: ${buildDiff(obj1[key], obj2[key], depth + 1)}`;
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return [
        `${currentIndent}- ${key}: ${obj1[key]}`,
        `${currentIndent}+ ${key}: ${obj2[key]}`,
      ].join('\n');
    }
    return `${currentIndent}  ${key}: ${obj1[key]}`;
  });

  return [
    '{',
    ...lines,
    `${closingBraceIndent}}`,
  ].join('\n');
};

export default buildDiff;
