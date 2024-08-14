import _ from 'lodash';

const isValueObject = (node, file1, file2) => {
  if (_.isPlainObject(_.get(file1, node)) && _.isPlainObject(_.get(file2, node))) {
    return true;
  }
  return false;
};

const makeNode = (key, type, value = null, newValue = null, children = []) => ({
  key, type, value, newValue, children,
});

const makeTree = (keys, parsedData1, parsedData2) => keys.map((el) => {
  if (isValueObject(el, parsedData1, parsedData2)) {
    const subKeys = _.union(Object.keys(parsedData1[el]), Object.keys(parsedData2[el]));
    return makeNode(el, 'nested', null, null, makeTree(subKeys, parsedData1[el], parsedData2[el]));
  }
  if (parsedData1[el] === parsedData2[el]) {
    return makeNode(el, 'unchanged', parsedData2[el]);
  }
  if (_.has(parsedData1, el) && _.has(parsedData2, el)) {
    return makeNode(el, 'updated', parsedData1[el], parsedData2[el]);
  }
  if (_.has(parsedData1, el)) {
    return makeNode(el, 'removed', parsedData1[el]);
  }
  return makeNode(el, 'added', parsedData2[el]);
});

const buildTree = (parsedData1, parsedData2) => {
  const keys = _.union(Object.keys(parsedData1), Object.keys(parsedData2));
  return makeNode('', 'root', null, null, makeTree(_.sortBy(keys), parsedData1, parsedData2));
};

export default buildTree;
