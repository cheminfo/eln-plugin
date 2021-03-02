import fs from 'fs';
import { join } from 'path';

import chromatogram from '../types/sample/chromatogram';

test('chromtagrogram meta info', () => {
  let cdf = fs.readFileSync(join(__dirname, 'data/agilent-hplc.cdf'), 'base64');
  let metadata = chromatogram.process('test_code_batch.cdf', {
    content: cdf,
    encoding: 'base64',
  });
  expect(metadata).toStrictEqual({ detector: 'tic' });
});
