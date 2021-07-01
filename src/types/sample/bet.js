import common from '../common';

/** Brunauer-Emmett-Teller (BET) surface area analysis */
export default {
  jpath: ['spectra', 'bet'],
  find: common.basenameFind,
  getProperty: common.getTargetProperty,
  process: common.getMetaFromJcamp,
};
