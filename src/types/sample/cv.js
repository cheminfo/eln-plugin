import common from '../common';

export default {
  jpath: ['spectra', 'cv'],
  find: common.basenameFind,
  getProperty: common.getTargetProperty,
  process: common.getMetaFromJcamp,
};
