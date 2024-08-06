import buildAST from '../src/buildAST.js';
import parseFile from '../src/parsers.js';
import renderDiff from '../src/renderDiff.js';

const genDiff = (filePath1, filePath2) => {
  const data1 = parseFile(filePath1);
  const data2 = parseFile(filePath2);
  const getAST = buildAST(data1, data2);
  return renderDiff(getAST);
};

export default genDiff;
