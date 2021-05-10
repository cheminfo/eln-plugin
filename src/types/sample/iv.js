import common from '../common';

export default {
  jpath: ['spectra', 'iv'],
  find: common.basenameFind,
  getProperty: common.getTargetProperty,
  process: common.getMetaFromJcamp,
};
