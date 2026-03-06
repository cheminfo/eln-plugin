import {
  basenameFind,
  getMetaFromJcamp,
  getTargetProperty,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const dls: TypeProcessor = {
  jpath: ['spectra', 'dls'],
  find: basenameFind,
  getProperty: getTargetProperty,
  process: getMetaFromJcamp,
};

export default dls;
