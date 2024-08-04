import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const parseFile = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data);
    case '.ini':
      return ini.parse(data);
    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
};

const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

const buildDiff = (obj1, obj2, depth = 1) => {
  const allKeys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  const indent = ' '.repeat(depth * 4);

  const lines = allKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!_.has(obj1, key)) {
      return `${indent}+ ${key}: ${isObject(value2) ? buildDiff(value2, value2, depth + 1) : value2}`;
    } if (!_.has(obj2, key)) {
      return `${indent}- ${key}: ${isObject(value1) ? buildDiff(value1, value1, depth + 1) : value1}`;
    } if (_.isObject(value1) && _.isObject(value2)) {
      return `${indent}  ${key}: ${buildDiff(value1, value2, depth + 1)}`;
    } if (!_.isEqual(value1, value2)) {
      return [
        `${indent}- ${key}: ${isObject(value1) ? buildDiff(value1, value1, depth + 1) : value1}`,
        `${indent}+ ${key}: ${isObject(value2) ? buildDiff(value2, value2, depth + 1) : value2}`,
      ].join('\n');
    }
    return `${indent}  ${key}: ${value1}`;
  });

  return `{\n${lines.join('\n')}\n${' '.repeat((depth - 1) * 4)}}`;
};

const generateDiff = (filePath1, filePath2) => {
  const data1 = parseFile(filePath1);
  const data2 = parseFile(filePath2);

  console.log(buildDiff(data1, data2));
};

export default generateDiff;
