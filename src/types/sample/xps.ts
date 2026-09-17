import {
  getMetaFromJcamp,
  getTargetProperty,
  referenceFind,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const xps: TypeProcessor = {
  jpath: ['spectra', 'xps'],
  find: referenceFind,
  getProperty: getTargetProperty,
  process: getMetaFromJcamp,
};

export default xps;
