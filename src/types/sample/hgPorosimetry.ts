import {
  getMetaFromJcamp,
  getTargetProperty,
  referenceFind,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const hgPorosimetry: TypeProcessor = {
  jpath: ['spectra', 'hgPorosimetry'],
  find: referenceFind,
  getProperty: getTargetProperty,
  process: getMetaFromJcamp,
};

export default hgPorosimetry;
