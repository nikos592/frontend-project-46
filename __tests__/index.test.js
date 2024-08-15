import { test, expect, describe } from '@jest/globals';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import formatData from '../src/formatters/index.js';

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
    const expectedOutput = fs.readFileSync(getFixturePath(expected), 'utf-8').trim();

    expect(genDiff(filePathA, filePathB, c)).toEqual(expectedOutput);
  });
});

describe('genDiff Error handling', () => {
  test('throws an error if file does not exist', () => {
    const filepath1 = 'nonExistent1.json';
    const filepath2 = 'nonExistent2.json';
    expect(() => genDiff(filepath1, filepath2)).toThrow();
  });

  test('throws an error if file format is invalid', () => {
    const invalidJson = getFixturePath('invalid.json');
    const validJson = getFixturePath('file1.json');
    expect(() => genDiff(invalidJson, validJson)).toThrow();
  });
});

describe('formatData', () => {
  const mockTree = { key: 'value' };
  it('should throw an error when an invalid formatName is provided', () => {
    expect(() => formatData('invalid', mockTree)).toThrowError('incorrect format: invalid!');
  });
});
