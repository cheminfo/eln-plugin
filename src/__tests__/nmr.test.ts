import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import nmr from '../types/sample/nmr.ts';

test('nmr meta info', () => {
  const jcamp = readFileSync(
    join(import.meta.dirname, 'data/nmr_1d.jdx'),
    'base64',
  );
  const metadata = nmr.process?.('test_code_batch.jdx', {
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
