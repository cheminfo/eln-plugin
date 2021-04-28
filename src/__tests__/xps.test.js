import fs from 'fs';
import { join } from 'path';

import xps from '../types/sample/xps';

test('xps meta info', () => {
  let jcamp = fs.readFileSync(join(__dirname, 'data/xps.jdx'), 'base64');
  let metadata = xps.process('test_code_batch.jdx', {
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
