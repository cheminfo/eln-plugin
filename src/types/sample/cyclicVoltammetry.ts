import {
  getMetaFromJcamp,
  getTargetProperty,
  referenceFind,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const cyclicVoltammetry: TypeProcessor = {
  jpath: ['spectra', 'cyclicVoltammetry'],
  find: referenceFind,
  getProperty: getTargetProperty,
  process: getMetaFromJcamp,
};

export default cyclicVoltammetry;
