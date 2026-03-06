import {
  basenameFind,
  getMetaFromJcamp,
  getTargetProperty,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const thermogravimetricAnalysis: TypeProcessor = {
  jpath: ['spectra', 'thermogravimetricAnalysis'],
  find: basenameFind,
  getProperty: getTargetProperty,
  process: getMetaFromJcamp,
};

export default thermogravimetricAnalysis;
