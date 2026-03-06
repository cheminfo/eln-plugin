import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import xps from '../types/sample/xps.ts';

test('xps meta info', () => {
  const jcamp = readFileSync(
    join(import.meta.dirname, 'data/xps.jdx'),
    'base64',
  );
  const metadata = xps.process?.('test_code_batch.jdx', {
    content: jcamp,
    encoding: 'base64',
  });

  expect(metadata).toStrictEqual({
    energyType: { kind: 'kinetic', unit: 'eV' },
    analysisSource: {
      label: 'Al (mono)',
      characteristicEnergy: { value: 1486.69, unit: 'eV' },
      beamWidthX: { value: 1e37, unit: 'um' },
      beamWidthY: { value: 1e37, unit: 'um' },
    },
  });
});
