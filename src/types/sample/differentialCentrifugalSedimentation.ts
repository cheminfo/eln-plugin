import {
  getMetaFromJcamp,
  getTargetProperty,
  referenceFind,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const differentialCentrifugalSedimentation: TypeProcessor = {
  jpath: ['spectra', 'differentialCentrifugalSedimentation'],
  find: referenceFind,
  getProperty: getTargetProperty,
  process: getMetaFromJcamp,
};

export default differentialCentrifugalSedimentation;
