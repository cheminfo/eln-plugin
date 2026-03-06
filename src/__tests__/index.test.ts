import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import elnPlugin from '../index.ts';

test('index - nmr meta info', () => {
  const jcamp = readFileSync(
    join(import.meta.dirname, 'data/nmr_1d.jdx'),
    'base64',
  );
  const metadata = elnPlugin.process(
    'nmr',
    {},
    { filename: 'abc.jdx', content: jcamp, encoding: 'base64' },
  );

  expect(metadata).toStrictEqual({
    spectra: {
      nmr: [
        {
          acquisitionMode: 0,
          date: '2013-08-20T15:50:44.000Z',
          dimension: 1,
          experiment: '1d',
          expno: 1,
          frequency: 400.082470657773,
          isComplex: true,
          isFid: false,
          isFt: true,
          jcamp: { filename: 'spectra/nmr/abc.jdx' },
          nucleus: ['1H'],
          probe: '5 mm CPPBBO BB-1H/19F/D Z-GRD Z130030/0001',
          pulse: 'zg30',
          solvent: 'DMSO',
          temperature: 298.0016,
          title: 'ethylbenzene',
          type: 'NMR SPECTRUM',
        },
      ],
    },
  });
});

test('index - nmr meta info and keep content', () => {
  const jcamp = readFileSync(
    join(import.meta.dirname, 'data/nmr_1d.jdx'),
    'base64',
  );
  const entry = elnPlugin.process(
    'nmr',
    {},
    { filename: 'abc.jdx', content: jcamp, encoding: 'base64' },
    {},
    { keepContent: true },
  );
  const spectra = entry.spectra as { nmr: Array<Record<string, unknown>> };
  const firstNmr = spectra.nmr[0] as Record<string, unknown>;

  expect((firstNmr.jcamp as { data: string }).data.length).toBeGreaterThan(
    10000,
  );
  expect(firstNmr).toMatchObject({
    acquisitionMode: 0,
    date: '2013-08-20T15:50:44.000Z',
    dimension: 1,
    experiment: '1d',
    expno: 1,
    frequency: 400.082470657773,
    isFid: false,
    isFt: true,
    jcamp: { filename: 'spectra/nmr/abc.jdx' },
    nucleus: ['1H'],
    probe: '5 mm CPPBBO BB-1H/19F/D Z-GRD Z130030/0001',
    pulse: 'zg30',
    solvent: 'DMSO',
    temperature: 298.0016,
    title: 'ethylbenzene',
    type: 'NMR SPECTRUM',
  });
});

test('index - agilent-hplc meta info', () => {
  const netcdf = readFileSync(
    join(import.meta.dirname, 'data/agilent-hplc.cdf'),
    'base64',
  );
  const metadata = elnPlugin.process(
    'chromatogram',
    {},
    { filename: 'abc.cdf', content: netcdf, encoding: 'base64' },
  );

  expect(metadata).toStrictEqual({
    spectra: {
      chromatogram: [
        { cdf: { filename: 'spectra/chromatogram/abc.cdf' }, detector: 'tic' },
      ],
    },
  });
});
