import parseFile from '../src/parsers.js';

describe('parseFile', () => {
  test('parses JSON data correctly', () => {
    const jsonData = '{"name": "John", "age": 30}';
    const format = '.json';
    const expectedOutput = { name: 'John', age: 30 };

    expect(parseFile(jsonData, format)).toEqual(expectedOutput);
  });

  test('parses YAML data correctly', () => {
    const yamlData = 'name: John\nage: 30';
    const format = '.yaml';
    const expectedOutput = { name: 'John', age: 30 };

    expect(parseFile(yamlData, format)).toEqual(expectedOutput);
  });

  test('parses YML data correctly', () => {
    const ymlData = 'name: John\nage: 30';
    const format = '.yml';
    const expectedOutput = { name: 'John', age: 30 };

    expect(parseFile(ymlData, format)).toEqual(expectedOutput);
  });

  test('throws an error for incorrect format', () => {
    const data = 'name: John\nage: 30';
    const format = '.txt';

    expect(() => parseFile(data, format)).toThrowError(`incorrect file extension: ${format}!`);
  });
});
