import fs from 'fs';
import { join } from 'path';

import mass from '../types/sample/mass';

test('mass meta info', () => {
  let jcamp = fs.readFileSync(
    join(__dirname, 'data/mass_cephalochromine.jdx'),
    'base64',
  );
  let metadata = mass.process('test_code_batch.jdx', {
    content: jcamp,
    encoding: 'base64',
  });
  expect(metadata).toStrictEqual({
    experiment: 'HCD40',
    injection: 'Direct injection',
    mode: 'positive',
    instrument: 'Exploris 240',
    ionisation: 'Nanochip-based ESI',
    analyzer: 'LTQ-Orbitrap',
    conditions:
      'SPECTRUM - MS\n' +
      'Cephalochromine_MS2_HCD40.raw\n' +
      'FTMS + p NSI Full ms2 519.2000@hcd40.00 [55.0604-550.6040]\n' +
      'Scan #: 1\n' +
      'RT: 2.59\n' +
      'Data points: 24262',
    accurate: { mf: 'C28H22O10', modification: 'H+', value: 519.1291 },
  });
});
