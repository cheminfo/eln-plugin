import {
  getMetaFromJcamp,
  getTargetProperty,
  referenceFind,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const differentialScanningCalorimetry: TypeProcessor = {
  jpath: ['spectra', 'differentialScanningCalorimetry'],
  find: referenceFind,
  getProperty: getTargetProperty,
  process: getMetaFromJcamp,
};

export default differentialScanningCalorimetry;
