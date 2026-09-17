import {
  getMetaFromJcamp,
  getTargetProperty,
  referenceFind,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const thermogravimetricAnalysis: TypeProcessor = {
  jpath: ['spectra', 'thermogravimetricAnalysis'],
  find: referenceFind,
  getProperty: getTargetProperty,
  process: getMetaFromJcamp,
};

export default thermogravimetricAnalysis;
