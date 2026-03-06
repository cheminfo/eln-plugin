import common from '../common';

export default {
  jpath: ['spectra', 'zetaPotential'],
  find: common.basenameFind,
  getProperty: common.getTargetProperty,
  process: common.getMetaFromJcamp,
};
