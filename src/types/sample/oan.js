import common from '../common';

export default {
  jpath: ['spectra', 'oan'],
  find: common.basenameFind,
  getProperty: common.getTargetProperty,
  process: common.getMetaFromJcamp,
};
