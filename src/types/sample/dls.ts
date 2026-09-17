import {
  getMetaFromJcamp,
  getTargetProperty,
  referenceFind,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const dls: TypeProcessor = {
  jpath: ['spectra', 'dls'],
  find: referenceFind,
  getProperty: getTargetProperty,
  process: getMetaFromJcamp,
};

export default dls;
