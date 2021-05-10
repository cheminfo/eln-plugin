import common from '../common';

export default {
  jpath: ['spectra', 'differentialCentrifugalSedimentation'],
  find: common.basenameFind,
  getProperty: common.getTargetProperty,
  process: common.getMetaFromJcamp,
};
