import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatData = (formatName, tree) => {
  if (formatName === 'plain') {
    return plain(tree);
  } if (formatName === 'json') {
    return json(tree);
  } if (formatName === 'stylish') {
    return stylish(tree);
  }
  return new Error(`incorrect format: ${formatName}!`);
};

export default formatData;
