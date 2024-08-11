import { test, expect, describe } from '@jest/globals';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

describe.each([
  ['file1.json', 'file2.json', 'stylish', 'expectedStylish.txt'],
  ['file1.yml', 'file2.yml', 'stylish', 'expectedStylish.txt'],
  ['file1.json', 'file2.json', 'plain', 'expectedPlain.txt'],
  ['file1.json', 'file2.json', 'json', 'expectedJson.json'],
])('.genDiff(%s, %s, %s)', (a, b, c, expected) => {
  test(`returns ${expected}`, () => {
    const filePathA = getFixturePath(a);
    const filePathB = getFixturePath(b);
    const expectedOutput = fs.readFileSync(getFixturePath(expected), 'utf-8');

    expect(genDiff(filePathA, filePathB, c)).toBe(expectedOutput);
  });
});
