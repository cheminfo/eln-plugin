import {
  basenameFind,
  getMetaFromJcamp,
  getTargetProperty,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const uv: TypeProcessor = {
  jpath: ['spectra', 'uv'],
  find: basenameFind,
  getProperty: getTargetProperty,
  process: getMetaFromJcamp,
};

export default uv;
