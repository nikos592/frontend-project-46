import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  plain,
  json,
  stylish,
};

const formatData = (formatName, tree) => {
  const formatter = formatters[formatName];
  if (!formatter) {
    throw new Error(`incorrect format: ${formatName}!`);
  }
  return formatter(tree);
};

export default formatData;
