import {
  basenameFind,
  getMetaFromJcamp,
  getTargetProperty,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const differentialCentrifugalSedimentation: TypeProcessor = {
  jpath: ['spectra', 'differentialCentrifugalSedimentation'],
  find: basenameFind,
  getProperty: getTargetProperty,
  process: getMetaFromJcamp,
};

export default differentialCentrifugalSedimentation;
