import {
  getMetaFromJcamp,
  getTargetProperty,
  referenceFind,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const voidVolume: TypeProcessor = {
  jpath: ['spectra', 'voidVolume'],
  find: referenceFind,
  getProperty: getTargetProperty,
  process: getMetaFromJcamp,
};

export default voidVolume;
