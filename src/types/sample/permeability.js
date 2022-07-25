import common from '../common';

export default {
  jpath: ['spectra', 'permeability'],
  find: common.basenameFind,
  getProperty: common.getTargetProperty,
  process: common.getMetaFromJcamp,
};
