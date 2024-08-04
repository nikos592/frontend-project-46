import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import parseFile from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('parseFile', () => {
  const testDir = path.join(__dirname, 'test_files');
  const jsonFilePath = path.join(testDir, 'test.json');
  const yamlFilePath = path.join(testDir, 'test.yaml');
  const iniFilePath = path.join(testDir, 'test.ini');

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir);
    }
    fs.writeFileSync(jsonFilePath, JSON.stringify({ key: 'value', number: 123 }));
    fs.writeFileSync(yamlFilePath, 'key: value\nnumber: 123');
    fs.writeFileSync(iniFilePath, 'key=value\nnumber=123');
  });

  test('parses JSON files correctly', () => {
    const result = parseFile(jsonFilePath);
    expect(result).toEqual({ key: 'value', number: 123 });
  });

  test('parses YAML files correctly', () => {
    const result = parseFile(yamlFilePath);
    expect(result).toEqual({ key: 'value', number: 123 });
  });

  test('parses INI files correctly', () => {
    const result = parseFile(iniFilePath);
    expect(result).toEqual({ key: 'value', number: '123' });
  });

  test('throws error on unsupported file format', () => {
    const unsupportedFilePath = path.join(testDir, 'test.txt');
    fs.writeFileSync(unsupportedFilePath, 'unsupported content');

    expect(() => parseFile(unsupportedFilePath)).toThrow('Unsupported file format: .txt');
  });

  afterAll(() => {
    fs.rmdirSync(testDir, { recursive: true });
  });
});
