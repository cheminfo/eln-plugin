import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import chromatogram from '../types/sample/chromatogram.ts';

test('chromatogram meta info', () => {
  const cdf = readFileSync(
    join(import.meta.dirname, 'data/agilent-hplc.cdf'),
    'base64',
  );
  const metadata = chromatogram.process?.('test_code_batch.cdf', {
    content: cdf,
    encoding: 'base64',
  });

  expect(metadata).toStrictEqual({ detector: 'tic' });
});
