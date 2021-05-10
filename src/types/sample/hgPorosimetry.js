import common from '../common';

export default {
  jpath: ['spectra', 'hgPorosimetry'],
  find: common.basenameFind,
  getProperty: common.getTargetProperty,
  process: common.getMetaFromJcamp,
};
