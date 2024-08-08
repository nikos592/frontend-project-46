import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('buildDiff with YAML files', () => {
  const filepath1 = path.join(__dirname, '__fixtures__', 'file1.yml');
  const filepath2 = path.join(__dirname, '__fixtures__', 'file2.yml');

  const expected = `  common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: null
    + setting4: blah blah
    + setting5: {
              key5: value5
        }
      setting6: {
          doge: {
            - wow: 
            + wow: so much
            }
          key: value
        + ops: vops
        }
    }
  group1: {
    - baz: bas
    + baz: bars
      foo: bar
    - nest: {
              key: value
        }
    + nest: str
    }
- group2: {
          abc: 12345
          deep: {
              id: 45
        }
    }
+ group3: {
          deep: {
              id: {
                  number: 45
            }
        }
          fee: 100500
    }
`;

  expect(genDiff(filepath1, filepath2)).toEqual(expected);
});
