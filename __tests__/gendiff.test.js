import path from 'path';
import { fileURLToPath } from 'url';
import { parseFile } from '../src/generateDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file1Path = path.join(__dirname, '..', '__fixtures__', 'file1.json');
const file2Path = path.join(__dirname, '..', '__fixtures__', 'file2.json');

test('comparing two flat JSON files', () => {
  const file1Content = parseFile(file1Path);
  const file2Content = parseFile(file2Path);

  expect(file1Content).toEqual({
    name: 'John',
    age: 30,
  });

  expect(file2Content).toEqual({
    name: 'Doe',
    age: 30,
  });
});
