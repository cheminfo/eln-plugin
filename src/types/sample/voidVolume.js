import common from '../common';

export default {
  jpath: ['spectra', 'voidVolume'],
  find: common.basenameFind,
  getProperty: common.getTargetProperty,
  process: common.getMetaFromJcamp,
};
