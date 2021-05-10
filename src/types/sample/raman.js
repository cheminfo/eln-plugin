import common from '../common';

export default {
  jpath: ['spectra', 'raman'],
  find: common.basenameFind,
  getProperty: common.getTargetProperty,
  process: common.getMetaFromJcamp,
};
