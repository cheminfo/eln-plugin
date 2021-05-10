import common from '../common';

export default {
  jpath: ['spectra', 'xrf'],
  find: common.basenameFind,
  getProperty: common.getTargetProperty,
  process: common.getMetaFromJcamp,
};
