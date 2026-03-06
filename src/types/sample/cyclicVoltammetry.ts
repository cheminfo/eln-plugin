import {
  basenameFind,
  getMetaFromJcamp,
  getTargetProperty,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const cyclicVoltammetry: TypeProcessor = {
  jpath: ['spectra', 'cyclicVoltammetry'],
  find: basenameFind,
  getProperty: getTargetProperty,
  process: getMetaFromJcamp,
};

export default cyclicVoltammetry;
