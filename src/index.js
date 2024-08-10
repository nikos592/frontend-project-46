import formatData from './formatters/index.js';
import buildAST from './buildAST.js';
import parseFile from './parsers.js';
import readFile from './readFile.js';
import getFileFormat from './getFileFormat.js';

const getData = (filePath) => {
  const data = readFile(filePath);
  const format = getFileFormat(filePath);
  return parseFile(data, format);
};

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const parsedData1 = getData(filePath1);
  const parsedData2 = getData(filePath2);
  const tree = buildAST(parsedData1, parsedData2);
  return formatData(formatName, tree);
};

export default genDiff;
