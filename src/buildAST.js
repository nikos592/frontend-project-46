import _ from 'lodash';

const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

const buildAST = (obj1, obj2) => {
  const allKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  return allKeys.map((key) => {
    if (!_.has(obj2, key)) {
      return { key, type: 'removed', value: obj1[key] };
    }

    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }

    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return { key, type: 'nested', children: buildAST(obj1[key], obj2[key]) };
    }

    if (obj1[key] !== obj2[key]) {
      return {
        key, type: 'changed', oldValue: obj1[key], newValue: obj2[key],
      };
    }

    return { key, type: 'unchanged', value: obj1[key] };
  });
};

export default buildAST;
