import common from '../common';

export default {
  jpath: ['spectra', 'xray'],
  find: common.basenameFind,
  getProperty: common.getTargetProperty,
  process: common.getMetaFromJcamp,
};
