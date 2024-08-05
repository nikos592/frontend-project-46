import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('buildDiff with YAML files', () => {
  const filepath1 = path.resolve(__dirname, '__fixtures__', 'file1.yml');
  const filepath2 = path.resolve(__dirname, '__fixtures__', 'file2.yml');

  const expected = `{
    - follow: false
      host: hexlet.io
    - proxy: 123.234.53.22
    - timeout: 50
    + timeout: 20
    + verbose: true
    }`;

  expect(genDiff(filepath1, filepath2)).toEqual(expected);
});
