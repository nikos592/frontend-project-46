import buildAST from './buildAST.js';
import parseFile from './parsers.js';
import renderDiff from './renderDiff.js';

const genDiff = (filePath1, filePath2) => {
  const data1 = parseFile(filePath1);
  const data2 = parseFile(filePath2);
  const getAST = buildAST(data1, data2);
  return renderDiff(getAST);
};

export default genDiff;
