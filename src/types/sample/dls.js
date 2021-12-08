import common from '../common';

export default {
  jpath: ['spectra', 'dls'],
  find: common.basenameFind,
  getProperty: common.getTargetProperty,
  process: common.getMetaFromJcamp,
};
