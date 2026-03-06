import {
  basenameFind,
  getMetaFromJcamp,
  getTargetProperty,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const hgPorosimetry: TypeProcessor = {
  jpath: ['spectra', 'hgPorosimetry'],
  find: basenameFind,
  getProperty: getTargetProperty,
  process: getMetaFromJcamp,
};

export default hgPorosimetry;
