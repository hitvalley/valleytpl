import fs from 'fs';
import { join } from 'path';
import getContent from '../../src/utils/content-in-node';
import {
getConfig,
writeTestFile,
removeTestFile
} from './file';
const config = getConfig();

beforeAll(() => {
  writeTestFile('demo1', '<p>{{test}}</p>');
});
test('test getContent', () => {
  getContent('demo1', config).then(res => expect(res).toEqual('<p>{{test}}</p>'));
});
afterAll(() => {
  removeTestFile('demo1');
});


