import fs from 'fs';
import { join } from 'path';

import nmr from '../types/sample/nmr';

test('nmr meta info', () => {
  let jcamp = fs.readFileSync(join(__dirname, 'data/nmr_1d.jdx'), 'base64');
  let metadata = nmr.process('test_code_batch.jdx', {
    content: jcamp,
    encoding: 'base64',
  });
  expect(metadata).toStrictEqual({
    acquisitionMode: 0,
    date: '2013-08-20T15:50:44.000Z',
    dimension: 1,
    experiment: '1d',
    expno: 1,
    frequency: 400.082470657773,
    isComplex: true,
    isFid: false,
    isFt: true,
    nucleus: ['1H'],
    probe: '5 mm CPPBBO BB-1H/19F/D Z-GRD Z130030/0001',
    pulse: 'zg30',
    solvent: 'DMSO',
    temperature: 298.0016,
    title: 'ethylbenzene',
    type: 'NMR SPECTRUM',
  });
});
