import {
  basenameFind,
  getMetaFromJcamp,
  getTargetProperty,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const differentialScanningCalorimetry: TypeProcessor = {
  jpath: ['spectra', 'differentialScanningCalorimetry'],
  find: basenameFind,
  getProperty: getTargetProperty,
  process: getMetaFromJcamp,
};

export default differentialScanningCalorimetry;
