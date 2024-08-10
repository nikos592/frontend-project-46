import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readFile = (filename) => {
  const fullPath = path.resolve(__dirname, '../__tests__/__fixtures__', filename);
  return readFileSync(fullPath, 'utf-8');
};

export default readFile;
