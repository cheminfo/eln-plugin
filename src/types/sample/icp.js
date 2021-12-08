import common from '../common';

export default {
  jpath: ['spectra', 'icp'],
  find: common.basenameFind,
  getProperty: common.getTargetProperty,
  process: common.getMetaFromJcamp,
};
