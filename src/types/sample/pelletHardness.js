import common from '../common';

export default {
  jpath: ['spectra', 'pelletHardness'],
  find: common.basenameFind,
  getProperty: common.getTargetProperty,
  process: common.getMetaFromJcamp,
};
