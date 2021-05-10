import common from '../common';

export default {
  jpath: ['spectra', 'differentialScanningCalorimetry'],
  find: common.basenameFind,
  getProperty: common.getTargetProperty,
  process: common.getMetaFromJcamp,
};
