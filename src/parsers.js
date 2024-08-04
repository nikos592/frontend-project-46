import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

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

export default parseFile;
