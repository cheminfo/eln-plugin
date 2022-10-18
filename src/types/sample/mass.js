import common from '../common';

export default {
  jpath: ['spectra', 'mass'],
  find: common.basenameFind,
  getProperty: common.getTargetProperty,
  process: (filename, content) => {
    let metaData = common.getMetaFromJcamp(filename, content, {
      mapping: {
        EXPERIMENT: 'experiment',
        INJECTION: 'injection',
        MODE: 'mode',
        INSTRUMENT: 'instrument',
        ANALYSER: 'analyser',
        CONDITIONS: 'conditions',
        ACCURATEMF: 'accurate.mf',
        ACCURATEMODIF: 'accurate.modification',
        ACCURATERESULT: 'accurate.value',
      },
    });
    return metaData;
  },
};
