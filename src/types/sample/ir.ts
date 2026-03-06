import {
  basenameFind,
  getMetaFromJcamp,
  getTargetProperty,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const ir: TypeProcessor = {
  jpath: ['spectra', 'ir'],
  find: basenameFind,
  getProperty: getTargetProperty,
  process: getMetaFromJcamp,
};

export default ir;
