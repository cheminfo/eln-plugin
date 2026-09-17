import {
  getMetaFromJcamp,
  getTargetProperty,
  referenceFind,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const xray: TypeProcessor = {
  jpath: ['spectra', 'xray'],
  find: referenceFind,
  getProperty: getTargetProperty,
  process: getMetaFromJcamp,
};

export default xray;
