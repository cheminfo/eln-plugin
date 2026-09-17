import {
  getMetaFromJcamp,
  getTargetProperty,
  referenceFind,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const iv: TypeProcessor = {
  jpath: ['spectra', 'iv'],
  find: referenceFind,
  getProperty: getTargetProperty,
  process: getMetaFromJcamp,
};

export default iv;
