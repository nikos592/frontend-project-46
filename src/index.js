import buildDiff from './generateDiff.js';
import parseFile from './parsers.js';

const genDiff = (filePath1, filePath2) => {
  const data1 = parseFile(filePath1);
  const data2 = parseFile(filePath2);
  console.log(buildDiff(data1, data2));
};

export default genDiff;
