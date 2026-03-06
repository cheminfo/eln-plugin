import type { ContentData } from '../common.ts';
import {
  basenameFind,
  getMetaFromJcamp,
  getTargetProperty,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const mass: TypeProcessor = {
  jpath: ['spectra', 'mass'],
  find: basenameFind,
  getProperty: getTargetProperty,
  process: (filename: string, content: ContentData) => {
    return getMetaFromJcamp(filename, content, {
      mapping: {
        EXPERIMENT: 'experiment',
        INJECTION: 'injection',
        MODE: 'mode',
        INSTRUMENT: 'instrument',
        ANALYZER: 'analyzer',
        IONISATION: 'ionisation',
        CONDITIONS: 'conditions',
        ACCURATEMF: 'accurate.mf',
        ACCURATEMODIF: 'accurate.modification',
        ACCURATERESULT: 'accurate.value',
      },
    });
  },
};

export default mass;
