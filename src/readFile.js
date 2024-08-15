import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readAndParseFile = (filename) => {
  const fullPath = path.resolve(__dirname, '../__tests__/__fixtures__', filename);
  const fileData = readFileSync(fullPath, 'utf-8');
  const extName = path.extname(filename);
  return { fileData, extName };
};

export default readAndParseFile;
